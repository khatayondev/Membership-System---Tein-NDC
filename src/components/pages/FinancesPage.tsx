import { useState } from 'react';
import { mockTransactions, mockMembers } from '../../lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { DollarSign, TrendingUp, TrendingDown, Plus, Download, CheckCircle, XCircle, FileText, Receipt as ReceiptIcon, FileSpreadsheet, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { Transaction, Member } from '../../types';
import { useNotifications } from '../../lib/notificationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function FinancesPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [updateDuesDialogOpen, setUpdateDuesDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const { addNotification } = useNotifications();

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const totalIncome = mockTransactions
    .filter(t => (t.type === 'dues' || t.type === 'donation') && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense' && (t.status === 'completed' || t.status === 'approved'))
    .reduce((sum, t) => sum + t.amount, 0);

  const handleApproveTransaction = (transaction: Transaction) => {
    toast.success(`Transaction ${transaction.id} approved`);
    addNotification({
      type: 'success',
      title: 'Transaction Approved',
      message: `${transaction.memberName}'s ${transaction.type} of GH₵${transaction.amount} has been approved`,
    });
  };

  const handleRejectTransaction = (transaction: Transaction) => {
    toast.error(`Transaction ${transaction.id} rejected`);
  };

  const handleGenerateReceipt = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setReceiptDialogOpen(true);
  };

  const handlePrintReceipt = () => {
    if (!selectedTransaction) return;

    const printContent = document.getElementById('receipt-printable');
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${selectedTransaction.receiptNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background: white;
            }
            .receipt {
              max-width: 700px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border: 2px solid #E30613;
            }
            .receipt-header {
              text-align: center;
              border-bottom: 3px solid #007A33;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .receipt-header h1 {
              color: #E30613;
              font-size: 28px;
              margin-bottom: 8px;
            }
            .receipt-header h2 {
              color: #007A33;
              font-size: 18px;
              margin-bottom: 4px;
            }
            .receipt-header p {
              color: #666;
              font-size: 14px;
            }
            .receipt-number {
              background: #f5f5f5;
              padding: 12px;
              text-align: center;
              margin-bottom: 30px;
              border-left: 4px solid #007A33;
            }
            .receipt-number strong {
              color: #E30613;
              font-size: 16px;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-label {
              color: #666;
              font-weight: 600;
            }
            .detail-value {
              color: #1a1a1a;
              font-weight: 500;
            }
            .amount-section {
              background: linear-gradient(135deg, #E30613 0%, #007A33 100%);
              color: white;
              padding: 20px;
              text-align: center;
              margin: 30px 0;
              border-radius: 8px;
            }
            .amount-section p {
              font-size: 14px;
              margin-bottom: 8px;
            }
            .amount-section h3 {
              font-size: 36px;
              font-weight: bold;
            }
            .receipt-footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #eee;
              text-align: center;
            }
            .signature {
              margin-top: 40px;
              text-align: right;
            }
            .signature-line {
              border-top: 2px solid #1a1a1a;
              display: inline-block;
              width: 200px;
              margin-bottom: 8px;
            }
            .verified-badge {
              display: inline-block;
              background: #007A33;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              margin-top: 20px;
            }
            @media print {
              body { padding: 0; }
              .receipt { border: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);

    toast.success('Receipt ready for printing');
  };

  const handleDownloadReceipt = () => {
    if (selectedTransaction) {
      handlePrintReceipt();
    }
  };

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    const csvContent = [
      ['ID', 'Member', 'Type', 'Description', 'Date', 'Amount', 'Status'],
      ...filteredTransactions.map(t => [
        t.id,
        t.memberName,
        t.type,
        t.description,
        t.date,
        t.amount.toString(),
        t.status
      ])
    ];
    toast.success('Exporting transactions to CSV...');
  };

  const handleExportExcel = () => {
    // In a real app, this would generate and download an Excel file
    toast.success('Exporting transactions to Excel...');
  };

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF report
    toast.success('Generating PDF report...');
  };

  const handleUpdateDues = (member: Member) => {
    setSelectedMember(member);
    setUpdateDuesDialogOpen(true);
  };

  const handleSaveDuesUpdate = () => {
    if (selectedMember) {
      toast.success(`Dues updated for ${selectedMember.firstName} ${selectedMember.lastName}`);
      addNotification({
        type: 'payment',
        title: 'Dues Updated',
        message: `Dues payment recorded for ${selectedMember.firstName} ${selectedMember.lastName}`,
      });
      setUpdateDuesDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Financial Management</h1>
          <p className="text-muted-foreground">Track dues, donations, and expenses</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Record Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Transaction</DialogTitle>
              <DialogDescription>Add a financial transaction</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dues">Dues Payment</SelectItem>
                    <SelectItem value="donation">Donation</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Member</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMembers.map(m => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.firstName} {m.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount (GH₵)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Transaction description..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <DialogFooter>
                <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90">Record Transaction</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Financial Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#007A33' }}>GH₵{totalIncome}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#E30613' }}>GH₵{totalExpenses}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#007A33' }}>GH₵{totalIncome - totalExpenses}</div>
            <p className="text-xs text-muted-foreground mt-1">Available funds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#FFA500' }}>
              {mockTransactions.filter(t => t.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="dues">Update Dues</TabsTrigger>
          <TabsTrigger value="export">Export & Reports</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Financial activity and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="dues">Dues</SelectItem>
                    <SelectItem value="donation">Donations</SelectItem>
                    <SelectItem value="expense">Expenses</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.memberName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.type}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <span style={{ 
                            color: transaction.type === 'expense' ? '#E30613' : '#007A33'
                          }}>
                            {transaction.type === 'expense' ? '-' : '+'}GH₵{transaction.amount}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={transaction.status === 'completed' ? 'default' : 'outline'}
                            style={transaction.status === 'completed' ? { backgroundColor: '#007A33' } : {}}
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 justify-end">
                            {transaction.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 hover:bg-green-50" 
                                  onClick={() => handleApproveTransaction(transaction)}
                                  title="Approve"
                                >
                                  <CheckCircle className="h-4 w-4" style={{ color: '#007A33' }} />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 hover:bg-red-50" 
                                  onClick={() => handleRejectTransaction(transaction)}
                                  title="Reject"
                                >
                                  <XCircle className="h-4 w-4" style={{ color: '#E30613' }} />
                                </Button>
                              </>
                            )}
                            {transaction.receiptNumber && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 px-2"
                                onClick={() => handleGenerateReceipt(transaction)}
                                title="View Receipt"
                              >
                                <ReceiptIcon className="h-4 w-4 mr-1" />
                                Receipt
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Update Dues Tab */}
        <TabsContent value="dues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Update Member Dues</CardTitle>
              <CardDescription>Record and update dues payments for members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockMembers.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm">{member.firstName} {member.lastName}</p>
                            <p className="text-xs text-muted-foreground">{member.membershipId}</p>
                          </div>
                          <Badge 
                            variant={member.duesStatus === 'paid' ? 'default' : member.duesStatus === 'overdue' ? 'destructive' : 'outline'}
                            style={member.duesStatus === 'paid' ? { backgroundColor: '#007A33' } : {}}
                          >
                            {member.duesStatus}
                          </Badge>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleUpdateDues(member)}
                        >
                          Update Dues
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export & Reports Tab */}
        <TabsContent value="export" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Export Financial Data</CardTitle>
                <CardDescription>Download transaction data in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportCSV}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportExcel}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" style={{ color: '#007A33' }} />
                  Export as Excel
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportPDF}
                >
                  <FileText className="mr-2 h-4 w-4" style={{ color: '#E30613' }} />
                  Export as PDF Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create comprehensive financial reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.success('Generating monthly summary...')}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Monthly Summary
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.success('Generating quarterly report...')}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Quarterly Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast.success('Generating annual report...')}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Annual Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Receipt Dialog */}
      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>View and download transaction receipt</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              {/* Printable Receipt */}
              <div id="receipt-printable" className="bg-white">
                <div className="max-w-2xl mx-auto bg-white p-8 border-2" style={{ borderColor: '#E30613' }}>
                  {/* Receipt Header */}
                  <div className="text-center pb-6 mb-6" style={{ borderBottom: '3px solid #007A33' }}>
                    <h1 className="text-3xl mb-2" style={{ color: '#E30613' }}>GIMPA TEIN NDC</h1>
                    <h2 className="text-xl mb-1" style={{ color: '#007A33' }}>Official Payment Receipt</h2>
                    <p className="text-sm text-muted-foreground">Ghana Institute of Management and Public Administration</p>
                  </div>

                  {/* Receipt Number */}
                  <div className="bg-gray-100 p-3 mb-6 text-center border-l-4" style={{ borderColor: '#007A33' }}>
                    <strong style={{ color: '#E30613' }} className="text-lg">
                      Receipt No: {selectedTransaction.receiptNumber}
                    </strong>
                  </div>

                  {/* Receipt Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Member Name:</span>
                      <span>{selectedTransaction.memberName}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span>{selectedTransaction.id}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Payment Date:</span>
                      <span>{new Date(selectedTransaction.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span>{selectedTransaction.paymentMethod || 'Cash'}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b">
                      <span className="text-muted-foreground">Description:</span>
                      <span className="text-right">{selectedTransaction.description}</span>
                    </div>
                  </div>

                  {/* Amount Section */}
                  <div 
                    className="p-6 text-white text-center my-6 rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #E30613 0%, #007A33 100%)' }}
                  >
                    <p className="text-sm mb-2">Total Amount Paid</p>
                    <h3 className="text-4xl">GH₵{selectedTransaction.amount.toFixed(2)}</h3>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t-2 text-center">
                    <div className="mb-6">
                      <div className="inline-block text-right">
                        <div className="border-t-2 border-black w-48 mb-2"></div>
                        <p className="text-xs text-muted-foreground">Authorized Signature</p>
                        <p className="text-xs text-muted-foreground mt-1">GIMPA TEIN NDC Treasurer</p>
                      </div>
                    </div>
                    
                    <div className="inline-block px-4 py-2 rounded-full text-xs" style={{ backgroundColor: '#007A33', color: 'white' }}>
                      ✓ VERIFIED & AUTHENTIC
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-4">
                      This is an official receipt issued by GIMPA TEIN NDC<br />
                      For inquiries, please contact the treasurer's office
                    </p>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      Generated on {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setReceiptDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  style={{ backgroundColor: '#007A33' }} 
                  className="hover:opacity-90"
                  onClick={handleDownloadReceipt}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Print / Download
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Dues Dialog */}
      <Dialog open={updateDuesDialogOpen} onOpenChange={setUpdateDuesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Dues Payment</DialogTitle>
            <DialogDescription>
              Record dues payment for {selectedMember?.firstName} {selectedMember?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Member ID:</span>
                  <span>{selectedMember.membershipId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Status:</span>
                  <Badge variant={selectedMember.duesStatus === 'paid' ? 'default' : 'outline'}>
                    {selectedMember.duesStatus}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amount (GH₵)</Label>
                <Input type="number" placeholder="50.00" defaultValue="50" />
              </div>

              <div className="space-y-2">
                <Label>Payment Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select defaultValue="cash">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="mobile-money">Mobile Money</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Remarks (Optional)</Label>
                <Textarea 
                  placeholder="Additional notes about this payment..." 
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setUpdateDuesDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  style={{ backgroundColor: '#007A33' }} 
                  className="hover:opacity-90"
                  onClick={handleSaveDuesUpdate}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

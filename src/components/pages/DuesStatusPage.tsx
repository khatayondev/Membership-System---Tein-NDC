import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { User } from '../../types';
import { DollarSign, CheckCircle, Clock, AlertCircle, Download, Receipt } from 'lucide-react';

interface DuesStatusPageProps {
  user: User;
}

// Mock dues data - in real app this would come from backend
const mockDuesData = {
  totalDue: 100.00,
  amountPaid: 60.00,
  balance: 40.00,
  dueDate: '2025-12-31',
  paymentHistory: [
    {
      id: '1',
      date: '2025-01-15',
      amount: 30.00,
      method: 'Mobile Money',
      reference: 'MM-2025-001',
      status: 'completed'
    },
    {
      id: '2',
      date: '2025-02-20',
      amount: 30.00,
      method: 'Bank Transfer',
      reference: 'BT-2025-002',
      status: 'completed'
    }
  ]
};

export function DuesStatusPage({ user }: DuesStatusPageProps) {
  const { totalDue, amountPaid, balance } = mockDuesData;
  const paymentProgress = (amountPaid / totalDue) * 100;
  
  const getDuesStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge style={{ backgroundColor: '#007A33', color: 'white' }}>Fully Paid</Badge>;
      case 'pending':
        return <Badge style={{ backgroundColor: '#FFA500', color: 'white' }}>Pending</Badge>;
      case 'overdue':
        return <Badge style={{ backgroundColor: '#E30613', color: 'white' }}>Overdue</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Dues Payment Status</h1>
        <p className="text-muted-foreground">View your membership dues and payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Dues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl" style={{ color: '#007A33' }}>GH₵</span>
              <span className="text-3xl" style={{ color: '#007A33' }}>{totalDue.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Annual membership fee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Amount Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl text-green-600">GH₵</span>
              <span className="text-3xl text-green-600">{amountPaid.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total payments made</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl" style={{ color: balance > 0 ? '#E30613' : '#007A33' }}>GH₵</span>
              <span className="text-3xl" style={{ color: balance > 0 ? '#E30613' : '#007A33' }}>
                {balance.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Outstanding amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {getDuesStatusBadge(user.duesStatus)}
              <p className="text-xs text-muted-foreground">Due by: {mockDuesData.dueDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>Track your dues payment completion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{Math.round(paymentProgress)}%</span>
            </div>
            <Progress value={paymentProgress} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#007A3320' }}>
                <CheckCircle className="h-5 w-5" style={{ color: '#007A33' }} />
              </div>
              <div>
                <p className="text-sm">Paid</p>
                <p className="text-lg">GH₵{amountPaid.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E3061320' }}>
                <Clock className="h-5 w-5" style={{ color: '#E30613' }} />
              </div>
              <div>
                <p className="text-sm">Remaining</p>
                <p className="text-lg">GH₵{balance.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100">
                <Receipt className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm">Payments</p>
                <p className="text-lg">{mockDuesData.paymentHistory.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      {balance > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
            <CardDescription>Payment methods and instructions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border-2 border-dashed" style={{ borderColor: '#007A33' }}>
              <h3 className="text-sm mb-3" style={{ color: '#007A33' }}>Payment Options:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-medium min-w-[120px]">Mobile Money:</span>
                  <span className="text-muted-foreground">0XX XXX XXXX (MTN/Vodafone)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium min-w-[120px]">Bank Transfer:</span>
                  <span className="text-muted-foreground">Account: XXXX-XXXX-XXXX</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium min-w-[120px]">Cash Payment:</span>
                  <span className="text-muted-foreground">Contact Treasurer during office hours</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Important:</p>
                <p>After making payment, please send your payment receipt to the Treasurer for verification and confirmation.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button style={{ backgroundColor: '#007A33' }}>
                <DollarSign className="mr-2 h-4 w-4" />
                Contact Treasurer
              </Button>
              <Button variant="outline">
                <Receipt className="mr-2 h-4 w-4" />
                Upload Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View all your past payments</CardDescription>
        </CardHeader>
        <CardContent>
          {mockDuesData.paymentHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payment history available
            </div>
          ) : (
            <div className="space-y-3">
              {mockDuesData.paymentHistory.map((payment) => (
                <Card key={payment.id} className="border-l-4" style={{ borderLeftColor: '#007A33' }}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#007A3320' }}>
                          <CheckCircle className="h-5 w-5" style={{ color: '#007A33' }} />
                        </div>
                        <div>
                          <p className="font-medium">GH₵{payment.amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{payment.date}</p>
                        <p className="text-xs text-muted-foreground">{payment.reference}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="mr-1 h-3 w-3" />
                        Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

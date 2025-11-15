import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockTransactions, mockMembers, mockAnalytics } from '../../lib/mockData';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '../ui/button';

export function TreasurerDashboard() {
  const totalIncome = mockTransactions
    .filter(t => (t.type === 'dues' || t.type === 'donation') && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense' && (t.status === 'completed' || t.status === 'approved'))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingTransactions = mockTransactions.filter(t => t.status === 'pending');
  const recentTransactions = mockTransactions.slice(0, 5);

  const membersByDuesStatus = {
    paid: mockMembers.filter(m => m.duesStatus === 'paid').length,
    pending: mockMembers.filter(m => m.duesStatus === 'pending').length,
    overdue: mockMembers.filter(m => m.duesStatus === 'overdue').length
  };

  const duesStatusData = [
    { name: 'Paid', value: membersByDuesStatus.paid, color: '#007A33' },
    { name: 'Pending', value: membersByDuesStatus.pending, color: '#D1D5DB' },
    { name: 'Overdue', value: membersByDuesStatus.overdue, color: '#E30613' }
  ];

  const stats = [
    {
      title: 'Total Income',
      value: `GH₵${totalIncome}`,
      change: '+15%',
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #007A33 0%, #005a26 100%)'
    },
    {
      title: 'Total Expenses',
      value: `GH₵${totalExpenses}`,
      change: '+8%',
      icon: TrendingDown,
      gradient: 'linear-gradient(135deg, #E30613 0%, #B10511 100%)'
    },
    {
      title: 'Net Balance',
      value: `GH₵${totalIncome - totalExpenses}`,
      change: '+22%',
      icon: DollarSign,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    {
      title: 'Pending',
      value: pendingTransactions.length,
      change: 'Requires action',
      icon: AlertCircle,
      gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Treasurer Dashboard 💰</h1>
          <p className="text-muted-foreground">Manage finances, dues, and transactions</p>
        </div>
        <Button className="rounded-xl bg-primary hover:bg-primary/90">
          <DollarSign className="mr-2 h-4 w-4" />
          Record Transaction
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <div 
                className="p-6 text-white"
                style={{ background: stat.gradient }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 rounded-lg">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl">{stat.value}</h3>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Income vs Expenses (Last 10 months)</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.financeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280" 
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6B7280" 
                  style={{ fontSize: '12px' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="income" fill="#007A33" name="Income" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#E30613" name="Expenses" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle>Dues Payment Status</CardTitle>
            <CardDescription>Member payment status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={duesStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {duesStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {duesStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Transactions */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Transactions</CardTitle>
                <CardDescription>Transactions requiring action</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-lg bg-red-50 text-red-700 border-red-200">
                {pendingTransactions.length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTransactions.length > 0 ? (
                pendingTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex-1">
                      <p className="text-sm">{transaction.memberName}</p>
                      <p className="text-xs text-muted-foreground">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="text-sm text-primary">GH₵{transaction.amount}</p>
                        <Badge variant="outline" className="mt-1 text-xs rounded-lg border-gray-300">{transaction.type}</Badge>
                      </div>
                      <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90">
                        Approve
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No pending transactions</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest financial activity</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl border-gray-300">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                  <div className="flex-1">
                    <p className="text-sm">{transaction.memberName}</p>
                    <p className="text-xs text-muted-foreground">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-sm" 
                      style={{ color: transaction.type === 'expense' ? '#E30613' : '#007A33' }}
                    >
                      {transaction.type === 'expense' ? '-' : '+'}GH₵{transaction.amount}
                    </p>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'outline'}
                      style={transaction.status === 'completed' ? { backgroundColor: '#007A33' } : { borderColor: '#D1D5DB' }}
                      className="mt-1 text-xs rounded-lg"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members with Overdue Dues */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overdue Payments</CardTitle>
              <CardDescription>Members with outstanding dues</CardDescription>
            </div>
            <Badge variant="destructive" className="rounded-lg">
              {mockMembers.filter(m => m.duesStatus === 'overdue').length} overdue
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {mockMembers.filter(m => m.duesStatus === 'overdue').map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-destructive">
                    <span className="text-sm">{member.firstName.charAt(0)}{member.lastName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm">{member.firstName} {member.lastName}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl border-gray-300">
                  Remind
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

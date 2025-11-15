import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockEvents, mockAnnouncements, mockTransactions } from '../../lib/mockData';
import { User } from '../../types';
import { Calendar, Bell, DollarSign, Download, CheckCircle, Clock, XCircle, ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface MemberDashboardProps {
  user: User;
}

export function MemberDashboard({ user }: MemberDashboardProps) {
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming').slice(0, 3);
  const myTransactions = mockTransactions.filter(t => t.memberId === user.id).slice(0, 3);
  const announcements = mockAnnouncements.filter(a => 
    a.audience === 'all' || (Array.isArray(a.audience) && a.audience.includes('member'))
  ).slice(0, 4);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-white" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-white" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-white" />;
      default:
        return null;
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'paid':
        return 'linear-gradient(135deg, #007A33 0%, #005a26 100%)';
      case 'pending':
        return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
      case 'overdue':
        return 'linear-gradient(135deg, #E30613 0%, #B10511 100%)';
      default:
        return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Welcome, {user.firstName}! 👋</h1>
          <p className="text-muted-foreground">Your GIMPA TEIN NDC member portal</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl" style={{ background: 'linear-gradient(135deg, #007A33 0%, #005a26 100%)' }}>
        <CardContent className="p-8 text-white">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/20">
              <AvatarFallback className="text-2xl bg-primary/50 text-white">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl mb-2">{user.firstName} {user.lastName}</h2>
              <p className="text-white/80 text-sm mb-4">{user.email}</p>
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div>
                  <p className="text-xs text-white/60 mb-1">Membership ID</p>
                  <p className="text-sm font-medium">{user.membershipId}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">Program</p>
                  <p className="text-sm font-medium">{user.program} - Level {user.level}</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1">Status</p>
                  <Badge className="bg-white/20 text-white border-0 rounded-lg">
                    {user.status}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/40 hover:bg-white/20 rounded-xl">
                <Download className="mr-2 h-4 w-4" />
                Download Membership Card
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <div 
            className="p-6 text-white"
            style={{ background: getStatusGradient(user.duesStatus) }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                {getStatusIcon(user.duesStatus)}
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Dues Status</p>
              <h3 className="text-2xl">
                {user.duesStatus.charAt(0).toUpperCase() + user.duesStatus.slice(1)}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <div 
            className="p-6 text-white"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Events Attended</p>
              <h3 className="text-3xl">
                {mockEvents.filter(e => e.attendees.includes(user.id)).length}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <div 
            className="p-6 text-white"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Member Since</p>
              <h3 className="text-xl">
                {new Date(user.dateJoined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dues & Payments */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Dues & Payments</CardTitle>
                <CardDescription>Your payment history</CardDescription>
              </div>
              {(user.duesStatus === 'pending' || user.duesStatus === 'overdue') && (
                <Button size="sm" className="rounded-xl bg-destructive hover:bg-destructive/90">
                  Pay Now
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myTransactions.length > 0 ? (
                myTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex-1">
                      <p className="text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      {transaction.receiptNumber && (
                        <p className="text-xs text-muted-foreground">Receipt: {transaction.receiptNumber}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-primary">GH₵{transaction.amount}</p>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'outline'}
                        style={transaction.status === 'completed' ? { backgroundColor: '#007A33' } : { borderColor: '#D1D5DB' }}
                        className="mt-1 text-xs rounded-lg"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No transactions yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events you can attend</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl border-gray-300">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm mb-1">{event.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date} at {event.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs rounded-lg border-gray-300">{event.type}</Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant={event.attendees.includes(user.id) ? 'outline' : 'default'}
                    style={!event.attendees.includes(user.id) ? { backgroundColor: '#007A33' } : { borderColor: '#D1D5DB' }}
                    className="w-full mt-2 rounded-xl"
                  >
                    {event.attendees.includes(user.id) ? '✓ Registered' : 'RSVP'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Stay updated with the latest news</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl border-gray-300">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex items-start gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: announcement.priority === 'urgent' ? '#FEE2E2' : '#D1FAE5',
                    }}
                  >
                    <Bell 
                      className="h-5 w-5" 
                      style={{ color: announcement.priority === 'urgent' ? '#E30613' : '#007A33' }} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm">{announcement.title}</p>
                      <Badge 
                        variant={announcement.priority === 'urgent' ? 'destructive' : 'outline'}
                        className="text-xs flex-shrink-0 rounded-lg"
                        style={announcement.priority !== 'urgent' ? { borderColor: '#D1D5DB' } : {}}
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{announcement.content.substring(0, 100)}...</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <p className="text-xs text-muted-foreground">
                    {announcement.date} • {announcement.author}
                  </p>
                  <button className="text-xs text-primary hover:underline flex items-center gap-1">
                    Read <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <button className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm mb-1">View All Events</div>
              <div className="text-xs text-muted-foreground">Browse upcoming events</div>
            </button>
            <button className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm mb-1">Payment History</div>
              <div className="text-xs text-muted-foreground">View all transactions</div>
            </button>
            <button className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm mb-1">Submit Feedback</div>
              <div className="text-xs text-muted-foreground">Share your thoughts</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

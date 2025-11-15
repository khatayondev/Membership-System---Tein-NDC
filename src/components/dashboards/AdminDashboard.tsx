import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockAnalytics, mockMembers, mockEvents, mockAnnouncements } from '../../lib/mockData';
import { Users, DollarSign, Calendar, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

export function AdminDashboard() {
  const [viewAnnouncementOpen, setViewAnnouncementOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#E30613';
      case 'high':
        return '#FFA500';
      case 'medium':
        return '#007A33';
      case 'low':
        return '#666';
      default:
        return '#000';
    }
  };

  const stats = [
    {
      title: 'Total Members',
      value: mockAnalytics.totalMembers,
      change: '+12%',
      subtitle: 'vs last month',
      icon: Users,
      gradient: 'linear-gradient(135deg, #007A33 0%, #005a26 100%)'
    },
    {
      title: 'Active Members',
      value: mockAnalytics.activeMembers,
      change: '+8%',
      subtitle: 'Currently active',
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
    },
    {
      title: 'Total Revenue',
      value: `GH₵${mockAnalytics.totalRevenue}`,
      change: '+15%',
      subtitle: 'Revenue growth',
      icon: DollarSign,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    },
    {
      title: 'Upcoming Events',
      value: mockAnalytics.upcomingEvents,
      change: '3 this month',
      subtitle: 'Events scheduled',
      icon: Calendar,
      gradient: 'linear-gradient(135deg, #E30613 0%, #B10511 100%)'
    }
  ];

  const pendingMembers = mockMembers.filter(m => m.status === 'pending');
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming').slice(0, 3);
  const recentAnnouncements = mockAnnouncements.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with GIMPA TEIN NDC today</p>
        </div>
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
                  <h3 className="text-3xl mb-1">{stat.value}</h3>
                  <p className="text-white/60 text-xs">{stat.subtitle}</p>
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
            <CardTitle>Membership Growth</CardTitle>
            <CardDescription>Member count over the past 10 months</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.membershipGrowth}>
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
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#007A33" 
                  strokeWidth={3}
                  dot={{ fill: '#007A33', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Income vs Expenses comparison</CardDescription>
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
                <Bar dataKey="income" fill="#007A33" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#E30613" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Members */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Approvals</CardTitle>
              <Badge variant="outline" className="rounded-lg bg-red-50 text-red-700 border-red-200">
                {pendingMembers.length}
              </Badge>
            </div>
            <CardDescription>Members awaiting approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingMembers.length > 0 ? (
              pendingMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-primary">
                    <span className="text-sm">{member.firstName.charAt(0)}{member.lastName.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{member.firstName} {member.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{member.program}</p>
                  </div>
                  <Clock className="h-4 w-4 text-red-500" />
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No pending approvals</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Badge variant="outline" className="rounded-lg bg-green-50 text-green-700 border-green-200">
                {upcomingEvents.length}
              </Badge>
            </div>
            <CardDescription>Next scheduled events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm flex-1">{event.title}</p>
                  <Badge variant="outline" className="text-xs rounded-lg border-gray-300">{event.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                  <Calendar className="h-3 w-3" />
                  {event.date} at {event.time}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {event.attendees.length} / {event.maxAttendees}
                  </span>
                  <Progress 
                    value={(event.attendees.length / (event.maxAttendees || 1)) * 100} 
                    className="w-20 h-1.5"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Announcements</CardTitle>
              <Badge variant="outline" className="rounded-lg bg-gray-50 text-gray-700 border-gray-300">
                {recentAnnouncements.length}
              </Badge>
            </div>
            <CardDescription>Latest communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm flex-1">{announcement.title}</p>
                  <Badge 
                    variant={announcement.priority === 'urgent' ? 'destructive' : 'outline'}
                    className="text-xs rounded-lg"
                    style={announcement.priority === 'urgent' ? {} : { borderColor: '#D1D5DB' }}
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">By {announcement.author}</p>
                <p className="text-xs text-muted-foreground">{announcement.date}</p>
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setSelectedAnnouncement(announcement);
                    setViewAnnouncementOpen(true);
                  }}
                >
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* View Announcement Dialog */}
      <Dialog open={viewAnnouncementOpen} onOpenChange={setViewAnnouncementOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
            <DialogDescription>
              {selectedAnnouncement?.date} by {selectedAnnouncement?.author}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {selectedAnnouncement?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
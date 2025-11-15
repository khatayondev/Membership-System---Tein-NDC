import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockMembers, mockEvents, mockAnnouncements } from '../../lib/mockData';
import { Users, Calendar, Bell, FileText, CheckCircle, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export function SecretaryDashboard() {
  const pendingMembers = mockMembers.filter(m => m.status === 'pending');
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming');
  const recentAnnouncements = mockAnnouncements.slice(0, 4);

  const stats = [
    {
      title: 'Total Members',
      value: mockMembers.length,
      icon: Users,
      gradient: 'linear-gradient(135deg, #007A33 0%, #005a26 100%)'
    },
    {
      title: 'Pending Approvals',
      value: pendingMembers.length,
      icon: Clock,
      gradient: 'linear-gradient(135deg, #E30613 0%, #B10511 100%)'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: Calendar,
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
    },
    {
      title: 'Announcements',
      value: mockAnnouncements.filter(a => a.status === 'published').length,
      icon: Bell,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Secretary Dashboard 📋</h1>
          <p className="text-muted-foreground">Manage records, communications, and events</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-gray-300">
            <FileText className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button className="rounded-xl bg-primary hover:bg-primary/90">
            <Bell className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
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
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-4xl">{stat.value}</h3>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Member Approvals */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Member Approvals</CardTitle>
                <CardDescription>Members awaiting verification</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-lg bg-red-50 text-red-700 border-red-200">
                {pendingMembers.length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingMembers.length > 0 ? (
                pendingMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-primary">
                        <span className="text-sm">{member.firstName.charAt(0)}{member.lastName.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{member.firstName} {member.lastName}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">{member.program} - Level {member.level}</p>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No pending approvals</p>
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
                <CardDescription>Events you need to manage</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl border-gray-300">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 4).map((event) => (
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
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      {event.attendees.length} / {event.maxAttendees} attending
                    </span>
                    <Progress 
                      value={(event.attendees.length / (event.maxAttendees || 1)) * 100} 
                      className="w-20 h-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Announcements */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Communications sent to members</CardDescription>
            </div>
            <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90">
              <Bell className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3 flex-1">
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
                      <p className="text-sm mb-1">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{announcement.content.substring(0, 80)}...</p>
                    </div>
                  </div>
                  <Badge 
                    variant={announcement.priority === 'urgent' ? 'destructive' : 'outline'}
                    className="text-xs flex-shrink-0 ml-2 rounded-lg"
                    style={announcement.priority !== 'urgent' ? { borderColor: '#D1D5DB' } : {}}
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-muted-foreground">
                    {announcement.date}
                  </p>
                  <button className="text-xs text-primary hover:underline flex items-center gap-1">
                    View <ArrowUpRight className="h-3 w-3" />
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
          <CardDescription>Common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <button className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm mb-1">Create Announcement</div>
              <div className="text-xs text-muted-foreground">Publish new message</div>
            </button>
            <button className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm mb-1">Schedule Event</div>
              <div className="text-xs text-muted-foreground">Add new event</div>
            </button>
            <button className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all text-left">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm mb-1">Upload Document</div>
              <div className="text-xs text-muted-foreground">Add new file</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

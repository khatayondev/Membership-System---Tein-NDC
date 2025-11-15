import { useState } from 'react';
import { mockAnnouncements } from '../../lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Bell, Plus, Send, Mail, MessageSquare, AlertCircle, Edit, Trash2, Eye } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { User } from '../../types';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

// Mock feedback data with state management
interface Feedback {
  id: string;
  memberId: string;
  memberName: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
  response?: string;
}

const initialFeedback: Feedback[] = [
  {
    id: '1',
    memberId: 'M001',
    memberName: 'Kwame Osei',
    subject: 'Event Schedule Suggestion',
    message: 'I think we should have more evening events to accommodate working students.',
    date: '2025-01-25',
    status: 'new',
  },
  {
    id: '2',
    memberId: 'M002',
    memberName: 'Ama Boateng',
    subject: 'Communication Improvement',
    message: 'Can we get event notifications via SMS as well? Sometimes I miss WhatsApp messages.',
    date: '2025-01-20',
    status: 'reviewed',
    response: 'Thank you for the suggestion. We are working on implementing SMS notifications.'
  },
  {
    id: '3',
    memberId: 'M003',
    memberName: 'Yaw Mensah',
    subject: 'Dues Payment Options',
    message: 'Please add more mobile money options for dues payment.',
    date: '2025-01-18',
    status: 'resolved',
    response: 'We now accept all major mobile money services. Thank you!'
  }
];

interface CommunicationsPageProps {
  user?: User;
}

export function CommunicationsPage({ user }: CommunicationsPageProps) {
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState<string>('all');
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedback);
  
  // Dialog states
  const [newAnnouncementOpen, setNewAnnouncementOpen] = useState(false);
  const [bulkEmailOpen, setBulkEmailOpen] = useState(false);
  const [bulkSMSOpen, setBulkSMSOpen] = useState(false);
  const [pushNotificationOpen, setPushNotificationOpen] = useState(false);
  const [respondDialogOpen, setRespondDialogOpen] = useState(false);
  const [viewAnnouncementOpen, setViewAnnouncementOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  // Form states
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [feedbackSubject, setFeedbackSubject] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  // Announcement form states
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementPriority, setAnnouncementPriority] = useState('medium');
  
  // Bulk communication states
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const isMember = user?.role === 'member';
  const canManageContent = user?.role === 'admin' || user?.role === 'secretary';

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter;
    return matchesPriority;
  });

  const filteredFeedback = feedbackList.filter(feedback => {
    const matchesStatus = feedbackStatusFilter === 'all' || feedback.status === feedbackStatusFilter;
    return matchesStatus;
  });

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

  const getFeedbackStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return '#007A33';
      case 'reviewed':
        return '#FFA500';
      case 'resolved':
        return '#666';
      default:
        return '#000';
    }
  };

  // Handlers
  const handleCreateAnnouncement = () => {
    if (!announcementTitle || !announcementContent) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Announcement published successfully!');
    setNewAnnouncementOpen(false);
    setAnnouncementTitle('');
    setAnnouncementContent('');
    setAnnouncementPriority('medium');
  };

  const handleSubmitFeedback = () => {
    if (!feedbackSubject || !feedbackMessage) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const newFeedback: Feedback = {
      id: `F${Date.now()}`,
      memberId: user?.id || 'M999',
      memberName: user?.firstName + ' ' + user?.lastName || 'Anonymous',
      subject: feedbackSubject,
      message: feedbackMessage,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    
    setFeedbackList([newFeedback, ...feedbackList]);
    toast.success('Feedback submitted successfully!');
    setFeedbackSubject('');
    setFeedbackMessage('');
  };

  const handleRespondToFeedback = () => {
    if (!responseMessage || !selectedFeedback) {
      toast.error('Please enter a response');
      return;
    }
    
    setFeedbackList(feedbackList.map(f => 
      f.id === selectedFeedback.id 
        ? { ...f, status: 'reviewed', response: responseMessage }
        : f
    ));
    
    toast.success('Response sent successfully!');
    setRespondDialogOpen(false);
    setResponseMessage('');
    setSelectedFeedback(null);
  };

  const handleDeleteAnnouncement = () => {
    toast.success('Announcement deleted successfully!');
    setDeleteDialogOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleBulkEmail = () => {
    if (!emailSubject || !emailMessage) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Bulk email sent to all members!');
    setBulkEmailOpen(false);
    setEmailSubject('');
    setEmailMessage('');
  };

  const handleBulkSMS = () => {
    if (!smsMessage) {
      toast.error('Please enter a message');
      return;
    }
    toast.success('Bulk SMS sent to all members!');
    setBulkSMSOpen(false);
    setSmsMessage('');
  };

  const handlePushNotification = () => {
    if (!notificationTitle || !notificationMessage) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Push notification sent to all members!');
    setPushNotificationOpen(false);
    setNotificationTitle('');
    setNotificationMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Communications Center</h1>
          <p className="text-muted-foreground">
            {isMember 
              ? 'View announcements and submit feedback' 
              : 'Manage announcements and member communications'}
          </p>
        </div>
        {canManageContent && (
          <div className="flex gap-2">
            <Dialog open={newAnnouncementOpen} onOpenChange={setNewAnnouncementOpen}>
              <DialogTrigger asChild>
                <Button style={{ backgroundColor: '#007A33' }}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Announcement</DialogTitle>
                  <DialogDescription>Publish a new announcement for members</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input 
                      placeholder="Announcement title" 
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message *</Label>
                    <Textarea 
                      placeholder="Write your announcement..." 
                      rows={5}
                      value={announcementContent}
                      onChange={(e) => setAnnouncementContent(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select value={announcementPriority} onValueChange={setAnnouncementPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewAnnouncementOpen(false)}>Cancel</Button>
                    <Button style={{ backgroundColor: '#007A33' }} onClick={handleCreateAnnouncement}>
                      <Send className="mr-2 h-4 w-4" />
                      Publish Announcement
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={bulkEmailOpen} onOpenChange={setBulkEmailOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Bulk Email
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Send Bulk Email</DialogTitle>
                  <DialogDescription>Send an email to all members</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject *</Label>
                    <Input 
                      placeholder="Email subject" 
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message *</Label>
                    <Textarea 
                      placeholder="Email content..." 
                      rows={6}
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setBulkEmailOpen(false)}>Cancel</Button>
                    <Button style={{ backgroundColor: '#007A33' }} onClick={handleBulkEmail}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Stats - Only for Admin/Secretary */}
      {canManageContent && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl" style={{ color: '#007A33' }}>{mockAnnouncements.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl" style={{ color: '#007A33' }}>
                {mockAnnouncements.filter(a => a.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Urgent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl" style={{ color: '#E30613' }}>
                {mockAnnouncements.filter(a => a.priority === 'urgent').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">New Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl" style={{ color: '#007A33' }}>
                {feedbackList.filter(f => f.status === 'new').length}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs for Announcements and Feedback */}
      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="announcements">
            <Bell className="mr-2 h-4 w-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
            {feedbackList.filter(f => f.status === 'new').length > 0 && (
              <Badge className="ml-2" style={{ backgroundColor: '#E30613' }}>
                {feedbackList.filter(f => f.status === 'new').length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Announcements</CardTitle>
              <CardDescription>
                {isMember ? 'View important announcements from TEIN leadership' : 'Manage and view all communications'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredAnnouncements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Bell 
                            className="h-5 w-5 mt-1" 
                            style={{ color: getPriorityColor(announcement.priority) }} 
                          />
                          <div className="flex-1">
                            <CardTitle className="text-base">{announcement.title}</CardTitle>
                            <CardDescription className="mt-1">{announcement.content}</CardDescription>
                          </div>
                        </div>
                        <Badge 
                          variant={announcement.priority === 'urgent' ? 'destructive' : 'outline'}
                          style={announcement.priority !== 'urgent' ? { 
                            borderColor: getPriorityColor(announcement.priority),
                            color: getPriorityColor(announcement.priority)
                          } : {}}
                        >
                          {announcement.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>By {announcement.author} ({announcement.authorRole})</span>
                          <span>•</span>
                          <span>{announcement.date}</span>
                          <span>•</span>
                          <span>Audience: {announcement.audience === 'all' ? 'All Members' : announcement.audience.join(', ')}</span>
                        </div>
                        {canManageContent && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedAnnouncement(announcement);
                                setViewAnnouncementOpen(true);
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedAnnouncement(announcement);
                                setEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedAnnouncement(announcement);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-4">
          {/* Submit Feedback - For Members */}
          {isMember && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>Share your suggestions or concerns with TEIN leadership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input 
                      placeholder="Brief description of your feedback" 
                      value={feedbackSubject}
                      onChange={(e) => setFeedbackSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea 
                      placeholder="Provide detailed feedback..." 
                      rows={4}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                    />
                  </div>
                  <Button style={{ backgroundColor: '#007A33' }} onClick={handleSubmitFeedback}>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feedback List */}
          <Card>
            <CardHeader>
              <CardTitle>{isMember ? 'My Feedback' : 'Member Feedback'}</CardTitle>
              <CardDescription>
                {isMember ? 'Track your submitted feedback' : 'Review and respond to member feedback'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {canManageContent && (
                <div className="flex gap-4 mb-6">
                  <Select value={feedbackStatusFilter} onValueChange={setFeedbackStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-4">
                {filteredFeedback.map((feedback) => (
                  <Card key={feedback.id} className="border-l-4" style={{ borderLeftColor: getFeedbackStatusColor(feedback.status) }}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <MessageSquare className="h-5 w-5 mt-1" style={{ color: getFeedbackStatusColor(feedback.status) }} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-base">{feedback.subject}</CardTitle>
                              <Badge 
                                variant="outline" 
                                style={{ 
                                  borderColor: getFeedbackStatusColor(feedback.status),
                                  color: getFeedbackStatusColor(feedback.status)
                                }}
                              >
                                {feedback.status}
                              </Badge>
                            </div>
                            <CardDescription className="mt-1">{feedback.message}</CardDescription>
                            {feedback.response && (
                              <div className="mt-3 p-3 rounded-lg bg-muted">
                                <p className="text-sm font-medium mb-1" style={{ color: '#007A33' }}>Response:</p>
                                <p className="text-sm text-muted-foreground">{feedback.response}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          {canManageContent && <span>From: {feedback.memberName}</span>}
                          {canManageContent && <span>•</span>}
                          <span>{feedback.date}</span>
                        </div>
                        {canManageContent && !feedback.response && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedFeedback(feedback);
                              setRespondDialogOpen(true);
                            }}
                          >
                            <Send className="mr-2 h-3 w-3" />
                            Respond
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredFeedback.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No feedback found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Communication Tools - Only for Admin/Secretary */}
      {canManageContent && (
        <Card>
          <CardHeader>
            <CardTitle>Communication Tools</CardTitle>
            <CardDescription>Quick access to messaging features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto py-4"
                onClick={() => setBulkEmailOpen(true)}
              >
                <div className="flex flex-col items-start gap-2">
                  <Mail className="h-5 w-5" />
                  <div>
                    <div className="text-sm">Bulk Email</div>
                    <div className="text-xs text-muted-foreground">Send emails to all members</div>
                  </div>
                </div>
              </Button>
              
              <Dialog open={bulkSMSOpen} onOpenChange={setBulkSMSOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <div className="flex flex-col items-start gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <div>
                        <div className="text-sm">Bulk SMS</div>
                        <div className="text-xs text-muted-foreground">Send text messages</div>
                      </div>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Bulk SMS</DialogTitle>
                    <DialogDescription>Send an SMS to all members</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Message * (Max 160 characters)</Label>
                      <Textarea 
                        placeholder="SMS message..." 
                        rows={4}
                        maxLength={160}
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">{smsMessage.length}/160 characters</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setBulkSMSOpen(false)}>Cancel</Button>
                      <Button style={{ backgroundColor: '#007A33' }} onClick={handleBulkSMS}>
                        <Send className="mr-2 h-4 w-4" />
                        Send SMS
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={pushNotificationOpen} onOpenChange={setPushNotificationOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <div className="flex flex-col items-start gap-2">
                      <Bell className="h-5 w-5" />
                      <div>
                        <div className="text-sm">Push Notifications</div>
                        <div className="text-xs text-muted-foreground">Send app notifications</div>
                      </div>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Push Notification</DialogTitle>
                    <DialogDescription>Send a push notification to all members</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input 
                        placeholder="Notification title" 
                        value={notificationTitle}
                        onChange={(e) => setNotificationTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Message *</Label>
                      <Textarea 
                        placeholder="Notification message..." 
                        rows={3}
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setPushNotificationOpen(false)}>Cancel</Button>
                      <Button style={{ backgroundColor: '#007A33' }} onClick={handlePushNotification}>
                        <Send className="mr-2 h-4 w-4" />
                        Send Notification
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Respond to Feedback Dialog */}
      <Dialog open={respondDialogOpen} onOpenChange={setRespondDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Feedback</DialogTitle>
            <DialogDescription>
              Responding to: {selectedFeedback?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Original Message</Label>
              <div className="p-3 rounded-lg bg-muted text-sm">
                {selectedFeedback?.message}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Your Response *</Label>
              <Textarea 
                placeholder="Write your response..." 
                rows={4}
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setRespondDialogOpen(false);
                setResponseMessage('');
              }}>Cancel</Button>
              <Button style={{ backgroundColor: '#007A33' }} onClick={handleRespondToFeedback}>
                <Send className="mr-2 h-4 w-4" />
                Send Response
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Announcement Dialog */}
      <Dialog open={viewAnnouncementOpen} onOpenChange={setViewAnnouncementOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
            <DialogDescription>
              Posted by {selectedAnnouncement?.author} on {selectedAnnouncement?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Badge 
                variant={selectedAnnouncement?.priority === 'urgent' ? 'destructive' : 'outline'}
                style={selectedAnnouncement?.priority !== 'urgent' ? { 
                  borderColor: getPriorityColor(selectedAnnouncement?.priority),
                  color: getPriorityColor(selectedAnnouncement?.priority)
                } : {}}
              >
                {selectedAnnouncement?.priority} Priority
              </Badge>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm">{selectedAnnouncement?.content}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Audience: {selectedAnnouncement?.audience === 'all' ? 'All Members' : selectedAnnouncement?.audience?.join(', ')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Announcement Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedAnnouncement?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAnnouncement}
              style={{ backgroundColor: '#E30613' }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Announcement Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>Update announcement details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                placeholder="Announcement title" 
                defaultValue={selectedAnnouncement?.title}
              />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea 
                placeholder="Write your announcement..." 
                rows={5}
                defaultValue={selectedAnnouncement?.content}
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select defaultValue={selectedAnnouncement?.priority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button 
                style={{ backgroundColor: '#007A33' }}
                onClick={() => {
                  toast.success('Announcement updated successfully!');
                  setEditDialogOpen(false);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

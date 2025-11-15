import { useState } from 'react';
import { User } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { User as UserIcon, Lock, Bell, Download, Printer, CreditCard } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';

interface ProfilePageProps {
  user: User;
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [idCardDialogOpen, setIdCardDialogOpen] = useState(false);

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      admin: 'Admin/Chairman',
      secretary: 'Secretary',
      treasurer: 'Treasurer',
      member: 'Member'
    };
    return roleLabels[role] || role;
  };

  const handlePrintIDCard = () => {
    const printContent = document.getElementById('id-card-printable');
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>GIMPA TEIN NDC ID Card - ${user.firstName} ${user.lastName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f0f0f0;
            }
            .id-card {
              width: 3.375in;
              height: 2.125in;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .id-header {
              background: linear-gradient(135deg, #E30613 0%, #007A33 100%);
              color: white;
              padding: 12px;
              text-align: center;
            }
            .id-header h2 {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 2px;
            }
            .id-header p {
              font-size: 10px;
            }
            .id-body {
              padding: 12px;
              display: flex;
              gap: 12px;
            }
            .id-photo {
              width: 70px;
              height: 70px;
              background: #007A33;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 28px;
              font-weight: bold;
              flex-shrink: 0;
            }
            .id-details {
              flex: 1;
              min-width: 0;
            }
            .id-name {
              font-size: 13px;
              font-weight: bold;
              margin-bottom: 4px;
              color: #1a1a1a;
            }
            .id-role {
              font-size: 10px;
              color: #007A33;
              font-weight: 600;
              margin-bottom: 6px;
            }
            .id-info {
              font-size: 8px;
              color: #666;
              line-height: 1.4;
            }
            .id-number {
              font-size: 9px;
              font-weight: 600;
              color: #E30613;
              margin-top: 6px;
            }
            @media print {
              body { background: white; }
              .id-card { box-shadow: none; }
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
    
    toast.success('ID Card ready for printing');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl" style={{ backgroundColor: '#007A33', color: 'white' }}>
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl mb-1">{user.firstName} {user.lastName}</h2>
              <p className="text-muted-foreground mb-3">{user.email}</p>
              <div className="flex gap-2">
                <Badge variant="outline" style={{ borderColor: '#007A33', color: '#007A33' }}>
                  {getRoleLabel(user.role)}
                </Badge>
                <Badge variant={user.status === 'active' ? 'default' : 'outline'} style={user.status === 'active' ? { backgroundColor: '#007A33' } : {}}>
                  {user.status}
                </Badge>
              </div>
            </div>
            <Dialog open={idCardDialogOpen} onOpenChange={setIdCardDialogOpen}>
              <DialogTrigger asChild>
                <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90">
                  <CreditCard className="mr-2 h-4 w-4" />
                  View ID Card
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Member ID Card</DialogTitle>
                  <DialogDescription>
                    View and print your official GIMPA TEIN NDC membership ID card
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* ID Card Preview */}
                  <div id="id-card-printable" className="mx-auto">
                    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-lg border-2" style={{ borderColor: '#E30613' }}>
                      {/* Card Header */}
                      <div 
                        className="p-4 text-white text-center"
                        style={{ background: 'linear-gradient(135deg, #E30613 0%, #007A33 100%)' }}
                      >
                        <h2 className="mb-1">GIMPA TEIN NDC</h2>
                        <p className="text-xs">Official Member ID Card</p>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex gap-4">
                        <Avatar className="h-20 w-20 flex-shrink-0">
                          <AvatarFallback 
                            className="text-2xl"
                            style={{ backgroundColor: '#007A33', color: 'white' }}
                          >
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <p className="text-base mb-1">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm mb-2" style={{ color: '#007A33' }}>
                            {getRoleLabel(user.role)}
                          </p>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>{user.program}</p>
                            <p>Level {user.level}</p>
                          </div>
                          <p className="text-sm mt-2" style={{ color: '#E30613' }}>
                            ID: {user.membershipId}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-4 pb-4">
                        <div className="pt-3 border-t text-xs text-center text-muted-foreground">
                          Member Since: {user.dateJoined}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={handlePrintIDCard}
                      className="flex-1"
                      style={{ backgroundColor: '#007A33' }}
                    >
                      <Printer className="mr-2 h-4 w-4" />
                      Print ID Card
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        toast.info('Download feature will generate a PDF file');
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue={user.firstName} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue={user.lastName} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={user.email} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue={user.phone} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Input defaultValue={user.program} />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Input defaultValue={user.level} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Membership ID</Label>
                <Input defaultValue={user.membershipId} disabled />
              </div>
              <Button style={{ backgroundColor: '#007A33' }}>
                <UserIcon className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Membership Details</CardTitle>
              <CardDescription>Your membership information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Member Since</span>
                <span>{user.dateJoined}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Membership Status</span>
                <Badge variant={user.status === 'active' ? 'default' : 'outline'} style={user.status === 'active' ? { backgroundColor: '#007A33' } : {}}>
                  {user.status}
                </Badge>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Dues Status</span>
                <Badge 
                  variant={user.duesStatus === 'paid' ? 'default' : user.duesStatus === 'overdue' ? 'destructive' : 'outline'}
                  style={user.duesStatus === 'paid' ? { backgroundColor: '#007A33' } : {}}
                >
                  {user.duesStatus}
                </Badge>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Role</span>
                <span>{getRoleLabel(user.role)}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button style={{ backgroundColor: '#007A33' }}>
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Enable 2FA</p>
                  <p className="text-xs text-muted-foreground">Require a verification code when signing in</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline">Configure 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage your email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Announcements</p>
                  <p className="text-xs text-muted-foreground">Receive important announcements via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Event Reminders</p>
                  <p className="text-xs text-muted-foreground">Get reminded about upcoming events</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Dues Reminders</p>
                  <p className="text-xs text-muted-foreground">Payment reminders for monthly dues</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Newsletter</p>
                  <p className="text-xs text-muted-foreground">Monthly newsletter with updates</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>Manage your SMS notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Urgent Announcements</p>
                  <p className="text-xs text-muted-foreground">Receive urgent updates via SMS</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Event Alerts</p>
                  <p className="text-xs text-muted-foreground">SMS alerts for registered events</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage in-app notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Enable Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive notifications in the app</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Button style={{ backgroundColor: '#007A33' }}>
            <Bell className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

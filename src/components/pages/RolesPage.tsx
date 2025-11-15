import { useState } from 'react';
import { mockMembers } from '../../lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, UserPlus, Users, Eye, Edit, Settings, Lock, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { useNotifications } from '../../lib/notificationContext';

interface RolePermissions {
  role: string;
  permissions: {
    viewMembers: boolean;
    editMembers: boolean;
    deleteMembers: boolean;
    viewFinances: boolean;
    manageFinances: boolean;
    viewEvents: boolean;
    manageEvents: boolean;
    viewCommunications: boolean;
    manageCommunications: boolean;
    viewDocuments: boolean;
    manageDocuments: boolean;
    viewReports: boolean;
    manageRoles: boolean;
  };
}

const defaultRolePermissions: RolePermissions[] = [
  {
    role: 'admin',
    permissions: {
      viewMembers: true,
      editMembers: true,
      deleteMembers: true,
      viewFinances: true,
      manageFinances: true,
      viewEvents: true,
      manageEvents: true,
      viewCommunications: true,
      manageCommunications: true,
      viewDocuments: true,
      manageDocuments: true,
      viewReports: true,
      manageRoles: true,
    }
  },
  {
    role: 'secretary',
    permissions: {
      viewMembers: true,
      editMembers: true,
      deleteMembers: false,
      viewFinances: true,
      manageFinances: false,
      viewEvents: true,
      manageEvents: true,
      viewCommunications: true,
      manageCommunications: true,
      viewDocuments: true,
      manageDocuments: true,
      viewReports: true,
      manageRoles: false,
    }
  },
  {
    role: 'treasurer',
    permissions: {
      viewMembers: true,
      editMembers: false,
      deleteMembers: false,
      viewFinances: true,
      manageFinances: true,
      viewEvents: true,
      manageEvents: false,
      viewCommunications: true,
      manageCommunications: false,
      viewDocuments: true,
      manageDocuments: false,
      viewReports: true,
      manageRoles: false,
    }
  },
  {
    role: 'member',
    permissions: {
      viewMembers: false,
      editMembers: false,
      deleteMembers: false,
      viewFinances: false,
      manageFinances: false,
      viewEvents: true,
      manageEvents: false,
      viewCommunications: true,
      manageCommunications: false,
      viewDocuments: false,
      manageDocuments: false,
      viewReports: false,
      manageRoles: false,
    }
  }
];

export function RolesPage() {
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [rolePermissions, setRolePermissions] = useState<RolePermissions[]>(defaultRolePermissions);
  const [selectedRole, setSelectedRole] = useState<string>('admin');
  const { addNotification } = useNotifications();

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Admin/Chairman',
      secretary: 'Secretary',
      treasurer: 'Treasurer',
      member: 'Member'
    };
    return labels[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: '#E30613',
      secretary: '#007A33',
      treasurer: '#3B82F6',
      member: '#6B7280'
    };
    return colors[role] || '#6B7280';
  };

  const getRoleStats = () => {
    return {
      admin: mockMembers.filter(m => m.role === 'admin').length,
      secretary: mockMembers.filter(m => m.role === 'secretary').length,
      treasurer: mockMembers.filter(m => m.role === 'treasurer').length,
      member: mockMembers.filter(m => m.role === 'member').length,
    };
  };

  const handleCreateUser = () => {
    toast.success('New user created successfully');
    addNotification({
      type: 'success',
      title: 'New User Created',
      message: 'A new user has been added to the system',
    });
    setCreateUserDialogOpen(false);
  };

  const handlePermissionChange = (role: string, permission: keyof RolePermissions['permissions']) => {
    setRolePermissions(prev => 
      prev.map(rp => {
        if (rp.role === role) {
          return {
            ...rp,
            permissions: {
              ...rp.permissions,
              [permission]: !rp.permissions[permission]
            }
          };
        }
        return rp;
      })
    );
    toast.success('Permission updated');
  };

  const stats = getRoleStats();
  const currentRolePermissions = rolePermissions.find(rp => rp.role === selectedRole);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access control</p>
        </div>
        <Dialog open={createUserDialogOpen} onOpenChange={setCreateUserDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90">
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user with assigned role and permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input placeholder="First name" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input placeholder="Last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" placeholder="email@gimpa.edu.gh" />
              </div>
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input placeholder="+233..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Input placeholder="e.g., MBA" />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Assign Role *</Label>
                <Select defaultValue="member">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="admin">Admin/Chairman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">
                  * Required fields. The user will receive an email with login credentials.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateUserDialogOpen(false)}>Cancel</Button>
                <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90" onClick={handleCreateUser}>
                  Create User
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(stats).map(([role, count]) => (
          <Card key={role}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{getRoleLabel(role)}</CardTitle>
                <Shield className="h-4 w-4" style={{ color: getRoleColor(role) }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl" style={{ color: getRoleColor(role) }}>{count}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {count === 1 ? 'user' : 'users'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">Users by Role</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {defaultRolePermissions.map((roleData) => (
              <Card key={roleData.role}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-10 w-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getRoleColor(roleData.role) + '20' }}
                      >
                        <Shield className="h-5 w-5" style={{ color: getRoleColor(roleData.role) }} />
                      </div>
                      <div>
                        <CardTitle>{getRoleLabel(roleData.role)}</CardTitle>
                        <CardDescription>{stats[roleData.role as keyof typeof stats]} users</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Key Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(roleData.permissions)
                        .filter(([_, value]) => value)
                        .slice(0, 4)
                        .map(([key]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Badge>
                        ))}
                      {Object.values(roleData.permissions).filter(v => v).length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{Object.values(roleData.permissions).filter(v => v).length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Role Permissions</CardTitle>
              <CardDescription>Configure access control for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultRolePermissions.map((rp) => (
                        <SelectItem key={rp.role} value={rp.role}>
                          {getRoleLabel(rp.role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {currentRolePermissions && (
                  <div className="space-y-4">
                    <h3 className="text-sm">Permission Settings for {getRoleLabel(selectedRole)}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm mb-3" style={{ color: '#007A33' }}>Member Management</p>
                        <div className="space-y-3 ml-4">
                          {['viewMembers', 'editMembers', 'deleteMembers'].map((perm) => (
                            <div key={perm} className="flex items-center justify-between">
                              <Label className="text-sm font-normal cursor-pointer" htmlFor={`${selectedRole}-${perm}`}>
                                {perm.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Switch
                                id={`${selectedRole}-${perm}`}
                                checked={currentRolePermissions.permissions[perm as keyof typeof currentRolePermissions.permissions]}
                                onCheckedChange={() => handlePermissionChange(selectedRole, perm as keyof typeof currentRolePermissions.permissions)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm mb-3" style={{ color: '#007A33' }}>Finance Management</p>
                        <div className="space-y-3 ml-4">
                          {['viewFinances', 'manageFinances'].map((perm) => (
                            <div key={perm} className="flex items-center justify-between">
                              <Label className="text-sm font-normal cursor-pointer" htmlFor={`${selectedRole}-${perm}`}>
                                {perm.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Switch
                                id={`${selectedRole}-${perm}`}
                                checked={currentRolePermissions.permissions[perm as keyof typeof currentRolePermissions.permissions]}
                                onCheckedChange={() => handlePermissionChange(selectedRole, perm as keyof typeof currentRolePermissions.permissions)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm mb-3" style={{ color: '#007A33' }}>Event Management</p>
                        <div className="space-y-3 ml-4">
                          {['viewEvents', 'manageEvents'].map((perm) => (
                            <div key={perm} className="flex items-center justify-between">
                              <Label className="text-sm font-normal cursor-pointer" htmlFor={`${selectedRole}-${perm}`}>
                                {perm.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Switch
                                id={`${selectedRole}-${perm}`}
                                checked={currentRolePermissions.permissions[perm as keyof typeof currentRolePermissions.permissions]}
                                onCheckedChange={() => handlePermissionChange(selectedRole, perm as keyof typeof currentRolePermissions.permissions)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm mb-3" style={{ color: '#007A33' }}>Communications</p>
                        <div className="space-y-3 ml-4">
                          {['viewCommunications', 'manageCommunications'].map((perm) => (
                            <div key={perm} className="flex items-center justify-between">
                              <Label className="text-sm font-normal cursor-pointer" htmlFor={`${selectedRole}-${perm}`}>
                                {perm.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Switch
                                id={`${selectedRole}-${perm}`}
                                checked={currentRolePermissions.permissions[perm as keyof typeof currentRolePermissions.permissions]}
                                onCheckedChange={() => handlePermissionChange(selectedRole, perm as keyof typeof currentRolePermissions.permissions)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm mb-3" style={{ color: '#007A33' }}>Documents & Reports</p>
                        <div className="space-y-3 ml-4">
                          {['viewDocuments', 'manageDocuments', 'viewReports'].map((perm) => (
                            <div key={perm} className="flex items-center justify-between">
                              <Label className="text-sm font-normal cursor-pointer" htmlFor={`${selectedRole}-${perm}`}>
                                {perm.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Switch
                                id={`${selectedRole}-${perm}`}
                                checked={currentRolePermissions.permissions[perm as keyof typeof currentRolePermissions.permissions]}
                                onCheckedChange={() => handlePermissionChange(selectedRole, perm as keyof typeof currentRolePermissions.permissions)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm mb-3" style={{ color: '#007A33' }}>System Administration</p>
                        <div className="space-y-3 ml-4">
                          {['manageRoles'].map((perm) => (
                            <div key={perm} className="flex items-center justify-between">
                              <Label className="text-sm font-normal cursor-pointer" htmlFor={`${selectedRole}-${perm}`}>
                                {perm.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Switch
                                id={`${selectedRole}-${perm}`}
                                checked={currentRolePermissions.permissions[perm as keyof typeof currentRolePermissions.permissions]}
                                onCheckedChange={() => handlePermissionChange(selectedRole, perm as keyof typeof currentRolePermissions.permissions)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users by Role Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Users by Role</CardTitle>
              <CardDescription>View all users grouped by their assigned roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['admin', 'secretary', 'treasurer', 'member'].map((role) => {
                  const usersInRole = mockMembers.filter(m => m.role === role);
                  return (
                    <div key={role}>
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-4 w-4" style={{ color: getRoleColor(role) }} />
                        <h3 className="text-sm">{getRoleLabel(role)}</h3>
                        <Badge variant="outline">{usersInRole.length}</Badge>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        {usersInRole.map((user) => (
                          <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                            <Avatar>
                              <AvatarFallback style={{ backgroundColor: getRoleColor(role), color: 'white' }}>
                                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{user.firstName} {user.lastName}</p>
                              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                            <Badge 
                              variant={user.status === 'active' ? 'default' : 'outline'}
                              style={user.status === 'active' ? { backgroundColor: '#007A33' } : {}}
                            >
                              {user.status}
                            </Badge>
                          </div>
                        ))}
                        {usersInRole.length === 0 && (
                          <p className="text-sm text-muted-foreground col-span-2 py-4">No users with this role</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

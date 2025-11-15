import { useState } from 'react';
import { mockMembers } from '../../lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, UserPlus, Mail, Phone, Download, CheckCircle, XCircle, Eye, Edit, Trash2, UserCog, AlertCircle, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { toast } from 'sonner';
import { Member } from '../../types';
import { useNotifications } from '../../lib/notificationContext';
import { ghanaConstituencies, gimpaSchools, levelOptions } from '../../lib/constituencies';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ChevronRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface NewMemberData {
  fullName: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  school: string;
  level: string;
  course: string;
  motherConstituency: string;
  role: string;
}

const initialNewMemberData: NewMemberData = {
  fullName: '',
  studentId: '',
  email: '',
  phoneNumber: '',
  school: '',
  level: '',
  course: '',
  motherConstituency: '',
  role: 'member',
};

export function MembersPage() {
  // Initialize members state with mock data
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [duesFilter, setDuesFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('basic');
  const [newMemberData, setNewMemberData] = useState<NewMemberData>(initialNewMemberData);
  const [newMemberErrors, setNewMemberErrors] = useState<{ [key: string]: string }>({});
  const [openConstituencySelect, setOpenConstituencySelect] = useState(false);
  const [constituencySearch, setConstituencySearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { addNotification } = useNotifications();

  const pendingMembers = members.filter(m => m.status === 'pending');

  const filteredMembers = members.filter(member => {
    // For "all" tab, exclude pending members
    if (activeTab === 'all' && member.status === 'pending') {
      return false;
    }
    
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesDues = duesFilter === 'all' || member.duesStatus === duesFilter;
    
    return matchesSearch && matchesStatus && matchesDues;
  });

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setViewDialogOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setEditDialogOpen(true);
  };

  const handleChangeRole = (member: Member) => {
    setSelectedMember(member);
    setRoleDialogOpen(true);
  };

  const handleApproveMember = (member: Member) => {
    // Update the member's status to 'active' and remove from pending
    setMembers(prevMembers => 
      prevMembers.map(m => 
        m.id === member.id 
          ? { ...m, status: 'active' as const }
          : m
      )
    );
    
    toast.success(`${member.firstName} ${member.lastName} has been approved and can now access the system`);
    
    addNotification({
      type: 'success',
      title: 'Member Approved',
      message: `${member.firstName} ${member.lastName} has been approved and notified via email`,
    });

    // In a real app, this would also send an email notification to the member
    console.log(`Email notification sent to ${member.email}: Account approved`);
  };

  const handleRejectMember = (member: Member) => {
    // Remove the member from the list entirely
    setMembers(prevMembers => prevMembers.filter(m => m.id !== member.id));
    
    toast.error(`${member.firstName} ${member.lastName}'s registration has been rejected`);
    
    addNotification({
      type: 'info',
      title: 'Member Rejected',
      message: `${member.firstName} ${member.lastName}'s registration has been rejected`,
    });

    // In a real app, this would send a polite rejection email
    console.log(`Email notification sent to ${member.email}: Registration not approved`);
  };

  const handleReject = (member: Member) => {
    toast.error(`${member.firstName} ${member.lastName}'s membership has been rejected`);
  };

  const handleRemove = (member: Member) => {
    toast.success(`${member.firstName} ${member.lastName} has been removed`);
    addNotification({
      type: 'warning',
      title: 'Member Removed',
      message: `${member.firstName} ${member.lastName} has been removed from the system`,
    });
  };

  const handleUpdateRole = () => {
    if (selectedMember) {
      toast.success(`${selectedMember.firstName} ${selectedMember.lastName}'s role has been updated`);
      addNotification({
        type: 'info',
        title: 'Role Updated',
        message: `${selectedMember.firstName} ${selectedMember.lastName}'s role has been changed`,
      });
      setRoleDialogOpen(false);
    }
  };

  const handleSaveEdit = () => {
    if (selectedMember) {
      toast.success(`${selectedMember.firstName} ${selectedMember.lastName}'s details have been updated`);
      setEditDialogOpen(false);
    }
  };

  const handleExport = () => {
    toast.success('Exporting members list...');
    // In a real app, this would trigger a CSV/Excel download
  };

  const handleNewMemberInputChange = (field: keyof NewMemberData, value: string) => {
    setNewMemberData(prev => ({ ...prev, [field]: value }));
    if (newMemberErrors[field]) {
      setNewMemberErrors(prev => {
        const errors = { ...prev };
        delete errors[field];
        return errors;
      });
    }
  };

  const validateBasicInfo = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!newMemberData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!newMemberData.studentId.trim()) {
      errors.studentId = 'Student ID is required';
    }
    if (!newMemberData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMemberData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!newMemberData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(newMemberData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    setNewMemberErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAcademicInfo = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!newMemberData.school) {
      errors.school = 'School is required';
    }
    if (!newMemberData.level) {
      errors.level = 'Level is required';
    }
    if (!newMemberData.course.trim()) {
      errors.course = 'Course is required';
    }

    setNewMemberErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateMembershipInfo = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!newMemberData.motherConstituency) {
      errors.motherConstituency = 'Mother constituency is required';
    }

    setNewMemberErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddMember = () => {
    // Validate all tabs
    const basicValid = validateBasicInfo();
    const academicValid = validateAcademicInfo();
    const membershipValid = validateMembershipInfo();

    if (!basicValid) {
      setCurrentTab('basic');
      return;
    }
    if (!academicValid) {
      setCurrentTab('academic');
      return;
    }
    if (!membershipValid) {
      setCurrentTab('membership');
      return;
    }

    // All validation passed
    toast.success(`${newMemberData.fullName} has been added successfully!`);
    addNotification({
      type: 'success',
      title: 'Member Added',
      message: `${newMemberData.fullName} has been added to the system`,
    });

    // Reset form
    setNewMemberData(initialNewMemberData);
    setNewMemberErrors({});
    setCurrentTab('basic');
    setAddMemberDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Member Management</h1>
          <p className="text-muted-foreground">Manage and view all TEIN NDC members</p>
        </div>
        <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>Register a new member to the TEIN NDC system</DialogDescription>
            </DialogHeader>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="membership">Membership</TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>
                    Full Name <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Input
                    placeholder="Enter full name"
                    value={newMemberData.fullName}
                    onChange={(e) => handleNewMemberInputChange('fullName', e.target.value)}
                    className={newMemberErrors.fullName ? 'border-red-500' : ''}
                  />
                  {newMemberErrors.fullName && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Student ID Number <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Input
                    placeholder="e.g., 2024/001234"
                    value={newMemberData.studentId}
                    onChange={(e) => handleNewMemberInputChange('studentId', e.target.value)}
                    className={newMemberErrors.studentId ? 'border-red-500' : ''}
                  />
                  {newMemberErrors.studentId && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.studentId}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Email Address <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="email@gimpa.edu.gh"
                    value={newMemberData.email}
                    onChange={(e) => handleNewMemberInputChange('email', e.target.value)}
                    className={newMemberErrors.email ? 'border-red-500' : ''}
                  />
                  {newMemberErrors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Phone Number <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={newMemberData.phoneNumber}
                    onChange={(e) => handleNewMemberInputChange('phoneNumber', e.target.value)}
                    className={newMemberErrors.phoneNumber ? 'border-red-500' : ''}
                  />
                  {newMemberErrors.phoneNumber && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => {
                      if (validateBasicInfo()) {
                        setCurrentTab('academic');
                      }
                    }}
                    style={{ backgroundColor: '#007A33' }}
                    className="hover:opacity-90"
                  >
                    Next: Academic Info
                  </Button>
                </div>
              </TabsContent>

              {/* Academic Information Tab */}
              <TabsContent value="academic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>
                    School <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Select
                    value={newMemberData.school}
                    onValueChange={(value) => handleNewMemberInputChange('school', value)}
                  >
                    <SelectTrigger className={newMemberErrors.school ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your school" />
                    </SelectTrigger>
                    <SelectContent>
                      {gimpaSchools.map((school) => (
                        <SelectItem key={school} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {newMemberErrors.school && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.school}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Level <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Select
                    value={newMemberData.level}
                    onValueChange={(value) => handleNewMemberInputChange('level', value)}
                  >
                    <SelectTrigger className={newMemberErrors.level ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {newMemberErrors.level && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.level}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Course <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Input
                    placeholder="e.g., Business Administration, Public Policy"
                    value={newMemberData.course}
                    onChange={(e) => handleNewMemberInputChange('course', e.target.value)}
                    className={newMemberErrors.course ? 'border-red-500' : ''}
                  />
                  {newMemberErrors.course && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.course}
                    </p>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTab('basic')}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      if (validateAcademicInfo()) {
                        setCurrentTab('membership');
                      }
                    }}
                    style={{ backgroundColor: '#007A33' }}
                    className="hover:opacity-90"
                  >
                    Next: Membership
                  </Button>
                </div>
              </TabsContent>

              {/* Membership Information Tab */}
              <TabsContent value="membership" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>
                    Mother Constituency <span style={{ color: '#E30613' }}>*</span>
                  </Label>
                  <Popover open={openConstituencySelect} onOpenChange={setOpenConstituencySelect}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openConstituencySelect}
                        className={`w-full justify-between ${newMemberErrors.motherConstituency ? 'border-red-500' : ''}`}
                      >
                        {newMemberData.motherConstituency || "Select constituency..."}
                        <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search constituency..."
                          value={constituencySearch}
                          onValueChange={setConstituencySearch}
                        />
                        <CommandList>
                          <CommandEmpty>No constituency found.</CommandEmpty>
                          <CommandGroup>
                            {ghanaConstituencies
                              .filter(constituency =>
                                constituency.toLowerCase().includes(constituencySearch.toLowerCase())
                              )
                              .map((constituency) => (
                                <CommandItem
                                  key={constituency}
                                  value={constituency}
                                  onSelect={(value) => {
                                    handleNewMemberInputChange('motherConstituency', value);
                                    setOpenConstituencySelect(false);
                                    setConstituencySearch('');
                                  }}
                                >
                                  {constituency}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {newMemberErrors.motherConstituency && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {newMemberErrors.motherConstituency}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Type to search from {ghanaConstituencies.length} constituencies
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={newMemberData.role}
                    onValueChange={(value) => handleNewMemberInputChange('role', value)}
                  >
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
                  <p className="text-xs text-muted-foreground">
                    Default role is Member. You can change this later.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTab('academic')}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleAddMember}
                    style={{ backgroundColor: '#007A33' }}
                    className="hover:opacity-90"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#007A33' }}>{members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#007A33' }}>
              {members.filter(m => m.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => pendingMembers.length > 0 && setActiveTab('pending')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              Pending Approval
              {pendingMembers.length > 0 && (
                <Badge 
                  variant="default" 
                  className="ml-auto"
                  style={{ backgroundColor: '#FFA500' }}
                >
                  {pendingMembers.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#FFA500' }}>
              {pendingMembers.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dues Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl" style={{ color: '#007A33' }}>
              {members.filter(m => m.duesStatus === 'paid').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="all">
            All Members
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending Approvals
            {pendingMembers.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2"
                style={{ backgroundColor: '#FFA500', color: 'white' }}
              >
                {pendingMembers.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* All Members Tab */}
        <TabsContent value="all" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Members List</CardTitle>
              <CardDescription>Search and filter members</CardDescription>
            </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={duesFilter} onValueChange={setDuesFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Dues Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dues</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Members Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dues</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback style={{ backgroundColor: '#007A33', color: 'white' }}>
                            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{member.firstName} {member.lastName}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.membershipId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{member.program}</p>
                        <p className="text-xs text-muted-foreground">Level {member.level}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={member.status === 'active' ? 'default' : 'outline'}
                        style={member.status === 'active' ? { backgroundColor: '#007A33' } : {}}
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={member.duesStatus === 'paid' ? 'default' : member.duesStatus === 'overdue' ? 'destructive' : 'outline'}
                        style={member.duesStatus === 'paid' ? { backgroundColor: '#007A33' } : {}}
                      >
                        {member.duesStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end items-center">
                        {member.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0 hover:bg-green-50" 
                              onClick={() => handleApproveMember(member)}
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" style={{ color: '#007A33' }} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0 hover:bg-red-50" 
                              onClick={() => handleRejectMember(member)}
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" style={{ color: '#E30613' }} />
                            </Button>
                          </>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              title="More actions"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewMember(member)} className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditMember(member)} className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleChangeRole(member)} className="cursor-pointer">
                              <UserCog className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem 
                                  onSelect={(e) => e.preventDefault()}
                                  className="cursor-pointer text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove Member
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove Member</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to remove {member.firstName} {member.lastName}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleRemove(member)}
                                    style={{ backgroundColor: '#E30613' }}
                                    className="hover:opacity-90"
                                  >
                                    Remove
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No members found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
        </TabsContent>

        {/* Pending Approvals Tab */}
        <TabsContent value="pending" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Review and approve new member registrations</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingMembers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full flex items-center justify-center bg-muted">
                      <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="mb-2">All Caught Up!</h3>
                  <p className="text-sm text-muted-foreground">
                    There are no pending member registrations at this time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingMembers.map((member) => (
                    <Card key={member.id} className="border-l-4" style={{ borderLeftColor: '#FFA500' }}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback style={{ backgroundColor: '#FFA500', color: 'white' }}>
                                {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="text-base mb-1">
                                  {member.firstName} {member.lastName}
                                </h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {member.email}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {member.phone}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Program:</span>
                                  <p className="mt-0.5">{member.program}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Level:</span>
                                  <p className="mt-0.5">{member.level}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Registered:</span>
                                  <p className="mt-0.5">{new Date(member.dateJoined).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm"
                                  style={{ backgroundColor: '#007A33' }}
                                  className="hover:opacity-90"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Approve Member Registration</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to approve {member.firstName} {member.lastName}'s registration? 
                                    They will receive an email notification and gain access to the system.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleApproveMember(member)}
                                    style={{ backgroundColor: '#007A33' }}
                                    className="hover:opacity-90"
                                  >
                                    Approve Member
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Reject Member Registration</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to reject {member.firstName} {member.lastName}'s registration? 
                                    They will be notified that their application was not approved.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleRejectMember(member)}
                                    style={{ backgroundColor: '#E30613' }}
                                    className="hover:opacity-90"
                                  >
                                    Reject Registration
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Member Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>View complete member information</DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="h-16 w-16">
                  <AvatarFallback style={{ backgroundColor: '#007A33', color: 'white' }} className="text-xl">
                    {selectedMember.firstName.charAt(0)}{selectedMember.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3>{selectedMember.firstName} {selectedMember.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMember.membershipId}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p>{selectedMember.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p>{selectedMember.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Program</Label>
                  <p>{selectedMember.program}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Level</Label>
                  <p>{selectedMember.level}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <p className="capitalize">{selectedMember.role}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge variant={selectedMember.status === 'active' ? 'default' : 'outline'}>
                    {selectedMember.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Dues Status</Label>
                  <Badge variant={selectedMember.duesStatus === 'paid' ? 'default' : 'outline'}>
                    {selectedMember.duesStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date Joined</Label>
                  <p>{new Date(selectedMember.dateJoined).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>Update member information</DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue={selectedMember.firstName} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue={selectedMember.lastName} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={selectedMember.email} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue={selectedMember.phone} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Input defaultValue={selectedMember.program} />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select defaultValue={selectedMember.level}>
                    <SelectTrigger>
                      <SelectValue />
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
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Member Role</DialogTitle>
            <DialogDescription>
              Update the role and permissions for {selectedMember?.firstName} {selectedMember?.lastName}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Role</Label>
                <p className="text-sm capitalize">{selectedMember.role}</p>
              </div>
              <div className="space-y-2">
                <Label>New Role</Label>
                <Select defaultValue={selectedMember.role}>
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
                  <strong>Note:</strong> Changing a member's role will immediately update their permissions and access level.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>Cancel</Button>
                <Button style={{ backgroundColor: '#007A33' }} className="hover:opacity-90" onClick={handleUpdateRole}>
                  Update Role
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
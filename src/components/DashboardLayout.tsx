import { ReactNode, useState, useEffect } from 'react';
import { User } from '../types';
import { logout } from '../lib/auth';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Calendar,
  Bell,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Shield,
  Search,
  Menu,
  X,
  Mail,
  SendHorizontal,
  UserCircle,
  CalendarDays,
  Receipt,
  Vote,
  GraduationCap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { NotificationDropdown } from './NotificationDropdown';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';
import { mockMembers, mockEvents, mockTransactions } from '../lib/mockData';

interface DashboardLayoutProps {
  user: User;
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  roles: string[];
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'secretary', 'treasurer', 'member', 'ec'] },
  { id: 'members', label: 'Members', icon: Users, roles: ['admin', 'secretary'] },
  { id: 'roles', label: 'Roles', icon: Shield, roles: ['admin'] },
  { id: 'finances', label: 'Finances', icon: DollarSign, roles: ['admin', 'treasurer'] },
  { id: 'dues', label: 'Dues Status', icon: DollarSign, roles: ['member'] },
  { id: 'elections', label: 'Elections', icon: Vote, roles: ['admin', 'secretary', 'member', 'ec'] },
  { id: 'alumni', label: 'Alumni', icon: GraduationCap, roles: ['admin', 'secretary', 'member'] },
  { id: 'events', label: 'Events', icon: Calendar, roles: ['admin', 'secretary', 'member'] },
  { id: 'communications', label: 'Communications', icon: Bell, roles: ['admin', 'secretary', 'member'] },
  { id: 'documents', label: 'Documents', icon: FileText, roles: ['admin', 'secretary'] },
  { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'secretary', 'treasurer'] },
  { id: 'profile', label: 'Profile', icon: Settings, roles: ['admin', 'secretary', 'treasurer', 'member', 'ec'] },
];

export function DashboardLayout({ user, children, currentPage, onNavigate, onLogout }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mailRecipient, setMailRecipient] = useState('');
  const [mailSubject, setMailSubject] = useState('');
  const [mailMessage, setMailMessage] = useState('');

  const filteredNavItems = navigationItems.filter(item => item.roles.includes(user.role));

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Cmd+M or Ctrl+M to open mail
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault();
        setMailOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: Record<string, string> = {
      admin: 'Admin/Chairman',
      secretary: 'Secretary',
      treasurer: 'Treasurer',
      member: 'Member',
      ec: 'Election Commission'
    };
    return roleLabels[role] || role;
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Search functionality
  const searchResults = {
    members: searchQuery ? mockMembers.filter(member => 
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5) : [],
    events: searchQuery ? mockEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5) : [],
    transactions: searchQuery ? mockTransactions.filter(transaction =>
      transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5) : []
  };

  const hasSearchResults = searchResults.members.length > 0 || 
                          searchResults.events.length > 0 || 
                          searchResults.transactions.length > 0;

  const handleSendEmail = () => {
    if (!mailRecipient || !mailSubject || !mailMessage) {
      toast.error('Please fill in all fields');
      return;
    }

    // In a real app, this would send an email via API
    toast.success(`Message sent to ${mailRecipient}`);
    setMailOpen(false);
    setMailRecipient('');
    setMailSubject('');
    setMailMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Backdrop */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 transition-all duration-300 ease-in-out
          ${isMobile 
            ? `inset-y-0 left-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-72`
            : `left-4 top-4 bottom-4 ${sidebarCollapsed ? 'w-20' : 'w-64'}`
          }
        `}
      >
        <div className={`h-full bg-sidebar shadow-xl flex flex-col overflow-hidden ${isMobile ? 'rounded-none' : 'rounded-3xl'}`}>
          {/* Logo and Toggle Section */}
          <div className="p-6 border-b border-sidebar-border">
            {/* When collapsed on desktop - Center the logo */}
            {sidebarCollapsed && !isMobile ? (
              <div className="flex items-center justify-center">
                <button 
                  onClick={toggleSidebar}
                  className="cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary flex-shrink-0">
                    <span className="text-white text-lg font-bold">T</span>
                  </div>
                </button>
              </div>
            ) : (
              /* When expanded or mobile - Show full logo and controls */
              <div className="flex items-center justify-between gap-3">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary flex-shrink-0">
                    <span className="text-white text-lg font-bold">T</span>
                  </div>
                  <span className="text-sidebar-foreground font-semibold text-base">TEIN NDC</span>
                </div>

                {/* Mobile Close Button */}
                {isMobile && (
                  <button
                    onClick={closeMobileMenu}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-accent/50 hover:bg-sidebar-accent transition-all duration-300 hover:scale-110"
                  >
                    <X className="h-4 w-4 text-sidebar-foreground/70" />
                  </button>
                )}

                {/* Desktop Chevron Toggle */}
                {!isMobile && (
                  <button
                    onClick={toggleSidebar}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-sidebar-accent/50 hover:bg-sidebar-accent transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="h-4 w-4 text-sidebar-foreground/70" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (isMobile) closeMobileMenu();
                  }}
                  className={`
                    w-full flex items-center rounded-2xl transition-all duration-300
                    ${isActive 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                    }
                    ${sidebarCollapsed && !isMobile ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-3'}
                  `}
                  title={sidebarCollapsed && !isMobile ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0 transition-all duration-300" />
                  <span 
                    className={`
                      text-sm transition-all duration-300 whitespace-nowrap
                      ${sidebarCollapsed && !isMobile ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border">
            {!sidebarCollapsed || isMobile ? (
              <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-sidebar-accent">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="text-sm text-sidebar-foreground truncate">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-sidebar-foreground/60 truncate">{getRoleLabel(user.role)}</div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-white text-sm">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        className={`
          transition-all duration-300 ease-in-out
          ${isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-28' : 'ml-72'}
        `}
      >
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3 md:gap-4">
              {/* Mobile Menu Toggle */}
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-muted md:hidden"
                  onClick={toggleMobileMenu}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h2 className="text-base md:text-xl text-foreground capitalize">
                {navigationItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl hover:bg-muted hidden sm:flex"
                onClick={() => setSearchOpen(true)}
                title="Search (Ctrl+K)"
              >
                <Search className="h-5 w-5" />
              </Button>
              <NotificationDropdown onNavigate={onNavigate} />
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl hover:bg-muted hidden sm:flex"
                onClick={() => setMailOpen(true)}
                title="Send Message (Ctrl+M)"
              >
                <Mail className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 md:gap-3 px-2 md:px-3 rounded-xl hover:bg-muted">
                    <Avatar className="h-8 w-8 md:h-9 md:w-9">
                      <AvatarFallback className="bg-primary text-white text-sm">
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm">{user.firstName} {user.lastName}</div>
                      <div className="text-xs text-muted-foreground">{getRoleLabel(user.role)}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                  <DropdownMenuLabel>
                    <div>{user.firstName} {user.lastName}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Search</span>
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </DialogTitle>
            <DialogDescription>
              Search for members, events, and transactions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Type to search..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            <ScrollArea className="h-[400px]">
              {!searchQuery ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
                  <p className="text-sm text-muted-foreground">Start typing to search</p>
                </div>
              ) : !hasSearchResults ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
                  <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Members Results */}
                  {searchResults.members.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <UserCircle className="h-4 w-4" style={{ color: '#007A33' }} />
                        <h3 className="text-sm">Members</h3>
                        <Badge variant="secondary">{searchResults.members.length}</Badge>
                      </div>
                      <div className="space-y-2">
                        {searchResults.members.map((member) => (
                          <div
                            key={member.id}
                            className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => {
                              onNavigate('members');
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback style={{ backgroundColor: '#007A33', color: 'white' }}>
                                  {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm">{member.firstName} {member.lastName}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {member.membershipId}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events Results */}
                  {searchResults.events.length > 0 && (
                    <div>
                      <Separator className="mb-4" />
                      <div className="flex items-center gap-2 mb-3">
                        <CalendarDays className="h-4 w-4" style={{ color: '#007A33' }} />
                        <h3 className="text-sm">Events</h3>
                        <Badge variant="secondary">{searchResults.events.length}</Badge>
                      </div>
                      <div className="space-y-2">
                        {searchResults.events.map((event) => (
                          <div
                            key={event.id}
                            className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => {
                              onNavigate('events');
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm mb-1">{event.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {event.description}
                                </p>
                              </div>
                              <Badge 
                                variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                                style={event.status === 'upcoming' ? { backgroundColor: '#007A33' } : {}}
                              >
                                {event.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              {event.date} at {event.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Transactions Results */}
                  {searchResults.transactions.length > 0 && (
                    <div>
                      <Separator className="mb-4" />
                      <div className="flex items-center gap-2 mb-3">
                        <Receipt className="h-4 w-4" style={{ color: '#007A33' }} />
                        <h3 className="text-sm">Transactions</h3>
                        <Badge variant="secondary">{searchResults.transactions.length}</Badge>
                      </div>
                      <div className="space-y-2">
                        {searchResults.transactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => {
                              onNavigate('finances');
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm mb-1">{transaction.memberName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {transaction.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm" style={{ color: '#007A33' }}>
                                  GH₵{transaction.amount.toFixed(2)}
                                </p>
                                <Badge 
                                  variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                                  className="mt-1"
                                  style={transaction.status === 'completed' ? { backgroundColor: '#007A33' } : {}}
                                >
                                  {transaction.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mail/Message Dialog */}
      <Dialog open={mailOpen} onOpenChange={setMailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a message or announcement to members
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Select value={mailRecipient} onValueChange={setMailRecipient}>
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient(s)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="active">Active Members Only</SelectItem>
                  <SelectItem value="executives">Executives Only</SelectItem>
                  <Separator className="my-2" />
                  {mockMembers.slice(0, 10).map((member) => (
                    <SelectItem key={member.id} value={member.email}>
                      {member.firstName} {member.lastName} ({member.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter message subject"
                value={mailSubject}
                onChange={(e) => setMailSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={8}
                value={mailMessage}
                onChange={(e) => setMailMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {mailMessage.length} characters
              </p>
            </div>

            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setMailOpen(false);
                  setMailRecipient('');
                  setMailSubject('');
                  setMailMessage('');
                }}
              >
                Cancel
              </Button>
              <Button 
                style={{ backgroundColor: '#007A33' }}
                className="hover:opacity-90"
                onClick={handleSendEmail}
              >
                <SendHorizontal className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
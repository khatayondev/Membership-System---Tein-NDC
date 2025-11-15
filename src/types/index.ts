// User Types
export type UserRole = 'admin' | 'secretary' | 'treasurer' | 'member' | 'ec';

export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: 'active' | 'pending' | 'inactive';
  membershipId: string;
  dateJoined: string;
  profileImage?: string;
  program?: string;
  level?: string;
  duesStatus: 'paid' | 'pending' | 'overdue';
}

// Member Types
export interface Member extends User {
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

// Finance Types
export interface Transaction {
  id: string;
  memberId: string;
  memberName: string;
  type: 'dues' | 'donation' | 'expense';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'approved' | 'rejected';
  receiptNumber?: string;
  approvedBy?: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'meeting' | 'program' | 'fundraiser' | 'social';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: string;
  attendees: string[];
  maxAttendees?: number;
}

// Communication Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: UserRole;
  date: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  audience: UserRole[] | 'all';
  status: 'draft' | 'published';
}

// Document Types
export interface Document {
  id: string;
  title: string;
  type: 'constitution' | 'minutes' | 'report' | 'policy' | 'other';
  uploadedBy: string;
  uploadDate: string;
  fileUrl: string;
  size: string;
}

// Analytics Types
export interface Analytics {
  totalMembers: number;
  activeMembers: number;
  pendingMembers: number;
  totalRevenue: number;
  totalExpenses: number;
  upcomingEvents: number;
  membershipGrowth: Array<{ month: string; count: number }>;
  financeData: Array<{ month: string; income: number; expenses: number }>;
}

// Feedback Types
export interface Feedback {
  id: string;
  memberId: string;
  memberName: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
  response?: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'event' | 'payment' | 'warning' | 'error' | 'system' | 'success' | 'info' | 'approval';
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
  actionData?: any; // Additional data for action notifications
}

// Election Types
export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'nomination' | 'voting' | 'completed' | 'cancelled';
  positions: ElectionPosition[];
  createdBy: string;
  createdDate: string;
  resultsPublished: boolean;
  voterList?: string[]; // Array of member IDs eligible to vote
}

export interface ElectionPosition {
  id: string;
  title: string;
  description: string;
  maxVotes: number; // Number of candidates a voter can select for this position
  candidates: Candidate[];
}

export interface Candidate {
  id: string;
  memberId: string;
  memberName: string;
  positionId: string;
  manifesto: string;
  manifestoFile?: string;
  nominationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  votes?: number; // Only visible after results are published
  profileImage?: string;
}

export interface Vote {
  id: string;
  electionId: string;
  voterId: string;
  positionId: string;
  candidateId: string;
  timestamp: string;
}

// Alumni Types
export interface Alumni {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  membershipId: string;
  program: string;
  graduationYear: string;
  dateJoined: string;
  dateGraduated: string;
  currentOccupation?: string;
  currentEmployer?: string;
  address?: string;
  linkedIn?: string;
  profileImage?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verificationDate?: string;
  migratedFrom?: string; // Member ID who was migrated
}

// Audit Log Types
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: 'election' | 'alumni' | 'member' | 'finance' | 'system';
  details: string;
  timestamp: string;
  ipAddress?: string;
}

import { User, Member, Transaction, Event, Announcement, Document, Analytics, Feedback, Notification, Election, Alumni, Candidate, ElectionPosition, AuditLog } from '../types';

// Mock Users/Members
export const mockMembers: Member[] = [
  {
    id: '1',
    email: 'kofi.mensah@gimpa.edu.gh',
    phone: '+233241234567',
    firstName: 'Kofi',
    lastName: 'Mensah',
    role: 'admin',
    status: 'active',
    membershipId: 'TEIN-001',
    dateJoined: '2024-01-15',
    program: 'MBA',
    level: '200',
    duesStatus: 'paid',
    address: 'Accra, Ghana',
    emergencyContact: 'Ama Mensah',
    emergencyPhone: '+233241234568'
  },
  {
    id: '2',
    email: 'akua.asante@gimpa.edu.gh',
    phone: '+233242345678',
    firstName: 'Akua',
    lastName: 'Asante',
    role: 'secretary',
    status: 'active',
    membershipId: 'TEIN-002',
    dateJoined: '2024-01-20',
    program: 'Public Administration',
    level: '300',
    duesStatus: 'paid'
  },
  {
    id: '3',
    email: 'kwame.boateng@gimpa.edu.gh',
    phone: '+233243456789',
    firstName: 'Kwame',
    lastName: 'Boateng',
    role: 'treasurer',
    status: 'active',
    membershipId: 'TEIN-003',
    dateJoined: '2024-02-01',
    program: 'Accounting',
    level: '400',
    duesStatus: 'paid'
  },
  {
    id: '4',
    email: 'ama.owusu@gimpa.edu.gh',
    phone: '+233244567890',
    firstName: 'Ama',
    lastName: 'Owusu',
    role: 'member',
    status: 'active',
    membershipId: 'TEIN-004',
    dateJoined: '2024-03-10',
    program: 'Economics',
    level: '200',
    duesStatus: 'paid'
  },
  {
    id: '5',
    email: 'yaw.amoako@gimpa.edu.gh',
    phone: '+233245678901',
    firstName: 'Yaw',
    lastName: 'Amoako',
    role: 'member',
    status: 'active',
    membershipId: 'TEIN-005',
    dateJoined: '2024-03-15',
    program: 'IT',
    level: '100',
    duesStatus: 'pending'
  },
  {
    id: '6',
    email: 'adjoa.mensah@gimpa.edu.gh',
    phone: '+233246789012',
    firstName: 'Adjoa',
    lastName: 'Mensah',
    role: 'member',
    status: 'pending',
    membershipId: 'TEIN-006',
    dateJoined: '2024-10-25',
    program: 'MBA',
    level: '100',
    duesStatus: 'pending'
  },
  {
    id: '7',
    email: 'kwabena.osei@gimpa.edu.gh',
    phone: '+233247890123',
    firstName: 'Kwabena',
    lastName: 'Osei',
    role: 'member',
    status: 'active',
    membershipId: 'TEIN-007',
    dateJoined: '2024-04-01',
    program: 'Public Administration',
    level: '300',
    duesStatus: 'overdue'
  },
  {
    id: '8',
    email: 'efua.appiah@gimpa.edu.gh',
    phone: '+233248901234',
    firstName: 'Efua',
    lastName: 'Appiah',
    role: 'member',
    status: 'active',
    membershipId: 'TEIN-008',
    dateJoined: '2024-05-12',
    program: 'Law',
    level: '200',
    duesStatus: 'paid'
  },
  {
    id: '9',
    email: 'nana.frimpong@gimpa.edu.gh',
    phone: '+233249012345',
    firstName: 'Nana',
    lastName: 'Frimpong',
    role: 'member',
    status: 'pending',
    membershipId: 'TEIN-009',
    dateJoined: '2024-10-28',
    program: 'Business Administration',
    level: '100',
    duesStatus: 'pending'
  },
  {
    id: '10',
    email: 'abena.darko@gimpa.edu.gh',
    phone: '+233240123456',
    firstName: 'Abena',
    lastName: 'Darko',
    role: 'member',
    status: 'pending',
    membershipId: 'TEIN-010',
    dateJoined: '2024-10-30',
    program: 'Economics',
    level: '200',
    duesStatus: 'pending'
  },
  {
    id: 'EC-001',
    email: 'ec.chair@gimpa.edu.gh',
    phone: '+233250111222',
    firstName: 'Emmanuel',
    lastName: 'Addo',
    role: 'ec',
    status: 'active',
    membershipId: 'EC-001',
    dateJoined: '2024-10-01',
    program: 'Election Commission',
    level: 'N/A',
    duesStatus: 'paid'
  },
  {
    id: 'EC-002',
    email: 'ec.deputy@gimpa.edu.gh',
    phone: '+233250222333',
    firstName: 'Diana',
    lastName: 'Osei',
    role: 'ec',
    status: 'active',
    membershipId: 'EC-002',
    dateJoined: '2024-10-01',
    program: 'Election Commission',
    level: 'N/A',
    duesStatus: 'paid'
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    memberId: '1',
    memberName: 'Kofi Mensah',
    type: 'dues',
    amount: 50,
    description: 'Monthly Dues - October 2024',
    date: '2024-10-05',
    status: 'completed',
    receiptNumber: 'RCP-001'
  },
  {
    id: 'TXN-002',
    memberId: '2',
    memberName: 'Akua Asante',
    type: 'dues',
    amount: 50,
    description: 'Monthly Dues - October 2024',
    date: '2024-10-06',
    status: 'completed',
    receiptNumber: 'RCP-002'
  },
  {
    id: 'TXN-003',
    memberId: '4',
    memberName: 'Ama Owusu',
    type: 'donation',
    amount: 100,
    description: 'Donation for Fundraising Event',
    date: '2024-10-10',
    status: 'completed',
    receiptNumber: 'RCP-003'
  },
  {
    id: 'TXN-004',
    memberId: '3',
    memberName: 'Kwame Boateng',
    type: 'expense',
    amount: 200,
    description: 'Event Venue Rental',
    date: '2024-10-12',
    status: 'approved',
    approvedBy: 'Kofi Mensah'
  },
  {
    id: 'TXN-005',
    memberId: '8',
    memberName: 'Efua Appiah',
    type: 'dues',
    amount: 50,
    description: 'Monthly Dues - October 2024',
    date: '2024-10-15',
    status: 'completed',
    receiptNumber: 'RCP-005'
  },
  {
    id: 'TXN-006',
    memberId: '5',
    memberName: 'Yaw Amoako',
    type: 'dues',
    amount: 50,
    description: 'Monthly Dues - October 2024',
    date: '2024-10-20',
    status: 'pending'
  }
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'EVT-001',
    title: 'General Assembly Meeting',
    description: 'Monthly general assembly to discuss upcoming activities and member concerns.',
    date: '2024-11-05',
    time: '16:00',
    location: 'GIMPA Main Auditorium',
    type: 'meeting',
    status: 'upcoming',
    organizer: 'Akua Asante',
    attendees: ['1', '2', '3', '4', '8'],
    maxAttendees: 100
  },
  {
    id: 'EVT-002',
    title: 'NDC Ideology Workshop',
    description: 'Educational workshop on NDC principles and political engagement.',
    date: '2024-11-12',
    time: '14:00',
    location: 'Conference Room A',
    type: 'program',
    status: 'upcoming',
    organizer: 'Kofi Mensah',
    attendees: ['1', '2', '3'],
    maxAttendees: 50
  },
  {
    id: 'EVT-003',
    title: 'Fundraising Dinner',
    description: 'Annual fundraising dinner to support TEIN activities.',
    date: '2024-11-20',
    time: '18:00',
    location: 'GIMPA Banquet Hall',
    type: 'fundraiser',
    status: 'upcoming',
    organizer: 'Kwame Boateng',
    attendees: ['1', '2', '3', '4', '5', '8'],
    maxAttendees: 150
  },
  {
    id: 'EVT-004',
    title: 'Welcome Party',
    description: 'Social event to welcome new members.',
    date: '2024-10-15',
    time: '17:00',
    location: 'Student Center',
    type: 'social',
    status: 'completed',
    organizer: 'Akua Asante',
    attendees: ['1', '2', '3', '4', '5', '6', '7', '8'],
    maxAttendees: 80
  },
  {
    id: 'EVT-005',
    title: 'Executive Committee Meeting',
    description: 'Monthly executive meeting to review organizational matters.',
    date: '2024-11-01',
    time: '15:00',
    location: 'TEIN Office',
    type: 'meeting',
    status: 'upcoming',
    organizer: 'Kofi Mensah',
    attendees: ['1', '2', '3'],
    maxAttendees: 10
  }
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN-001',
    title: 'Upcoming General Assembly',
    content: 'Dear Members, we are pleased to announce our monthly General Assembly meeting scheduled for November 5th, 2024. All members are encouraged to attend as we discuss important matters affecting our organization.',
    author: 'Akua Asante',
    authorRole: 'secretary',
    date: '2024-10-28',
    priority: 'high',
    audience: 'all',
    status: 'published'
  },
  {
    id: 'ANN-002',
    title: 'Dues Payment Reminder',
    content: 'This is a friendly reminder to all members to pay their monthly dues. Payment can be made through mobile money or bank transfer. Contact the Treasurer for details.',
    author: 'Kwame Boateng',
    authorRole: 'treasurer',
    date: '2024-10-25',
    priority: 'medium',
    audience: ['member'],
    status: 'published'
  },
  {
    id: 'ANN-003',
    title: 'New Members Welcome',
    content: 'We are excited to welcome new members to GIMPA TEIN NDC! Please complete your registration and attend our orientation session.',
    author: 'Kofi Mensah',
    authorRole: 'admin',
    date: '2024-10-20',
    priority: 'low',
    audience: 'all',
    status: 'published'
  },
  {
    id: 'ANN-004',
    title: 'Fundraising Event Alert',
    content: 'Save the date! Our annual fundraising dinner is scheduled for November 20th. Tickets are now available. Early bird discount ends November 10th.',
    author: 'Akua Asante',
    authorRole: 'secretary',
    date: '2024-10-27',
    priority: 'urgent',
    audience: 'all',
    status: 'published'
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    title: 'GIMPA TEIN NDC Constitution',
    type: 'constitution',
    uploadedBy: 'Kofi Mensah',
    uploadDate: '2024-01-15',
    fileUrl: '#',
    size: '2.4 MB'
  },
  {
    id: 'DOC-002',
    title: 'October 2024 Meeting Minutes',
    type: 'minutes',
    uploadedBy: 'Akua Asante',
    uploadDate: '2024-10-15',
    fileUrl: '#',
    size: '856 KB'
  },
  {
    id: 'DOC-003',
    title: 'Q3 2024 Financial Report',
    type: 'report',
    uploadedBy: 'Kwame Boateng',
    uploadDate: '2024-10-01',
    fileUrl: '#',
    size: '1.2 MB'
  },
  {
    id: 'DOC-004',
    title: 'Member Code of Conduct',
    type: 'policy',
    uploadedBy: 'Kofi Mensah',
    uploadDate: '2024-02-01',
    fileUrl: '#',
    size: '645 KB'
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalMembers: 10,
  activeMembers: 7,
  pendingMembers: 3,
  totalRevenue: 500,
  totalExpenses: 200,
  upcomingEvents: 4,
  membershipGrowth: [
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 3 },
    { month: 'Mar', count: 5 },
    { month: 'Apr', count: 6 },
    { month: 'May', count: 7 },
    { month: 'Jun', count: 7 },
    { month: 'Jul', count: 7 },
    { month: 'Aug', count: 7 },
    { month: 'Sep', count: 7 },
    { month: 'Oct', count: 10 }
  ],
  financeData: [
    { month: 'Jan', income: 150, expenses: 50 },
    { month: 'Feb', income: 150, expenses: 30 },
    { month: 'Mar', income: 250, expenses: 80 },
    { month: 'Apr', income: 200, expenses: 100 },
    { month: 'May', income: 250, expenses: 70 },
    { month: 'Jun', income: 200, expenses: 60 },
    { month: 'Jul', income: 200, expenses: 40 },
    { month: 'Aug', income: 200, expenses: 50 },
    { month: 'Sep', income: 250, expenses: 90 },
    { month: 'Oct', income: 300, expenses: 120 }
  ]
};

// Mock Feedback
export const mockFeedback: Feedback[] = [
  {
    id: 'FB-001',
    memberId: '4',
    memberName: 'Ama Owusu',
    subject: 'Suggestion for More Social Events',
    message: 'I think we should organize more social events to help members bond better.',
    date: '2024-10-22',
    status: 'new'
  },
  {
    id: 'FB-002',
    memberId: '5',
    memberName: 'Yaw Amoako',
    subject: 'Payment Methods',
    message: 'Can we add more mobile money payment options for dues?',
    date: '2024-10-20',
    status: 'reviewed',
    response: 'Thank you for the suggestion. We are working on integrating more payment options.'
  },
  {
    id: 'FB-003',
    memberId: '8',
    memberName: 'Efua Appiah',
    subject: 'Meeting Times',
    message: 'The current meeting times conflict with my classes. Can we consider weekend meetings?',
    date: '2024-10-18',
    status: 'resolved',
    response: 'We have scheduled alternating weekend meetings. Check the events calendar for updates.'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'NOTIF-001',
    type: 'approval',
    title: 'New Member Registration',
    message: 'Abena Darko has registered and is awaiting approval',
    date: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    read: false,
    link: '/members',
    actionData: { memberId: '10', action: 'pending_approval' }
  },
  {
    id: 'NOTIF-002',
    type: 'approval',
    title: 'New Member Registration',
    message: 'Nana Frimpong has registered and is awaiting approval',
    date: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    read: false,
    link: '/members',
    actionData: { memberId: '9', action: 'pending_approval' }
  },
  {
    id: 'NOTIF-003',
    type: 'event',
    title: 'New Event Added',
    message: 'General Assembly Meeting scheduled for November 5th, 2024',
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    read: false,
    link: '/events'
  },
  {
    id: 'NOTIF-004',
    type: 'payment',
    title: 'Payment Received',
    message: 'Efua Appiah paid monthly dues of GHS 50.00',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: false,
    link: '/finances'
  },
  {
    id: 'NOTIF-005',
    type: 'warning',
    title: 'Dues Reminder',
    message: '3 members have overdue payments. Please follow up.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: false,
    link: '/finances'
  },
  {
    id: 'NOTIF-006',
    type: 'info',
    title: 'Announcement Published',
    message: 'New announcement: Fundraising Event Alert',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    read: true,
    link: '/communications'
  },
  {
    id: 'NOTIF-007',
    type: 'system',
    title: 'System Update',
    message: 'Platform has been updated with new features',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    read: true
  }
];

// Mock Elections
export const mockElections: Election[] = [
  {
    id: 'ELEC-001',
    title: '2024 TEIN NDC Executive Elections',
    description: 'Annual elections for TEIN NDC executive positions including President, Vice President, Secretary, and Treasurer.',
    startDate: '2024-11-15',
    endDate: '2024-11-17',
    status: 'nomination',
    createdBy: 'Kofi Mensah',
    createdDate: '2024-10-20',
    resultsPublished: false,
    voterList: ['1', '2', '3', '4', '5', '7', '8'],
    positions: [
      {
        id: 'POS-001',
        title: 'President',
        description: 'Lead the organization and oversee all activities',
        maxVotes: 1,
        candidates: [
          {
            id: 'CAND-001',
            memberId: '4',
            memberName: 'Ama Owusu',
            positionId: 'POS-001',
            manifesto: 'I pledge to strengthen our membership base, enhance member engagement, and create more opportunities for political education. My vision includes establishing mentorship programs and increasing our visibility on campus.',
            nominationDate: '2024-10-25',
            status: 'approved'
          },
          {
            id: 'CAND-002',
            memberId: '5',
            memberName: 'Yaw Amoako',
            positionId: 'POS-001',
            manifesto: 'My focus will be on building strategic partnerships, improving our financial sustainability, and organizing impactful programs that align with NDC values. Together, we can make TEIN NDC stronger.',
            nominationDate: '2024-10-26',
            status: 'approved'
          }
        ]
      },
      {
        id: 'POS-002',
        title: 'Vice President',
        description: 'Support the President and coordinate programs',
        maxVotes: 1,
        candidates: [
          {
            id: 'CAND-003',
            memberId: '7',
            memberName: 'Kwabena Osei',
            positionId: 'POS-002',
            manifesto: 'I will work to create more inclusive programs and ensure every member feels valued. My priority is to bridge gaps between executives and members.',
            nominationDate: '2024-10-27',
            status: 'approved'
          }
        ]
      },
      {
        id: 'POS-003',
        title: 'Secretary',
        description: 'Manage records and communication',
        maxVotes: 1,
        candidates: [
          {
            id: 'CAND-004',
            memberId: '8',
            memberName: 'Efua Appiah',
            positionId: 'POS-003',
            manifesto: 'I promise efficient record-keeping, transparent communication, and timely dissemination of information to all members.',
            nominationDate: '2024-10-28',
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'ELEC-002',
    title: '2025 TEIN NDC Executive Elections',
    description: 'Planning for next year executive elections.',
    startDate: '2025-11-15',
    endDate: '2025-11-17',
    status: 'draft',
    createdBy: 'Kofi Mensah',
    createdDate: '2024-11-01',
    resultsPublished: false,
    positions: []
  }
];

// Mock Alumni
export const mockAlumni: Alumni[] = [
  {
    id: 'ALU-001',
    email: 'samuel.addo@gmail.com',
    phone: '+233201234567',
    firstName: 'Samuel',
    lastName: 'Addo',
    membershipId: 'TEIN-A001',
    program: 'MBA',
    graduationYear: '2022',
    dateJoined: '2020-09-01',
    dateGraduated: '2022-06-15',
    currentOccupation: 'Policy Analyst',
    currentEmployer: 'Ministry of Finance',
    address: 'Accra, Ghana',
    linkedIn: 'linkedin.com/in/samueladdo',
    verificationStatus: 'verified',
    verifiedBy: 'Kofi Mensah',
    verificationDate: '2022-07-01'
  },
  {
    id: 'ALU-002',
    email: 'grace.boakye@yahoo.com',
    phone: '+233202345678',
    firstName: 'Grace',
    lastName: 'Boakye',
    membershipId: 'TEIN-A002',
    program: 'Public Administration',
    graduationYear: '2021',
    dateJoined: '2019-09-01',
    dateGraduated: '2021-06-15',
    currentOccupation: 'Administrative Officer',
    currentEmployer: 'Ghana Education Service',
    address: 'Kumasi, Ghana',
    verificationStatus: 'verified',
    verifiedBy: 'Akua Asante',
    verificationDate: '2021-07-01'
  },
  {
    id: 'ALU-003',
    email: 'joseph.mensah@outlook.com',
    phone: '+233203456789',
    firstName: 'Joseph',
    lastName: 'Mensah',
    membershipId: 'TEIN-A003',
    program: 'Accounting',
    graduationYear: '2023',
    dateJoined: '2021-09-01',
    dateGraduated: '2023-06-15',
    currentOccupation: 'Accountant',
    currentEmployer: 'PwC Ghana',
    address: 'Accra, Ghana',
    linkedIn: 'linkedin.com/in/josephmensah',
    verificationStatus: 'verified',
    verifiedBy: 'Kofi Mensah',
    verificationDate: '2023-07-01'
  },
  {
    id: 'ALU-004',
    email: 'benedicta.appiah@gmail.com',
    phone: '+233204567890',
    firstName: 'Benedicta',
    lastName: 'Appiah',
    membershipId: 'TEIN-A004',
    program: 'Economics',
    graduationYear: '2022',
    dateJoined: '2020-09-01',
    dateGraduated: '2022-06-15',
    currentOccupation: 'Economist',
    currentEmployer: 'Bank of Ghana',
    address: 'Accra, Ghana',
    verificationStatus: 'verified',
    verifiedBy: 'Akua Asante',
    verificationDate: '2022-07-01'
  },
  {
    id: 'ALU-005',
    email: 'daniel.osei@hotmail.com',
    phone: '+233205678901',
    firstName: 'Daniel',
    lastName: 'Osei',
    membershipId: 'TEIN-A005',
    program: 'IT',
    graduationYear: '2021',
    dateJoined: '2018-09-01',
    dateGraduated: '2021-06-15',
    currentOccupation: 'Software Developer',
    currentEmployer: 'MTN Ghana',
    address: 'Takoradi, Ghana',
    linkedIn: 'linkedin.com/in/danielosei',
    verificationStatus: 'verified',
    verifiedBy: 'Kofi Mensah',
    verificationDate: '2021-07-01'
  },
  {
    id: 'ALU-006',
    email: 'rebecca.frimpong@gmail.com',
    phone: '+233206789012',
    firstName: 'Rebecca',
    lastName: 'Frimpong',
    membershipId: 'TEIN-A006',
    program: 'Business Administration',
    graduationYear: '2023',
    dateJoined: '2021-09-01',
    dateGraduated: '2023-06-15',
    currentOccupation: 'Business Consultant',
    currentEmployer: 'Deloitte Ghana',
    address: 'Accra, Ghana',
    verificationStatus: 'pending',
    migratedFrom: '3'
  },
  {
    id: 'ALU-007',
    email: 'patrick.ankrah@gmail.com',
    phone: '+233207890123',
    firstName: 'Patrick',
    lastName: 'Ankrah',
    membershipId: 'TEIN-A007',
    program: 'Law',
    graduationYear: '2024',
    dateJoined: '2022-09-01',
    dateGraduated: '2024-06-15',
    currentOccupation: 'Legal Officer',
    currentEmployer: 'Ministry of Justice',
    address: 'Accra, Ghana',
    verificationStatus: 'pending'
  }
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'AUDIT-001',
    userId: 'EC-001',
    userName: 'Emmanuel Addo',
    action: 'Created Election',
    module: 'election',
    details: 'Created "2024 TEIN NDC Executive Elections"',
    timestamp: '2024-10-20T09:30:00Z',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'AUDIT-002',
    userId: 'EC-001',
    userName: 'Emmanuel Addo',
    action: 'Approved Candidate',
    module: 'election',
    details: 'Approved Ama Owusu for President position',
    timestamp: '2024-10-25T14:15:00Z',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'AUDIT-003',
    userId: 'EC-001',
    userName: 'Emmanuel Addo',
    action: 'Published Voter List',
    module: 'election',
    details: 'Published voter list for "2024 TEIN NDC Executive Elections" (7 eligible voters)',
    timestamp: '2024-10-28T10:00:00Z',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'AUDIT-004',
    userId: '1',
    userName: 'Kofi Mensah',
    action: 'Created EC Account',
    module: 'election',
    details: 'Created Election Commission account for Emmanuel Addo',
    timestamp: '2024-10-01T08:00:00Z',
    ipAddress: '192.168.1.50'
  },
  {
    id: 'AUDIT-005',
    userId: '1',
    userName: 'Kofi Mensah',
    action: 'Verified Alumni',
    module: 'alumni',
    details: 'Verified alumni record for Samuel Addo (TEIN-A001)',
    timestamp: '2022-07-01T11:30:00Z',
    ipAddress: '192.168.1.50'
  },
  {
    id: 'AUDIT-006',
    userId: '2',
    userName: 'Akua Asante',
    action: 'Verified Alumni',
    module: 'alumni',
    details: 'Verified alumni record for Grace Boakye (TEIN-A002)',
    timestamp: '2021-07-01T09:45:00Z',
    ipAddress: '192.168.1.51'
  }
];

import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated } from './lib/auth';
import { User } from './types';
import { LoginPage } from './components/LoginPage';
import { PendingApprovalScreen } from './components/PendingApprovalScreen';
import { DashboardLayout } from './components/DashboardLayout';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { SecretaryDashboard } from './components/dashboards/SecretaryDashboard';
import { TreasurerDashboard } from './components/dashboards/TreasurerDashboard';
import { MemberDashboard } from './components/dashboards/MemberDashboard';
import { ECDashboard } from './components/dashboards/ECDashboard';
import { MembersPage } from './components/pages/MembersPage';
import { EventsPage } from './components/pages/EventsPage';
import { CommunicationsPage } from './components/pages/CommunicationsPage';
import { FinancesPage } from './components/pages/FinancesPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { RolesPage } from './components/pages/RolesPage';
import { DuesStatusPage } from './components/pages/DuesStatusPage';
import { ElectionsPage } from './components/pages/ElectionsPage';
import { AlumniPage } from './components/pages/AlumniPage';
import { TeinRegistrationForm } from './components/TeinRegistrationForm';
import { Toaster } from './components/ui/sonner';
import { NotificationProvider } from './lib/notificationContext';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('register'); // Start with registration as default
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      setCurrentUser(user);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handlePendingUser = (user: User) => {
    setPendingUser(user);
    setCurrentPage('pending');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPendingUser(null);
    setCurrentPage('register'); // Go back to registration on logout
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        if (!currentUser) return null;
        switch (currentUser.role) {
          case 'admin':
            return <AdminDashboard />;
          case 'secretary':
            return <SecretaryDashboard />;
          case 'treasurer':
            return <TreasurerDashboard />;
          case 'ec':
            return <ECDashboard />;
          case 'member':
            return <MemberDashboard user={currentUser} />;
          default:
            return <MemberDashboard user={currentUser} />;
        }
      case 'members':
        return <MembersPage />;
      case 'elections':
        return <ElectionsPage user={currentUser!} />;
      case 'alumni':
        return <AlumniPage user={currentUser!} />;
      case 'events':
        return <EventsPage user={currentUser!} />;
      case 'communications':
        return <CommunicationsPage user={currentUser!} />;
      case 'finances':
        return <FinancesPage />;
      case 'dues':
        return <DuesStatusPage user={currentUser!} />;
      case 'profile':
        return <ProfilePage user={currentUser!} />;
      case 'roles':
        return <RolesPage />;
      case 'documents':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Document Center</h1>
              <p className="text-muted-foreground">Upload and manage official documents</p>
            </div>
            <div className="rounded-lg border-2 border-dashed p-12 text-center">
              <p className="text-muted-foreground">Document management interface coming soon...</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">Generate detailed reports and analytics</p>
            </div>
            <div className="rounded-lg border-2 border-dashed p-12 text-center">
              <p className="text-muted-foreground">Advanced analytics interface coming soon...</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <NotificationProvider>
      {/* Show registration form as default landing page */}
      {!currentUser && currentPage === 'register' && (
        <>
          <TeinRegistrationForm onBackToLogin={() => setCurrentPage('login')} />
          <Toaster />
        </>
      )}

      {/* Show login page when navigated from registration */}
      {!currentUser && currentPage === 'login' && (
        <>
          <LoginPage 
            onLogin={handleLogin} 
            onRegister={() => setCurrentPage('register')}
            onPendingUser={handlePendingUser}
          />
          <Toaster />
        </>
      )}

      {/* Show pending approval screen */}
      {!currentUser && currentPage === 'pending' && pendingUser && (
        <>
          <PendingApprovalScreen 
            email={pendingUser.email}
            onBackToLogin={() => {
              setPendingUser(null);
              setCurrentPage('login');
            }}
          />
          <Toaster />
        </>
      )}

      {/* Show authenticated dashboard */}
      {currentUser && (
        <>
          <DashboardLayout
            user={currentUser}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          >
            {renderPage()}
          </DashboardLayout>
          <Toaster />
        </>
      )}
    </NotificationProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { DatabaseViewerModal } from './components/DatabaseViewerModal';
import { StudentWebPortal } from './components/StudentWebPortal';
import { ParentFamilyView } from './components/ParentFamilyView';
import { MotaAdminDashboard } from './components/MotaAdminDashboard';
import { InstitutionDashboard } from './components/InstitutionDashboard';
import { StateOfficerDashboard } from './components/StateOfficerDashboard';
import { AssistedModeView } from './components/AssistedModeView';
import { PublicLandingPage } from './components/PublicLandingPage';
import { NotificationDrawer } from './components/NotificationDrawer';
import { GrievanceModal } from './components/GrievanceModal';
import { ShieldCheck } from 'lucide-react';
import { dbService } from './services/dbService';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [networkMode, setNetworkMode] = useState('online');
  
  // Authentication & Isolated Portal Session State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [targetPortal, setTargetPortal] = useState(null); // null (public landing) | 'student' | 'institution' | 'state' | 'admin' | 'parent' | 'csc' | 'register'
  
  // Modals & drawers
  const [isDbViewerOpen, setIsDbViewerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isGrievanceOpen, setIsGrievanceOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  // Initialize active user from dbService (if existing)
  useEffect(() => {
    const saved = dbService.getCurrentUser();
    if (saved) {
      setCurrentUser(saved);
      setIsLoggedIn(true);
    }
  }, []);

  // Apply HTML attribute changes for contrast & font scale
  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
    document.documentElement.setAttribute('data-fontsize', fontSize);
  }, [highContrast, fontSize]);

  // Handle successful login: locks the user into that portal ONLY
  const handleLoginSuccess = ({ role, user }) => {
    const resolvedUser = {
      ...user,
      role: role || user.role || 'student'
    };
    setCurrentUser(resolvedUser);
    setIsLoggedIn(true);
    setTargetPortal(null);
    alert(`Authentication Successful!\n\nYou have logged into the ${resolvedUser.role.toUpperCase()} Portal as ${resolvedUser.fullName}.\nYour session has been recorded in the MoTA Central Database.`);
  };

  // Secure Logout: cleans session and returns to public portal gateway directory
  const handleLogout = () => {
    dbService.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setTargetPortal(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      
      {/* Top Government Platform Header */}
      <Header 
        activePortal={isLoggedIn ? currentUser?.role : (targetPortal || 'public')}
        language={language}
        onLanguageChange={setLanguage}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
        networkMode={networkMode}
        onNetworkModeChange={setNetworkMode}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenGrievance={() => setIsGrievanceOpen(true)}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenGateways={() => {
          setIsLoggedIn(false);
          setTargetPortal(null);
        }}
        onOpenDbViewer={() => setIsDbViewerOpen(true)}
      />

      {/* Main Content Area: STRICTLY SEPARATED BY AUTHENTICATION */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* CASE 1: USER IS NOT LOGGED IN */}
        {!isLoggedIn ? (
          targetPortal ? (
            /* Dedicated Login Page for the chosen portal */
            <LoginPage 
              targetPortal={targetPortal}
              onLoginSuccess={handleLoginSuccess}
              onBackToDirectory={() => setTargetPortal(null)}
              onOpenDbViewer={() => setIsDbViewerOpen(true)}
            />
          ) : (
            /* Public Portal Gateway Directory & Scheme Overview */
            <PublicLandingPage 
              onSelectPortal={(portalId) => setTargetPortal(portalId)}
              onOpenJago={() => setTargetPortal('student')}
            />
          )
        ) : (
          /* CASE 2: USER IS LOGGED IN - SHOW STRICTLY ONLY THEIR DESIGNATED PORTAL */
          currentUser?.role === 'student' ? (
            <StudentWebPortal 
              language={language}
              networkMode={networkMode}
              onOpenGrievance={() => setIsGrievanceOpen(true)}
            />
          ) : currentUser?.role === 'institution' ? (
            <div style={{ padding: '24px 0' }}>
              <InstitutionDashboard />
            </div>
          ) : currentUser?.role === 'state' ? (
            <div style={{ padding: '24px 0' }}>
              <StateOfficerDashboard />
            </div>
          ) : currentUser?.role === 'admin' ? (
            <div style={{ padding: '24px 0' }}>
              <MotaAdminDashboard />
            </div>
          ) : currentUser?.role === 'parent' ? (
            <div style={{ padding: '24px 0' }}>
              <ParentFamilyView 
                onSwitchToStudent={() => {
                  alert("Student view from Parent Portal is read-only consent mode.");
                }}
              />
            </div>
          ) : (
            /* CSC Assisted Kiosk Mode */
            <AssistedModeView 
              onExitAssistedMode={handleLogout}
            />
          )
        )}
      </main>

      {/* Database Viewer Modal (Available for inspection of stored logins) */}
      <DatabaseViewerModal 
        isOpen={isDbViewerOpen}
        onClose={() => setIsDbViewerOpen(false)}
      />

      {/* Notification Drawer */}
      <NotificationDrawer 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onClearAll={() => setUnreadCount(0)}
      />

      {/* Grievance Modal */}
      <GrievanceModal 
        isOpen={isGrievanceOpen}
        onClose={() => setIsGrievanceOpen(false)}
      />

      {/* Government Digital Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        backgroundColor: '#ffffff', 
        padding: '16px 24px',
        fontSize: '12px',
        color: 'var(--text-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
          <span>Government of India • Ministry of Tribal Affairs (MoTA) • Role-Isolated Digital Scholarship Ecosystem</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span>Database: `data/db.json`</span>
          <span>•</span>
          <span>Role-Based Access Control (RBAC)</span>
          <span>•</span>
          <span>DigiLocker & APAAR Synchronized</span>
          <span>•</span>
          <span>DPDP Act 2023 Compliant</span>
        </div>
      </footer>

    </div>
  );
}

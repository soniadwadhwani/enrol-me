import { lazy, Suspense, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import OnboardingFlow from './components/onboarding/OnboardingFlow';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const ExploreScreen = lazy(() => import('./components/ExploreScreen'));
const SchedulePage = lazy(() => import('./components/SchedulePage'));
const CommunicationsPage = lazy(() => import('./components/CommunicationsPage'));
const FeesPage = lazy(() => import('./components/FeesPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const FiltersModal = lazy(() => import('./components/FiltersModal'));
const ClassDetailPage = lazy(() => import('./components/ClassDetailPage'));
const LocationSettings = lazy(() => import('./components/LocationSettings'));
const AlertsPage = lazy(() => import('./components/AlertsPage'));
const FloatingAlertsButton = lazy(() => import('./components/FloatingAlertsButton'));
const PremiumBottomNav = lazy(() => import('./components/PremiumBottomNav'));
const EditProfilePage = lazy(() => import('./components/EditProfilePage'));
const SavedClassesPage = lazy(() => import('./components/SavedClassesPage'));
const ChildrenProfilesPage = lazy(() => import('./components/ChildrenProfilesPage'));
const SettingsPage = lazy(() => import('./components/SettingsPage'));
const HelpCenterPage = lazy(() => import('./components/HelpCenterPage'));
const ChildDetailPage = lazy(() => import('./components/ChildDetailPage'));
const AddChildPage = lazy(() => import('./components/AddChildPage'));
const LearnerDashboard = lazy(() => import('./components/LearnerDashboard'));
const OrganisationDashboard = lazy(() => import('./components/OrganisationDashboard'));

type Screen = 'home' | 'explore' | 'schedule' | 'communications' | 'fees' | 'profile' | 'classDetail' | 'locationSettings' | 'alerts' | 'editProfile' | 'savedClasses' | 'childrenProfiles' | 'settings' | 'helpCenter' | 'childDetail' | 'addChild';

const IPHONE_16_WIDTH = 393;
const IPHONE_16_HEIGHT = 852;
const FRAME_PADDING = 11;
const FRAME_WIDTH = IPHONE_16_WIDTH + FRAME_PADDING * 2;
const FRAME_HEIGHT = IPHONE_16_HEIGHT + FRAME_PADDING * 2;

export default function App() {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : FRAME_WIDTH,
    height: typeof window !== 'undefined' ? window.innerHeight : FRAME_HEIGHT,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const phoneScale = useMemo(() => {
    const horizontalScale = (viewportSize.width - 32) / FRAME_WIDTH;
    const verticalScale = (viewportSize.height - 48) / FRAME_HEIGHT;
    return Math.min(1, horizontalScale, verticalScale);
  }, [viewportSize.height, viewportSize.width]);

  const appShellStyle: CSSProperties = {
    background: 'radial-gradient(circle at 20% 0%, #e9f5f1 0%, #f4faf8 45%, #e6f0ee 100%)',
    fontFamily: 'Raleway, sans-serif',
    minHeight: '100dvh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    boxSizing: 'border-box',
  };

  const deviceFrameStyle: CSSProperties = {
    width: `${FRAME_WIDTH}px`,
    height: `${FRAME_HEIGHT}px`,
    background: 'linear-gradient(150deg, #1e2528 0%, #11171a 35%, #2f3a3f 100%)',
    borderRadius: '56px',
    padding: `${FRAME_PADDING}px`,
    boxShadow: '0 28px 70px rgba(17, 19, 24, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
    position: 'relative',
    boxSizing: 'border-box',
    transform: `scale(${phoneScale})`,
    transformOrigin: 'center',
  };

  const screenStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: '#F4FAF8',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: '46px',
  };

  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userRole, setUserRole] = useState<'parent' | 'learner' | 'organisation' | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState('home');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [currentCity, setCurrentCity] = useState('Lavale');
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const suspenseFallback = (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6E7480' }}>
      Loading...
    </div>
  );

  const renderInPhoneFrame = (content: ReactNode) => (
    <div style={appShellStyle}>
      <div style={deviceFrameStyle}>
        <div style={screenStyle}>{content}</div>
      </div>
    </div>
  );

  const handleNavigateToExplore = () => {
    setActiveScreen('explore');
    setActiveTab('schedule');
  };

  const handleNavigateToSchedule = () => {
    setActiveScreen('schedule');
    setActiveTab('schedule');
  };

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const handleOpenClassDetail = (classData: any) => {
    setSelectedClass(classData);
    setActiveScreen('classDetail');
  };

  const handleBackFromClassDetail = () => {
    setActiveScreen('home');
    setActiveTab('home');
    setSelectedClass(null);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveScreen(tabId as Screen);
  };

  const handleOpenLocationSettings = () => {
    setActiveScreen('locationSettings');
  };

  const handleConfirmLocation = (city: string) => {
    setCurrentCity(city);
    setActiveScreen('home');
    setActiveTab('home');
  };

  const handleBackFromLocationSettings = () => {
    setActiveScreen('home');
    setActiveTab('home');
  };

  const handleOpenAlerts = () => {
    setActiveScreen('alerts');
  };

  const handleBackFromAlerts = () => {
    // Return to previous screen or home by default
    setActiveScreen('home');
    setActiveTab('home');
  };

  const handleAlertClick = (type: string, data?: any) => {
    if (type === 'schedule') {
      setActiveScreen('schedule');
      setActiveTab('schedule');
    } else if (type === 'fees') {
      setActiveScreen('fees');
      setActiveTab('fees');
    } else if (type === 'chat') {
      setSelectedChatId(data?.chatId || null);
      setActiveScreen('communications');
      setActiveTab('communications');
    } else if (type === 'communications') {
      setSelectedChatId(null);
      setActiveScreen('communications');
      setActiveTab('communications');
    } else if (type === 'classDetail' && data) {
      setSelectedClass(data);
      setActiveScreen('classDetail');
    }
  };

  const handleProfileNavigate = (screen: string) => {
    setActiveScreen(screen as Screen);
  };

  const handleBackToProfile = () => {
    setActiveScreen('profile');
    setActiveTab('profile');
  };

  const handleOpenChildDetail = (childId: number) => {
    setSelectedChildId(childId);
    setActiveScreen('childDetail');
  };

  const handleBackToChildrenProfiles = () => {
    setActiveScreen('childrenProfiles');
  };

  const handleOpenAddChild = () => {
    setActiveScreen('addChild');
  };

  const handleOnboardingComplete = (userData: any) => {
    if (userData.userType) {
      setUserRole(userData.userType);
    }
    if (userData.location) {
      setCurrentCity(userData.location);
    }
    setOnboardingComplete(true);
  };

  // Show onboarding if not completed
  if (!onboardingComplete) {
    return renderInPhoneFrame(<OnboardingFlow onComplete={handleOnboardingComplete} />);
  }

  // Show Learner Dashboard
  if (userRole === 'learner') {
    return renderInPhoneFrame(
      <Suspense fallback={suspenseFallback}>
        <LearnerDashboard />
      </Suspense>,
    );
  }

  // Show Organisation Dashboard
  if (userRole === 'organisation') {
    return renderInPhoneFrame(
      <Suspense fallback={suspenseFallback}>
        <OrganisationDashboard />
      </Suspense>,
    );
  }

  return renderInPhoneFrame(
    <Suspense fallback={suspenseFallback}>

      {/* Screen Content */}
      {activeScreen === 'home' && (
        <HomeScreen
          onNavigateToExplore={handleNavigateToExplore}
          onOpenFilters={handleOpenFilters}
          onOpenClassDetail={handleOpenClassDetail}
          onNavigateToSchedule={handleNavigateToSchedule}
          onOpenLocationSettings={handleOpenLocationSettings}
          currentCity={currentCity}
        />
      )}
      {activeScreen === 'explore' && (
        <ExploreScreen
          onBack={() => {
            setActiveScreen('home');
            setActiveTab('home');
          }}
        />
      )}
      {activeScreen === 'schedule' && <SchedulePage />}
      {activeScreen === 'communications' && <CommunicationsPage initialChatId={selectedChatId} />}
      {activeScreen === 'fees' && <FeesPage />}
      {activeScreen === 'profile' && <ProfilePage onNavigate={handleProfileNavigate} />}
      {activeScreen === 'editProfile' && <EditProfilePage onBack={handleBackToProfile} />}
      {activeScreen === 'savedClasses' && <SavedClassesPage onBack={handleBackToProfile} />}
      {activeScreen === 'childrenProfiles' && (
        <ChildrenProfilesPage
          onBack={handleBackToProfile}
          onOpenAlerts={handleOpenAlerts}
          onOpenChildDetail={handleOpenChildDetail}
          onOpenAddChild={handleOpenAddChild}
        />
      )}
      {activeScreen === 'childDetail' && selectedChildId && (
        <ChildDetailPage
          childId={selectedChildId}
          onBack={handleBackToChildrenProfiles}
        />
      )}
      {activeScreen === 'addChild' && (
        <AddChildPage onBack={handleBackToChildrenProfiles} />
      )}
      {activeScreen === 'settings' && <SettingsPage onBack={handleBackToProfile} />}
      {activeScreen === 'helpCenter' && <HelpCenterPage onBack={handleBackToProfile} />}
      {activeScreen === 'classDetail' && selectedClass && (
        <ClassDetailPage
          classData={selectedClass}
          onBack={handleBackFromClassDetail}
        />
      )}
      {activeScreen === 'locationSettings' && (
        <LocationSettings
          onBack={handleBackFromLocationSettings}
          onConfirm={handleConfirmLocation}
          currentCity={currentCity}
        />
      )}
      {activeScreen === 'alerts' && (
        <AlertsPage
          onBack={handleBackFromAlerts}
          onAlertClick={handleAlertClick}
        />
      )}

      {/* Floating Alerts Button */}
      <FloatingAlertsButton hasUnread={true} onClick={handleOpenAlerts} />

      {/* Filters Modal */}
      <FiltersModal isOpen={showFilters} onClose={handleCloseFilters} />

      {/* Premium Bottom Navigation - Hide on Class Detail */}
      {activeScreen !== 'classDetail' && (
        <PremiumBottomNav activeTab={activeScreen === 'locationSettings' || activeScreen === 'alerts' ? 'home' : activeTab} onTabChange={handleTabChange} />
      )}

    </Suspense>
  );
}
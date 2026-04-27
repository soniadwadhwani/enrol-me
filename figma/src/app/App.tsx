import { lazy, Suspense, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import DesktopWebsite from './components/DesktopWebsite';
import Logo from '../imports/Logo.png';

const HomeScreen = lazy(() => import('./components/HomeScreen'));
const ExploreScreen = lazy(() => import('./components/ExploreScreen'));
const CategoryDetailPage = lazy(() => import('./components/CategoryDetailPage'));
const SchedulePage = lazy(() => import('./components/SchedulePage'));
const CommunicationsPage = lazy(() => import('./components/CommunicationsPage'));
const FeesPage = lazy(() => import('./components/FeesPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const MyApplicationsPage = lazy(() => import('./components/MyApplicationsPage'));
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
const OrganisationDashboard = lazy(() => import('./components/OrganisationDashboard'));

type Screen = 'home' | 'explore' | 'categoryDetail' | 'schedule' | 'communications' | 'fees' | 'profile' | 'classDetail' | 'locationSettings' | 'alerts' | 'editProfile' | 'savedClasses' | 'myApplications' | 'childrenProfiles' | 'settings' | 'helpCenter' | 'childDetail' | 'addChild';
type ViewMode = 'select' | 'app' | 'desktop';

interface ApplicationRecord {
  id: string;
  classTitle: string;
  location: string;
  studentName: string;
  parentName: string;
  preferredBatch: string;
  preferredTiming: string;
  phoneNumber: string;
  notes: string;
  status: 'Submitted' | 'In Review' | 'Confirmed';
  submittedAtLabel: string;
}

const IPHONE_16_WIDTH = 393;
const IPHONE_16_HEIGHT = 852;
const FRAME_PADDING = 11;
const FRAME_WIDTH = IPHONE_16_WIDTH + FRAME_PADDING * 2;
const FRAME_HEIGHT = IPHONE_16_HEIGHT + FRAME_PADDING * 2;

const normalizePath = (pathname: string) => {
  const withoutTrailingSlash = pathname.replace(/\/+$/, '');
  return withoutTrailingSlash || '/';
};

const getModeFromPathname = (pathname: string): ViewMode => {
  const normalizedPath = normalizePath(pathname);
  if (normalizedPath === '/app') {
    return 'app';
  }
  if (normalizedPath === '/desktop') {
    return 'desktop';
  }
  return 'select';
};

const getPathnameForMode = (mode: ViewMode) => {
  if (mode === 'app') {
    return '/app';
  }
  if (mode === 'desktop') {
    return '/desktop';
  }
  return '/';
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === 'undefined') {
      return 'select';
    }
    return getModeFromPathname(window.location.pathname);
  });
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : FRAME_WIDTH,
    height: typeof window !== 'undefined' ? window.innerHeight : FRAME_HEIGHT,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handlePopState = () => {
      setViewMode(getModeFromPathname(window.location.pathname));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('popstate', handlePopState);

    // Backward compatibility for old links like ?mode=desktop and ?mode=app.
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    if (urlMode === 'desktop' || urlMode === 'app') {
      const nextMode: ViewMode = urlMode === 'desktop' ? 'desktop' : 'app';
      const nextPathname = getPathnameForMode(nextMode);
      if (normalizePath(window.location.pathname) !== nextPathname || window.location.search) {
        window.history.replaceState(null, '', nextPathname);
      }
      setViewMode(nextMode);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToMode = (mode: ViewMode, replaceHistory = false) => {
    setViewMode(mode);

    if (typeof window === 'undefined') {
      return;
    }

    const targetPathname = getPathnameForMode(mode);
    const currentPathname = normalizePath(window.location.pathname);
    if (currentPathname === targetPathname && !window.location.search) {
      return;
    }

    if (replaceHistory) {
      window.history.replaceState(null, '', targetPathname);
      return;
    }

    window.history.pushState(null, '', targetPathname);
  };

  const phoneScale = useMemo(() => {
    const horizontalScale = (viewportSize.width - 32) / FRAME_WIDTH;
    const verticalScale = (viewportSize.height - 48) / FRAME_HEIGHT;
    return Math.min(1, horizontalScale, verticalScale);
  }, [viewportSize.height, viewportSize.width]);

  const desktopScale = useMemo(() => {
    const hasMascotRail = viewportSize.width >= 1180;
    const reservedWidth = hasMascotRail ? 430 : 64;
    const horizontalScale = (viewportSize.width - reservedWidth) / IPHONE_16_WIDTH;
    const verticalScale = (viewportSize.height - 48) / IPHONE_16_HEIGHT;
    return Math.min(1, horizontalScale, verticalScale);
  }, [viewportSize.height, viewportSize.width]);

  const appShellStyle: CSSProperties = {
    background: 'radial-gradient(circle at 20% 0%, #e9f5f1 0%, #f4faf8 45%, #e6f0ee 100%)',
    fontFamily: 'Raleway, sans-serif',
    height: '100dvh',
    overflow: 'hidden',
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
    marginTop: `${(FRAME_HEIGHT * (phoneScale - 1)) / 2}px`,
    marginBottom: `${(FRAME_HEIGHT * (phoneScale - 1)) / 2}px`,
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
  const [classDetailReturnScreen, setClassDetailReturnScreen] = useState<Screen>('home');
  const [classDetailReturnTab, setClassDetailReturnTab] = useState('home');
  const [currentCity, setCurrentCity] = useState('Lavale');
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contactsPermission, setContactsPermission] = useState(false);
  const [myApplications, setMyApplications] = useState<ApplicationRecord[]>([
    {
      id: 'demo-application-1',
      classTitle: 'Robotics Lab Studio',
      location: 'Hinjewadi',
      studentName: 'Aarav Sharma',
      parentName: 'Priya Sharma',
      preferredBatch: 'Weekend Batch',
      preferredTiming: '10:00 AM',
      phoneNumber: '9876543210',
      notes: 'Interested in beginner robotics and coding projects.',
      status: 'In Review',
      submittedAtLabel: '2 days ago',
    },
  ]);
  const isLearnerMode = userRole === 'learner';

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

  const renderInDesktopCanvas = (content: ReactNode) => (
    <div
      style={{
        ...appShellStyle,
        overflow: 'auto',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '28px',
        }}
      >
        <div
          style={{
            width: `${IPHONE_16_WIDTH}px`,
            height: `${IPHONE_16_HEIGHT}px`,
            backgroundColor: '#F4FAF8',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: '44px',
            boxShadow: '0 26px 58px rgba(17, 19, 24, 0.2)',
            transform: `scale(${desktopScale})`,
            transformOrigin: 'center',
            marginTop: `${(IPHONE_16_HEIGHT * (desktopScale - 1)) / 2}px`,
            marginBottom: `${(IPHONE_16_HEIGHT * (desktopScale - 1)) / 2}px`,
          }}
        >
          {content}
        </div>

        {viewportSize.width >= 1180 && (
          <div
            style={{
              width: '320px',
              minHeight: '420px',
              borderRadius: '32px',
              background: 'linear-gradient(150deg, #dff1eb 0%, #c8e4da 48%, #b6d6cc 100%)',
              boxShadow: '0 20px 48px rgba(17, 19, 24, 0.14)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2D6F57', marginBottom: '12px', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
              Enrol-Me Mascot
            </div>
            <img src={Logo} alt="Enrol-Me mascot" style={{ width: '212px', height: 'auto', marginBottom: '14px' }} />
            <div style={{ fontSize: '15px', color: '#1F3D33', lineHeight: 1.4 }}>
              Same phone UI in desktop mode, now without the device frame.
            </div>
            <button
              onClick={() => navigateToMode('app')}
              style={{
                marginTop: '18px',
                border: 'none',
                borderRadius: '12px',
                height: '42px',
                padding: '0 16px',
                backgroundColor: '#111318',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'Raleway, sans-serif',
              }}
            >
              Switch to App Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderInSelectedMode = (content: ReactNode) => {
    if (viewMode === 'desktop') {
      return renderInDesktopCanvas(content);
    }
    return renderInPhoneFrame(content);
  };

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
    setClassDetailReturnScreen(activeScreen);
    setClassDetailReturnTab(activeTab);
    setSelectedClass(classData);
    setActiveScreen('classDetail');
  };

  const handleBackFromClassDetail = () => {
    setActiveScreen(classDetailReturnScreen);
    setActiveTab(classDetailReturnTab);
    setSelectedClass(null);
  };

  const handleSubmitApplication = (application: Omit<ApplicationRecord, 'id' | 'status' | 'submittedAtLabel'>) => {
    const newItem: ApplicationRecord = {
      ...application,
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      status: 'Submitted',
      submittedAtLabel: 'just now',
    };
    setMyApplications((prev) => [newItem, ...prev]);
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

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveScreen('categoryDetail');
    setActiveTab('home');
  };

  const handleBackFromCategoryDetail = () => {
    setActiveScreen('home');
    setActiveTab('home');
    setSelectedCategory(null);
  };

  const handleProfileNavigate = (screen: string) => {
    if (isLearnerMode && (screen === 'childrenProfiles' || screen === 'childDetail' || screen === 'addChild')) {
      setActiveScreen('profile');
      setActiveTab('profile');
      return;
    }
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
    if (userData.contactsGranted) {
      setContactsPermission(true);
    }
    setOnboardingComplete(true);
  };

  const handleLogout = () => {
    setOnboardingComplete(false);
    setUserRole(null);
    setActiveScreen('home');
    setActiveTab('home');
    setShowFilters(false);
    setSelectedClass(null);
    setCurrentCity('Lavale');
    setSelectedChatId(null);
    setSelectedChildId(null);
    setContactsPermission(false);
    setMyApplications([]);
  };

  // Mode selection screen
  if (viewMode === 'select') {
    return (
      <ModeSelectionScreen
        onSelectAppMode={() => navigateToMode('app')}
        onSelectDesktopMode={() => navigateToMode('desktop')}
      />
    );
  }

  // Desktop website – full independent web experience, no phone frame
  if (viewMode === 'desktop') {
    return <DesktopWebsite onSwitchToApp={() => navigateToMode('select')} />;
  }

  // Show onboarding if not completed
  if (!onboardingComplete) {
    return renderInSelectedMode(<OnboardingFlow onComplete={handleOnboardingComplete} />);
  }

  // Show Organisation Dashboard
  if (userRole === 'organisation') {
    return renderInSelectedMode(
      <Suspense fallback={suspenseFallback}>
        <OrganisationDashboard onLogout={handleLogout} />
      </Suspense>,
    );
  }

  return renderInSelectedMode(
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
          onSelectCategory={handleSelectCategory}
        />
      )}
      {activeScreen === 'explore' && (
        <ExploreScreen
          onBack={() => {
            setActiveScreen('home');
            setActiveTab('home');
            setSelectedCategory(null);
          }}
          onOpenClassDetail={handleOpenClassDetail}
          preselectedCategoryName={selectedCategory || undefined}
        />
      )}
      {activeScreen === 'categoryDetail' && selectedCategory && (
        <CategoryDetailPage
          categoryName={selectedCategory}
          onBack={handleBackFromCategoryDetail}
          onOpenClassDetail={handleOpenClassDetail}
        />
      )}
      {activeScreen === 'schedule' && <SchedulePage isLearnerMode={isLearnerMode} />}
      {activeScreen === 'communications' && <CommunicationsPage initialChatId={selectedChatId} />}
      {activeScreen === 'fees' && <FeesPage />}
      {activeScreen === 'profile' && (
        <ProfilePage
          onNavigate={handleProfileNavigate}
          onLogout={handleLogout}
          isLearnerMode={isLearnerMode}
          applicationsCount={myApplications.length}
        />
      )}
      {activeScreen === 'editProfile' && <EditProfilePage onBack={handleBackToProfile} />}
      {activeScreen === 'savedClasses' && <SavedClassesPage onBack={handleBackToProfile} />}
      {activeScreen === 'myApplications' && (
        <MyApplicationsPage
          onBack={handleBackToProfile}
          applications={myApplications}
          isLearnerMode={isLearnerMode}
        />
      )}
      {!isLearnerMode && activeScreen === 'childrenProfiles' && (
        <ChildrenProfilesPage
          onBack={handleBackToProfile}
          onOpenAlerts={handleOpenAlerts}
          onOpenChildDetail={handleOpenChildDetail}
          onOpenAddChild={handleOpenAddChild}
        />
      )}
      {!isLearnerMode && activeScreen === 'childDetail' && selectedChildId && (
        <ChildDetailPage
          childId={selectedChildId}
          onBack={handleBackToChildrenProfiles}
        />
      )}
      {!isLearnerMode && activeScreen === 'addChild' && (
        <AddChildPage onBack={handleBackToChildrenProfiles} />
      )}
      {activeScreen === 'settings' && <SettingsPage onBack={handleBackToProfile} />}
      {activeScreen === 'helpCenter' && <HelpCenterPage onBack={handleBackToProfile} />}
      {activeScreen === 'classDetail' && selectedClass && (
        <ClassDetailPage
          classData={selectedClass}
          onBack={handleBackFromClassDetail}
          onSubmitApplication={handleSubmitApplication}
          contactsPermission={contactsPermission}
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
      {activeScreen !== 'classDetail' && <FloatingAlertsButton hasUnread={true} onClick={handleOpenAlerts} />}

      {/* Filters Modal */}
      <FiltersModal isOpen={showFilters} onClose={handleCloseFilters} />

      {/* Premium Bottom Navigation - Hide on Class Detail */}
      {activeScreen !== 'classDetail' && (
        <PremiumBottomNav activeTab={activeScreen === 'locationSettings' || activeScreen === 'alerts' ? 'home' : activeTab} onTabChange={handleTabChange} />
      )}

    </Suspense>
  );
}
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Building2, Lock, Mail, Search, Sparkles, UserCircle2 } from 'lucide-react';
import Logo from '../../imports/Logo.png';
import OnboardingFlow from './onboarding/OnboardingFlow';

interface DesktopModeProps {
  onSwitchToAppMode: () => void;
}

type AuthMode = 'user' | 'organisation';

const categories = ['Sports', 'Academics', 'Arts', 'Tutors', 'Coding', 'Music'];

const trendingInstitutes = [
  { id: 'inst-1', name: 'Elite Swim Academy', city: 'Pune', category: 'Sports', image: 'https://picsum.photos/seed/elite-swim-academy/620/420' },
  { id: 'inst-2', name: 'Future Minds Coding Lab', city: 'Bengaluru', category: 'Coding', image: 'https://picsum.photos/seed/future-minds-coding-lab/620/420' },
  { id: 'inst-3', name: 'Raagam Music Studio', city: 'Mumbai', category: 'Music', image: 'https://picsum.photos/seed/raagam-music-studio/620/420' },
  { id: 'inst-4', name: 'BrightPath Tutors', city: 'Pune', category: 'Tutors', image: 'https://picsum.photos/seed/brightpath-tutors/620/420' },
  { id: 'inst-5', name: 'Canvas Arts Collective', city: 'Hyderabad', category: 'Arts', image: 'https://picsum.photos/seed/canvas-arts-collective/620/420' },
];

const seededResults = (query: string) => [
  {
    id: 'res-1',
    title: `${query} Prime Academy`,
    subtitle: 'Popular with parents for guided learning and flexible timings',
    city: 'Pune',
    rating: 4.8,
    image: `https://picsum.photos/seed/${encodeURIComponent(`${query}-prime`)}/900/560`,
  },
  {
    id: 'res-2',
    title: `${query} Studio Hub`,
    subtitle: 'Small batches, experienced trainers, and clear progress tracking',
    city: 'Pune',
    rating: 4.7,
    image: `https://picsum.photos/seed/${encodeURIComponent(`${query}-studio`)}/900/560`,
  },
  {
    id: 'res-3',
    title: `${query} Learning Space`,
    subtitle: 'Premium facility focused on foundations and confidence building',
    city: 'Pune',
    rating: 4.6,
    image: `https://picsum.photos/seed/${encodeURIComponent(`${query}-space`)}/900/560`,
  },
];

export default function DesktopMode({ onSwitchToAppMode }: DesktopModeProps) {
  const [searchText, setSearchText] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('user');
  const [authReason, setAuthReason] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLabel, setLoginLabel] = useState('Guest');
  const [pendingSearch, setPendingSearch] = useState<string | null>(null);

  const searchResults = useMemo(() => seededResults(activeQuery || 'Classes'), [activeQuery]);

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthError('');
    setPassword('');
    setMobileNumber('');
    setEmailAddress('');
  };

  const openAuthModal = (reason = '', mode: AuthMode = 'user') => {
    setAuthMode(mode);
    setAuthReason(reason);
    setShowAuthModal(true);
    setAuthError('');
  };

  const handleSearch = () => {
    const query = searchText.trim();
    if (!query) return;
    if (!isLoggedIn) {
      setPendingSearch(query);
      openAuthModal('Login to explore nearby classes and institutes.', 'user');
      return;
    }
    setActiveQuery(query);
  };

  const handleAuthSubmit = () => {
    if (authMode === 'user') {
      const isMobileValid = /^\d{10}$/.test(mobileNumber);
      if (!isMobileValid || password !== '000') {
        setAuthError('Use any valid 10 digit mobile number with password 000.');
        return;
      }
      setIsLoggedIn(true);
      setLoginLabel(`User ${mobileNumber.slice(-4)}`);
      closeAuthModal();
      if (pendingSearch) {
        setActiveQuery(pendingSearch);
        setPendingSearch(null);
      }
      return;
    }

    if (emailAddress.trim().toLowerCase() !== 'demo@enrolme.com' || password !== '000') {
      setAuthError('Use demo@enrolme.com with password 000 for organisation login.');
      return;
    }

    setIsLoggedIn(true);
    setLoginLabel('Organisation');
    closeAuthModal();
    if (pendingSearch) {
      setActiveQuery(pendingSearch);
      setPendingSearch(null);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(150deg, #f8fcfb 0%, #eef7f4 52%, #e8f2ef 100%)', fontFamily: 'Raleway, sans-serif', color: '#111318' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(248,252,251,0.9)', borderBottom: '1px solid rgba(17,19,24,0.08)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', height: '80px', padding: '0 28px', display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img src={Logo} alt="Enrol-Me" style={{ height: '30px', width: 'auto' }} />

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, minWidth: '220px', backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #DCE8E4', height: '44px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
              <Search size={16} color="#6E7480" />
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleSearch();
                }}
                placeholder="Search classes, institutes, city..."
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  marginLeft: '8px',
                  fontSize: '14px',
                  color: '#111318',
                  fontFamily: 'Raleway, sans-serif',
                }}
              />
            </div>
            <button onClick={handleSearch} style={{ border: 'none', borderRadius: '12px', height: '44px', padding: '0 16px', backgroundColor: '#111318', color: '#FFFFFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
              Search
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => openAuthModal('', 'user')} style={{ border: '1px solid #D5E4E0', borderRadius: '12px', height: '42px', padding: '0 16px', backgroundColor: '#FFFFFF', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
              Login
            </button>
            <button onClick={() => setShowOnboarding(true)} style={{ border: 'none', borderRadius: '12px', height: '42px', padding: '0 16px', backgroundColor: '#B6D6CC', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 28px 56px' }}>
        <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '26px', alignItems: 'stretch', marginBottom: '34px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '30px', padding: '46px', boxShadow: '0 18px 46px rgba(17,19,24,0.08)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '999px', backgroundColor: '#EEF7F4', color: '#2D6F57', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
              <Sparkles size={13} /> Premium discovery platform
            </div>
            <h1 style={{ fontSize: '54px', lineHeight: 1.04, margin: 0, marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Discover the right classes.
            </h1>
            <p style={{ fontSize: '18px', color: '#5F6672', marginTop: 0, marginBottom: '24px' }}>
              Sports, academics, arts and more near you.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setActiveQuery('Popular')} style={{ border: 'none', borderRadius: '13px', height: '46px', padding: '0 18px', backgroundColor: '#111318', color: '#FFFFFF', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
                Explore Classes
              </button>
              <button onClick={() => setShowOnboarding(true)} style={{ border: '1px solid #D5E4E0', borderRadius: '13px', height: '46px', padding: '0 18px', backgroundColor: '#FFFFFF', color: '#111318', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
                Get Started
              </button>
            </div>

            <div style={{ marginTop: '22px', fontSize: '13px', color: '#6E7480' }}>
              {isLoggedIn ? `Logged in as ${loginLabel}` : 'Sign in to unlock nearby institute recommendations'}
            </div>
          </div>

          <div style={{ borderRadius: '30px', position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at 20% 20%, #dff1eb 0%, #c7e2d9 30%, #95c3b0 100%)', boxShadow: '0 18px 46px rgba(17,19,24,0.08)', minHeight: '360px' }}>
            <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.22)', top: '-120px', right: '-60px' }} />
            <div style={{ position: 'absolute', width: '220px', height: '220px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.24)', bottom: '-68px', left: '-44px' }} />
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.2 }}>Find trusted classes with a cleaner, faster web experience</div>
              <div style={{ alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.72)', borderRadius: '24px', padding: '16px' }}>
                <img src={Logo} alt="Enrol-Me mascot" style={{ width: '220px', height: 'auto' }} />
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '12px', fontSize: '24px' }}>Popular categories</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearchText(category)}
                style={{
                  border: '1px solid #D5E4E0',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  color: '#111318',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '12px', fontSize: '24px' }}>Trending institutes</h2>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
            {trendingInstitutes.map((item) => (
              <div key={item.id} style={{ minWidth: '250px', backgroundColor: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 28px rgba(17,19,24,0.08)' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '132px', objectFit: 'cover' }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ fontSize: '13px', color: '#6E7480' }}>{item.category} - {item.city}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {activeQuery && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '24px' }}>Results for "{activeQuery}"</h2>
              <span style={{ fontSize: '13px', color: '#6E7480' }}>{searchResults.length} institutes</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
              {searchResults.map((result) => (
                <div key={result.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 28px rgba(17,19,24,0.08)' }}>
                  <img src={result.image} alt={result.title} style={{ width: '100%', height: '156px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{result.title}</div>
                    <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '8px' }}>{result.subtitle}</div>
                    <div style={{ fontSize: '12px', color: '#6E7480' }}>{result.city} - {result.rating} rating</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={onSwitchToAppMode} style={{ border: '1px solid #D5E4E0', borderRadius: '12px', backgroundColor: '#FFFFFF', height: '42px', padding: '0 16px', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
            Switch to App Mode
          </button>
        </div>
      </main>

      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              backgroundColor: 'rgba(17,19,24,0.42)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '440px',
                borderRadius: '22px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 26px 62px rgba(17,19,24,0.28)',
                padding: '22px',
              }}
            >
              <div style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px' }}>Welcome Back</div>
              {authReason && <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '10px' }}>{authReason}</div>}

              {authMode === 'user' ? (
                <>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6E7480', marginBottom: '5px' }}>Mobile Number</span>
                    <div style={{ border: '1px solid #DCE8E4', borderRadius: '12px', height: '44px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                      <UserCircle2 size={16} color="#6E7480" />
                      <input value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} placeholder="10 digit mobile number" style={{ flex: 1, border: 'none', outline: 'none', marginLeft: '8px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    </div>
                  </label>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6E7480', marginBottom: '5px' }}>Password</span>
                    <div style={{ border: '1px solid #DCE8E4', borderRadius: '12px', height: '44px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                      <Lock size={16} color="#6E7480" />
                      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" style={{ flex: 1, border: 'none', outline: 'none', marginLeft: '8px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6E7480', marginBottom: '5px' }}>Email Address</span>
                    <div style={{ border: '1px solid #DCE8E4', borderRadius: '12px', height: '44px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                      <Mail size={16} color="#6E7480" />
                      <input value={emailAddress} onChange={(event) => setEmailAddress(event.target.value)} placeholder="demo@enrolme.com" style={{ flex: 1, border: 'none', outline: 'none', marginLeft: '8px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    </div>
                  </label>
                  <label style={{ display: 'block', marginBottom: '10px' }}>
                    <span style={{ display: 'block', fontSize: '13px', color: '#6E7480', marginBottom: '5px' }}>Password</span>
                    <div style={{ border: '1px solid #DCE8E4', borderRadius: '12px', height: '44px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                      <Lock size={16} color="#6E7480" />
                      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" style={{ flex: 1, border: 'none', outline: 'none', marginLeft: '8px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    </div>
                  </label>
                </>
              )}

              {authError && <div style={{ marginBottom: '10px', fontSize: '12px', color: '#B8475D' }}>{authError}</div>}

              <button onClick={handleAuthSubmit} style={{ width: '100%', border: 'none', borderRadius: '12px', height: '46px', backgroundColor: '#111318', color: '#FFFFFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif', marginBottom: '10px' }}>
                {authMode === 'organisation' ? 'Sign In as Organisation' : 'Sign In'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                <button style={{ border: 'none', background: 'none', color: '#6E7480', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: 'Raleway, sans-serif' }}>Forgot Password</button>
                <button style={{ border: 'none', background: 'none', color: '#6E7480', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: 'Raleway, sans-serif' }}>Don't have an account? Create Account</button>
              </div>

              <button
                onClick={() => setAuthMode((prev) => (prev === 'user' ? 'organisation' : 'user'))}
                style={{ border: 'none', background: 'none', color: '#2D6F57', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: 'Raleway, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Building2 size={14} />
                {authMode === 'user' ? 'Organisation Login' : 'Back to Parent/User Login'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOnboarding(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              backgroundColor: 'rgba(17,19,24,0.48)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '560px',
                height: '760px',
                borderRadius: '26px',
                overflow: 'hidden',
                boxShadow: '0 26px 62px rgba(17,19,24,0.32)',
                backgroundColor: '#F4FAF8',
              }}
            >
              <OnboardingFlow
                startAtRoleSelection
                onComplete={(userData) => {
                  setShowOnboarding(false);
                  setIsLoggedIn(true);
                  if (userData?.userType === 'organisation') {
                    setLoginLabel('Organisation');
                  } else if (userData?.userType === 'learner') {
                    setLoginLabel('Learner');
                  } else {
                    setLoginLabel('Parent');
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

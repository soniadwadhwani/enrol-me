import { useState, useEffect } from 'react';
import {
  Search, MapPin, ChevronDown, X, Star, Heart, CheckCircle,
  Phone, Lock, Eye, EyeOff, Users, Calendar, MessageSquare,
  CreditCard, User, Navigation, ChevronRight,
  BadgeCheck, Filter,
} from 'lucide-react';
import Logo       from '../../imports/Logo.png';
import BlobMascot from './BlobMascot';

// ─────────────────────────────────────────
// DESIGN TOKENS  (Linear / Apple / Stripe feel)
// ─────────────────────────────────────────
const C = {
  // backgrounds
  bgPage:     '#FFFFFF',
  bgSection:  '#F7F9FC',   // very light cool blue-gray
  bgCard:     '#FFFFFF',

  // text
  dark:       '#0F172A',   // slate-900
  body:       '#334155',   // slate-700
  muted:      '#64748B',   // slate-500

  // brand
  blue:       '#3A8CC8',   // from logo ribbon
  teal:       '#38AE8C',   // from logo ribbon  ← mint accent only
  pink:       '#F11859',   // brand accent
  purple:     '#7B5EA7',   // from logo ribbon

  // ui chrome
  border:     '#E2E8F0',
  borderFaint:'rgba(0,0,0,0.06)',

  // CTA
  cta:        '#0F172A',   // dark near-black (Stripe/Linear style)
  ctaHover:   '#3A8CC8',   // brand blue on hover
} as const;

const FONT = "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const CATEGORIES = [
  { id: 1, name: 'Sports',    emoji: '⚽', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', bg: 'linear-gradient(135deg,#FF6B6B,#EE5A24)' },
  { id: 2, name: 'Academics', emoji: '📚', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', bg: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
  { id: 3, name: 'Arts',      emoji: '🎨', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', bg: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
  { id: 4, name: 'Music',     emoji: '🎵', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80', bg: 'linear-gradient(135deg,#f093fb,#f5576c)' },
  { id: 5, name: 'Coding',    emoji: '💻', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80', bg: 'linear-gradient(135deg,#11998e,#38ef7d)' },
  { id: 6, name: 'Tutors',    emoji: '👨‍🏫', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', bg: 'linear-gradient(135deg,#89f7fe,#66a6ff)' },
  { id: 7, name: 'Swimming',  emoji: '🏊', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80', bg: 'linear-gradient(135deg,#1FA2FF,#12D8FA)' },
  { id: 8, name: 'Dance',     emoji: '💃', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&q=80', bg: 'linear-gradient(135deg,#f77062,#fe5196)' },
];

const TRENDING = [
  { id: 1,  title: 'Swimming Academy',  location: 'Lavale',    rating: 4.9, reviews: 148, price: '₹2,500/mo', tag: 'Sports',    gradient: 'linear-gradient(135deg,#a8edea,#fed6e3)', icon: '🏊', badge: 'Top Rated' },
  { id: 2,  title: 'Piano Studio',      location: 'Hinjewadi', rating: 4.8, reviews: 92,  price: '₹3,000/mo', tag: 'Music',     gradient: 'linear-gradient(135deg,#e0c3fc,#8ec5fc)', icon: '🎹', badge: null },
  { id: 3,  title: 'Football Academy',  location: 'Lavale',    rating: 4.7, reviews: 203, price: '₹1,800/mo', tag: 'Sports',    gradient: 'linear-gradient(135deg,#d4fc79,#96e6a1)', icon: '⚽', badge: null },
  { id: 4,  title: 'Coding Lab',        location: 'Wakad',     rating: 4.9, reviews: 117, price: '₹3,500/mo', tag: 'Coding',    gradient: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)', icon: '💻', badge: 'Top Rated' },
  { id: 5,  title: 'Dance Hub',         location: 'Lavale',    rating: 4.6, reviews: 76,  price: '₹2,200/mo', tag: 'Dance',     gradient: 'linear-gradient(135deg,#fbc2eb,#a6c1ee)', icon: '💃', badge: null },
  { id: 6,  title: 'Robotics Club',     location: 'Hinjewadi', rating: 4.8, reviews: 58,  price: '₹4,000/mo', tag: 'Coding',    gradient: 'linear-gradient(135deg,#fddb92,#d1fdff)', icon: '🤖', badge: 'New' },
  { id: 7,  title: 'Yoga & Wellness',   location: 'Lavale',    rating: 4.7, reviews: 134, price: '₹1,500/mo', tag: 'Health',    gradient: 'linear-gradient(135deg,#c1dfc4,#deecdd)', icon: '🧘', badge: null },
  { id: 8,  title: 'Art Studio',        location: 'Wakad',     rating: 4.5, reviews: 87,  price: '₹2,000/mo', tag: 'Arts',      gradient: 'linear-gradient(135deg,#ffecd2,#fcb69f)', icon: '🎨', badge: null },
  { id: 9,  title: 'English Tuition',   location: 'Hinjewadi', rating: 4.6, reviews: 99,  price: '₹2,800/mo', tag: 'Academics', gradient: 'linear-gradient(135deg,#e0f7fa,#b2ebf2)', icon: '📖', badge: null },
  { id: 10, title: 'Chess Champions',   location: 'Lavale',    rating: 4.9, reviews: 61,  price: '₹3,200/mo', tag: 'Academics', gradient: 'linear-gradient(135deg,#e8eaf6,#c5cae9)', icon: '♟️', badge: 'Top Rated' },
  { id: 11, title: 'Karate Classes',    location: 'Lavale',    rating: 4.8, reviews: 143, price: '₹2,400/mo', tag: 'Sports',    gradient: 'linear-gradient(135deg,#fce4ec,#f8bbd0)', icon: '🥋', badge: null },
  { id: 12, title: 'Guitar Lessons',    location: 'Lavale',    rating: 4.7, reviews: 79,  price: '₹2,600/mo', tag: 'Music',     gradient: 'linear-gradient(135deg,#fff9c4,#fff59d)', icon: '🎸', badge: null },
];

const CITIES  = ['Lavale', 'Hinjewadi', 'Wakad', 'Balewadi', 'Aundh', 'Baner', 'Kothrud', 'Viman Nagar'];
const NAV_TABS = [
  { id: 'explore',  label: 'Explore'  },
  { id: 'schedule', label: 'Schedule' },
  { id: 'chat',     label: 'Chat'     },
  { id: 'fees',     label: 'Fees'     },
  { id: 'profile',  label: 'Profile'  },
];
const LOCKED_META: Record<string, { icon: string; title: string; sub: string }> = {
  schedule: { icon: '📅', title: 'Your Schedule',   sub: 'View upcoming classes, bookings and your personal calendar.' },
  chat:     { icon: '💬', title: 'Messages',         sub: 'Chat with institutes and receive real-time updates.' },
  fees:     { icon: '💳', title: 'Fees & Payments',  sub: 'Manage subscriptions, invoices and payment history.' },
  profile:  { icon: '👤', title: 'Your Profile',     sub: 'View your account, children profiles, and applications.' },
};

const DISC_CLASSES = [
  { id: 101, title: 'Elite Swim Academy',  area: 'Lavale',    rating: 4.9, price: '₹2,500/mo', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80', tag: 'Swimming' },
  { id: 102, title: 'Creative Art Studio', area: 'Hinjewadi', rating: 4.8, price: '₹2,000/mo', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80', tag: 'Arts'     },
  { id: 103, title: 'CodeLab Juniors',     area: 'Wakad',     rating: 4.9, price: '₹3,500/mo', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', tag: 'Coding'   },
  { id: 104, title: 'Piano House',         area: 'Hinjewadi', rating: 4.8, price: '₹3,000/mo', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80', tag: 'Music'    },
  { id: 105, title: 'Dance District',      area: 'Lavale',    rating: 4.7, price: '₹2,200/mo', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=80', tag: 'Dance'    },
  { id: 106, title: 'Football Arena',      area: 'Lavale',    rating: 4.9, price: '₹1,800/mo', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', tag: 'Sports'   },
  { id: 107, title: 'Chess Champions',     area: 'Lavale',    rating: 4.9, price: '₹3,200/mo', img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&q=80', tag: 'Academics'},
  { id: 108, title: 'Robotics Club',       area: 'Hinjewadi', rating: 4.8, price: '₹4,000/mo', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80', tag: 'Coding'   },
];

const TRENDING_DISC = [
  { id: 201, title: 'Yoga & Wellness',  area: 'Lavale',    rating: 4.7, price: '₹1,500/mo', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', tag: 'Health'    },
  { id: 202, title: 'Karate Classes',   area: 'Lavale',    rating: 4.8, price: '₹2,400/mo', img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80', tag: 'Sports'    },
  { id: 203, title: 'Guitar Lessons',   area: 'Lavale',    rating: 4.7, price: '₹2,600/mo', img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80', tag: 'Music'     },
  { id: 204, title: 'English Tuition',  area: 'Hinjewadi', rating: 4.6, price: '₹2,800/mo', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80', tag: 'Academics' },
  { id: 205, title: 'Skating Zone',     area: 'Wakad',     rating: 4.7, price: '₹1,900/mo', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80', tag: 'Sports'    },
  { id: 206, title: 'Drawing & Craft',  area: 'Lavale',    rating: 4.5, price: '₹1,600/mo', img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80', tag: 'Arts'      },
];

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────
interface DesktopWebsiteProps {
  onSwitchToApp: () => void;
}

export default function DesktopWebsite({ onSwitchToApp: _onSwitchToApp }: DesktopWebsiteProps) {
  // ── state ──
  const [isLoggedIn,        setIsLoggedIn]        = useState(false);
  const [activeTab,         setActiveTab]          = useState('explore');
  const [navScrolled,       setNavScrolled]        = useState(false);
  const [showLogin,         setShowLogin]          = useState(false);
  const [loginMode,         setLoginMode]          = useState<'user' | 'org'>('user');
  const [showCreate,        setShowCreate]         = useState(false);
  const [createStep,        setCreateStep]         = useState<'role' | 'parent' | 'learner' | 'org'>('role');
  const [showLocation,      setShowLocation]       = useState(false);
  const [city,              setCity]               = useState('Lavale');
  const [locSearch,         setLocSearch]          = useState('');
  const [searchQ,           setSearchQ]            = useState('');
  const [showPwd,           setShowPwd]            = useState(false);
  const [phone,             setPhone]              = useState('');
  const [password,          setPassword]           = useState('');
  const [email,             setEmail]              = useState('');
  const [saved,             setSaved]              = useState<Set<number>>(new Set());
  const [hovCard,           setHovCard]            = useState<number | null>(null);
  const [hovCat,            setHovCat]             = useState<number | null>(null);
  const [heroCat,           setHeroCat]            = useState('All');

  // ── lifecycle ──
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });

    const s = document.createElement('style');
    s.id = 'em-desktop';
    s.textContent = `
      body { overflow-x:hidden!important; background:#fff!important; }
      ::selection { background:rgba(58,140,200,0.15); }
      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-thumb { background:rgba(58,140,200,0.2); border-radius:4px; }
      .em-carousel::-webkit-scrollbar { display:none; }
      .em-carousel { scrollbar-width:none; -ms-overflow-style:none; }
    `;
    if (!document.getElementById('em-desktop')) document.head.appendChild(s);
    return () => { window.removeEventListener('scroll', onScroll); document.getElementById('em-desktop')?.remove(); };
  }, []);

  // ── helpers ──
  const gate = (fn?: () => void) => { if (!isLoggedIn) { setShowLogin(true); return false; } fn?.(); return true; };

  const goTab = (tab: string) => {
    if (tab !== 'explore' && !isLoggedIn) { setShowLogin(true); return; }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const doLogin  = (e: React.FormEvent) => { e.preventDefault(); setIsLoggedIn(true); setShowLogin(false);  setPhone(''); setPassword(''); setEmail(''); };
  const doCreate = (e: React.FormEvent) => { e.preventDefault(); setIsLoggedIn(true); setShowCreate(false); };
  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) { setShowLogin(true); return; }
    setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  // ── reusable hover helpers ──
  const hoverDark = (e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = C.ctaHover);
  const leaveDark = (e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.background = C.cta);

  // ═══════════════════════════════════════
  // NAVBAR
  // ═══════════════════════════════════════
  const Navbar = (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 64,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${navScrolled ? C.border : 'transparent'}`,
      boxShadow: navScrolled ? '0 1px 20px rgba(15,23,42,0.05)' : 'none',
      transition: 'border-color 0.25s, box-shadow 0.25s',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', height: '100%',
        display: 'flex', alignItems: 'center', padding: '0 40px',
      }}>

        {/* Logo + location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          <img
            src={Logo} alt="Enrol-Me"
            style={{ height: 32, width: 'auto', cursor: 'pointer' }}
            onClick={() => { setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
          <button
            onClick={() => setShowLocation(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: C.bgSection, border: `1px solid ${C.border}`,
              borderRadius: 20, padding: '5px 12px 5px 10px',
              cursor: 'pointer', fontFamily: FONT, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}
          >
            <MapPin size={12} color={C.blue} strokeWidth={2.5} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.body }}>{city}</span>
            <ChevronDown size={11} color={C.muted} strokeWidth={2.5} />
          </button>
        </div>

        {/* Center tabs */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          {NAV_TABS.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => goTab(tab.id)}
                style={{
                  padding: '7px 16px', borderRadius: 8, border: 'none',
                  background: active ? `rgba(58,140,200,0.08)` : 'transparent',
                  color: active ? C.blue : C.muted,
                  fontFamily: FONT, fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer', transition: 'all 0.15s', position: 'relative',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.body; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.muted; }}
              >
                {tab.label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 18, height: 2.5,
                    background: C.blue, borderRadius: 2,
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => goTab('profile')}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: `1.5px solid ${C.blue}`,
                  background: `rgba(58,140,200,0.07)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = `rgba(58,140,200,0.14)`)}
                onMouseLeave={e => (e.currentTarget.style.background = `rgba(58,140,200,0.07)`)}
              >
                <User size={14} color={C.blue} />
              </button>
              <button
                onClick={() => { setIsLoggedIn(false); setActiveTab('explore'); }}
                style={{
                  border: `1px solid ${C.border}`, borderRadius: 8,
                  padding: '7px 14px', background: 'transparent',
                  fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.body,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.blue)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
              >Sign Out</button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                style={{
                  border: 'none', borderRadius: 8, padding: '7px 16px',
                  background: 'transparent',
                  fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.body,
                  cursor: 'pointer', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.blue)}
                onMouseLeave={e => (e.currentTarget.style.color = C.body)}
              >Login</button>

              <button
                onClick={() => { setShowCreate(true); setCreateStep('role'); }}
                style={{
                  background: C.cta, color: '#fff', border: 'none',
                  borderRadius: 8, padding: '8px 18px',
                  fontFamily: FONT, fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.ctaHover; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.cta;      e.currentTarget.style.transform = 'translateY(0)';    }}
              >Get Started</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  // ═══════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════
  const Hero = (
    <section style={{
      minHeight: '80vh',
      background: `
        radial-gradient(ellipse at 78% 45%, rgba(195,220,245,0.28) 0%, transparent 52%),
        radial-gradient(ellipse at 18% 80%, rgba(196,245,228,0.16) 0%, transparent 45%),
        #FFFFFF
      `,
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', width: '100%',
        padding: '56px 48px 64px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 40, alignItems: 'center',
      }}>

        {/* ── Left – Blob Mascot ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'visible', position: 'relative',
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(58,140,200,0.10) 0%, rgba(123,94,167,0.06) 55%, transparent 80%)',
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
          }} />
          {/*
            Blob body renders at left:-35% internally so it appears shifted left.
            A small nudge right keeps it visually centered in the left column
            while the speech bubble flows naturally to the right into the gap.
          */}
          <div style={{ transform: 'translateX(24px)', overflow: 'visible' }}>
            <BlobMascot
              scale={1.38}
              speechText={'Explore 500+ classes near you! ✨'}
              onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
            />
          </div>
        </div>

        {/* ── Right – Discovery Panel ── */}
        <div>
          {/* Small headline */}
          <div style={{ marginBottom: 16 }}>
            <h1 style={{
              fontFamily: FONT, fontWeight: 900,
              fontSize: 'clamp(24px, 2.4vw, 34px)',
              lineHeight: 1.1, color: C.dark,
              margin: '0 0 6px', letterSpacing: '-0.025em',
            }}>
              Find the right{' '}
              <span style={{
                background: `linear-gradient(135deg, ${C.blue} 0%, ${C.purple} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>classes</span>{' '}near you.
            </h1>
            <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.6 }}>
              Sports, academics, arts and more in <strong style={{ color: C.body }}>{city}</strong>.
            </p>
          </div>

          {/* Discovery panel card */}
          <div style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 24,
            border: '1px solid rgba(226,232,240,0.9)',
            boxShadow: '0 12px 48px rgba(15,23,42,0.09), 0 3px 12px rgba(15,23,42,0.05)',
            padding: '14px',
            overflow: 'hidden',
          }}>

            {/* App-style pill search bar */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 50,
              padding: '7px 7px 7px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
              border: `1.5px solid ${C.border}`,
              boxShadow: '0 2px 12px rgba(15,23,42,0.07)',
              marginBottom: 11,
            }}>
              <Search size={14} color={C.muted} strokeWidth={2} />
              <input
                type="text"
                placeholder="Search classes, tutors, sports..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                onClick={() => { if (!isLoggedIn) setShowLogin(true); }}
                readOnly={!isLoggedIn}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontFamily: FONT, fontSize: 13, color: C.dark,
                  background: 'transparent',
                  cursor: !isLoggedIn ? 'pointer' : 'text',
                }}
              />
              <button
                onClick={() => gate()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: C.bgSection,
                  border: `1px solid ${C.border}`,
                  borderRadius: 50, padding: '7px 14px',
                  fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.muted,
                  cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
              >
                <Filter size={12} strokeWidth={2} /> Filters
              </button>
            </div>

            {/* Category pills */}
            <div
              className="em-carousel"
              style={{ display: 'flex', gap: 7, overflowX: 'auto', marginBottom: 14, paddingBottom: 2 }}
            >
              {['All','Sports','Academics','Arts','Music','Coding','Tutors','Swimming','Dance'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setHeroCat(cat)}
                  style={{
                    flexShrink: 0,
                    padding: '5px 14px', borderRadius: 50,
                    border: 'none',
                    background: heroCat === cat
                      ? `linear-gradient(135deg, ${C.blue}, ${C.purple})`
                      : 'rgba(15,23,42,0.05)',
                    color: heroCat === cat ? '#fff' : C.body,
                    fontFamily: FONT, fontSize: 11.5, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                    boxShadow: heroCat === cat ? '0 2px 8px rgba(58,140,200,0.30)' : 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Compact carousel */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Popular near you</span>
                <button
                  onClick={() => gate()}
                  style={{
                    background: 'none', border: 'none', fontFamily: FONT,
                    fontSize: 12, fontWeight: 600, color: C.blue, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}
                >
                  See all <ChevronRight size={12} />
                </button>
              </div>
              <div className="em-carousel" style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
                {DISC_CLASSES.map(c => (
                  <div
                    key={c.id}
                    onClick={() => gate()}
                    style={{
                      flexShrink: 0, width: 128, cursor: 'pointer',
                      background: '#FFFFFF', borderRadius: 12,
                      border: '1px solid rgba(226,232,240,0.7)',
                      boxShadow: '0 1px 6px rgba(15,23,42,0.06)',
                      overflow: 'hidden', transition: 'transform 0.18s, box-shadow 0.18s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 20px rgba(15,23,42,0.12)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(15,23,42,0.06)'; }}
                  >
                    <img src={c.img} alt={c.title} style={{ width: '100%', height: 74, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '7px 8px 9px' }}>
                      <div style={{
                        fontFamily: FONT, fontSize: 11.5, fontWeight: 700, color: C.dark,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        marginBottom: 3,
                      }}>{c.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 4 }}>
                        <MapPin size={8} color={C.muted} strokeWidth={2.5} />
                        <span style={{ fontFamily: FONT, fontSize: 9.5, color: C.muted }}>{c.area}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Star size={8} color="#F59E0B" fill="#F59E0B" />
                          <span style={{ fontFamily: FONT, fontSize: 9.5, fontWeight: 700, color: C.dark }}>{c.rating}</span>
                        </div>
                        <span style={{ fontFamily: FONT, fontSize: 9.5, fontWeight: 700, color: C.blue }}>{c.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );

  // ═══════════════════════════════════════
  // CATEGORIES
  // ═══════════════════════════════════════
  const Categories = (
    <section style={{ padding: '80px 0', background: C.bgSection }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 32, color: C.dark, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Browse by Category
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, margin: 0 }}>
              Thousands of classes across every interest
            </p>
          </div>
          <button
            onClick={() => gate()}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'transparent', border: `1.5px solid ${C.border}`,
              borderRadius: 8, padding: '8px 16px',
              fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.body,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.body; }}
          >
            View all <ChevronRight size={13} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => gate()}
              onMouseEnter={() => setHovCat(cat.id)}
              onMouseLeave={() => setHovCat(null)}
              style={{
                position: 'relative', borderRadius: 18,
                overflow: 'hidden', height: 188,
                cursor: 'pointer',
                transform: hovCat === cat.id ? 'translateY(-4px) scale(1.01)' : 'none',
                boxShadow: hovCat === cat.id
                  ? '0 16px 40px rgba(15,23,42,0.14)'
                  : '0 2px 12px rgba(15,23,42,0.07)',
                transition: 'transform 0.22s, box-shadow 0.22s',
              }}
            >
              <img
                src={cat.img} alt={cat.name}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: cat.bg, zIndex: -1 }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.68) 0%, rgba(15,23,42,0.04) 60%)',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px' }}>
                <div style={{ fontSize: 26, marginBottom: 4 }}>{cat.emoji}</div>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: '#fff' }}>{cat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════
  // TRENDING
  // ═══════════════════════════════════════
  const Trending = (
    <section style={{ padding: '80px 0', background: C.bgPage }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 32, color: C.dark, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Trending Near You
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, margin: 0 }}>
              Popular classes in {city} and surrounding areas
            </p>
          </div>
          <button
            onClick={() => gate()}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'transparent', border: `1.5px solid ${C.border}`,
              borderRadius: 8, padding: '8px 16px',
              fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.body,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.body; }}
          >
            View all <ChevronRight size={13} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))', gap: 20 }}>
          {TRENDING.map(cls => (
            <div
              key={cls.id}
              onClick={() => gate()}
              onMouseEnter={() => setHovCard(cls.id)}
              onMouseLeave={() => setHovCard(null)}
              style={{
                background: '#fff', borderRadius: 18, overflow: 'hidden',
                border: `1px solid ${C.border}`,
                boxShadow: hovCard === cls.id ? '0 12px 32px rgba(15,23,42,0.10)' : '0 2px 8px rgba(15,23,42,0.05)',
                transform: hovCard === cls.id ? 'translateY(-4px)' : 'none',
                transition: 'transform 0.22s, box-shadow 0.22s',
                cursor: 'pointer',
              }}
            >
              {/* Card visual */}
              <div style={{
                height: 136, background: cls.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 48, position: 'relative',
              }}>
                {cls.icon}
                {/* Save */}
                <button
                  onClick={e => toggleSave(cls.id, e)}
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.88)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.15s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Heart size={13} color={saved.has(cls.id) ? '#F11859' : C.muted} fill={saved.has(cls.id) ? '#F11859' : 'none'} />
                </button>
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: 10, left: 10,
                  background: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: 7, padding: '3px 9px',
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.dark }}>{cls.tag}</span>
                </div>
                {/* Badge */}
                {cls.badge && (
                  <div style={{
                    position: 'absolute', bottom: 10, left: 10,
                    background: cls.badge === 'Top Rated' ? '#F59E0B' : cls.badge === 'New' ? C.blue : C.muted,
                    borderRadius: 7, padding: '3px 9px',
                  }}>
                    <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: '#fff' }}>{cls.badge}</span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: '14px 16px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 5, gap: 8 }}>
                  <h3 style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: C.dark, margin: 0, lineHeight: 1.3 }}>
                    {cls.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                    <Star size={11} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.dark }}>{cls.rating}</span>
                    <span style={{ fontFamily: FONT, fontSize: 11, color: C.muted }}>({cls.reviews})</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
                  <MapPin size={10} color={C.muted} />
                  <span style={{ fontFamily: FONT, fontSize: 12, color: C.muted }}>{cls.location}</span>
                  <span style={{ color: C.border, margin: '0 4px' }}>·</span>
                  <BadgeCheck size={10} color={C.teal} />
                  <span style={{ fontFamily: FONT, fontSize: 11, color: C.teal, fontWeight: 600 }}>Verified</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: C.blue }}>
                    {cls.price}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); gate(); }}
                    style={{
                      background: C.cta, color: '#fff', border: 'none',
                      borderRadius: 7, padding: '6px 13px',
                      fontFamily: FONT, fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', transition: 'background 0.18s',
                    }}
                    onMouseEnter={hoverDark} onMouseLeave={leaveDark}
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ═══════════════════════════════════════
  // LOCKED PAGE
  // ═══════════════════════════════════════
  const renderLocked = (tab: string) => {
    const m = LOCKED_META[tab] ?? { icon: '🔒', title: tab, sub: '' };
    return (
      <div style={{
        minHeight: '68vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 18, padding: '80px 24px', textAlign: 'center',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: C.bgSection,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34,
        }}>{m.icon}</div>
        <h2 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 28, color: C.dark, margin: 0 }}>{m.title}</h2>
        <p style={{ fontFamily: FONT, fontSize: 15, color: C.muted, maxWidth: 380, margin: 0, lineHeight: 1.6 }}>
          {m.sub} Sign in to continue.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => setShowLogin(true)}
            style={{
              background: C.cta, color: '#fff', border: 'none',
              borderRadius: 10, padding: '12px 26px',
              fontSize: 14, fontWeight: 700, fontFamily: FONT,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={hoverDark} onMouseLeave={leaveDark}
          >Sign In</button>
          <button
            onClick={() => { setShowCreate(true); setCreateStep('role'); }}
            style={{
              background: 'transparent', color: C.body,
              border: `1.5px solid ${C.border}`,
              borderRadius: 10, padding: '12px 26px',
              fontSize: 14, fontWeight: 600, fontFamily: FONT,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.body; }}
          >Create Account</button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════
  // LOCATION MODAL
  // ═══════════════════════════════════════
  const LocationModal = showLocation && (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && setShowLocation(false)}
    >
      <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 460, padding: '28px 28px 32px', boxShadow: '0 20px 60px rgba(15,23,42,0.16)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <h3 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 20, color: C.dark, margin: 0 }}>Choose Location</h3>
          <button onClick={() => setShowLocation(false)} style={{ width: 32, height: 32, borderRadius: '50%', background: C.bgSection, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} color={C.muted} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: C.bgSection, borderRadius: 12, padding: '10px 14px', marginBottom: 12, border: `1px solid ${C.border}` }}>
          <Search size={14} color={C.muted} />
          <input type="text" placeholder="Search area or city..." value={locSearch} onChange={e => setLocSearch(e.target.value)} autoFocus
            style={{ flex: 1, border: 'none', outline: 'none', fontFamily: FONT, fontSize: 14, color: C.dark, background: 'transparent' }} />
        </div>

        <button
          onClick={() => { setCity('Current Location'); setShowLocation(false); setLocSearch(''); }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, background: `rgba(58,140,200,0.06)`, border: `1px solid rgba(58,140,200,0.18)`, borderRadius: 12, padding: '11px 14px', marginBottom: 18, cursor: 'pointer', fontFamily: FONT, transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = `rgba(58,140,200,0.11)`)}
          onMouseLeave={e => (e.currentTarget.style.background = `rgba(58,140,200,0.06)`)}
        >
          <Navigation size={15} color={C.blue} />
          <span style={{ fontSize: 14, fontWeight: 600, color: C.blue }}>Use current location</span>
        </button>

        {/* Map placeholder */}
        <div style={{ width: '100%', height: 130, background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', borderRadius: 14, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 1 }}>
            <MapPin size={26} color={C.blue} />
            <span style={{ fontFamily: FONT, fontSize: 11, color: C.muted }}>Interactive map · Drag pin to refine</span>
          </div>
          {[20,40,60,80].map(p => (<div key={'h'+p} style={{ position: 'absolute', left: 0, right: 0, top: `${p}%`, height: 1, background: 'rgba(58,140,200,0.12)' }} />))}
          {[20,40,60,80].map(p => (<div key={'v'+p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(58,140,200,0.12)' }} />))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CITIES.filter(c => c.toLowerCase().includes(locSearch.toLowerCase())).map(c => (
            <button key={c} onClick={() => { setCity(c); setShowLocation(false); setLocSearch(''); }}
              style={{ background: city === c ? C.blue : C.bgSection, color: city === c ? '#fff' : C.body, border: `1px solid ${city === c ? C.blue : C.border}`, borderRadius: 20, padding: '6px 14px', fontFamily: FONT, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { if (city !== c) { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; } }}
              onMouseLeave={e => { if (city !== c) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.body; } }}
            >{c}</button>
          ))}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════
  // LOGIN MODAL
  // ═══════════════════════════════════════
  const LoginModal = showLogin && (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && setShowLogin(false)}
    >
      <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 400, padding: '32px 28px', boxShadow: '0 20px 60px rgba(15,23,42,0.16)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <img src={Logo} alt="Enrol-Me" style={{ height: 28, width: 'auto' }} />
          <button onClick={() => setShowLogin(false)} style={{ width: 32, height: 32, borderRadius: '50%', background: C.bgSection, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} color={C.muted} />
          </button>
        </div>

        <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 24, color: C.dark, margin: '0 0 4px' }}>Welcome Back</h2>
        <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, margin: '0 0 22px' }}>Sign in to explore and enrol in classes</p>

        <div style={{ display: 'flex', background: C.bgSection, borderRadius: 11, padding: 3, marginBottom: 22, gap: 3 }}>
          {(['user', 'org'] as const).map(m => (
            <button key={m} onClick={() => setLoginMode(m)}
              style={{ flex: 1, padding: '7px 0', borderRadius: 9, border: 'none', background: loginMode === m ? '#fff' : 'transparent', boxShadow: loginMode === m ? '0 1px 6px rgba(15,23,42,0.07)' : 'none', fontFamily: FONT, fontSize: 13, fontWeight: loginMode === m ? 700 : 500, color: loginMode === m ? C.dark : C.muted, cursor: 'pointer', transition: 'all 0.2s' }}
            >{m === 'user' ? 'Student / Parent' : 'Organisation'}</button>
          ))}
        </div>

        <form onSubmit={doLogin}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.body, display: 'block', marginBottom: 6 }}>
              {loginMode === 'user' ? 'Mobile Number' : 'Email Address'}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: C.bgSection, borderRadius: 11, padding: '11px 14px', border: `1px solid ${C.border}` }}>
              {loginMode === 'user' && <Phone size={14} color={C.muted} />}
              <input type={loginMode === 'user' ? 'tel' : 'email'} placeholder={loginMode === 'user' ? '+91 9876 543 210' : 'hello@organisation.com'} value={loginMode === 'user' ? phone : email} onChange={e => loginMode === 'user' ? setPhone(e.target.value) : setEmail(e.target.value)} required
                style={{ flex: 1, border: 'none', outline: 'none', fontFamily: FONT, fontSize: 14, color: C.dark, background: 'transparent' }} />
            </div>
          </div>

          <div style={{ marginBottom: 6 }}>
            <label style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.body, display: 'block', marginBottom: 6 }}>Password</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: C.bgSection, borderRadius: 11, padding: '11px 14px', border: `1px solid ${C.border}` }}>
              <Lock size={14} color={C.muted} />
              <input type={showPwd ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required
                style={{ flex: 1, border: 'none', outline: 'none', fontFamily: FONT, fontSize: 14, color: C.dark, background: 'transparent' }} />
              <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex' }}>
                {showPwd ? <EyeOff size={14} color={C.muted} /> : <Eye size={14} color={C.muted} />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 20 }}>
            <button type="button" style={{ background: 'none', border: 'none', fontFamily: FONT, fontSize: 13, color: C.blue, fontWeight: 600, cursor: 'pointer' }}>Forgot Password?</button>
          </div>

          <button type="submit"
            style={{ width: '100%', background: C.cta, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 0', fontFamily: FONT, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 18, transition: 'background 0.2s' }}
            onMouseEnter={hoverDark} onMouseLeave={leaveDark}
          >{loginMode === 'org' ? 'Sign In as Organisation' : 'Sign In'}</button>

          {loginMode === 'user' && (
            <p style={{ textAlign: 'center', fontFamily: FONT, fontSize: 13, color: C.muted, margin: 0 }}>
              Don't have an account?{' '}
              <button type="button" onClick={() => { setShowLogin(false); setShowCreate(true); setCreateStep('role'); }}
                style={{ background: 'none', border: 'none', fontFamily: FONT, fontSize: 13, color: C.blue, fontWeight: 700, cursor: 'pointer' }}
              >Create Account</button>
            </p>
          )}
        </form>
      </div>
    </div>
  );

  // ═══════════════════════════════════════
  // CREATE ACCOUNT MODAL
  // ═══════════════════════════════════════
  const ROLES = [
    { id: 'parent',  label: 'Parent / Guardian', sub: 'Enrol and manage classes for your children', emoji: '👨‍👩‍👧' },
    { id: 'learner', label: 'Student / Learner',  sub: 'Discover and join classes yourself',         emoji: '🎓' },
    { id: 'org',     label: 'Organisation',       sub: 'List your institute and manage enrolments',  emoji: '🏫' },
  ];

  const CreateModal = showCreate && (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && setShowCreate(false)}
    >
      <div style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 420, padding: '32px 28px', boxShadow: '0 20px 60px rgba(15,23,42,0.16)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <img src={Logo} alt="Enrol-Me" style={{ height: 28 }} />
          <button onClick={() => setShowCreate(false)} style={{ width: 32, height: 32, borderRadius: '50%', background: C.bgSection, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} color={C.muted} />
          </button>
        </div>

        {createStep === 'role' ? (
          <>
            <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 22, color: C.dark, margin: '0 0 5px' }}>Create your account</h2>
            <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, margin: '0 0 24px' }}>How will you use Enrol-Me?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ROLES.map(role => (
                <button key={role.id} onClick={() => setCreateStep(role.id as any)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.bgSection, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: '14px 15px', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = `rgba(58,140,200,0.04)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bgSection; }}
                >
                  <span style={{ fontSize: 28 }}>{role.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: C.dark }}>{role.label}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted, marginTop: 2 }}>{role.sub}</div>
                  </div>
                  <ChevronRight size={14} color={C.muted} />
                </button>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontFamily: FONT, fontSize: 13, color: C.muted, margin: '20px 0 0' }}>
              Already have an account?{' '}
              <button type="button" onClick={() => { setShowCreate(false); setShowLogin(true); }}
                style={{ background: 'none', border: 'none', fontFamily: FONT, fontSize: 13, color: C.blue, fontWeight: 700, cursor: 'pointer' }}
              >Sign In</button>
            </p>
          </>
        ) : (
          <>
            <button onClick={() => setCreateStep('role')}
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', fontFamily: FONT, fontSize: 13, color: C.muted, cursor: 'pointer', marginBottom: 14, padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.dark)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >← Back</button>
            <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 22, color: C.dark, margin: '0 0 5px' }}>
              {ROLES.find(r => r.id === createStep)?.label}
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, margin: '0 0 22px' }}>Fill in your details to get started</p>
            <form onSubmit={doCreate}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 18 }}>
                {[
                  { label: 'Full Name',    placeholder: 'Your full name',          type: 'text'     },
                  createStep === 'org'
                    ? { label: 'Organisation Email', placeholder: 'hello@org.com', type: 'email'    }
                    : { label: 'Mobile Number',       placeholder: '+91 9876 543 210', type: 'tel'  },
                  { label: 'Create Password', placeholder: 'Minimum 8 characters', type: 'password' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.body, display: 'block', marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} required
                      style={{ width: '100%', boxSizing: 'border-box', background: C.bgSection, borderRadius: 11, padding: '11px 14px', border: `1px solid ${C.border}`, fontFamily: FONT, fontSize: 14, color: C.dark, outline: 'none' }} />
                  </div>
                ))}
              </div>
              <button type="submit"
                style={{ width: '100%', background: C.cta, color: '#fff', border: 'none', borderRadius: 12, padding: '13px 0', fontFamily: FONT, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={hoverDark} onMouseLeave={leaveDark}
              >Create Account</button>
            </form>
          </>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════
  const Footer = (
    <footer style={{ background: C.dark, padding: '52px 0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', gap: 48, marginBottom: 44, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 240, flexShrink: 0 }}>
            <img src={Logo} alt="Enrol-Me" style={{ height: 30, width: 'auto', marginBottom: 14 }} />
            <p style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0 }}>
              Discover and enrol in the best classes near you — sports, academics, arts and more.
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 48, flexWrap: 'wrap' }}>
            {[
              { title: 'Discover',  links: ['Explore Classes', 'Categories', 'Trending', 'Near You']           },
              { title: 'Platform',  links: ['For Parents', 'For Students', 'For Organisations', 'Pricing']    },
              { title: 'Company',   links: ['About', 'Blog', 'Careers', 'Contact']                             },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{col.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(link => (
                    <span key={link} style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
                    >{link}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontFamily: FONT, fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>© 2026 Enrol-Me. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms', 'Cookies'].map(t => (
              <span key={t} style={{ fontFamily: FONT, fontSize: 12, color: 'rgba(255,255,255,0.28)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.28)')}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );

  // ═══════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', background: C.bgPage, fontFamily: FONT }}>
      {Navbar}
      <main style={{ paddingTop: 64 }}>
        {activeTab === 'explore' ? (
          <>
            {Hero}
            {Categories}
            {Trending}
          </>
        ) : (
          <div style={{ minHeight: '68vh' }}>{renderLocked(activeTab)}</div>
        )}
      </main>
      {activeTab === 'explore' && Footer}
      {LocationModal}
      {LoginModal}
      {CreateModal}
    </div>
  );
}

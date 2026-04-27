import { useState } from 'react';
import {
  LayoutDashboard, Users, BookOpen, Calendar, CreditCard,
  Radio, BarChart2, UserPlus, Bell, Plus, ClipboardList,
  Megaphone, Star, CheckCircle, ChevronRight, Search,
  FileText, TrendingUp, LogOut, Settings, Mail, Phone,
  MapPin, Pencil,
} from 'lucide-react';
import Logo     from '../../imports/Logo.png';
import BlobMascot from './BlobMascot';

// ─── Same tokens as DesktopWebsite ───────────────────────────────
const C = {
  bgPage:     '#F7F9FC',
  bgSection:  '#EEF3FA',
  bgCard:     '#FFFFFF',
  dark:       '#0F172A',
  body:       '#334155',
  muted:      '#64748B',
  blue:       '#3A8CC8',
  teal:       '#38AE8C',
  pink:       '#F11859',
  purple:     '#7B5EA7',
  amber:      '#F59E0B',
  border:     '#E2E8F0',
  borderFaint:'rgba(0,0,0,0.05)',
  cta:        '#0F172A',
} as const;

const FONT = "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ─── Data ─────────────────────────────────────────────────────────
type Page = 'dashboard' | 'students' | 'classes' | 'schedule' | 'payments' | 'broadcast' | 'reports' | 'applicants' | 'profile';

const NAV: { id: Page; label: string; Icon: React.ElementType; badge?: number }[] = [
  { id: 'dashboard',  label: 'Dashboard',  Icon: LayoutDashboard },
  { id: 'students',   label: 'Students',   Icon: Users           },
  { id: 'classes',    label: 'Classes',    Icon: BookOpen        },
  { id: 'schedule',   label: 'Schedule',   Icon: Calendar        },
  { id: 'payments',   label: 'Payments',   Icon: CreditCard      },
  { id: 'broadcast',  label: 'Broadcast',  Icon: Radio           },
  { id: 'reports',    label: 'Reports',    Icon: BarChart2       },
  { id: 'applicants', label: 'Applicants', Icon: UserPlus, badge: 4 },
  { id: 'profile',    label: 'Profile',    Icon: Settings        },
];

const LEADS = [
  { id: 1, child: 'Aarav Mehta',   parent: 'Rahul Mehta',  age: 8,  program: 'Beginner Swim',  date: 'Apr 25', source: 'App'      },
  { id: 2, child: 'Priya Singh',   parent: 'Anita Singh',  age: 11, program: 'Advanced Swim',  date: 'Apr 26', source: 'Walk-in'  },
  { id: 3, child: 'Kian Patel',    parent: 'Dev Patel',    age: 6,  program: 'Baby Splash',    date: 'Apr 26', source: 'Referral' },
  { id: 4, child: 'Saanvi Sharma', parent: 'Neha Sharma',  age: 9,  program: 'Beginner Swim',  date: 'Apr 27', source: 'App'      },
];

const STUDENTS = [
  { id: 1, name: 'Rohan Gupta',    age: 10, program: 'Advanced Swim',      fee: '₹2,500', status: 'paid',    att: 92 },
  { id: 2, name: 'Diya Kapoor',    age: 8,  program: 'Beginner Swim',      fee: '₹2,500', status: 'paid',    att: 88 },
  { id: 3, name: 'Arjun Nair',     age: 12, program: 'Adult Conditioning', fee: '₹2,800', status: 'overdue', att: 76 },
  { id: 4, name: 'Mia Fernandez',  age: 7,  program: 'Baby Splash',        fee: '₹1,800', status: 'paid',    att: 95 },
  { id: 5, name: 'Kabir Malhotra', age: 11, program: 'Advanced Swim',      fee: '₹2,500', status: 'pending', att: 81 },
  { id: 6, name: 'Zara Ahmed',     age: 9,  program: 'Beginner Swim',      fee: '₹2,500', status: 'paid',    att: 90 },
];

const SCHEDULE = [
  { id: 1, time: '5:00', period: 'PM', program: 'Beginner Swim',      students: 12, instructor: 'Coach Raj',   pool: 'Pool A', color: C.blue,   light: 'rgba(58,140,200,0.08)'   },
  { id: 2, time: '6:30', period: 'PM', program: 'Advanced Swim',      students: 8,  instructor: 'Coach Priya', pool: 'Pool B', color: C.purple, light: 'rgba(123,94,167,0.08)'   },
  { id: 3, time: '7:30', period: 'PM', program: 'Adult Conditioning', students: 6,  instructor: 'Coach Raj',   pool: 'Pool A', color: C.teal,   light: 'rgba(56,174,140,0.08)'   },
];

const CLASSES = [
  { id: 1, name: 'Beginner Swim',      students: 48, sessions: '5 PM · Mon/Wed/Fri',    price: '₹2,500/mo', emoji: '🏊', status: 'active' },
  { id: 2, name: 'Advanced Swim',      students: 32, sessions: '6:30 PM · Mon/Wed/Fri', price: '₹2,500/mo', emoji: '🏅', status: 'active' },
  { id: 3, name: 'Baby Splash',        students: 20, sessions: '9 AM · Sat/Sun',         price: '₹1,800/mo', emoji: '🐬', status: 'active' },
  { id: 4, name: 'Adult Conditioning', students: 18, sessions: '7:30 PM · Mon–Fri',      price: '₹2,800/mo', emoji: '💪', status: 'active' },
  { id: 5, name: 'Competitive Swim',   students: 14, sessions: '6 AM · Mon–Sat',         price: '₹4,000/mo', emoji: '🏆', status: 'active' },
  { id: 6, name: 'Water Polo',         students: 0,  sessions: 'TBD',                    price: '₹3,200/mo', emoji: '🤽', status: 'draft'  },
];

const INVOICES = [
  { id: 1, student: 'Rohan Gupta',    program: 'Advanced Swim',      amount: '₹2,500', month: 'Apr 2026', status: 'paid',    date: 'Apr 1'  },
  { id: 2, student: 'Arjun Nair',     program: 'Adult Conditioning', amount: '₹2,800', month: 'Apr 2026', status: 'overdue', date: 'Apr 1'  },
  { id: 3, student: 'Kabir Malhotra', program: 'Advanced Swim',      amount: '₹2,500', month: 'Apr 2026', status: 'pending', date: 'Apr 27' },
  { id: 4, student: 'Diya Kapoor',    program: 'Beginner Swim',      amount: '₹2,500', month: 'Apr 2026', status: 'paid',    date: 'Apr 1'  },
  { id: 5, student: 'Mia Fernandez',  program: 'Baby Splash',        amount: '₹1,800', month: 'Apr 2026', status: 'paid',    date: 'Apr 1'  },
  { id: 6, student: 'Zara Ahmed',     program: 'Beginner Swim',      amount: '₹2,500', month: 'Apr 2026', status: 'paid',    date: 'Apr 1'  },
];

const ALERTS = [
  { id: 1, emoji: '👥', msg: '4 new applicants waiting for review', time: '2h ago' },
  { id: 2, emoji: '💳', msg: 'Arjun Nair: fee overdue since Apr 1', time: '1d ago' },
  { id: 3, emoji: '⭐', msg: 'New 5-star review by Neha Sharma',    time: '3h ago' },
];

const WEEK = [
  { day: 'Mon', classes: ['Beginner 5 PM', 'Advanced 6:30 PM', 'Adult 7:30 PM']  },
  { day: 'Tue', classes: ['Competitive 6 AM', 'Beginner 5 PM', 'Adult 7:30 PM']  },
  { day: 'Wed', classes: ['Beginner 5 PM', 'Advanced 6:30 PM', 'Adult 7:30 PM']  },
  { day: 'Thu', classes: ['Competitive 6 AM', 'Beginner 5 PM', 'Adult 7:30 PM']  },
  { day: 'Fri', classes: ['Beginner 5 PM', 'Advanced 6:30 PM', 'Adult 7:30 PM']  },
  { day: 'Sat', classes: ['Baby Splash 9 AM', 'Competitive 6 AM']                },
  { day: 'Sun', classes: ['Baby Splash 9 AM']                                     },
];

// ─── Helpers ──────────────────────────────────────────────────────
const sColor = (s: string) => s === 'paid' ? C.teal : s === 'overdue' ? C.pink : C.amber;
const sBg    = (s: string) =>
  s === 'paid'    ? 'rgba(56,174,140,0.10)' :
  s === 'overdue' ? 'rgba(241,24,89,0.09)'  : 'rgba(245,158,11,0.10)';

// Landing-page card style
const card: React.CSSProperties = {
  background: C.bgCard,
  borderRadius: 20,
  border: `1.5px solid ${C.border}`,
  boxShadow: '0 4px 24px rgba(15,23,42,0.07), 0 1px 6px rgba(15,23,42,0.04)',
  overflow: 'hidden',
};

function StatusChip({ label }: { label: string }) {
  return (
    <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, padding: '3px 11px', borderRadius: 20, background: sBg(label), color: sColor(label), textTransform: 'capitalize' as const }}>
      {label}
    </span>
  );
}

function Av({ name, size = 34, color = C.blue }: { name: string; size?: number; color?: string }) {
  const bg = color === C.blue ? 'rgba(58,140,200,0.10)' : color === C.teal ? 'rgba(56,174,140,0.10)' : 'rgba(123,94,167,0.10)';
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: FONT, fontSize: size * 0.36, fontWeight: 800, color }}>{name.charAt(0)}</span>
    </div>
  );
}

function TableHead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr style={{ background: C.bgSection }}>
        {cols.map(h => (
          <th key={h} style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 22px', textAlign: 'left' }}>{h}</th>
        ))}
      </tr>
    </thead>
  );
}

const SW = 232;
const HH = 62;

// ─── Component ────────────────────────────────────────────────────
interface Props { onLogout: () => void; }

export default function OrgDashboardDesktop({ onLogout }: Props) {
  const [page,      setPage]     = useState<Page>('dashboard');
  const [alertsOpen,setAlerts]   = useState(false);
  const [searchQ,   setSearchQ]  = useState('');
  const [broadMsg,  setBroadMsg] = useState('');
  const [broadSent, setBroadSent]= useState(false);

  // ════════════════════════════════════════════════════════════════
  // SIDEBAR  — white, same border language as landing page navbar
  // ════════════════════════════════════════════════════════════════
  const Sidebar = (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: SW, zIndex: 200,
      background: C.bgCard,
      borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo — height matches HH so the border-bottom lines up with the topbar */}
      <div style={{ height: HH, display: 'flex', alignItems: 'center', gap: 8, padding: '0 22px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <img src={Logo} alt="Enrol-Me" style={{ height: 26, width: 'auto' }} />
        <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>Enrol-me</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '14px 12px', overflowY: 'auto' }}>
        <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 10px 10px' }}>Menu</div>
        {NAV.map(({ id, label, Icon, badge }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 16px', borderRadius: 50, border: 'none', marginBottom: 4,
                background: active ? C.blue : 'transparent',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(58,140,200,0.10)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={16} color={active ? '#fff' : C.muted} strokeWidth={active ? 2.5 : 2} />
              <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: active ? 700 : 500, color: active ? '#fff' : C.body, flex: 1 }}>
                {label}
              </span>
              {badge && (
                <span style={{ background: active ? 'rgba(255,255,255,0.30)' : C.pink, color: '#fff', borderRadius: 20, padding: '2px 7px', fontSize: 10, fontWeight: 700, fontFamily: FONT }}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '10px 12px 18px', borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={onLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(241,24,89,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={15} color={C.muted} strokeWidth={2} />
          <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, color: C.muted }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  // ════════════════════════════════════════════════════════════════
  // TOPBAR  — matches landing page navbar exactly
  // ════════════════════════════════════════════════════════════════
  const Topbar = (
    <header style={{
      position: 'fixed', top: 0, left: SW, right: 0, height: HH, zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${C.border}`,
      boxShadow: '0 1px 20px rgba(15,23,42,0.04)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 36px',
    }}>
      <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: C.muted }}>
        {NAV.find(n => n.id === page)?.label}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setAlerts(v => !v)}
            style={{ width: 36, height: 36, borderRadius: '50%', background: C.bgSection, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = C.blue)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
          >
            <Bell size={15} color={C.body} strokeWidth={2} />
            <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: C.pink, border: '2px solid #fff' }} />
          </button>

          {alertsOpen && (
            <div style={{ position: 'absolute', top: 46, right: 0, width: 310, background: '#fff', borderRadius: 20, border: `1.5px solid ${C.border}`, boxShadow: '0 12px 40px rgba(15,23,42,0.12)', zIndex: 500, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px 10px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: C.dark }}>Alerts</span>
                <span style={{ fontFamily: FONT, fontSize: 11, color: C.blue, fontWeight: 700, cursor: 'pointer' }}>Mark all read</span>
              </div>
              {ALERTS.map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '12px 18px', borderBottom: `1px solid ${C.borderFaint}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: C.bgSection, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{a.emoji}</div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.body, lineHeight: 1.45 }}>{a.msg}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.muted, marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar pill — matches landing page style */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 24, padding: '5px 14px 5px 5px', cursor: 'pointer', transition: 'border-color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = C.blue)}
          onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = C.border)}
        >
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, color: '#fff' }}>ES</span>
          </div>
          <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.body }}>Elite Swim</span>
        </div>
      </div>
    </header>
  );

  // ════════════════════════════════════════════════════════════════
  // DASHBOARD
  // ════════════════════════════════════════════════════════════════
  const Dashboard = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Welcome banner with Mascot ── */}
      <div style={{
        ...card,
        background: `
          radial-gradient(ellipse at 80% 50%, rgba(195,220,245,0.28) 0%, transparent 55%),
          radial-gradient(ellipse at 10% 80%, rgba(196,245,228,0.18) 0%, transparent 50%),
          #FFFFFF
        `,
        display: 'grid', gridTemplateColumns: '1fr auto',
        alignItems: 'center', gap: 0, overflow: 'visible',
        padding: 0,
      }}>
        {/* Left — text */}
        <div style={{ padding: '32px 36px' }}>
          <h1 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 26, color: C.dark, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Welcome back, Elite Swim Academy 👋
          </h1>
          <p style={{ fontFamily: FONT, fontSize: 14, color: C.muted, margin: '0 0 24px' }}>
            Sunday, April 27, 2026 · 3 classes scheduled today
          </p>
          {/* Quick actions — pill buttons matching landing page CTA style */}
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            {([
              { label: '+ Student',  color: C.blue,   bg: 'rgba(58,140,200,0.09)',  dest: 'students'   },
              { label: 'Attendance', color: C.teal,   bg: 'rgba(56,174,140,0.09)',  dest: 'schedule'   },
              { label: 'Invoice',    color: C.purple, bg: 'rgba(123,94,167,0.09)', dest: 'payments'   },
              { label: 'Broadcast',  color: C.amber,  bg: 'rgba(245,158,11,0.09)', dest: 'broadcast'  },
              { label: 'Reports',    color: C.pink,   bg: 'rgba(241,24,89,0.08)',  dest: 'reports'    },
              { label: 'Applicants', color: C.body,   bg: C.bgSection,             dest: 'applicants' },
            ] as const).map(({ label, color, bg, dest }) => (
              <button
                key={label}
                onClick={() => setPage(dest as Page)}
                style={{ background: bg, border: `1.5px solid ${color}28`, borderRadius: 50, padding: '8px 18px', fontFamily: FONT, fontSize: 13, fontWeight: 700, color, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right — BlobMascot */}
        <div style={{ paddingRight: 40, overflow: 'visible', display: 'flex', alignItems: 'center' }}>
          <BlobMascot
            scale={1.15}
            speechText={"Your academy is thriving! 🏊"}
          />
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {([
          { label: 'Total Students',  value: '247',      sub: '+8 this month',     Icon: Users,      color: C.blue   },
          { label: "Today's Classes", value: '3',         sub: '26 enrolled today', Icon: Calendar,   color: C.teal   },
          { label: 'Pending Fees',    value: '₹18,400',  sub: '6 outstanding',     Icon: CreditCard, color: C.pink   },
          { label: 'Avg Rating',      value: '4.9 ★',    sub: '134 reviews',       Icon: Star,       color: C.amber  },
        ] as const).map(({ label, value, sub, Icon, color }) => (
          <div key={label} style={card}>
            <div style={{ padding: '22px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={color} strokeWidth={2} />
                </div>
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 28, color: C.dark, letterSpacing: '-0.02em', marginBottom: 5 }}>{value}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Two-col ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 308px', gap: 18 }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Today's Schedule */}
          <div style={card}>
            <div style={{ padding: '20px 24px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: C.dark }}>Today's Schedule</span>
              <button onClick={() => setPage('schedule')} style={{ background: 'none', border: 'none', fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.blue, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                Full schedule <ChevronRight size={13} />
              </button>
            </div>
            <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SCHEDULE.map(cls => (
                <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.bgSection, borderRadius: 14, padding: '14px 18px' }}>
                  <div style={{ background: cls.light, borderRadius: 10, padding: '7px 13px', textAlign: 'center', minWidth: 58, flexShrink: 0 }}>
                    <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 14, color: cls.color, lineHeight: 1 }}>{cls.time}</div>
                    <div style={{ fontFamily: FONT, fontSize: 9, fontWeight: 700, color: cls.color, marginTop: 2 }}>{cls.period}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: C.dark }}>{cls.program}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted, marginTop: 3 }}>{cls.instructor} · {cls.pool} · {cls.students} students</div>
                  </div>
                  <button style={{ background: 'rgba(56,174,140,0.10)', border: 'none', borderRadius: 9, padding: '7px 14px', fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.teal, cursor: 'pointer', flexShrink: 0 }}>
                    Attendance
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Enrollments */}
          <div style={card}>
            <div style={{ padding: '20px 24px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: C.dark }}>Recent Enrollments</span>
              <button onClick={() => setPage('students')} style={{ background: 'none', border: 'none', fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.blue, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                All students <ChevronRight size={13} />
              </button>
            </div>
            <div style={{ padding: '0 18px 14px' }}>
              {STUDENTS.slice(0, 5).map((s, i) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 6px', borderTop: i > 0 ? `1px solid ${C.borderFaint}` : 'none' }}>
                  <Av name={s.name} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.dark }}>{s.name}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted }}>{s.program}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 800, color: C.dark, marginBottom: 3 }}>{s.fee}</div>
                    <StatusChip label={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* New leads */}
          <div style={card}>
            <div style={{ padding: '18px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: C.dark }}>New Leads</span>
              <span style={{ background: 'rgba(241,24,89,0.09)', color: C.pink, fontFamily: FONT, fontSize: 11, fontWeight: 800, padding: '2px 9px', borderRadius: 20 }}>{LEADS.length}</span>
            </div>
            <div style={{ padding: '0 14px 8px' }}>
              {LEADS.map((lead, i) => (
                <div key={lead.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 6px', borderTop: i > 0 ? `1px solid ${C.borderFaint}` : 'none' }}>
                  <Av name={lead.child} size={30} color={C.teal} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.dark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.child}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.muted }}>{lead.program} · {lead.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '8px 14px 16px' }}>
              <button onClick={() => setPage('applicants')} style={{ width: '100%', background: 'rgba(58,140,200,0.08)', border: `1.5px solid rgba(58,140,200,0.15)`, borderRadius: 10, padding: '9px 0', fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.blue, cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(58,140,200,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(58,140,200,0.08)')}
              >Review all →</button>
            </div>
          </div>

          {/* Alerts */}
          <div style={card}>
            <div style={{ padding: '18px 20px 12px' }}>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: C.dark }}>Alerts</span>
            </div>
            <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ALERTS.map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: C.bgSection, borderRadius: 11, padding: '10px 12px' }}>
                  <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{a.emoji}</span>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.body, lineHeight: 1.4 }}>{a.msg}</div>
                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.muted, marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div style={card}>
            <div style={{ padding: '18px 20px 12px' }}>
              <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: C.dark }}>Tasks</span>
            </div>
            <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                { label: 'Mark attendance – Advanced Swim', done: false },
                { label: 'Send invoice to Kabir Malhotra',  done: false },
                { label: 'Review Arjun Nair overdue fee',   done: false },
                { label: 'Reply to Neha Sharma',            done: true  },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: t.done ? 'transparent' : C.bgSection, borderRadius: 9 }}>
                  <div style={{ width: 17, height: 17, borderRadius: '50%', flexShrink: 0, background: t.done ? C.teal : 'transparent', border: t.done ? 'none' : `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {t.done && <CheckCircle size={17} color="#fff" />}
                  </div>
                  <span style={{ fontFamily: FONT, fontSize: 12, color: t.done ? C.muted : C.body, textDecoration: t.done ? 'line-through' : 'none', lineHeight: 1.35 }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // STUDENTS
  // ════════════════════════════════════════════════════════════════
  const StudentsPage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: C.bgSection, borderRadius: 10, padding: '10px 16px', border: `1.5px solid ${C.border}`, flex: '0 0 auto' }}>
          <Search size={14} color={C.muted} />
          <input type="text" placeholder="Search students…" value={searchQ} onChange={e => setSearchQ(e.target.value)}
            style={{ border: 'none', outline: 'none', fontFamily: FONT, fontSize: 13, color: C.dark, background: 'transparent', width: 200 }} />
        </div>
        <div style={{ flex: 1 }} />
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.cta, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: FONT, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={14} /> Add Student
        </button>
      </div>
      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Student', 'Program', 'Age', 'Attendance', 'Fee', 'Actions']} />
          <tbody>
            {STUDENTS.filter(s => s.name.toLowerCase().includes(searchQ.toLowerCase())).map((s, i) => (
              <tr key={s.id} style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                <td style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Av name={s.name} />
                    <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.dark }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ fontFamily: FONT, fontSize: 13, color: C.body, padding: '14px 22px' }}>{s.program}</td>
                <td style={{ fontFamily: FONT, fontSize: 13, color: C.body, padding: '14px 22px' }}>{s.age} yrs</td>
                <td style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 70, height: 5, background: C.bgSection, borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: s.att >= 90 ? C.teal : s.att >= 75 ? C.amber : C.pink, borderRadius: 10, width: `${s.att}%` }} />
                    </div>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.muted }}>{s.att}%</span>
                  </div>
                </td>
                <td style={{ padding: '14px 22px' }}><StatusChip label={s.status} /></td>
                <td style={{ padding: '14px 22px' }}>
                  <div style={{ display: 'flex', gap: 7 }}>
                    <button style={{ background: 'rgba(58,140,200,0.08)', border: 'none', borderRadius: 8, padding: '6px 12px', fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.blue, cursor: 'pointer' }}>View</button>
                    <button style={{ background: C.bgSection, border: 'none', borderRadius: 8, padding: '6px 12px', fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.body, cursor: 'pointer' }}>Invoice</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // CLASSES
  // ════════════════════════════════════════════════════════════════
  const ClassesPage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FONT, fontSize: 14, color: C.muted }}>{CLASSES.filter(c => c.status === 'active').length} active programs</span>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.cta, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: FONT, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={14} /> Add Class
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(274px, 1fr))', gap: 16 }}>
        {CLASSES.map(cls => (
          <div key={cls.id} style={card}>
            <div style={{ padding: '22px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: C.bgSection, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{cls.emoji}</div>
                {cls.status === 'draft' && <span style={{ background: C.bgSection, border: `1px solid ${C.border}`, borderRadius: 7, padding: '2px 9px', fontFamily: FONT, fontSize: 10, fontWeight: 700, color: C.muted }}>Draft</span>}
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 5 }}>{cls.name}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted, marginBottom: 14 }}>{cls.sessions}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Users size={12} color={C.muted} />
                  <span style={{ fontFamily: FONT, fontSize: 12, color: C.muted }}>{cls.students} students</span>
                </div>
                <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 14, color: C.blue }}>{cls.price}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, background: 'rgba(58,140,200,0.08)', border: 'none', borderRadius: 9, padding: '8px 0', fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.blue, cursor: 'pointer' }}>Manage</button>
                <button style={{ background: C.bgSection, border: 'none', borderRadius: 9, padding: '8px 14px', fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.body, cursor: 'pointer' }}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // SCHEDULE
  // ════════════════════════════════════════════════════════════════
  const SchedulePage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FONT, fontSize: 14, color: C.muted }}>Week of Apr 27, 2026</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 9, padding: '7px 16px', fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.body, cursor: 'pointer' }}>← Prev</button>
          <button style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 9, padding: '7px 16px', fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.body, cursor: 'pointer' }}>Next →</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
        {WEEK.map((day, i) => (
          <div key={day.day} style={{ ...card, background: i === 6 ? 'linear-gradient(160deg,rgba(195,220,245,0.18),rgba(196,245,228,0.14)),#fff' : '#fff' }}>
            <div style={{ padding: '14px 12px' }}>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 11, color: i === 6 ? C.blue : C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>{day.day}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {day.classes.map(cls => (
                  <div key={cls} style={{ background: C.bgSection, borderRadius: 7, padding: '5px 7px', fontFamily: FONT, fontSize: 10, fontWeight: 600, color: C.body, lineHeight: 1.3 }}>{cls}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={card}>
        <div style={{ padding: '20px 24px 14px' }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: C.dark }}>Take Attendance</span>
        </div>
        <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SCHEDULE.map(cls => (
            <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.bgSection, borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ background: cls.light, borderRadius: 10, padding: '7px 13px', textAlign: 'center', minWidth: 58, flexShrink: 0 }}>
                <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 14, color: cls.color }}>{cls.time}</div>
                <div style={{ fontFamily: FONT, fontSize: 9, fontWeight: 700, color: cls.color }}>{cls.period}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: C.dark }}>{cls.program}</div>
                <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted, marginTop: 3 }}>{cls.students} enrolled · {cls.instructor}</div>
              </div>
              <button style={{ background: 'rgba(56,174,140,0.10)', border: 'none', borderRadius: 9, padding: '8px 16px', fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.teal, cursor: 'pointer' }}>Mark Attendance</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // PAYMENTS
  // ════════════════════════════════════════════════════════════════
  const PaymentsPage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {([
          { label: 'Collected (Apr)', value: '₹52,300', color: C.teal  },
          { label: 'Pending',         value: '₹5,000',  color: C.amber },
          { label: 'Overdue',         value: '₹2,800',  color: C.pink  },
        ] as const).map(({ label, value, color }) => (
          <div key={label} style={card}>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{label}</div>
              <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 28, color, letterSpacing: '-0.02em' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: C.dark }}>All Invoices</span>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.cta, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: FONT, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={14} /> New Invoice
        </button>
      </div>
      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <TableHead cols={['Student', 'Program', 'Amount', 'Period', 'Date', 'Status', '']} />
          <tbody>
            {INVOICES.map((inv, i) => (
              <tr key={inv.id} style={{ borderTop: `1px solid ${C.borderFaint}` }}>
                <td style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.dark, padding: '14px 22px' }}>{inv.student}</td>
                <td style={{ fontFamily: FONT, fontSize: 13, color: C.body, padding: '14px 22px' }}>{inv.program}</td>
                <td style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.dark, padding: '14px 22px' }}>{inv.amount}</td>
                <td style={{ fontFamily: FONT, fontSize: 13, color: C.body, padding: '14px 22px' }}>{inv.month}</td>
                <td style={{ fontFamily: FONT, fontSize: 13, color: C.muted, padding: '14px 22px' }}>{inv.date}</td>
                <td style={{ padding: '14px 22px' }}><StatusChip label={inv.status} /></td>
                <td style={{ padding: '14px 22px' }}>
                  <button style={{ background: C.bgSection, border: 'none', borderRadius: 8, padding: '6px 12px', fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.body, cursor: 'pointer' }}>
                    {inv.status === 'paid' ? 'Download' : 'Remind'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // BROADCAST
  // ════════════════════════════════════════════════════════════════
  const BroadcastPage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 660 }}>
      <div style={card}>
        <div style={{ padding: '24px 28px' }}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: C.dark, marginBottom: 18 }}>New Broadcast</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.body, marginBottom: 10 }}>Send to</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['All Students', 'Beginners', 'Advanced', 'Adult Class', 'Parents'].map((g, i) => (
                <button key={g} style={{ background: i === 0 ? C.cta : C.bgSection, color: i === 0 ? '#fff' : C.body, border: `1.5px solid ${i === 0 ? C.cta : C.border}`, borderRadius: 50, padding: '6px 14px', fontFamily: FONT, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{g}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.body, marginBottom: 10 }}>Message</div>
            <textarea rows={4} placeholder="Type your message…" value={broadMsg} onChange={e => setBroadMsg(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', background: C.bgSection, borderRadius: 12, padding: '12px 14px', border: `1.5px solid ${C.border}`, fontFamily: FONT, fontSize: 14, color: C.dark, outline: 'none', resize: 'vertical' }} />
          </div>
          {broadSent ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 16px', background: 'rgba(56,174,140,0.08)', borderRadius: 11, border: '1.5px solid rgba(56,174,140,0.18)' }}>
              <CheckCircle size={15} color={C.teal} />
              <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.teal }}>Broadcast sent successfully!</span>
            </div>
          ) : (
            <button onClick={() => { if (broadMsg.trim()) { setBroadSent(true); setBroadMsg(''); setTimeout(() => setBroadSent(false), 3000); }}}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.cta, color: '#fff', border: 'none', borderRadius: 11, padding: '12px 24px', fontFamily: FONT, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              <Megaphone size={14} /> Send Broadcast
            </button>
          )}
        </div>
      </div>
      <div style={card}>
        <div style={{ padding: '20px 24px 14px' }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: C.dark }}>History</span>
        </div>
        <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { msg: 'Class cancelled tomorrow — pool maintenance',    to: 'All Students (132)', date: 'Apr 24' },
            { msg: 'Fee reminder: April invoices due by Apr 30',     to: 'All Students (132)', date: 'Apr 20' },
            { msg: 'New timing: Advanced Swim shifts to 6:30 PM',    to: 'Advanced (32)',       date: 'Apr 15' },
          ].map(b => (
            <div key={b.date} style={{ background: C.bgSection, borderRadius: 12, padding: '13px 16px' }}>
              <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 4 }}>{b.msg}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted }}>{b.to} · {b.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // REPORTS
  // ════════════════════════════════════════════════════════════════
  const ReportsPage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {([
          { label: 'Revenue (Apr)',  value: '₹60,100', change: '+12% vs Mar', up: true  },
          { label: 'Enrollments',   value: '247',      change: '+8 this month', up: true  },
          { label: 'Avg Attendance', value: '87%',     change: '-2% vs Mar',   up: false },
        ] as const).map(({ label, value, change, up }) => (
          <div key={label} style={card}>
            <div style={{ padding: '22px 24px' }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{label}</div>
              <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 30, color: C.dark, letterSpacing: '-0.02em', marginBottom: 7 }}>{value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <TrendingUp size={12} color={up ? C.teal : C.pink} />
                <span style={{ fontFamily: FONT, fontSize: 12, color: up ? C.teal : C.pink, fontWeight: 700 }}>{change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={card}>
          <div style={{ padding: '22px 24px' }}>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 20 }}>Monthly Revenue</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 7, height: 130 }}>
              {[62, 75, 68, 80, 72, 88, 100].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '100%', background: i === 6 ? `linear-gradient(180deg,${C.blue},${C.teal})` : 'rgba(58,140,200,0.16)', borderRadius: '5px 5px 0 0', height: `${h}%`, boxShadow: i === 6 ? '0 4px 14px rgba(58,140,200,0.28)' : 'none' }} />
                  <span style={{ fontFamily: FONT, fontSize: 9, color: C.muted, fontWeight: 600 }}>
                    {['Oct','Nov','Dec','Jan','Feb','Mar','Apr'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={card}>
          <div style={{ padding: '22px 24px' }}>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 20 }}>Students by Program</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { name: 'Beginner Swim',      count: 48, pct: 36, color: C.blue   },
                { name: 'Advanced Swim',      count: 32, pct: 24, color: C.purple },
                { name: 'Baby Splash',        count: 20, pct: 15, color: C.teal   },
                { name: 'Adult Conditioning', count: 18, pct: 14, color: C.amber  },
                { name: 'Competitive Swim',   count: 14, pct: 11, color: C.pink   },
              ].map(({ name, count, pct, color }) => (
                <div key={name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.body }}>{name}</span>
                    <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 800, color: C.dark }}>{count}</span>
                  </div>
                  <div style={{ height: 6, background: C.bgSection, borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: color, borderRadius: 10, width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // APPLICANTS
  // ════════════════════════════════════════════════════════════════
  const ApplicantsPage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontFamily: FONT, fontSize: 14, color: C.muted }}>{LEADS.length} applicants pending review</div>
      {LEADS.map(lead => (
        <div key={lead.id} style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 26px' }}>
            <Av name={lead.child} size={46} color={C.blue} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 4 }}>{lead.child}</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: C.body }}>Parent: {lead.parent} · Age {lead.age} · {lead.program}</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted, marginTop: 3 }}>Applied {lead.date} via {lead.source}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ background: 'rgba(56,174,140,0.10)', border: `1.5px solid rgba(56,174,140,0.18)`, borderRadius: 9, padding: '9px 20px', fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.teal, cursor: 'pointer' }}>Accept</button>
              <button style={{ background: 'rgba(241,24,89,0.08)', border: `1.5px solid rgba(241,24,89,0.14)`, borderRadius: 9, padding: '9px 20px', fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.pink, cursor: 'pointer' }}>Decline</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ════════════════════════════════════════════════════════════════
  // PROFILE
  // ════════════════════════════════════════════════════════════════
  const ProfilePage = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 620 }}>
      <div style={card}>
        <div style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 26 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg,${C.blue},${C.teal})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(58,140,200,0.25)', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 22, fontWeight: 900, color: '#fff' }}>ES</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 20, color: C.dark, marginBottom: 5 }}>Elite Swim Academy</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Star size={13} color={C.amber} fill={C.amber} />
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 800, color: C.dark }}>4.9</span>
                <span style={{ fontFamily: FONT, fontSize: 13, color: C.muted }}>(134 reviews)</span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.bgSection, border: `1.5px solid ${C.border}`, borderRadius: 9, padding: '8px 16px', fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.body, cursor: 'pointer' }}>
              <Pencil size={12} /> Edit Profile
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {([
              { label: 'Email',        value: 'hello@eliteswimacademy.com', Icon: Mail     },
              { label: 'Phone',        value: '+91 98765 43210',            Icon: Phone    },
              { label: 'Location',     value: 'Lavale, Pune',               Icon: MapPin   },
              { label: 'Member Since', value: 'January 2024',               Icon: Calendar },
            ] as const).map(({ label, value, Icon }) => (
              <div key={label} style={{ background: C.bgSection, borderRadius: 12, padding: '14px 16px', border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <Icon size={11} color={C.blue} />
                  <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                </div>
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.dark }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={card}>
        <div style={{ padding: '22px 28px' }}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 14 }}>Subscription</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `radial-gradient(ellipse at 80% 50%,rgba(195,220,245,0.22) 0%,transparent 60%),${C.bgSection}`, borderRadius: 14, padding: '16px 20px', border: `1.5px solid ${C.border}` }}>
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: C.dark, marginBottom: 4 }}>Pro Plan</div>
              <div style={{ fontFamily: FONT, fontSize: 13, color: C.muted }}>Unlimited students · Analytics · Priority support</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 20, color: C.blue }}>₹2,499/mo</div>
              <div style={{ fontFamily: FONT, fontSize: 12, color: C.muted, marginTop: 2 }}>Renews May 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Page map ─────────────────────────────────────────────────
  const PAGES: Record<Page, React.ReactNode> = {
    dashboard:  Dashboard,
    students:   StudentsPage,
    classes:    ClassesPage,
    schedule:   SchedulePage,
    payments:   PaymentsPage,
    broadcast:  BroadcastPage,
    reports:    ReportsPage,
    applicants: ApplicantsPage,
    profile:    ProfilePage,
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bgPage, fontFamily: FONT }}>
      {Sidebar}
      {Topbar}
      {alertsOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setAlerts(false)} />}
      <main style={{ marginLeft: SW, paddingTop: HH, minHeight: '100vh' }}>
        <div style={{ padding: '32px 36px', maxWidth: 1180 }}>
          {PAGES[page]}
        </div>
      </main>
    </div>
  );
}

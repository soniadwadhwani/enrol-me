import { useMemo, useState } from 'react';
import {
  Bell,
  House,
  CalendarDays,
  ChevronRight,
  CreditCard,
  MessageSquare,
  Settings,
  Star,
  User,
  UserPlus,
  Users,
  Wallet,
  X,
  AlertCircle,
  Calendar,
  FileText,
  Book,
  Image,
  Video,
  Phone,
  Download,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Logo from '../../imports/Logo.png';

type Tab = 'home' | 'students' | 'classes' | 'payments' | 'profile';
type StudentSegment = 'leads' | 'active' | 'trials' | 'add-student';
type ClassSegment = 'programs' | 'calendar' | 'add-class';
type PaymentSegment = 'all' | 'paid' | 'pending';
type OverlayPage =
  | null
  | 'reports'
  | 'broadcast'
  | 'my-users'
  | 'application-form'
  | 'new-applicants'
  | 'business-settings'
  | 'gallery'
  | 'testimonials'
  | 'reviews'
  | 'subscription';

type AlertRoute = 'leads' | 'overdue' | 'class' | 'review' | 'attendance';

type InvoiceStatus = 'pending' | 'paid' | 'overdue';

interface Lead {
  id: number;
  child: string;
  parent: string;
  age: number;
  source: string;
  preferredSlot: string;
}

interface ActiveStudent {
  id: number;
  name: string;
  className: string;
  fees: string;
  details: string;
}

interface TrialStudent {
  id: number;
  name: string;
  trialDate: string;
  followUp: string;
}

interface Program {
  id: string;
  className: string;
  coach: string;
  days: string;
  time: string;
  fees: string;
  capacity: number;
  ageGroup: string;
  location: string;
  enrolled: number;
  paused?: boolean;
}

interface Invoice {
  id: string;
  student: string;
  amount: number;
  dueDate?: string;
  paidOn?: string;
  status: InvoiceStatus;
}

interface OrgAlert {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: typeof AlertCircle;
  iconColor: string;
  route: AlertRoute;
}

interface Applicant {
  id: number;
  studentName: string;
  age: number;
  program: string;
  appliedDate: string;
  parentPhone: string;
  status: 'new' | 'approved' | 'rejected' | 'waitlist';
}

interface PaymentRow {
  id: string;
  student: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  dueDate: string;
  dueDateIso: string;
}

interface ApplicationFormField {
  id: string;
  label: string;
  required: boolean;
}

interface GalleryPhoto {
  id: string;
  title: string;
  tint: string;
}

interface TextTestimonial {
  id: string;
  author: string;
  message: string;
}

interface VideoTestimonial {
  id: string;
  title: string;
  duration: string;
}

const createInitialPaymentRows = (): PaymentRow[] => {
  const names = [
    'Aarav Sharma', 'Diya Patel', 'Kabir Nair', 'Mira Joshi', 'Shaurya Rao', 'Anaya Mehta', 'Vihaan Sinha',
    'Riya Kapoor', 'Neel Gupta', 'Aanya Shah', 'Ishaan Kale', 'Rohan Verma', 'Saanvi Iyer', 'Nitya Jain',
    'Arjun Sethi', 'Meera Shah', 'Kunal Das', 'Tanvi Bhatt', 'Reyansh Singh', 'Ira Menon',
  ];

  const paidRows = Array.from({ length: 80 }, (_, index) => {
    const amount = 1500 + ((index % 7) * 300);
    const paidDay = ((index % 25) + 1).toString().padStart(2, '0');
    return {
      id: `INV-${1201 + index}`,
      student: `${names[index % names.length]} ${index >= names.length ? String.fromCharCode(65 + (index % 5)) : ''}`.trim(),
      amount,
      status: 'paid' as const,
      paidDate: `${paidDay} Apr 2026`,
      dueDate: `${paidDay} Apr 2026`,
      dueDateIso: `2026-04-${paidDay}`,
    };
  });

  const pendingRows: PaymentRow[] = [
    { id: 'INV-2001', student: 'Parth Kulkarni', amount: 3500, status: 'pending', dueDate: '30 Apr 2026', dueDateIso: '2026-04-30' },
    { id: 'INV-2002', student: 'Aditi Rao', amount: 3000, status: 'pending', dueDate: '28 Apr 2026', dueDateIso: '2026-04-28' },
    { id: 'INV-2003', student: 'Ishan Gupta', amount: 2800, status: 'pending', dueDate: '10 May 2026', dueDateIso: '2026-05-10' },
    { id: 'INV-2004', student: 'Mahi Jain', amount: 3200, status: 'pending', dueDate: '06 May 2026', dueDateIso: '2026-05-06' },
    { id: 'INV-2005', student: 'Vivan Patil', amount: 3000, status: 'pending', dueDate: '03 May 2026', dueDateIso: '2026-05-03' },
    { id: 'INV-2006', student: 'Rudra Shah', amount: 4200, status: 'overdue', dueDate: '10 Mar 2026', dueDateIso: '2026-03-10' },
    { id: 'INV-2007', student: 'Siya Nair', amount: 4800, status: 'overdue', dueDate: '05 Mar 2026', dueDateIso: '2026-03-05' },
  ];

  return [...paidRows, ...pendingRows];
};

const MONTH_LABEL = 'Apr 2026';

interface OrganisationDashboardProps {
  onLogout?: () => void;
}

export default function OrganisationDashboard({ onLogout }: OrganisationDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [overlayPage, setOverlayPage] = useState<OverlayPage>(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [studentSegment, setStudentSegment] = useState<StudentSegment>('leads');
  const [classSegment, setClassSegment] = useState<ClassSegment>('programs');
  const [paymentSegment, setPaymentSegment] = useState<PaymentSegment>('all');

  const [attendanceMode, setAttendanceMode] = useState(false);
  const [addStudentMode, setAddStudentMode] = useState<'regular' | 'offline'>('regular');

  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(8);

  const [individualSearch, setIndividualSearch] = useState('');
  const [broadcastClassTarget, setBroadcastClassTarget] = useState<string>('Beginner Swim');

  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, 'present' | 'absent' | null>>({});

  const [plans] = useState(['Free', 'Starter', 'Growth', 'Gold']);
  const [currentPlan, setCurrentPlan] = useState('Starter');
  const [reportView, setReportView] = useState<'home' | 'attendance' | 'payment'>('home');
  const [attendanceReportClass, setAttendanceReportClass] = useState('Kids Swimming');
  const [attendanceReportPeriod, setAttendanceReportPeriod] = useState<'This Month' | 'Last Month' | 'Custom Range'>('This Month');
  const [paymentReportClass, setPaymentReportClass] = useState('All Classes');
  const [paymentReportMonth, setPaymentReportMonth] = useState('April 2026');
  const [showPaymentCustomRange, setShowPaymentCustomRange] = useState(false);
  const [paymentRangeStart, setPaymentRangeStart] = useState('2026-04-01');
  const [paymentRangeEnd, setPaymentRangeEnd] = useState('2026-04-30');
  const [reportSelectorSheet, setReportSelectorSheet] = useState<null | 'attendance-class' | 'payment-class' | 'payment-month'>(null);
  const [isApplicationFormEnabled, setIsApplicationFormEnabled] = useState(true);
  const [applicantSearch, setApplicantSearch] = useState('');
  const [applicantFilter, setApplicantFilter] = useState<'all' | 'new' | 'approved' | 'rejected' | 'waitlist'>('all');
  const [showApplicantFilterSheet, setShowApplicantFilterSheet] = useState(false);
  const [applicationFormFields, setApplicationFormFields] = useState<ApplicationFormField[]>([
    { id: 'field-student-name', label: 'Student Name', required: true },
    { id: 'field-age', label: 'Age', required: true },
    { id: 'field-parent-name', label: 'Parent Name', required: true },
    { id: 'field-phone', label: 'Phone', required: true },
    { id: 'field-program', label: 'Preferred Program', required: true },
    { id: 'field-timing', label: 'Preferred Timing', required: false },
    { id: 'field-notes', label: 'Notes', required: false },
  ]);
  const [isEditingFormFields, setIsEditingFormFields] = useState(false);
  const [newFormFieldLabel, setNewFormFieldLabel] = useState('');
  const [applicationFormShareMessage, setApplicationFormShareMessage] = useState('');

  const [businessSettings, setBusinessSettings] = useState({
    businessName: 'Elite Swim Academy',
    address: 'Lavale, Pune 411021',
    contact: '+91 98765 43210',
    logoUrl: 'https://example.com/logo.png',
    description: 'Structured coaching for swimming, coding, and movement programs.',
  });
  const [businessSettingsSavedMessage, setBusinessSettingsSavedMessage] = useState('');

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([
    { id: 'photo-1', title: 'Beginner Swim Batch', tint: '#DFF0EA' },
    { id: 'photo-2', title: 'Advanced Lane Training', tint: '#E8F2FB' },
    { id: 'photo-3', title: 'Weekend Group Session', tint: '#FFF4E8' },
  ]);
  const [nextGalleryPhotoId, setNextGalleryPhotoId] = useState(4);

  const [textTestimonials, setTextTestimonials] = useState<TextTestimonial[]>([
    { id: 'text-1', author: 'Priya Sinha', message: 'The coaches are patient and my son has become very confident in water.' },
  ]);
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([
    { id: 'video-1', title: 'Parent Feedback - Aarav', duration: '00:47' },
  ]);
  const [newTextTestimonial, setNewTextTestimonial] = useState('');
  const [editingTextTestimonialId, setEditingTextTestimonialId] = useState<string | null>(null);
  const [editingTextTestimonialValue, setEditingTextTestimonialValue] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');

  const leads: Lead[] = [
    { id: 101, child: 'Anaya Mehta', parent: 'Rohit Mehta', age: 8, source: 'Instagram Ad', preferredSlot: 'Mon Wed Fri · 5:00 PM' },
    { id: 102, child: 'Vihaan Sinha', parent: 'Priya Sinha', age: 10, source: 'Word of Mouth', preferredSlot: 'Tue Thu · 6:30 PM' },
    { id: 103, child: 'Riya Kapoor', parent: 'Sonal Kapoor', age: 6, source: 'Google Search', preferredSlot: 'Sat Sun · 10:00 AM' },
    { id: 104, child: 'Neel Gupta', parent: 'Shreya Gupta', age: 7, source: 'Referral', preferredSlot: 'Mon Wed Fri · 6:30 PM' },
  ];

  const [activeStudents, setActiveStudents] = useState<ActiveStudent[]>([
    { id: 1, name: 'Aarav Sharma', className: 'Beginner Swim', fees: 'Paid till Apr', details: 'Mon Wed Fri · 5 PM' },
    { id: 2, name: 'Diya Patel', className: 'Advanced Swim', fees: 'Paid till Apr', details: 'Tue Thu Sat · 6:30 PM' },
    { id: 3, name: 'Kabir Nair', className: 'Advanced Swim', fees: 'Pending Apr', details: 'Tue Thu Sat · 6:30 PM' },
    { id: 4, name: 'Mira Joshi', className: 'Kids Coding', fees: 'Paid till Apr', details: 'Mon Wed · 4 PM' },
  ]);

  const trialStudents: TrialStudent[] = [
    { id: 1, name: 'Aanya Shah', trialDate: 'Tomorrow · 5:00 PM', followUp: 'Call Parent' },
    { id: 2, name: 'Ishaan Kale', trialDate: 'Wed · 6:30 PM', followUp: 'Send Reminder' },
  ];

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 'P-01',
      className: 'Beginner Swim',
      coach: 'Coach Sarah',
      days: 'Mon, Wed, Fri',
      time: '5:00 PM',
      fees: '₹3,500',
      capacity: 16,
      ageGroup: '6-10 years',
      location: 'Lavale Pool 1',
      enrolled: 15,
    },
    {
      id: 'P-02',
      className: 'Advanced Swim',
      coach: 'Coach Mike',
      days: 'Tue, Thu, Sat',
      time: '6:30 PM',
      fees: '₹4,200',
      capacity: 12,
      ageGroup: '10-15 years',
      location: 'Lavale Pool 2',
      enrolled: 12,
    },
    {
      id: 'P-03',
      className: 'Kids Coding',
      coach: 'Coach Rhea',
      days: 'Mon, Wed',
      time: '4:00 PM',
      fees: '₹2,800',
      capacity: 18,
      ageGroup: '8-13 years',
      location: 'Studio B',
      enrolled: 13,
    },
    {
      id: 'P-04',
      className: 'Dance Juniors',
      coach: 'Coach Aman',
      days: 'Tue, Thu',
      time: '5:30 PM',
      fees: '₹2,500',
      capacity: 20,
      ageGroup: '6-11 years',
      location: 'Dance Hall',
      enrolled: 17,
    },
  ]);

  const [newProgram, setNewProgram] = useState({
    className: '',
    coach: '',
    days: '',
    time: '',
    fees: '',
    capacity: '',
    ageGroup: '',
    location: '',
  });

  const todayStr = new Date().toISOString().split('T')[0];

  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    parentName: '',
    phone: '',
    program: '',
    fees: '',
    joiningDate: todayStr,
  });

  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [studentErrors, setStudentErrors] = useState<Partial<Record<string, string>>>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [nextStudentId, setNextStudentId] = useState(5);

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'INV-301', student: 'Kabir Nair', amount: 3500, dueDate: '26 Apr', status: 'overdue' },
    { id: 'INV-302', student: 'Mira Joshi', amount: 2500, dueDate: '24 Apr', status: 'overdue' },
    { id: 'INV-303', student: 'Shaurya Rao', amount: 3000, dueDate: '30 Apr', status: 'pending' },
    { id: 'INV-304', student: 'Anaya Mehta', amount: 2500, dueDate: '30 Apr', status: 'pending' },
    { id: 'INV-305', student: 'Vihaan Sinha', amount: 2000, dueDate: '29 Apr', status: 'pending' },
    { id: 'INV-306', student: 'Riya Kapoor', amount: 2500, dueDate: '28 Apr', status: 'pending' },
    { id: 'INV-307', student: 'Neel Gupta', amount: 2500, dueDate: '30 Apr', status: 'pending' },
    { id: 'INV-308', student: 'Aarav Sharma', amount: 3500, paidOn: '19 Apr', status: 'paid' },
    { id: 'INV-309', student: 'Diya Patel', amount: 4200, paidOn: '20 Apr', status: 'paid' },
    { id: 'INV-310', student: 'Aanya Shah', amount: 2800, paidOn: '17 Apr', status: 'paid' },
  ]);
  const [paymentRows, setPaymentRows] = useState<PaymentRow[]>(createInitialPaymentRows());

  const [alertsList, setAlertsList] = useState<OrgAlert[]>([
    {
      id: 1,
      title: 'New enquiry received',
      message: 'Shaurya Rao submitted a new application',
      time: '5 min ago',
      unread: true,
      icon: AlertCircle,
      iconColor: '#74A4BC',
      route: 'leads',
    },
    {
      id: 2,
      title: 'Payment overdue',
      message: 'Kabir Nair fee payment is overdue',
      time: '22 min ago',
      unread: true,
      icon: CreditCard as typeof AlertCircle,
      iconColor: '#F11859',
      route: 'overdue',
    },
    {
      id: 3,
      title: 'Class starts in 1 hour',
      message: 'Beginner Swim starts at 5:00 PM',
      time: '40 min ago',
      unread: true,
      icon: Calendar as typeof AlertCircle,
      iconColor: '#74A4BC',
      route: 'class',
    },
    {
      id: 4,
      title: 'Review received',
      message: 'A parent left a 5-star review',
      time: '1h ago',
      unread: false,
      icon: Book as typeof AlertCircle,
      iconColor: '#B6D6CC',
      route: 'review',
    },
    {
      id: 5,
      title: 'Attendance pending',
      message: '2 batches still need attendance marked',
      time: '2h ago',
      unread: false,
      icon: AlertCircle,
      iconColor: '#E57373',
      route: 'attendance',
    },
  ]);

  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: 501, studentName: 'Shaurya Rao', age: 9, program: 'Kids Swimming', appliedDate: '24 Apr 2026', parentPhone: '9876543210', status: 'new' },
    { id: 502, studentName: 'Aarav Jain', age: 11, program: 'Advanced Swim', appliedDate: '24 Apr 2026', parentPhone: '9823012456', status: 'new' },
    { id: 503, studentName: 'Riya Nene', age: 8, program: 'Coding Kids', appliedDate: '23 Apr 2026', parentPhone: '9898981212', status: 'waitlist' },
    { id: 504, studentName: 'Diya Menon', age: 7, program: 'Dance Juniors', appliedDate: '22 Apr 2026', parentPhone: '9765412309', status: 'approved' },
    { id: 505, studentName: 'Kabir Kulkarni', age: 6, program: 'Yoga Kids', appliedDate: '21 Apr 2026', parentPhone: '9012567345', status: 'new' },
  ]);

  const totalStudents = 87;

  const paidPaymentRows = useMemo(() => paymentRows.filter((row) => row.status === 'paid'), [paymentRows]);
  const unpaidPaymentRows = useMemo(() => paymentRows.filter((row) => row.status !== 'paid'), [paymentRows]);
  const pendingCount = unpaidPaymentRows.length;
  const paidCount = paidPaymentRows.length;
  const collectedThisMonth = 142000;
  const pendingAmount = 24500;

  const alertsUnreadCount = alertsList.filter((item) => item.unread).length;

  const calendarDates = Array.from({ length: 30 }, (_, i) => i + 1);

  const classDotsByDate: Record<number, string[]> = {
    2: ['Beginner Swim'],
    3: ['Advanced Swim', 'Dance Juniors'],
    5: ['Kids Coding'],
    8: ['Beginner Swim', 'Advanced Swim', 'Kids Coding'],
    10: ['Dance Juniors'],
    12: ['Beginner Swim'],
    15: ['Advanced Swim', 'Kids Coding'],
    18: ['Beginner Swim'],
    21: ['Kids Coding', 'Dance Juniors'],
    24: ['Advanced Swim'],
    28: ['Beginner Swim', 'Dance Juniors'],
  };

  const selectedDateClasses = classDotsByDate[selectedCalendarDate] ?? [];

  const filteredIndividualStudents = useMemo(() => {
    const names = activeStudents.map((row) => row.name);
    return names.filter((name) => name.toLowerCase().includes(individualSearch.toLowerCase()));
  }, [individualSearch, activeStudents]);

  const selectedProgram = programs.find((program) => program.id === selectedProgramId) ?? null;
  const editingProgram = programs.find((program) => program.id === editingProgramId) ?? null;
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.studentName.toLowerCase().includes(applicantSearch.toLowerCase())
      || applicant.program.toLowerCase().includes(applicantSearch.toLowerCase())
      || applicant.parentPhone.includes(applicantSearch);
    const matchesFilter = applicantFilter === 'all' ? true : applicant.status === applicantFilter;
    return matchesSearch && matchesFilter;
  });

  const setTabAndCloseOverlay = (tab: Tab) => {
    setOverlayPage(null);
    setActiveTab(tab);
  };

  const markInvoicePaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              status: 'paid',
              paidOn: 'Today',
              dueDate: undefined,
            }
          : row,
      ),
    );
  };

  const markPaymentRowPaid = (id: string) => {
    setPaymentRows((prev) => prev.map((row) => (
      row.id === id
        ? {
            ...row,
            status: 'paid',
            paidDate: 'Today',
            dueDate: 'Today',
            dueDateIso: new Date().toISOString().split('T')[0],
          }
        : row
    )));
  };

  const segmentPill = (id: string, label: string, active: boolean, onClick: () => void) => (
    <button
      key={id}
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: '20px',
        padding: '6px 14px',
        fontSize: '14px',
        fontWeight: 700,
        backgroundColor: active ? '#B6D6CC' : '#E8F5F1',
        color: active ? '#111318' : '#6E7480',
        cursor: 'pointer',
        fontFamily: 'Raleway, sans-serif',
      }}
    >
      {label}
    </button>
  );

  const openStudentsAdd = (mode: 'regular' | 'offline') => {
    setOverlayPage(null);
    setActiveTab('students');
    setStudentSegment('add-student');
    setAttendanceMode(false);
    setAddStudentMode(mode);
  };

  const openAttendanceMode = () => {
    setOverlayPage(null);
    setActiveTab('students');
    setStudentSegment('active');
    setAttendanceMode(true);
  };

  const handleAlertClick = (alert: OrgAlert) => {
    setAlertsList((prev) => prev.map((row) => (row.id === alert.id ? { ...row, unread: false } : row)));
    setShowAlerts(false);

    if (alert.route === 'leads') {
      setOverlayPage(null);
      setActiveTab('students');
      setStudentSegment('leads');
      setAttendanceMode(false);
      return;
    }

    if (alert.route === 'overdue') {
      setOverlayPage(null);
      setActiveTab('payments');
      setPaymentSegment('pending');
      return;
    }

    if (alert.route === 'class') {
      setOverlayPage(null);
      setActiveTab('classes');
      setClassSegment('calendar');
      setSelectedCalendarDate(8);
      return;
    }

    if (alert.route === 'review') {
      setActiveTab('profile');
      setOverlayPage('reviews');
      return;
    }

    openAttendanceMode();
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    if (onLogout) {
      onLogout();
      return;
    }
    window.location.reload();
  };

  const markAllAlertsRead = () => {
    setAlertsList((prev) => prev.map((row) => ({ ...row, unread: false })));
  };

  const updateApplicantStatus = (applicantId: number, status: Applicant['status']) => {
    setApplicants((prev) => prev.map((row) => (row.id === applicantId ? { ...row, status } : row)));
  };

  const addApplicationFormField = () => {
    const trimmed = newFormFieldLabel.trim();
    if (!trimmed) return;
    const id = `field-custom-${Date.now()}`;
    setApplicationFormFields((prev) => [...prev, { id, label: trimmed, required: false }]);
    setNewFormFieldLabel('');
  };

  const removeApplicationFormField = (fieldId: string) => {
    setApplicationFormFields((prev) => prev.filter((field) => field.id !== fieldId));
  };

  const toggleApplicationFieldRequired = (fieldId: string) => {
    setApplicationFormFields((prev) => prev.map((field) => (
      field.id === fieldId ? { ...field, required: !field.required } : field
    )));
  };

  const handleShareApplicationForm = () => {
    setApplicationFormShareMessage('Share link ready: enrolme.app/form/elite-swim-academy');
  };

  const updateBusinessSetting = (key: keyof typeof businessSettings, value: string) => {
    setBusinessSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveBusinessSettings = () => {
    setBusinessSettingsSavedMessage('Business settings saved successfully');
  };

  const addDummyGalleryPhoto = () => {
    const palette = ['#DFF0EA', '#E8F2FB', '#FFF4E8', '#FCECEE', '#EAF7F4'];
    const nextId = nextGalleryPhotoId;
    setGalleryPhotos((prev) => [
      ...prev,
      {
        id: `photo-${nextId}`,
        title: `Class Moment ${nextId}`,
        tint: palette[(nextId - 1) % palette.length],
      },
    ]);
    setNextGalleryPhotoId((prev) => prev + 1);
  };

  const addTextTestimonial = () => {
    const trimmed = newTextTestimonial.trim();
    if (!trimmed) return;
    setTextTestimonials((prev) => [
      ...prev,
      {
        id: `text-${Date.now()}`,
        author: 'New Parent',
        message: trimmed,
      },
    ]);
    setNewTextTestimonial('');
  };

  const startEditTextTestimonial = (item: TextTestimonial) => {
    setEditingTextTestimonialId(item.id);
    setEditingTextTestimonialValue(item.message);
  };

  const saveEditedTextTestimonial = () => {
    if (!editingTextTestimonialId) return;
    const trimmed = editingTextTestimonialValue.trim();
    if (!trimmed) return;
    setTextTestimonials((prev) => prev.map((item) => (
      item.id === editingTextTestimonialId ? { ...item, message: trimmed } : item
    )));
    setEditingTextTestimonialId(null);
    setEditingTextTestimonialValue('');
  };

  const addVideoTestimonial = () => {
    const trimmed = newVideoTitle.trim();
    if (!trimmed) return;
    const duration = `00:${String(38 + (videoTestimonials.length % 20)).padStart(2, '0')}`;
    setVideoTestimonials((prev) => [
      ...prev,
      { id: `video-${Date.now()}`, title: trimmed, duration },
    ]);
    setNewVideoTitle('');
  };

  const shortcuts = [
    {
      id: 'add-student',
      label: '+ Student',
      icon: UserPlus,
      onTap: () => openStudentsAdd('regular'),
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Users,
      onTap: openAttendanceMode,
    },
    {
      id: 'invoice',
      label: 'Invoice',
      icon: CreditCard,
      onTap: () => {
        setOverlayPage(null);
        setActiveTab('payments');
        setPaymentSegment('all');
      },
    },
    {
      id: 'broadcast',
      label: 'Broadcast',
      icon: MessageSquare,
      onTap: () => setOverlayPage('broadcast'),
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      onTap: () => setOverlayPage('reports'),
    },
    {
      id: 'new-applicants',
      label: 'Applicants',
      icon: Book,
      onTap: () => setOverlayPage('new-applicants'),
    },
  ] as const;

  const renderMascot = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBottom: '4px', overflow: 'visible' }}>
      <div style={{ transform: 'scale(0.82)', transformOrigin: 'top left', width: '148px', height: '148px', position: 'relative', flexShrink: 0 }}>
        <motion.button
          onClick={() => setOverlayPage('reports')}
          whileTap={{ scale: 1.05, y: -4 }}
          style={{
            width: '170px',
            height: '170px',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'visible',
            padding: 0,
            background: 'transparent'
          }}
        >
          <motion.div
            animate={{
              opacity: [0.08, 0.12, 0.08],
              scale: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50%',
              height: '18px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(100, 150, 190, 0.18) 0%, rgba(80, 130, 170, 0.06) 60%, transparent 80%)',
              filter: 'blur(10px)'
            }}
          />

          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [0.3, 1.2, 0.3]
            }}
            transition={{
              y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative'
            }}
          >
            <motion.div
              animate={{
                scaleY: [1, 1.02, 1, 0.98, 1],
                scaleX: [1, 0.99, 1, 1.01, 1]
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                top: '6%',
                left: '12%',
                width: '90%',
                height: '88%',
                borderRadius: '48% 52% 50% 50% / 44% 44% 78% 78%',
                background: 'linear-gradient(180deg, rgba(190, 160, 230, 0.96) 0%, rgba(205, 170, 235, 0.97) 10%, rgba(220, 180, 228, 0.97) 20%, rgba(240, 190, 210, 0.97) 32%, rgba(255, 220, 180, 0.98) 44%, rgba(210, 245, 215, 0.97) 56%, rgba(170, 235, 230, 0.98) 68%, rgba(140, 215, 240, 0.99) 82%, rgba(110, 205, 240, 0.99) 100%)',
                boxShadow: '0 24px 52px rgba(120, 160, 200, 0.55), 0 10px 28px rgba(17, 19, 24, 0.15), inset -10px -14px 35px rgba(80, 170, 225, 0.6), inset 10px 10px 35px rgba(255, 255, 255, 0.95)',
                overflow: 'visible',
                filter: 'blur(0.5px)'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '48% 52% 50% 50% / 44% 44% 78% 78%',
                background: 'linear-gradient(180deg, rgba(190, 215, 245, 0.75) 0%, rgba(175, 225, 248, 0.72) 50%, rgba(165, 230, 250, 0.78) 100%)',
                filter: 'blur(12px)',
                zIndex: -1
              }} />

              <motion.div
                animate={{
                  opacity: [0.95, 1, 0.95],
                  scale: [1, 1.06, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  top: '12%',
                  left: '28%',
                  width: '32%',
                  height: '20%',
                  borderRadius: '55% 45% 50% 50% / 60% 65% 35% 40%',
                  background: 'radial-gradient(ellipse at 35% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.88) 30%, rgba(255, 255, 255, 0.5) 62%, transparent 85%)',
                  filter: 'blur(4px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.92, 1, 0.92], scale: [1, 1.04, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '14%',
                  width: '72%',
                  height: '34%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at 50% 35%, rgba(180, 145, 225, 0.96) 0%, rgba(190, 155, 230, 0.88) 38%, rgba(200, 165, 235, 0.6) 68%, transparent 88%)',
                  filter: 'blur(16px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.88, 0.96, 0.88], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '22%',
                  left: '18%',
                  width: '64%',
                  height: '32%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(235, 170, 210, 0.92) 0%, rgba(240, 180, 220, 0.82) 38%, rgba(245, 190, 230, 0.55) 68%, transparent 88%)',
                  filter: 'blur(14px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.94, 1, 0.94], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '24%',
                  width: '52%',
                  height: '34%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 220, 160, 0.96) 0%, rgba(255, 228, 175, 0.88) 36%, rgba(255, 235, 190, 0.65) 66%, transparent 88%)',
                  filter: 'blur(12px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.92, 1, 0.92], y: ['0%', '2%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '48%',
                  left: '18%',
                  width: '64%',
                  height: '38%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at 50% 46%, rgba(160, 235, 210, 0.96) 0%, rgba(175, 240, 220, 0.88) 36%, rgba(190, 245, 230, 0.68) 66%, transparent 88%)',
                  filter: 'blur(14px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.96, 1, 0.96], y: ['0%', '3%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '12%',
                  left: '14%',
                  width: '72%',
                  height: '48%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at 50% 54%, rgba(125, 215, 245, 0.98) 0%, rgba(145, 225, 248, 0.92) 36%, rgba(165, 235, 250, 0.78) 66%, transparent 88%)',
                  filter: 'blur(14px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.92, 1, 0.92] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '18%',
                  left: '22%',
                  width: '56%',
                  height: '42%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(105, 210, 240, 0.98) 0%, rgba(125, 220, 245, 0.82) 48%, transparent 78%)',
                  filter: 'blur(17px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.9, 0.98, 0.9], scaleY: [1, 1.03, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '3%',
                  left: '40%',
                  width: '20%',
                  height: '18%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse at 50% 28%, rgba(115, 210, 240, 0.98) 0%, rgba(135, 220, 245, 0.78) 45%, transparent 72%)',
                  filter: 'blur(10px)'
                }}
              />

              <motion.div
                animate={{ opacity: [0.56, 0.72, 0.56], scale: [1, 1.1, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '26%',
                  left: '28%',
                  width: '44%',
                  height: '42%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.76) 0%, rgba(250, 252, 255, 0.46) 48%, transparent 78%)',
                  filter: 'blur(22px)'
                }}
              />

              <div style={{
                position: 'absolute',
                top: '20%',
                right: '12%',
                width: '22%',
                height: '38%',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.52) 0%, rgba(245, 250, 255, 0.3) 48%, transparent 100%)',
                filter: 'blur(9px)'
              }} />
            </motion.div>

            <motion.div
              animate={{ x: [-1.5, 0.8, -1.5], scaleX: [1, 1.04, 1], scaleY: [1, 1.02, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '2%',
                width: '30px',
                height: '42px',
                borderRadius: '50% 45% 48% 52% / 45% 50% 50% 55%',
                background: 'linear-gradient(155deg, rgba(175, 235, 248, 0.85) 0%, rgba(185, 238, 250, 0.82) 50%, rgba(165, 230, 245, 0.8) 100%)',
                boxShadow: 'inset -2px 1px 8px rgba(125, 200, 235, 0.32), 0 4px 10px rgba(160, 215, 240, 0.28)',
                filter: 'blur(0.5px)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '18%',
                left: '15%',
                width: '48%',
                height: '42%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(225, 248, 255, 0.22) 60%, transparent 85%)',
                filter: 'blur(5px)'
              }} />
            </motion.div>

            <motion.div
              animate={{ x: [1.5, -0.8, 1.5], scaleX: [1, 1.04, 1], scaleY: [1, 1.02, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
              style={{
                position: 'absolute',
                top: '50%',
                right: '22%',
                width: '30px',
                height: '42px',
                borderRadius: '45% 50% 52% 48% / 50% 45% 55% 50%',
                background: 'linear-gradient(-155deg, rgba(175, 235, 248, 0.85) 0%, rgba(185, 238, 250, 0.82) 50%, rgba(165, 230, 245, 0.8) 100%)',
                boxShadow: 'inset 2px 1px 8px rgba(125, 200, 235, 0.32), 0 4px 10px rgba(160, 215, 240, 0.28)',
                filter: 'blur(0.5px)',
                zIndex: -1
              }}
            >
              <div style={{
                position: 'absolute',
                top: '18%',
                right: '15%',
                width: '48%',
                height: '42%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(225, 248, 255, 0.22) 60%, transparent 85%)',
                filter: 'blur(5px)'
              }} />
            </motion.div>

            <div style={{
              position: 'absolute',
              top: '30%',
              left: '65%',
              transform: 'translateX(-50%)',
              width: '88px',
              height: '52px'
            }}>
              <motion.div
                animate={{ scaleY: [1, 0.05, 1, 1, 1, 1, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.025, 0.05, 0.08, 0.94, 0.97, 1], repeatDelay: 3 }}
                style={{
                  position: 'absolute',
                  top: '5px',
                  left: '24px',
                  width: '10px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
                  boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(75, 137, 184, 0.35)'
                }}
              />

              <motion.div
                animate={{ scaleY: [1, 0.05, 1, 1, 1, 1, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.025, 0.05, 0.08, 0.94, 0.97, 1], repeatDelay: 3 }}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '20px',
                  width: '10px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
                  boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(75, 137, 184, 0.35)'
                }}
              />

              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '32px',
                height: '16px',
                borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
                boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.18)',
                overflow: 'hidden'
              }} />
            </div>

            <motion.div
              animate={{ opacity: [0.16, 0.24, 0.16], scale: [1, 1.1, 1] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-16px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(180, 220, 248, 0.28) 0%, rgba(160, 210, 243, 0.18) 50%, rgba(140, 200, 238, 0.08) 75%, transparent 90%)',
                filter: 'blur(22px)',
                pointerEvents: 'none'
              }}
            />

          </motion.div>

          <motion.div
            whileTap={{ opacity: [0, 0.75, 0], scale: [0.88, 1.18, 1] }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230, 245, 255, 0.65) 0%, rgba(200, 235, 250, 0.45) 55%, transparent 80%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
              opacity: 0
            }}
          />
        </motion.button>
      </div>

      <motion.div
        animate={{ opacity: [0.94, 1, 0.94], y: [-1, 1, -1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          flex: 1,
          maxWidth: '170px',
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '12px 14px',
          boxShadow: '0 8px 24px rgba(17, 19, 24, 0.12)'
        }}
      >
        <div style={{
          position: 'absolute',
          left: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '10px solid #FFFFFF'
        }} />

        <div style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#111318',
          lineHeight: '1.35',
          textAlign: 'center'
        }}>
          Today at a glance ✨
        </div>
      </motion.div>
    </div>
  );

  const handleProgramEditField = (field: keyof Program, value: string) => {
    if (!editingProgram) return;
    setPrograms((prev) =>
      prev.map((row) => {
        if (row.id !== editingProgram.id) return row;

        if (field === 'capacity' || field === 'enrolled') {
          return { ...row, [field]: Number(value) || 0 };
        }

        return { ...row, [field]: value };
      }),
    );
  };

  const validateStudentForm = () => {
    const errors: Partial<Record<string, string>> = {};
    if (!newStudent.name.trim()) errors.name = 'Name is required';
    if (!newStudent.age) {
      errors.age = 'Age is required';
    } else {
      const age = parseInt(newStudent.age, 10);
      if (isNaN(age) || age < 3 || age > 25) errors.age = 'Age must be between 3 and 25';
    }
    if (!newStudent.parentName.trim()) errors.parentName = 'Parent name is required';
    if (!newStudent.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(newStudent.phone)) {
      errors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!newStudent.program) errors.program = 'Please select a program';
    return errors;
  };

  const isStudentFormValid = () => Object.keys(validateStudentForm()).length === 0;

  const handleAddStudent = () => {
    const errors = validateStudentForm();
    setStudentErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const selectedProgram = programs.find((p) => p.className === newStudent.program);
    const feesStr = newStudent.fees || selectedProgram?.fees || '₹0';
    const amountNum = parseInt(feesStr.replace(/[₹,]/g, ''), 10) || 0;
    const dueDateDisplay = newStudent.joiningDate
      ? new Date(newStudent.joiningDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
      : '30 May';

    const newId = nextStudentId;
    setNextStudentId((prev) => prev + 1);

    setActiveStudents((prev) => [
      ...prev,
      {
        id: newId,
        name: newStudent.name,
        className: newStudent.program,
        fees: `Due ${dueDateDisplay}`,
        details: selectedProgram ? `${selectedProgram.days} · ${selectedProgram.time}` : '',
      },
    ]);

    setInvoices((prev) => [
      ...prev,
      {
        id: `INV-${400 + newId}`,
        student: newStudent.name,
        amount: amountNum,
        dueDate: dueDateDisplay,
        status: 'pending',
      },
    ]);

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);

    setNewStudent({ name: '', age: '', parentName: '', phone: '', program: '', fees: '', joiningDate: todayStr });
    setStudentErrors({});
    setShowProgramDropdown(false);
    setStudentSegment('active');
  };

  const saveAddClass = () => {
    if (!newProgram.className.trim()) return;

    setPrograms((prev) => [
      ...prev,
      {
        id: `P-${String(prev.length + 1).padStart(2, '0')}`,
        className: newProgram.className,
        coach: newProgram.coach || 'Coach TBD',
        days: newProgram.days || 'TBD',
        time: newProgram.time || 'TBD',
        fees: newProgram.fees || '₹0',
        capacity: Number(newProgram.capacity) || 0,
        ageGroup: newProgram.ageGroup || 'TBD',
        location: newProgram.location || 'TBD',
        enrolled: 0,
      },
    ]);

    setNewProgram({
      className: '',
      coach: '',
      days: '',
      time: '',
      fees: '',
      capacity: '',
      ageGroup: '',
      location: '',
    });
    setClassSegment('programs');
  };

  const renderHome = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ paddingTop: '6px', paddingBottom: '2px' }}>
        {renderMascot()}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
        {shortcuts.map(({ id, label, icon: Icon, onTap }) => (
          <motion.button
            key={id}
            whileTap={{ scale: 0.97 }}
            onClick={onTap}
            style={{
              border: 'none',
              borderRadius: '18px',
              padding: '14px 8px 12px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 3px 14px rgba(17,19,24,0.06)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              minHeight: '86px',
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            <div style={{ width: '34px', height: '34px', borderRadius: '12px', backgroundColor: '#E8F5F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={16} color="#74A4BC" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#111318', lineHeight: 1.2, textAlign: 'center' }}>{label}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setOverlayPage('reports')}
        style={{
          border: 'none',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '12px 14px',
          cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '14px', color: '#6E7480', fontWeight: 400 }}>87 Students   •   7 Today   •   4.8★ Rating</span>
        <ChevronRight size={16} color="#6E7480" />
      </motion.button>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '12px' }}>Today</h3>
        {['5 PM Beginner Swim', '6:30 PM Advanced Swim', '3 Fee Follow-ups'].map((task, index) => (
          <div
            key={task}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#111318',
              padding: '10px 0',
              borderBottom: index < 2 ? '1px solid #F0F4F3' : 'none',
            }}
          >
            {task}
          </div>
        ))}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setOverlayPage(null);
            setActiveTab('classes');
            setClassSegment('calendar');
          }}
          style={{
            marginTop: '12px',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 14px',
            backgroundColor: '#E8F5F1',
            color: '#111318',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          View Full Schedule
        </motion.button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setOverlayPage(null);
            setActiveTab('students');
            setStudentSegment('leads');
            setAttendanceMode(false);
          }}
          style={{
            border: 'none',
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '20px 16px',
            textAlign: 'left',
            cursor: 'pointer',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Leads</div>
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#111318' }}>12 New Enquiries</div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setOverlayPage(null);
            setActiveTab('payments');
            setPaymentSegment('pending');
          }}
          style={{
            border: 'none',
            backgroundColor: '#FEF2F4',
            borderRadius: '18px',
            padding: '20px 16px',
            textAlign: 'left',
            cursor: 'pointer',
            boxShadow: '0 2px 16px rgba(232,93,117,0.08)',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#B24F66', marginBottom: '8px' }}>Pending Fees</div>
          <div style={{ fontSize: '17px', fontWeight: 800, color: '#E85D75' }}>₹18,500</div>
        </motion.button>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
        {segmentPill('leads', 'Leads', studentSegment === 'leads', () => { setStudentSegment('leads'); setAttendanceMode(false); })}
        {segmentPill('active', 'Active', studentSegment === 'active', () => { setStudentSegment('active'); setAttendanceMode(false); })}
        {segmentPill('trials', 'Trials', studentSegment === 'trials', () => { setStudentSegment('trials'); setAttendanceMode(false); })}
        {segmentPill('add-student', 'Add Student', studentSegment === 'add-student', () => { setStudentSegment('add-student'); setAttendanceMode(false); setAddStudentMode('regular'); })}
      </div>

      {studentSegment === 'leads' && leads.map((lead) => (
        <div key={lead.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318' }}>{lead.child}</div>
              <div style={{ fontSize: '14px', color: '#6E7480' }}>{lead.parent} · Age {lead.age}</div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#74A4BC', backgroundColor: '#E8F5F1', borderRadius: '10px', padding: '4px 10px', height: 'fit-content' }}>{lead.source}</div>
          </div>
          <div style={{ fontSize: '14px', color: '#6E7480' }}>Preferred: {lead.preferredSlot}</div>
        </div>
      ))}

      {studentSegment === 'active' && !attendanceMode && activeStudents.map((student) => (
        <div key={student.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{student.name}</div>
          <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '3px' }}>Class: {student.className}</div>
          <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '3px' }}>Fees: {student.fees}</div>
          <div style={{ fontSize: '14px', color: '#6E7480' }}>{student.details}</div>
        </div>
      ))}

      {studentSegment === 'active' && attendanceMode && activeStudents.map((student) => {
        const status = attendanceStatus[student.id] ?? null;

        return (
          <div key={student.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '18px', boxShadow: '0 3px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{student.name}</div>
            <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '10px' }}>Class: {student.className}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setAttendanceStatus((prev) => ({ ...prev, [student.id]: 'present' }))}
                style={{
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px',
                  backgroundColor: status === 'present' ? '#BEE7D3' : '#E8F5F1',
                  color: '#111318',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                }}
              >
                Mark Present
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setAttendanceStatus((prev) => ({ ...prev, [student.id]: 'absent' }))}
                style={{
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px',
                  backgroundColor: status === 'absent' ? '#FBD7DF' : '#FCECEF',
                  color: '#111318',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                }}
              >
                Mark Absent
              </motion.button>
            </div>
          </div>
        );
      })}

      {studentSegment === 'trials' && trialStudents.map((trial) => (
        <div key={trial.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318' }}>{trial.name}</div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#74A4BC', backgroundColor: '#E8F5F1', padding: '4px 10px', borderRadius: '10px' }}>Trial</div>
          </div>
          <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '10px' }}>{trial.trialDate}</div>
          <motion.button whileTap={{ scale: 0.97 }} style={{ border: 'none', borderRadius: '12px', padding: '8px 12px', backgroundColor: '#B6D6CC', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
            {trial.followUp}
          </motion.button>
        </div>
      ))}

      {studentSegment === 'add-student' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '14px' }}>
            {addStudentMode === 'offline' ? 'Manual Admission Form' : 'Add Student'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Student Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6E7480' }}>Student Name *</span>
              <input
                value={newStudent.name}
                onChange={(e) => { setNewStudent((prev) => ({ ...prev, name: e.target.value })); setStudentErrors((prev) => ({ ...prev, name: undefined })); }}
                placeholder="Enter student name"
                inputMode="text"
                style={{ border: `1px solid ${studentErrors.name ? '#E85D75' : '#E3ECEA'}`, borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', outline: 'none', backgroundColor: '#FAFCFB' }}
              />
              {studentErrors.name && <span style={{ fontSize: '12px', color: '#E85D75' }}>{studentErrors.name}</span>}
            </div>

            {/* Age */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6E7480' }}>Age *</span>
              <input
                value={newStudent.age}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 2); setNewStudent((prev) => ({ ...prev, age: v })); setStudentErrors((prev) => ({ ...prev, age: undefined })); }}
                placeholder="Age (3–25)"
                inputMode="numeric"
                maxLength={2}
                style={{ border: `1px solid ${studentErrors.age ? '#E85D75' : '#E3ECEA'}`, borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', outline: 'none', backgroundColor: '#FAFCFB' }}
              />
              {studentErrors.age && <span style={{ fontSize: '12px', color: '#E85D75' }}>{studentErrors.age}</span>}
            </div>

            {/* Parent Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6E7480' }}>Parent Name *</span>
              <input
                value={newStudent.parentName}
                onChange={(e) => { setNewStudent((prev) => ({ ...prev, parentName: e.target.value })); setStudentErrors((prev) => ({ ...prev, parentName: undefined })); }}
                placeholder="Enter parent name"
                inputMode="text"
                style={{ border: `1px solid ${studentErrors.parentName ? '#E85D75' : '#E3ECEA'}`, borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', outline: 'none', backgroundColor: '#FAFCFB' }}
              />
              {studentErrors.parentName && <span style={{ fontSize: '12px', color: '#E85D75' }}>{studentErrors.parentName}</span>}
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6E7480' }}>Phone Number *</span>
              <input
                value={newStudent.phone}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 10); setNewStudent((prev) => ({ ...prev, phone: v })); setStudentErrors((prev) => ({ ...prev, phone: undefined })); }}
                placeholder="Enter 10-digit mobile number"
                inputMode="numeric"
                maxLength={10}
                style={{ border: `1px solid ${studentErrors.phone ? '#E85D75' : '#E3ECEA'}`, borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', outline: 'none', backgroundColor: '#FAFCFB' }}
              />
              {studentErrors.phone && <span style={{ fontSize: '12px', color: '#E85D75' }}>{studentErrors.phone}</span>}
            </div>

            {/* Program Dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6E7480' }}>Program *</span>
              <button
                onClick={() => setShowProgramDropdown((prev) => !prev)}
                style={{ border: `1px solid ${studentErrors.program ? '#E85D75' : '#E3ECEA'}`, borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', backgroundColor: '#FAFCFB', textAlign: 'left', color: newStudent.program ? '#111318' : '#9CA3B0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {newStudent.program || 'Select a program'}
                <ChevronRight size={14} color="#6E7480" style={{ transform: showProgramDropdown ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
              </button>
              <AnimatePresence>
                {showProgramDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 8px 24px rgba(17,19,24,0.12)', zIndex: 50, overflow: 'hidden', border: '1px solid #E3ECEA', marginTop: '4px' }}
                  >
                    {programs.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setNewStudent((prev) => ({ ...prev, program: p.className, fees: p.fees }));
                          setStudentErrors((prev) => ({ ...prev, program: undefined }));
                          setShowProgramDropdown(false);
                        }}
                        style={{ width: '100%', border: 'none', backgroundColor: newStudent.program === p.className ? '#E8F5F1' : 'transparent', padding: '10px 12px', textAlign: 'left', fontFamily: 'Raleway, sans-serif', fontSize: '14px', color: '#111318', cursor: 'pointer', borderBottom: idx < programs.length - 1 ? '1px solid #F0F4F3' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <span>{p.className}</span>
                        <span style={{ color: '#74A4BC', fontSize: '13px', fontWeight: 600 }}>{p.fees}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {studentErrors.program && <span style={{ fontSize: '12px', color: '#E85D75' }}>{studentErrors.program}</span>}
            </div>

            {/* Fees (auto-filled) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6E7480' }}>Fees</span>
              <input
                value={newStudent.fees}
                onChange={(e) => setNewStudent((prev) => ({ ...prev, fees: e.target.value }))}
                placeholder="Auto-filled from program"
                style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', outline: 'none', backgroundColor: newStudent.fees ? '#F0FBF5' : '#FAFCFB', color: '#111318' }}
              />
            </div>

            {/* Joining Date */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#6E7480' }}>Joining Date</span>
              <input
                type="date"
                value={newStudent.joiningDate}
                onChange={(e) => setNewStudent((prev) => ({ ...prev, joiningDate: e.target.value }))}
                style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', outline: 'none', backgroundColor: '#FAFCFB', color: '#111318' }}
              />
            </div>

          </div>

          <motion.button
            whileTap={{ scale: isStudentFormValid() ? 0.98 : 1 }}
            onClick={handleAddStudent}
            style={{
              marginTop: '16px',
              border: 'none',
              borderRadius: '12px',
              padding: '11px 14px',
              backgroundColor: isStudentFormValid() ? '#B6D6CC' : '#E3ECEA',
              color: isStudentFormValid() ? '#111318' : '#9CA3B0',
              fontSize: '14px',
              fontWeight: 700,
              cursor: isStudentFormValid() ? 'pointer' : 'not-allowed',
              fontFamily: 'Raleway, sans-serif',
              width: '100%',
              transition: 'background-color 0.2s ease',
            }}
          >
            Add Student
          </motion.button>
        </div>
      )}
    </div>
  );

  const renderClasses = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
        {segmentPill('programs', 'Programs', classSegment === 'programs', () => setClassSegment('programs'))}
        {segmentPill('calendar', 'Calendar', classSegment === 'calendar', () => setClassSegment('calendar'))}
        {segmentPill('add-class', 'Add Class', classSegment === 'add-class', () => setClassSegment('add-class'))}
      </div>

      {classSegment === 'programs' && !selectedProgram && programs.map((program) => {
        const occupancy = Math.round((program.enrolled / Math.max(program.capacity, 1)) * 100);
        return (
          <motion.button
            key={program.id}
            whileTap={{ scale: 0.985 }}
            onClick={() => setSelectedProgramId(program.id)}
            style={{ border: 'none', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', textAlign: 'left', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318' }}>{program.className}</div>
                <div style={{ fontSize: '14px', color: '#6E7480' }}>{program.coach} · {program.days}</div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: program.paused ? '#E85D75' : '#74A4BC', backgroundColor: program.paused ? '#FEF2F4' : '#E8F5F1', padding: '4px 10px', borderRadius: '10px', height: 'fit-content' }}>
                {program.paused ? 'Paused' : `${program.enrolled}/${program.capacity}`}
              </div>
            </div>
            <div style={{ height: '6px', borderRadius: '20px', backgroundColor: '#EEF2F1', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, occupancy)}%` }} transition={{ duration: 0.5 }} style={{ height: '100%', backgroundColor: program.paused ? '#E85D75' : '#74A4BC' }} />
            </div>
          </motion.button>
        );
      })}

      {classSegment === 'programs' && selectedProgram && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{selectedProgram.className}</h3>
            <button onClick={() => { setSelectedProgramId(null); setEditingProgramId(null); }} style={{ border: 'none', background: 'none', color: '#74A4BC', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>← Back</button>
          </div>

          {!editingProgram && (
            <>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>Coach: {selectedProgram.coach}</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>Timings: {selectedProgram.days} · {selectedProgram.time}</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>Fees: {selectedProgram.fees}</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>Capacity: {selectedProgram.capacity}</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>Location: {selectedProgram.location}</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '12px' }}>Students enrolled: {selectedProgram.enrolled}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => setEditingProgramId(selectedProgram.id)} style={{ border: 'none', borderRadius: '12px', padding: '10px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Edit Details</motion.button>
                <motion.button whileTap={{ scale: 0.98 }} onClick={openAttendanceMode} style={{ border: 'none', borderRadius: '12px', padding: '10px', backgroundColor: '#E8F5F1', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Attendance</motion.button>
                <motion.button whileTap={{ scale: 0.98 }} onClick={() => { setBroadcastClassTarget(selectedProgram.className); setOverlayPage('broadcast'); }} style={{ border: 'none', borderRadius: '12px', padding: '10px', backgroundColor: '#E8F5F1', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Broadcast</motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPrograms((prev) => prev.map((row) => (row.id === selectedProgram.id ? { ...row, paused: !row.paused } : row)))}
                  style={{ border: 'none', borderRadius: '12px', padding: '10px', backgroundColor: '#FEF2F4', color: '#E85D75', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}
                >
                  Pause Class
                </motion.button>
              </div>
            </>
          )}

          {editingProgram && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {([
                ['className', 'Class Name'],
                ['coach', 'Coach'],
                ['days', 'Days'],
                ['time', 'Time'],
                ['fees', 'Fees'],
                ['capacity', 'Capacity'],
                ['ageGroup', 'Age Group'],
                ['location', 'Location'],
              ] as const).map(([field, label]) => (
                <label key={field} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#6E7480' }}>{label}</span>
                  <input
                    value={String(editingProgram[field])}
                    onChange={(event) => handleProgramEditField(field, event.target.value)}
                    style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }}
                  />
                </label>
              ))}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setEditingProgramId(null)}
                style={{ marginTop: '4px', border: 'none', borderRadius: '12px', padding: '10px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}
              >
                Save Changes
              </motion.button>
            </div>
          )}
        </div>
      )}

      {classSegment === 'add-class' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '10px' }}>Add Class</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
            {([
              ['className', 'Class Name'],
              ['coach', 'Coach'],
              ['days', 'Days'],
              ['time', 'Time'],
              ['fees', 'Fees'],
              ['capacity', 'Capacity'],
              ['ageGroup', 'Age Group'],
              ['location', 'Location'],
            ] as const).map(([field, label]) => (
              <label key={field} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 400, color: '#6E7480' }}>{label}</span>
                <input
                  value={newProgram[field]}
                  onChange={(event) => setNewProgram((prev) => ({ ...prev, [field]: event.target.value }))}
                  style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }}
                />
              </label>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={saveAddClass}
            style={{ marginTop: '12px', border: 'none', borderRadius: '12px', padding: '10px 14px', backgroundColor: '#B6D6CC', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif', width: '100%' }}
          >
            Save Class
          </motion.button>
        </div>
      )}

      {classSegment === 'calendar' && (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>Class Calendar</h3>
          <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '12px' }}>{MONTH_LABEL}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {calendarDates.map((date) => {
              const dots = classDotsByDate[date] ?? [];
              const isSelected = selectedCalendarDate === date;

              return (
                <button
                  key={date}
                  onClick={() => setSelectedCalendarDate(date)}
                  style={{
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px 4px',
                    backgroundColor: isSelected ? '#E8F5F1' : '#F7FAF9',
                    cursor: 'pointer',
                    minHeight: '52px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'Raleway, sans-serif',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{date}</span>
                  <div style={{ display: 'flex', gap: '3px', minHeight: '7px' }}>
                    {dots.slice(0, 3).map((dotClass, idx) => (
                      <span key={`${dotClass}-${idx}`} style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#74A4BC' }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Classes on {selectedCalendarDate} Apr</h4>
            {selectedDateClasses.length === 0 && <div style={{ fontSize: '14px', color: '#6E7480' }}>No classes scheduled.</div>}
            {selectedDateClasses.map((name) => (
              <div key={name} style={{ backgroundColor: '#F7FAF9', borderRadius: '12px', padding: '10px', fontSize: '14px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPayments = () => {
    const now = new Date();
    const isOlderThanThirtyDays = (dueDateIso: string) => {
      const dueDate = new Date(dueDateIso);
      const diffMs = now.getTime() - dueDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return diffDays > 30;
    };

    const visibleRows = paymentSegment === 'all'
      ? paymentRows
      : paymentSegment === 'paid'
        ? paymentRows.filter((row) => row.status === 'paid')
        : paymentRows.filter((row) => row.status !== 'paid');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#6E7480', fontWeight: 400 }}>Collected This Month</span>
            <span style={{ fontSize: '15px', color: '#111318', fontWeight: 800 }}>₹{collectedThisMonth.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ backgroundColor: '#FEF5F6', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#B24F66', fontWeight: 400 }}>Pending Fees</span>
            <span style={{ fontSize: '15px', color: '#E85D75', fontWeight: 800 }}>₹{pendingAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div style={{ fontSize: '14px', color: '#6E7480', fontWeight: 500 }}>
          {totalStudents} students total • {paidCount} paid • {pendingCount} pending
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {segmentPill('all', 'All', paymentSegment === 'all', () => setPaymentSegment('all'))}
          {segmentPill('paid', 'Paid', paymentSegment === 'paid', () => setPaymentSegment('paid'))}
          {segmentPill('pending', 'Pending', paymentSegment === 'pending', () => setPaymentSegment('pending'))}
        </div>

        {visibleRows.map((row) => {
          const isPaid = row.status === 'paid';
          const overdueByAge = !isPaid && isOlderThanThirtyDays(row.dueDateIso);
          const statusLabel = isPaid ? 'Paid' : overdueByAge ? 'Overdue' : 'Pending';
          const allTabCardBg = isPaid ? '#F3FBF6' : overdueByAge ? '#FDEEEE' : '#FFF8F3';
          const cardBg = paymentSegment === 'all' ? allTabCardBg : '#FFFFFF';
          const badgeBg = isPaid ? '#E6F6EE' : overdueByAge ? '#FCECEF' : '#FFF3EA';
          const badgeColor = isPaid ? '#2F8D61' : overdueByAge ? '#B8475D' : '#BE7A00';

          return (
            <div
              key={row.id}
              style={{
                backgroundColor: cardBg,
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318' }}>{row.student}</div>
                  <div style={{ fontSize: '14px', color: '#6E7480' }}>{row.id}</div>
                </div>
                <span style={{ height: 'fit-content', fontSize: '12px', fontWeight: 700, color: badgeColor, backgroundColor: badgeBg, borderRadius: '999px', padding: '4px 10px' }}>{statusLabel}</span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, color: '#111318', marginBottom: '4px' }}>₹{row.amount.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '10px' }}>
                {isPaid ? `Paid Date: ${row.paidDate ?? 'Today'}` : `Due Date: ${row.dueDate}`}
              </div>

              {paymentSegment === 'pending' && !isPaid && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button whileTap={{ scale: 0.96 }} style={{ border: 'none', borderRadius: '12px', padding: '8px 12px', backgroundColor: '#FFF2EA', color: '#BE7A00', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Remind</motion.button>
                  <motion.button whileTap={{ scale: 0.96 }} onClick={() => markPaymentRowPaid(row.id)} style={{ border: 'none', borderRadius: '12px', padding: '8px 12px', backgroundColor: '#B6D6CC', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Mark Paid</motion.button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const moduleRow = (
    id: Exclude<OverlayPage, null>,
    label: string,
    icon: typeof Settings,
  ) => (
    <motion.button
      key={id}
      whileTap={{ scale: 0.98 }}
      onClick={() => setOverlayPage(id)}
      style={{ border: 'none', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '12px', backgroundColor: '#E8F5F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(() => {
            const Icon = icon;
            return <Icon size={18} color="#74A4BC" />;
          })()}
        </div>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#111318', fontFamily: 'Raleway, sans-serif' }}>{label}</span>
      </div>
      <ChevronRight size={16} color="#6E7480" />
    </motion.button>
  );

  const renderProfile = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#B6D6CC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 12px' }}>🏊</div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>Elite Swim Academy</h3>
        <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '8px' }}>admin@enrolme.com</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFF4E8', padding: '5px 12px', borderRadius: '12px' }}>
          <Star size={14} color="#F5A623" fill="#F5A623" />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5A623' }}>4.8 Rating</span>
        </div>
      </div>

      {moduleRow('my-users', 'My Users', Users as unknown as typeof Settings)}
      {moduleRow('application-form', 'Application Form', FileText as unknown as typeof Settings)}
      {moduleRow('new-applicants', 'New Applicants', Book as unknown as typeof Settings)}
      {moduleRow('business-settings', 'Business Settings', Settings)}
      {moduleRow('gallery', 'Gallery & Photos', Image as unknown as typeof Settings)}
      {moduleRow('testimonials', 'Coach Testimonials', Video as unknown as typeof Settings)}
      {moduleRow('reviews', 'Reviews & Replies', MessageSquare as unknown as typeof Settings)}
      {moduleRow('subscription', 'Subscription & Billing', CreditCard as unknown as typeof Settings)}
      {moduleRow('reports', 'Reports', FileText as unknown as typeof Settings)}

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowLogoutModal(true)}
        style={{ border: 'none', backgroundColor: '#FEF2F4', borderRadius: '16px', padding: '14px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#E85D75', fontFamily: 'Raleway, sans-serif' }}>Logout</span>
        <ChevronRight size={16} color="#E85D75" />
      </motion.button>

      {showLogoutModal && (
        <div
          onClick={() => setShowLogoutModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(17,19,24,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              padding: '32px 24px',
              maxWidth: '320px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(17,19,24,0.3)',
            }}
          >
            <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#111318', marginBottom: '12px', textAlign: 'center' }}>
              Are you sure?
            </h3>
            <p style={{ fontSize: '15px', color: '#6E7480', marginBottom: '24px', textAlign: 'center' }}>
              You will be logged out of your account
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#F4FAF8',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#111318',
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '16px',
                  backgroundColor: '#F11859',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBroadcastPage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Entire Institute</h3>
        <textarea
          placeholder="Message all parents/students"
          style={{ width: '100%', minHeight: '78px', border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', resize: 'vertical', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }}
        />
        <motion.button whileTap={{ scale: 0.98 }} style={{ marginTop: '8px', border: 'none', borderRadius: '10px', padding: '8px 12px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Send Broadcast</motion.button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>By Class</h3>
        {['Beginner Swim', 'Advanced Swim', 'Kids Coding', 'Dance Juniors'].map((name) => (
          <button
            key={name}
            onClick={() => setBroadcastClassTarget(name)}
            style={{
              width: '100%',
              textAlign: 'left',
              border: '1px solid #EEF2F1',
              borderRadius: '10px',
              padding: '9px 10px',
              marginBottom: '6px',
              backgroundColor: broadcastClassTarget === name ? '#E8F5F1' : '#FFFFFF',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: '#111318',
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            {name}
          </button>
        ))}
        <motion.button whileTap={{ scale: 0.98 }} style={{ marginTop: '6px', border: 'none', borderRadius: '10px', padding: '8px 12px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
          Message {broadcastClassTarget}
        </motion.button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Individual Student</h3>
        <input
          value={individualSearch}
          onChange={(event) => setIndividualSearch(event.target.value)}
          placeholder="Search student name"
          style={{ width: '100%', border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', marginBottom: '8px' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filteredIndividualStudents.map((name) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #EEF2F1', borderRadius: '10px', padding: '9px 10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#111318' }}>{name}</span>
              <motion.button whileTap={{ scale: 0.95 }} style={{ border: 'none', borderRadius: '8px', padding: '6px 10px', backgroundColor: '#E8F5F1', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Message</motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportsModule = () => {
    const attendanceSummaryByClass: Record<string, { students: number; avg: number; presentToday: number; absentToday: number; weekly: number[] }> = {
      'Kids Swimming': { students: 22, avg: 88, presentToday: 18, absentToday: 4, weekly: [84, 86, 89, 90, 88] },
      'Advanced Swim': { students: 18, avg: 91, presentToday: 16, absentToday: 2, weekly: [89, 90, 92, 91, 93] },
      'Coding Kids': { students: 20, avg: 85, presentToday: 17, absentToday: 3, weekly: [82, 84, 85, 87, 86] },
      'Dance Juniors': { students: 17, avg: 87, presentToday: 15, absentToday: 2, weekly: [85, 86, 87, 89, 88] },
      'Yoga Kids': { students: 14, avg: 90, presentToday: 13, absentToday: 1, weekly: [88, 90, 89, 91, 92] },
    };
    const paymentSummaryByClass: Record<string, { collected: number; pending: number; overdue: number; payments: number; trend: number[] }> = {
      'All Classes': { collected: 82000, pending: 18500, overdue: 6000, payments: 34, trend: [62, 68, 74, 80, 82] },
      'Kids Swimming': { collected: 26000, pending: 6000, overdue: 2000, payments: 10, trend: [20, 22, 23, 25, 26] },
      'Advanced Swim': { collected: 22000, pending: 4500, overdue: 1500, payments: 8, trend: [16, 18, 20, 21, 22] },
      'Coding Kids': { collected: 18000, pending: 4200, overdue: 1200, payments: 7, trend: [14, 15, 16, 17, 18] },
      'Dance Juniors': { collected: 16000, pending: 3800, overdue: 1300, payments: 6, trend: [12, 13, 14, 15, 16] },
    };

    const attendanceData = attendanceSummaryByClass[attendanceReportClass] ?? attendanceSummaryByClass['Kids Swimming'];
    const paymentData = paymentSummaryByClass[paymentReportClass] ?? paymentSummaryByClass['All Classes'];

    const selectorTrigger = (label: string, value: string, onClick: () => void) => (
      <button
        onClick={onClick}
        style={{
          width: '100%',
          border: '1px solid #E3ECEA',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(17,19,24,0.04)',
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '12px', color: '#6E7480' }}>{label}</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{value}</div>
        </div>
        <ChevronRight size={16} color="#6E7480" style={{ transform: 'rotate(90deg)' }} />
      </button>
    );

    const renderSelectorSheet = (
      title: string,
      items: string[],
      selected: string,
      onSelect: (item: string) => void,
      sheetId: 'attendance-class' | 'payment-class' | 'payment-month',
    ) => (
      <AnimatePresence>
        {reportSelectorSheet === sheetId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReportSelectorSheet(null)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(17,19,24,0.35)',
              zIndex: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '56px 20px 110px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '14px',
                boxShadow: '0 14px 40px rgba(17,19,24,0.2)',
                maxHeight: '100%',
                overflowY: 'auto',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '10px' }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      onSelect(item);
                      setReportSelectorSheet(null);
                    }}
                    style={{
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: item === selected ? 700 : 600,
                      color: '#111318',
                      backgroundColor: item === selected ? '#E8F5F1' : '#F8FBFA',
                      cursor: 'pointer',
                      fontFamily: 'Raleway, sans-serif',
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );

    if (reportView === 'home') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setReportView('attendance')}
            style={{ border: 'none', textAlign: 'left', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px 18px', minHeight: '118px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#111318', marginBottom: '8px', lineHeight: 1.2 }}>Attendance Report</div>
            <div style={{ fontSize: '15px', color: '#6E7480', lineHeight: 1.35 }}>Track class attendance trends and student consistency.</div>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setReportView('payment')}
            style={{ border: 'none', textAlign: 'left', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px 18px', minHeight: '118px', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#111318', marginBottom: '8px', lineHeight: 1.2 }}>Payment Report</div>
            <div style={{ fontSize: '15px', color: '#6E7480', lineHeight: 1.35 }}>View collections, pending dues, and class-wise payment trends.</div>
          </motion.button>
        </div>
      );
    }

    if (reportView === 'attendance') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            {selectorTrigger('Select Class', attendanceReportClass, () => setReportSelectorSheet('attendance-class'))}
            {renderSelectorSheet('Select Class', ['Kids Swimming', 'Advanced Swim', 'Coding Kids', 'Dance Juniors', 'Yoga Kids'], attendanceReportClass, setAttendanceReportClass, 'attendance-class')}

            <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '6px' }}>Select Period</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(['This Month', 'Last Month', 'Custom Range'] as const).map((option) => (
                <button key={option} onClick={() => setAttendanceReportPeriod(option)} style={{ border: 'none', borderRadius: '16px', padding: '6px 10px', backgroundColor: attendanceReportPeriod === option ? '#B6D6CC' : '#E8F5F1', color: '#111318', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>{option}</button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div style={{ backgroundColor: '#F7FCFA', borderRadius: '10px', padding: '10px' }}><div style={{ fontSize: '12px', color: '#6E7480' }}>Class</div><div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{attendanceReportClass}</div></div>
              <div style={{ backgroundColor: '#F7FCFA', borderRadius: '10px', padding: '10px' }}><div style={{ fontSize: '12px', color: '#6E7480' }}>Students</div><div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{attendanceData.students}</div></div>
              <div style={{ backgroundColor: '#F7FCFA', borderRadius: '10px', padding: '10px' }}><div style={{ fontSize: '12px', color: '#6E7480' }}>Avg Attendance</div><div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{attendanceData.avg}%</div></div>
              <div style={{ backgroundColor: '#F7FCFA', borderRadius: '10px', padding: '10px' }}><div style={{ fontSize: '12px', color: '#6E7480' }}>Present Today</div><div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{attendanceData.presentToday}</div></div>
            </div>
            <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '8px' }}>Absent Today: {attendanceData.absentToday}</div>

            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '6px' }}>Weekly Attendance</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '72px' }}>
                {attendanceData.weekly.map((value, index) => (
                  <div key={value + index} style={{ flex: 1, backgroundColor: '#DFF0EA', borderRadius: '8px 8px 4px 4px', height: `${Math.max(20, value - 10)}%`, position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: '#6E7480' }}>{value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #EEF2F1', paddingTop: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>Top Students</div>
              <div style={{ fontSize: '13px', color: '#6E7480' }}>Shaurya 92%</div>
              <div style={{ fontSize: '13px', color: '#6E7480' }}>Aarav 84%</div>
            </div>
          </div>

          <motion.button whileTap={{ scale: 0.98 }} style={{ border: 'none', borderRadius: '12px', padding: '10px 12px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, color: '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Download size={13} color="#111318" />Download Excel
          </motion.button>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          {selectorTrigger('Select Class', paymentReportClass, () => setReportSelectorSheet('payment-class'))}
          {renderSelectorSheet('Select Class', ['All Classes', 'Kids Swimming', 'Advanced Swim', 'Coding Kids', 'Dance Juniors'], paymentReportClass, setPaymentReportClass, 'payment-class')}

          <div style={{ height: '8px' }} />
          {selectorTrigger('Select Month', paymentReportMonth, () => setReportSelectorSheet('payment-month'))}
          {renderSelectorSheet('Select Month', ['April 2026', 'March 2026', 'February 2026'], paymentReportMonth, setPaymentReportMonth, 'payment-month')}
          <button onClick={() => setShowPaymentCustomRange((prev) => !prev)} style={{ marginTop: '8px', border: 'none', background: 'transparent', padding: 0, fontSize: '13px', color: '#74A4BC', cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Choose Custom Date Range</button>

          {showPaymentCustomRange && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
              <input type="date" value={paymentRangeStart} onChange={(event) => setPaymentRangeStart(event.target.value)} style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '8px', fontSize: '13px', fontFamily: 'Raleway, sans-serif' }} />
              <input type="date" value={paymentRangeEnd} onChange={(event) => setPaymentRangeEnd(event.target.value)} style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '8px', fontSize: '13px', fontFamily: 'Raleway, sans-serif' }} />
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div style={{ backgroundColor: '#F7FCFA', borderRadius: '10px', padding: '10px' }}><div style={{ fontSize: '11px', color: '#6E7480' }}>Collected</div><div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>₹{paymentData.collected.toLocaleString('en-IN')}</div></div>
            <div style={{ backgroundColor: '#FEF5F6', borderRadius: '10px', padding: '10px' }}><div style={{ fontSize: '11px', color: '#B24F66' }}>Pending</div><div style={{ fontSize: '14px', fontWeight: 700, color: '#B24F66' }}>₹{paymentData.pending.toLocaleString('en-IN')}</div></div>
            <div style={{ backgroundColor: '#FCECEE', borderRadius: '10px', padding: '10px' }}><div style={{ fontSize: '11px', color: '#B8475D' }}>Overdue</div><div style={{ fontSize: '14px', fontWeight: 700, color: '#B8475D' }}>₹{paymentData.overdue.toLocaleString('en-IN')}</div></div>
          </div>
          <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '8px' }}>{paymentData.payments} payments</div>
          <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '6px' }}>Collection Trend</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '70px' }}>
            {paymentData.trend.map((value, index) => (
              <div key={value + index} style={{ flex: 1, height: `${Math.max(20, value)}%`, backgroundColor: '#B6D6CC', borderRadius: '8px 8px 4px 4px' }} />
            ))}
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.98 }} style={{ border: 'none', borderRadius: '12px', padding: '10px 12px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, color: '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Download size={13} color="#111318" />Download Excel
        </motion.button>
      </div>
    );
  };

  const renderNewApplicantsModule = () => {
    const applicantFilterLabel: Record<typeof applicantFilter, string> = {
      all: 'All',
      new: 'New',
      approved: 'Approved',
      rejected: 'Rejected',
      waitlist: 'Waitlist',
    };

    const applicantFilterOptions: Array<{ value: typeof applicantFilter; label: string }> = [
      { value: 'all', label: 'All' },
      { value: 'new', label: 'New' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
      { value: 'waitlist', label: 'Waitlist' },
    ];

    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <input
          value={applicantSearch}
          onChange={(event) => setApplicantSearch(event.target.value)}
          placeholder="Search by student, program, phone"
          style={{ width: '100%', border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', marginBottom: '8px' }}
        />
        <button
          onClick={() => setShowApplicantFilterSheet(true)}
          style={{
            width: '100%',
            border: '1px solid #E3ECEA',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(17,19,24,0.04)',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', color: '#6E7480' }}>Filter By Status</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{applicantFilterLabel[applicantFilter]}</div>
          </div>
          <ChevronRight size={16} color="#6E7480" style={{ transform: 'rotate(90deg)' }} />
        </button>
      </div>

      <AnimatePresence>
        {showApplicantFilterSheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowApplicantFilterSheet(false)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(17,19,24,0.35)',
              zIndex: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '56px 20px 110px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '14px',
                boxShadow: '0 14px 40px rgba(17,19,24,0.2)',
                maxHeight: '100%',
                overflowY: 'auto',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '10px' }}>Filter By Status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {applicantFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setApplicantFilter(option.value);
                      setShowApplicantFilterSheet(false);
                    }}
                    style={{
                      border: 'none',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: option.value === applicantFilter ? 700 : 600,
                      color: '#111318',
                      backgroundColor: option.value === applicantFilter ? '#E8F5F1' : '#F8FBFA',
                      cursor: 'pointer',
                      fontFamily: 'Raleway, sans-serif',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredApplicants.map((applicant) => (
        <div key={applicant.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{applicant.studentName}</div>
            <div style={{ fontSize: '12px', color: '#6E7480' }}>{applicant.appliedDate}</div>
          </div>
          <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '2px' }}>Age: {applicant.age} · Program: {applicant.program}</div>
          <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '8px' }}>Parent Phone: {applicant.parentPhone}</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => updateApplicantStatus(applicant.id, 'approved')} style={{ border: 'none', borderRadius: '9px', padding: '7px 9px', backgroundColor: '#DFF4EA', color: '#1F8A5B', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Approve</button>
            <button onClick={() => updateApplicantStatus(applicant.id, 'rejected')} style={{ border: 'none', borderRadius: '9px', padding: '7px 9px', backgroundColor: '#FCECEE', color: '#B8475D', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Reject</button>
            <button onClick={() => updateApplicantStatus(applicant.id, 'waitlist')} style={{ border: 'none', borderRadius: '9px', padding: '7px 9px', backgroundColor: '#FFF4E8', color: '#BE7A00', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Waitlist</button>
          </div>
        </div>
      ))}
    </div>
    );
  };

  const renderApplicationFormModule = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Form Preview</div>
        {applicationFormFields.map((field) => (
          <div key={field.id} style={{ border: '1px solid #EEF2F1', borderRadius: '10px', padding: '8px 10px', marginBottom: '6px', fontSize: '13px', color: '#6E7480', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span>{field.label}{field.required ? ' *' : ''}</span>
            {isEditingFormFields && (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => toggleApplicationFieldRequired(field.id)} style={{ border: 'none', borderRadius: '8px', padding: '5px 8px', backgroundColor: '#F4FAF8', color: '#111318', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>{field.required ? 'Optional' : 'Required'}</button>
                <button onClick={() => removeApplicationFormField(field.id)} style={{ border: 'none', borderRadius: '8px', padding: '5px 8px', backgroundColor: '#FCECEE', color: '#B8475D', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Remove</button>
              </div>
            )}
          </div>
        ))}
        {isEditingFormFields && (
          <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
            <input
              value={newFormFieldLabel}
              onChange={(event) => setNewFormFieldLabel(event.target.value)}
              placeholder="New field label"
              style={{ flex: 1, border: '1px solid #E3ECEA', borderRadius: '10px', padding: '8px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '13px' }}
            />
            <button onClick={addApplicationFormField} style={{ border: 'none', borderRadius: '10px', padding: '8px 10px', backgroundColor: '#E8F5F1', color: '#111318', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Add</button>
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setIsEditingFormFields((prev) => !prev)} style={{ border: 'none', borderRadius: '10px', padding: '9px', backgroundColor: isEditingFormFields ? '#DFF4EA' : '#E8F5F1', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>{isEditingFormFields ? 'Done Editing' : 'Edit Fields'}</motion.button>
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setIsApplicationFormEnabled((prev) => !prev)} style={{ border: 'none', borderRadius: '10px', padding: '9px', backgroundColor: isApplicationFormEnabled ? '#DFF4EA' : '#FCECEE', color: isApplicationFormEnabled ? '#1F8A5B' : '#B8475D', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>{isApplicationFormEnabled ? 'Disable Form' : 'Enable Form'}</motion.button>
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleShareApplicationForm} style={{ border: 'none', borderRadius: '10px', padding: '9px', backgroundColor: '#E8F5F1', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Share Link</motion.button>
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setOverlayPage('new-applicants')} style={{ border: 'none', borderRadius: '10px', padding: '9px', backgroundColor: '#E8F5F1', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>View Responses</motion.button>
      </div>
      {applicationFormShareMessage && (
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F8A5B', backgroundColor: '#EAF7F0', borderRadius: '10px', padding: '9px 10px' }}>
          {applicationFormShareMessage}
        </div>
      )}
    </div>
  );

  const renderBusinessSettingsModule = () => (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '14px', color: '#6E7480' }}>Business Name</span>
          <input value={businessSettings.businessName} onChange={(event) => updateBusinessSetting('businessName', event.target.value)} style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '14px', color: '#6E7480' }}>Address</span>
          <input value={businessSettings.address} onChange={(event) => updateBusinessSetting('address', event.target.value)} style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '14px', color: '#6E7480' }}>Contact</span>
          <input value={businessSettings.contact} onChange={(event) => updateBusinessSetting('contact', event.target.value)} style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '14px', color: '#6E7480' }}>Logo URL</span>
          <input value={businessSettings.logoUrl} onChange={(event) => updateBusinessSetting('logoUrl', event.target.value)} style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '14px', color: '#6E7480' }}>Description</span>
          <textarea value={businessSettings.description} onChange={(event) => updateBusinessSetting('description', event.target.value)} style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px', minHeight: '74px', resize: 'vertical' }} />
        </label>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
        <motion.button whileTap={{ scale: 0.98 }} onClick={saveBusinessSettings} style={{ border: 'none', borderRadius: '10px', padding: '9px 12px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Save Settings</motion.button>
      </div>
      {businessSettingsSavedMessage && (
        <div style={{ marginTop: '8px', fontSize: '13px', fontWeight: 600, color: '#1F8A5B' }}>{businessSettingsSavedMessage}</div>
      )}
    </div>
  );

  const renderGalleryModule = () => (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '10px' }}>Gallery Photos</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
        {galleryPhotos.map((photo) => (
          <div key={photo.id} style={{ borderRadius: '12px', padding: '12px', backgroundColor: photo.tint, minHeight: '78px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Image size={15} color="#74A4BC" />
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#111318' }}>{photo.title}</div>
          </div>
        ))}
      </div>
      <motion.button whileTap={{ scale: 0.98 }} onClick={addDummyGalleryPhoto} style={{ border: 'none', borderRadius: '10px', padding: '9px 12px', backgroundColor: '#E8F5F1', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Image size={13} color="#74A4BC" />Add New Dummy Photo</motion.button>
    </div>
  );

  const renderTestimonialsModule = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Video Testimonials</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
          {videoTestimonials.map((item) => (
            <div key={item.id} style={{ border: '1px solid #E3ECEA', borderRadius: '12px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#6E7480' }}>Duration: {item.duration}</div>
              </div>
              <Video size={16} color="#74A4BC" />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            value={newVideoTitle}
            onChange={(event) => setNewVideoTitle(event.target.value)}
            placeholder="New video title"
            style={{ flex: 1, border: '1px solid #E3ECEA', borderRadius: '10px', padding: '9px 10px', fontFamily: 'Raleway, sans-serif', fontSize: '14px' }}
          />
          <motion.button whileTap={{ scale: 0.98 }} onClick={addVideoTestimonial} style={{ border: 'none', borderRadius: '10px', padding: '9px 12px', backgroundColor: '#E8F5F1', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Video size={13} color="#74A4BC" />Add Video</motion.button>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Text Testimonials</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
          {textTestimonials.map((item) => (
            <div key={item.id} style={{ border: '1px solid #E3ECEA', borderRadius: '12px', padding: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{item.author}</div>
              {editingTextTestimonialId === item.id ? (
                <>
                  <textarea
                    value={editingTextTestimonialValue}
                    onChange={(event) => setEditingTextTestimonialValue(event.target.value)}
                    style={{ width: '100%', minHeight: '72px', border: '1px solid #E3ECEA', borderRadius: '10px', padding: '8px', resize: 'vertical', fontFamily: 'Raleway, sans-serif', fontSize: '13px', marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={saveEditedTextTestimonial} style={{ border: 'none', borderRadius: '9px', padding: '7px 9px', backgroundColor: '#DFF4EA', color: '#1F8A5B', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Save</button>
                    <button onClick={() => setEditingTextTestimonialId(null)} style={{ border: 'none', borderRadius: '9px', padding: '7px 9px', backgroundColor: '#F4FAF8', color: '#111318', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '8px' }}>{item.message}</div>
                  <button onClick={() => startEditTextTestimonial(item)} style={{ border: 'none', borderRadius: '9px', padding: '7px 9px', backgroundColor: '#E8F5F1', color: '#111318', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Edit</button>
                </>
              )}
            </div>
          ))}
        </div>
        <textarea
          value={newTextTestimonial}
          onChange={(event) => setNewTextTestimonial(event.target.value)}
          placeholder="Write new text testimonial"
          style={{ width: '100%', minHeight: '90px', border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', resize: 'vertical', fontFamily: 'Raleway, sans-serif', fontSize: '14px', marginBottom: '8px' }}
        />
        <motion.button whileTap={{ scale: 0.98 }} onClick={addTextTestimonial} style={{ border: 'none', borderRadius: '10px', padding: '9px 12px', backgroundColor: '#E8F5F1', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Add Text Testimonial</motion.button>
      </div>
    </div>
  );

  const renderMyUsersModule = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {[
        { name: 'Aditi Admin', role: 'Owner', status: 'Active' },
        { name: 'Rohan Coach', role: 'Coach', status: 'Active' },
        { name: 'Sneha Ops', role: 'Front Desk', status: 'Invited' },
      ].map((member) => (
        <div key={member.name} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{member.name}</div>
            <div style={{ fontSize: '13px', color: '#6E7480' }}>{member.role}</div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: member.status === 'Active' ? '#1F8A5B' : '#BE7A00' }}>{member.status}</span>
        </div>
      ))}
      <motion.button whileTap={{ scale: 0.98 }} style={{ border: 'none', borderRadius: '10px', padding: '10px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Invite New User</motion.button>
    </div>
  );

  const renderOverlayPage = () => {
    if (!overlayPage) return null;

    const titleMap: Record<Exclude<OverlayPage, null>, string> = {
      reports: 'Reports',
      broadcast: 'Broadcast',
      'my-users': 'My Users',
      'application-form': 'Application Form',
      'new-applicants': 'New Applicants',
      'business-settings': 'Business Settings',
      gallery: 'Gallery & Photos',
      testimonials: 'Coach Testimonials',
      reviews: 'Reviews & Replies',
      subscription: 'Subscription & Billing',
    };
    const overlayTitle = overlayPage === 'reports' && reportView !== 'home'
      ? (reportView === 'attendance' ? 'Attendance Report' : 'Payment Report')
      : titleMap[overlayPage];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#111318', lineHeight: 1.2 }}>{overlayTitle}</h2>
          <button
            onClick={() => {
              if (overlayPage === 'reports' && reportView !== 'home') {
                setReportView('home');
                return;
              }
              setOverlayPage(null);
            }}
            style={{ border: 'none', borderRadius: '10px', padding: '8px 12px', backgroundColor: '#E8F5F1', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}
          >
            Back
          </button>
        </div>

        {overlayPage === 'broadcast' && renderBroadcastPage()}

        {overlayPage === 'reports' && renderReportsModule()}

        {overlayPage === 'my-users' && renderMyUsersModule()}

        {overlayPage === 'application-form' && renderApplicationFormModule()}

        {overlayPage === 'new-applicants' && renderNewApplicantsModule()}

        {overlayPage === 'business-settings' && renderBusinessSettingsModule()}

        {overlayPage === 'gallery' && renderGalleryModule()}

        {overlayPage === 'testimonials' && renderTestimonialsModule()}

        {overlayPage === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { author: 'Priya Sinha', message: 'Great coaches and very structured learning.' },
              { author: 'Rohit Mehta', message: 'My child loves the sessions. Good communication.' },
            ].map((review) => (
              <div key={review.author} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{review.author}</div>
                <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '8px' }}>{review.message}</div>
                <motion.button whileTap={{ scale: 0.98 }} style={{ border: 'none', borderRadius: '10px', padding: '7px 10px', backgroundColor: '#E8F5F1', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Reply</motion.button>
              </div>
            ))}
          </div>
        )}

        {overlayPage === 'subscription' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {plans.map((plan) => {
                const isCurrent = plan === currentPlan;
                return (
                  <button
                    key={plan}
                    onClick={() => setCurrentPlan(plan)}
                    style={{
                      border: `1px solid ${isCurrent ? '#74A4BC' : '#E3ECEA'}`,
                      borderRadius: '12px',
                      padding: '10px',
                      backgroundColor: isCurrent ? '#E8F5F1' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#111318',
                      fontFamily: 'Raleway, sans-serif',
                    }}
                  >
                    {plan}
                  </button>
                );
              })}
            </div>
            <motion.button whileTap={{ scale: 0.98 }} style={{ marginTop: '10px', border: 'none', borderRadius: '10px', padding: '9px 12px', backgroundColor: '#B6D6CC', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif', width: '100%' }}>Upgrade Plan</motion.button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', fontFamily: 'Raleway, sans-serif', position: 'relative' }}>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'absolute', bottom: '80px', left: '16px', right: '16px', zIndex: 100, backgroundColor: '#111318', color: '#FFFFFF', borderRadius: '14px', padding: '13px 16px', fontSize: '14px', fontWeight: 600, textAlign: 'center', boxShadow: '0 8px 24px rgba(17,19,24,0.22)', fontFamily: 'Raleway, sans-serif' }}
          >
            ✓ Student added successfully
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ padding: '30px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={Logo} alt="Enrol-Me" style={{ height: '24px' }} />
          <span style={{ fontSize: '17px', fontWeight: 700, color: '#111318', letterSpacing: '-0.2px', lineHeight: 1 }}>Elite Swim Academy</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowAlerts(true)}
          style={{ width: '38px', height: '38px', borderRadius: '50%', border: 'none', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}
        >
          <Bell size={18} color="#74A4BC" />
          {alertsUnreadCount > 0 && (
            <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#F11859', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {alertsUnreadCount}
            </div>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {showAlerts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: '#F4FAF8', zIndex: 40, overflowY: 'auto', paddingBottom: '90px' }}
          >
            <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '16px', backgroundColor: '#F4FAF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setShowAlerts(false)}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)', flexShrink: 0 }}
                >
                  <X size={18} style={{ color: '#111318' }} />
                </button>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111318', margin: 0, flex: 1 }}>Alerts</h1>
                {alertsUnreadCount > 0 && (
                  <button
                    onClick={markAllAlertsRead}
                    style={{ backgroundColor: 'transparent', border: 'none', fontSize: '14px', fontWeight: 500, color: '#74A4BC', cursor: 'pointer', padding: '6px 0', fontFamily: 'Raleway, sans-serif', flexShrink: 0, whiteSpace: 'nowrap' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '8px' }}>
              {alertsList.map((alert) => {
                const IconComponent = alert.icon;
                return (
                  <div
                    key={alert.id}
                    onClick={() => handleAlertClick(alert)}
                    style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '18px', marginBottom: '12px', boxShadow: '0 4px 16px rgba(17,19,24,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: `${alert.iconColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <IconComponent size={22} style={{ color: alert.iconColor }} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#111318', lineHeight: '1.3', marginBottom: '4px' }}>{alert.title}</p>
                      <p style={{ fontSize: '14px', color: '#6E7480', lineHeight: '1.4', marginBottom: '4px' }}>{alert.message}</p>
                      <span style={{ fontSize: '14px', color: '#9CA3B0' }}>{alert.time}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                      {alert.unread && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F11859' }} />}
                      <ChevronRight size={18} style={{ color: '#9CA3B0' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 94px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${overlayPage ?? 'base'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {!overlayPage && activeTab === 'home' && renderHome()}
            {!overlayPage && activeTab === 'students' && renderStudents()}
            {!overlayPage && activeTab === 'classes' && renderClasses()}
            {!overlayPage && activeTab === 'payments' && renderPayments()}
            {!overlayPage && activeTab === 'profile' && renderProfile()}
            {overlayPage && renderOverlayPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        height: '56px',
        backgroundColor: 'rgba(215, 231, 228, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '28px',
        boxShadow: '0 8px 18px rgba(17,19,24,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        gap: '4px',
        zIndex: 10,
      }}>
        {([
          { id: 'home' as const, label: 'Home', icon: House },
          { id: 'students' as const, label: 'Students', icon: Users },
          { id: 'classes' as const, label: 'Classes', icon: CalendarDays },
          { id: 'payments' as const, label: 'Payments', icon: Wallet },
          { id: 'profile' as const, label: 'Profile', icon: User },
        ] as const).map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setOverlayPage(null);
                setActiveTab(item.id);
                if (item.id !== 'students') {
                  setAttendanceMode(false);
                }
              }}
              style={{
                height: '42px',
                borderRadius: '21px',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: isActive ? 'blur(10px)' : 'none',
                WebkitBackdropFilter: isActive ? 'blur(10px)' : 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '0 10px',
                whiteSpace: 'nowrap',
                flexShrink: 1,
                minWidth: 0,
              }}
            >
              <Icon
                size={14}
                color={isActive ? '#111318' : '#6E7480'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span style={{
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#111318' : '#6E7480',
                transition: 'color 0.3s ease',
                fontFamily: 'Raleway, sans-serif',
              }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

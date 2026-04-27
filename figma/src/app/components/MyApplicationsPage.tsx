import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, MapPin, User } from 'lucide-react';

interface ApplicationItem {
  id: string;
  classTitle: string;
  location: string;
  studentName: string;
  parentName: string;
  preferredBatch: string;
  preferredTiming: string;
  status: 'Submitted' | 'In Review' | 'Confirmed';
  submittedAtLabel: string;
}

interface MyApplicationsPageProps {
  onBack: () => void;
  applications: ApplicationItem[];
  isLearnerMode?: boolean;
}

export default function MyApplicationsPage({ onBack, applications, isLearnerMode = false }: MyApplicationsPageProps) {
  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <button
            onClick={onBack}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(17,19,24,0.08)',
            }}
          >
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111318', lineHeight: 1.2 }}>My Applications</h1>
        </div>
        <p style={{ fontSize: '14px', color: '#6E7480' }}>
          {isLearnerMode ? 'Track all classes you applied to as a learner' : 'Track all class applications submitted for your children'}
        </p>
      </div>

      <div style={{ paddingLeft: '24px', paddingRight: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {applications.length === 0 ? (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '18px', boxShadow: '0 8px 22px rgba(17,19,24,0.07)' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>No applications yet</div>
            <div style={{ fontSize: '13px', color: '#6E7480', lineHeight: 1.4 }}>
              Submit an application from any class detail page and it will appear here.
            </div>
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '14px',
                boxShadow: '0 8px 22px rgba(17,19,24,0.07)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#111318' }}>{application.classTitle}</div>
                <div
                  style={{
                    borderRadius: '999px',
                    backgroundColor: application.status === 'Confirmed' ? '#DFF4EA' : application.status === 'In Review' ? '#FFF4DB' : '#E8F5F1',
                    color: application.status === 'Confirmed' ? '#1F8A5B' : application.status === 'In Review' ? '#8D6B1F' : '#2D6F57',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '5px 10px',
                  }}
                >
                  {application.status}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6E7480' }}>
                  <MapPin size={13} />
                  <span>{application.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6E7480' }}>
                  <User size={13} />
                  <span>{application.studentName}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6E7480' }}>
                  <CalendarClock size={13} />
                  <span>{application.preferredBatch} - {application.preferredTiming}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9CA3B0' }}>
                  <Clock3 size={12} />
                  <span>Submitted {application.submittedAtLabel}</span>
                </div>
              </div>

              <div style={{ marginTop: '10px', borderTop: '1px solid #EEF2F1', paddingTop: '9px', display: 'flex', alignItems: 'center', gap: '6px', color: '#2F8D61' }}>
                <CheckCircle2 size={14} />
                <span style={{ fontSize: '12px', fontWeight: 700 }}>Application delivered to organisation</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

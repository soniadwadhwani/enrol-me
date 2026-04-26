import { ArrowLeft, School, Heart, Calendar, CheckCircle } from 'lucide-react';

interface ChildDetailPageProps {
  childId: number;
  onBack: () => void;
}

export default function ChildDetailPage({ childId, onBack }: ChildDetailPageProps) {
  const childData = childId === 1 ? {
    name: 'Shaurya',
    age: 11,
    school: 'Delhi Public School',
    interests: ['Swimming', 'Coding', 'Football'],
    enrolledClasses: [
      { name: 'Swimming Academy', color: '#74A4BC' },
      { name: 'Coding Lab', color: '#74A4BC' },
      { name: 'Football Club', color: '#74A4BC' },
      { name: 'Robotics Lab', color: '#74A4BC' },
      { name: 'Public Speaking', color: '#74A4BC' }
    ],
    activeClasses: 5,
    completedClasses: 2,
    color: '#74A4BC'
  } : {
    name: 'Asmi',
    age: 8,
    school: 'Orchids International',
    interests: ['Piano', 'Dance', 'Art'],
    enrolledClasses: [
      { name: 'Piano Studio', color: '#B6D6CC' },
      { name: 'Dance Studio', color: '#B6D6CC' },
      { name: 'Art Workshop', color: '#B6D6CC' },
      { name: 'Yoga Kids', color: '#B6D6CC' }
    ],
    activeClasses: 4,
    completedClasses: 1,
    color: '#B6D6CC'
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Header */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '16px' }}>
        <div className="flex items-center" style={{ gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(17,19,24,0.08)'
            }}
          >
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#111318', margin: 0 }}>
            {childData.name}
          </h1>
        </div>
      </div>

      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
        {/* Profile Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(17,19,24,0.06)'
        }}>
          {/* Age & School */}
          <div style={{ marginBottom: '20px' }}>
            <div className="flex items-center" style={{ gap: '8px', marginBottom: '12px' }}>
              <Calendar size={16} style={{ color: '#6E7480' }} />
              <span style={{ fontSize: '15px', color: '#6E7480' }}>Age: </span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#111318' }}>{childData.age}</span>
            </div>
            <div className="flex items-center" style={{ gap: '8px' }}>
              <School size={16} style={{ color: '#6E7480' }} />
              <span style={{ fontSize: '15px', color: '#6E7480' }}>School: </span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#111318' }}>{childData.school}</span>
            </div>
          </div>

          {/* Interests */}
          <div style={{ marginBottom: '20px' }}>
            <div className="flex items-center" style={{ gap: '8px', marginBottom: '10px' }}>
              <Heart size={16} style={{ color: '#6E7480' }} />
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#111318' }}>Interests</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {childData.interests.map((interest, index) => (
                <span
                  key={index}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '12px',
                    backgroundColor: `${childData.color}20`,
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#111318'
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid #F4FAF8'
          }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: childData.color, marginBottom: '4px' }}>
                {childData.activeClasses}
              </div>
              <div style={{ fontSize: '12px', color: '#6E7480' }}>Active Classes</div>
            </div>
            <div style={{ width: '1px', backgroundColor: '#F4FAF8' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#B6D6CC', marginBottom: '4px' }}>
                {childData.completedClasses}
              </div>
              <div style={{ fontSize: '12px', color: '#6E7480' }}>Completed</div>
            </div>
          </div>
        </div>

        {/* Enrolled Classes */}
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '12px' }}>
          Enrolled Classes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {childData.enrolledClasses.map((classItem, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: classItem.color,
                flexShrink: 0
              }} />
              <span style={{ fontSize: '15px', fontWeight: 500, color: '#111318', flex: 1 }}>
                {classItem.name}
              </span>
              <CheckCircle size={16} style={{ color: '#10B981' }} />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            flex: 1,
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: childData.color,
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            color: '#FFFFFF',
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
            boxShadow: `0 8px 20px ${childData.color}40`
          }}>
            Edit Profile
          </button>
          <button style={{
            flex: 1,
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: `2px solid ${childData.color}`,
            fontSize: '15px',
            fontWeight: 600,
            color: childData.color,
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Manage Classes
          </button>
        </div>
      </div>
    </div>
  );
}

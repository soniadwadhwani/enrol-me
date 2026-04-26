import { ArrowLeft, Bookmark, MapPin, Star } from 'lucide-react';

interface SavedClassesPageProps {
  onBack: () => void;
}

export default function SavedClassesPage({ onBack }: SavedClassesPageProps) {
  const savedClasses = [
    {
      id: 1,
      name: 'Swimming Academy',
      location: 'Lavale Sports Club',
      rating: 4.8,
      price: '₹2,500/mo',
      image: '🏊'
    },
    {
      id: 2,
      name: 'Piano Studio',
      location: 'Harmony Music Institute',
      rating: 4.9,
      price: '₹3,000/mo',
      image: '🎹'
    },
    {
      id: 3,
      name: 'Coding for Kids',
      location: 'CodeLab Hinjewadi',
      rating: 4.7,
      price: '₹4,000/mo',
      image: '💻'
    },
    {
      id: 4,
      name: 'Dance Studio',
      location: 'Rhythm Dance Academy',
      rating: 4.8,
      price: '₹2,800/mo',
      image: '💃'
    }
  ];

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
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111318', margin: 0 }}>
            Saved Classes
          </h1>
        </div>
      </div>

      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
        {savedClasses.map((classItem) => (
          <div
            key={classItem.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 8px 24px rgba(17,19,24,0.06)'
            }}
          >
            <div className="flex items-start" style={{ gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: '#F4FAF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0
              }}>
                {classItem.image}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111318', marginBottom: '6px' }}>
                  {classItem.name}
                </h3>
                <div className="flex items-center" style={{ gap: '6px', marginBottom: '4px' }}>
                  <MapPin size={14} style={{ color: '#6E7480' }} />
                  <span style={{ fontSize: '14px', color: '#6E7480' }}>{classItem.location}</span>
                </div>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <div className="flex items-center" style={{ gap: '4px' }}>
                    <Star size={14} style={{ color: '#F9C74F', fill: '#F9C74F' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#111318' }}>{classItem.rating}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#74A4BC' }}>{classItem.price}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                flex: 1,
                padding: '12px',
                borderRadius: '16px',
                backgroundColor: '#B6D6CC',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                color: '#111318',
                cursor: 'pointer',
                fontFamily: 'Raleway, sans-serif'
              }}>
                View Details
              </button>
              <button style={{
                flex: 1,
                padding: '12px',
                borderRadius: '16px',
                backgroundColor: '#F4FAF8',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                color: '#F11859',
                cursor: 'pointer',
                fontFamily: 'Raleway, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}>
                <Bookmark size={16} style={{ fill: '#F11859' }} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

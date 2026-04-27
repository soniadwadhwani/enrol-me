import { Clock, MapPin, CheckCircle, Calendar, SlidersHorizontal, Waves, Music, Code, Trophy, Bot, Palette, Users as DancerIcon, Heart, X } from 'lucide-react';
import { useState } from 'react';
import PageHeader from './PageHeader';
import CalendarView from './CalendarView';

interface SchedulePageProps {
  isLearnerMode?: boolean;
}

export default function SchedulePage({ isLearnerMode = false }: SchedulePageProps) {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showFilter, setShowFilter] = useState(false);
  const [childFilter, setChildFilter] = useState<'all' | 'shaurya' | 'asmi'>('all');

  const allBookings = [
    {
      id: 1,
      title: 'Swimming Class',
      time: 'Today 5 PM',
      location: 'Lavale Sports Club',
      status: 'Confirmed',
      backgroundColor: '#DCEEFF',
      child: 'Shaurya',
      childKey: 'shaurya',
      icon: Waves,
      iconColor: '#74A4BC'
    },
    {
      id: 2,
      title: 'Piano Lesson',
      time: 'Tomorrow 6 PM',
      location: 'Harmony Music Institute',
      status: 'Confirmed',
      backgroundColor: '#DFF4EA',
      child: 'Asmi',
      childKey: 'asmi',
      icon: Music,
      iconColor: '#B6D6CC'
    },
    {
      id: 3,
      title: 'Coding Class',
      time: 'Fri 4 PM',
      location: 'CodeLab Hinjewadi',
      status: 'Confirmed',
      backgroundColor: '#D7EBFF',
      child: 'Shaurya',
      childKey: 'shaurya',
      icon: Code,
      iconColor: '#74A4BC'
    },
    {
      id: 4,
      title: 'Football Coaching',
      time: 'Sat 10 AM',
      location: 'Victory Sports Ground',
      status: 'Confirmed',
      backgroundColor: '#D8F0FF',
      child: 'Shaurya',
      childKey: 'shaurya',
      icon: Trophy,
      iconColor: '#74A4BC'
    },
    {
      id: 5,
      title: 'Art Class',
      time: 'Sat 11 AM',
      location: 'Creative Studio Wakad',
      status: 'Confirmed',
      backgroundColor: '#DCF2E6',
      child: 'Asmi',
      childKey: 'asmi',
      icon: Palette,
      iconColor: '#B6D6CC'
    },
    {
      id: 6,
      title: 'Tennis Practice',
      time: 'Sat 4 PM',
      location: 'Lavale Tennis Academy',
      status: 'Confirmed',
      backgroundColor: '#DCEEFF',
      child: 'Shaurya',
      childKey: 'shaurya',
      icon: Trophy,
      iconColor: '#74A4BC'
    },
    {
      id: 7,
      title: 'Dance Studio',
      time: 'Sun 10 AM',
      location: 'Rhythm Dance Academy',
      status: 'Confirmed',
      backgroundColor: '#E3F7ED',
      child: 'Asmi',
      childKey: 'asmi',
      icon: DancerIcon,
      iconColor: '#B6D6CC'
    },
    {
      id: 8,
      title: 'Robotics Lab',
      time: 'Sun 2 PM',
      location: 'Tech Kids Hinjewadi',
      status: 'Confirmed',
      backgroundColor: '#D7EBFF',
      child: 'Shaurya',
      childKey: 'shaurya',
      icon: Bot,
      iconColor: '#74A4BC'
    },
    {
      id: 9,
      title: 'Yoga Kids',
      time: 'Mon 6 PM',
      location: 'Zen Wellness Lavale',
      status: 'Cancelled',
      backgroundColor: '#DFF4EA',
      child: 'Asmi',
      childKey: 'asmi',
      icon: Heart,
      iconColor: '#B6D6CC'
    }
  ];

  const bookings = childFilter === 'all'
    ? allBookings
    : allBookings.filter(b => b.childKey === childFilter);

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <PageHeader title="My Schedule" />

      {/* Quick Actions */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        display: 'flex',
        gap: '10px',
        zIndex: 50
      }}>
        <button
          onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
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
          <Calendar size={18} style={{ color: '#111318' }} />
        </button>
        {!isLearnerMode && (
          <button
            onClick={() => setShowFilter(!showFilter)}
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
            <SlidersHorizontal size={18} style={{ color: '#111318' }} />
          </button>
        )}
      </div>

      {/* Content Spacing */}
      <div style={{ paddingTop: '12px', paddingBottom: '24px' }}></div>

      {/* Calendar View */}
      {view === 'calendar' && (
        <CalendarView
          bookings={bookings}
          onToggleView={() => setView('list')}
          isLearnerMode={isLearnerMode}
        />
      )}

      {/* List View */}
      {view === 'list' && (
        <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          <div className="space-y-4">
            {bookings.map((booking) => {
              const IconComponent = booking.icon;
              return (
                <div
                  key={booking.id}
                  style={{
                    backgroundColor: isLearnerMode ? '#FFFFFF' : booking.backgroundColor,
                    borderRadius: '28px',
                    padding: '20px',
                    boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                    position: 'relative'
                  }}
                >
                  {!isLearnerMode && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px'
                    }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#6E7480'
                      }}>
                        {booking.child}
                      </span>
                    </div>
                  )}

                  {/* Icon Badge */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    backgroundColor: isLearnerMode ? '#F4FAF8' : 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={24} style={{ color: isLearnerMode ? '#6E7480' : booking.iconColor }} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#111318',
                    marginBottom: '12px',
                    paddingRight: isLearnerMode ? '0px' : '80px'
                  }}>
                    {booking.title}
                  </h3>

                  {/* Time */}
                  <div className="flex items-center" style={{ gap: '8px', marginBottom: '8px' }}>
                    <Clock size={16} style={{ color: '#6E7480' }} />
                    <span style={{ fontSize: '16px', color: '#6E7480' }}>
                      {booking.time}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center" style={{ gap: '8px', marginBottom: '12px' }}>
                    <MapPin size={16} style={{ color: '#6E7480' }} />
                    <span style={{ fontSize: '16px', color: '#6E7480' }}>
                      {booking.location}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center" style={{ gap: '6px' }}>
                    {booking.status === 'Cancelled' ? (
                      <>
                        <X size={16} style={{ color: '#EF4444' }} />
                        <span style={{ fontSize: '14px', fontWeight: 400, color: '#EF4444' }}>
                          {booking.status}
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} style={{ color: '#10B981' }} />
                        <span style={{ fontSize: '14px', fontWeight: 400, color: '#10B981' }}>
                          {booking.status}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {!isLearnerMode && showFilter && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(17,19,24,0.18)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          onClick={() => setShowFilter(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              padding: '24px',
              maxWidth: '393px'
            }}
          >
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#111318',
              marginBottom: '16px'
            }}>
              Filter by Child
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => {
                  setChildFilter('all');
                  setShowFilter(false);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: childFilter === 'all' ? '#F4FAF8' : '#FFFFFF',
                  border: '1px solid #E5E8ED',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#111318',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                Show All
              </button>
              <button
                onClick={() => {
                  setChildFilter('shaurya');
                  setShowFilter(false);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: childFilter === 'shaurya' ? '#DCEEFF' : '#FFFFFF',
                  border: '1px solid #E5E8ED',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#111318',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#74A4BC'
                }} />
                Shaurya only
              </button>
              <button
                onClick={() => {
                  setChildFilter('asmi');
                  setShowFilter(false);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: childFilter === 'asmi' ? '#DFF4EA' : '#FFFFFF',
                  border: '1px solid #E5E8ED',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#111318',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#B6D6CC'
                }} />
                Asmi only
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

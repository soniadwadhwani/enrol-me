import { ChevronLeft, ChevronRight, Waves, Music, Code, Trophy, Bot, Palette, Users as DancerIcon, Heart, CheckCircle, X } from 'lucide-react';
import { useState, useMemo } from 'react';

interface CalendarViewProps {
  bookings: any[];
  onToggleView: () => void;
}

export default function CalendarView({ bookings, onToggleView }: CalendarViewProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Recurring class patterns
  const recurringClasses = {
    shaurya: [
      { title: 'Swimming Class', days: [2, 5], time: '5 PM', icon: Waves, location: 'Lavale Sports Club' }, // Tue, Fri
      { title: 'Coding Class', days: [6], time: '11 AM', icon: Code, location: 'CodeLab Hinjewadi' }, // Sat
      { title: 'Football Coaching', days: [0], time: '9 AM', icon: Trophy, location: 'Victory Sports Ground' }, // Sun
      { title: 'Tennis Practice', days: [3], time: '6 PM', icon: Trophy, location: 'Lavale Tennis Academy' }, // Wed
      { title: 'Robotics Lab', days: [4], time: '4 PM', icon: Bot, location: 'Tech Kids Hinjewadi' } // Thu
    ],
    asmi: [
      { title: 'Piano Lesson', days: [1, 4], time: '6 PM', icon: Music, location: 'Harmony Music Institute' }, // Mon, Thu
      { title: 'Art Class', days: [6], time: '12 PM', icon: Palette, location: 'Creative Studio Wakad' }, // Sat
      { title: 'Dance Studio', days: [3], time: '5 PM', icon: DancerIcon, location: 'Rhythm Dance Academy' }, // Wed
      { title: 'Yoga Kids', days: [0], time: '10 AM', icon: Heart, location: 'Zen Wellness Lavale' } // Sun
    ]
  };

  // Generate events for a specific month/year
  const generateMonthEvents = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const events: { [key: string]: any[] } = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayOfWeek = date.getDay();
      const dateKey = `${currentYear}-${currentMonth}-${day}`;
      events[dateKey] = [];

      // Check Shaurya's classes
      recurringClasses.shaurya.forEach(classInfo => {
        if (classInfo.days.includes(dayOfWeek)) {
          events[dateKey].push({
            ...classInfo,
            child: 'Shaurya',
            childKey: 'shaurya',
            iconColor: '#74A4BC',
            status: 'Confirmed'
          });
        }
      });

      // Check Asmi's classes
      recurringClasses.asmi.forEach(classInfo => {
        if (classInfo.days.includes(dayOfWeek)) {
          events[dateKey].push({
            ...classInfo,
            child: 'Asmi',
            childKey: 'asmi',
            iconColor: '#B6D6CC',
            status: 'Confirmed'
          });
        }
      });
    }

    return events;
  }, [currentMonth, currentYear]);

  // Calculate calendar grid
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days: (number | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Pad to complete weeks (35 or 42 cells)
    while (days.length < 35) {
      days.push(null);
    }

    return days;
  }, [currentMonth, currentYear]);

  const getEventsForDate = (day: number | null) => {
    if (!day) return [];
    const dateKey = `${currentYear}-${currentMonth}-${day}`;
    return generateMonthEvents[dateKey] || [];
  };

  const getDotColors = (day: number | null) => {
    const events = getEventsForDate(day);
    const colors = events.map(e => e.childKey === 'shaurya' ? '#74A4BC' : '#B6D6CC');
    return colors.slice(0, 3);
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const getSelectedDayEvents = () => {
    if (!selectedDate) return [];
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    if (month !== currentMonth || year !== currentYear) return [];

    return getEventsForDate(day);
  };

  const isDateSelected = (day: number | null) => {
    if (!day || !selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  return (
    <div>
      {/* View Toggle */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '20px' }}>
        <div style={{
          display: 'inline-flex',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '4px',
          boxShadow: '0 4px 16px rgba(17,19,24,0.06)'
        }}>
          <button
            onClick={onToggleView}
            style={{
              padding: '8px 20px',
              borderRadius: '16px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6E7480',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            List View
          </button>
          <button
            style={{
              padding: '8px 20px',
              borderRadius: '16px',
              backgroundColor: '#B6D6CC',
              border: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: '#111318',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Calendar View
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '16px' }}>
        <div className="flex items-center justify-between">
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111318' }}>
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center" style={{ gap: '8px' }}>
            <button
              onClick={goToPreviousMonth}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(17,19,24,0.06)'
              }}
            >
              <ChevronLeft size={16} style={{ color: '#111318' }} />
            </button>
            <button
              onClick={goToNextMonth}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(17,19,24,0.06)'
              }}
            >
              <ChevronRight size={16} style={{ color: '#111318' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          padding: '20px',
          boxShadow: '0 12px 30px rgba(17,19,24,0.08)'
        }}>
          {/* Week Day Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            marginBottom: '12px'
          }}>
            {weekDays.map((day, idx) => (
              <div key={`weekday-${idx}`} style={{
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 600,
                color: '#6E7480',
                padding: '4px'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px'
          }}>
            {calendarDays.map((day, index) => {
              const hasEvents = day && getEventsForDate(day).length > 0;
              const isSelected = isDateSelected(day);

              return (
                <button
                  key={index}
                  onClick={() => day && handleDateClick(day)}
                  disabled={!day}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? '#F4FAF8' : 'transparent',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: day ? 'pointer' : 'default',
                    position: 'relative',
                    padding: '4px'
                  }}
                >
                  {day && (
                    <>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#111318'
                      }}>
                        {day}
                      </span>
                      {hasEvents && (
                        <div className="flex" style={{ gap: '2px', marginTop: '2px' }}>
                          {getDotColors(day).map((color, idx) => (
                            <div
                              key={idx}
                              style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: color
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bookings for Selected Date */}
      {selectedDate && getSelectedDayEvents().length > 0 && (
        <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '12px'
          }}>
            {selectedDate.getDate()} {monthNames[selectedDate.getMonth()].substring(0, 3)}
          </h3>
          {getSelectedDayEvents().map((event, index) => {
            const IconComponent = event.icon;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '16px',
                  marginBottom: '12px',
                  boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                {/* Icon Tile */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: event.childKey === 'shaurya' ? 'rgba(116, 164, 188, 0.15)' : 'rgba(182, 214, 204, 0.15)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={24} style={{ color: event.iconColor }} />
                </div>

                {/* Center Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#111318',
                    marginBottom: '4px'
                  }}>
                    {event.title}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#6E7480'
                  }}>
                    {event.child}
                  </div>
                </div>

                {/* Right Side - Time */}
                <div style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#111318',
                  flexShrink: 0
                }}>
                  {event.time}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

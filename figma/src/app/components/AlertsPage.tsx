import { ChevronRight, X, Calendar, CreditCard, FileText, Book, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface AlertsPageProps {
  onBack: () => void;
  onAlertClick: (type: string, data?: any) => void;
}

export default function AlertsPage({ onBack, onAlertClick }: AlertsPageProps) {
  const [alertsList, setAlertsList] = useState([
    {
      id: 1,
      type: 'cancellation',
      title: 'Yoga Kids Cancelled',
      message: 'Today 6 PM class has been cancelled',
      time: '15 min ago',
      unread: true,
      icon: AlertCircle,
      iconColor: '#DC2626',
      chatId: 1
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Swimming Class Tomorrow',
      message: 'Starts at 5 PM',
      time: '2h ago',
      unread: true,
      icon: Calendar,
      iconColor: '#74A4BC',
      chatId: 2
    },
    {
      id: 3,
      type: 'payment',
      title: 'Fees Due Soon',
      message: 'Swimming Academy ₹2,500 due on 28 Apr',
      time: '3h ago',
      unread: true,
      icon: CreditCard,
      iconColor: '#F11859',
      chatId: 3
    },
    {
      id: 4,
      type: 'overdue',
      title: 'Overdue Fee Notice',
      message: 'Art Class payment ₹700 overdue by 5 days',
      time: '1h ago',
      unread: true,
      icon: AlertCircle,
      iconColor: '#E57373',
      chatId: 3
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Pending',
      message: 'Piano Studio ₹3,000 due on 30 Apr',
      time: '4h ago',
      unread: true,
      icon: CreditCard,
      iconColor: '#F11859',
      chatId: 3
    },
    {
      id: 6,
      type: 'schedule',
      title: 'Piano Studio',
      message: 'May timetable uploaded',
      time: '5h ago',
      unread: false,
      icon: FileText,
      iconColor: '#B6D6CC',
      chatId: 4
    },
    {
      id: 7,
      type: 'homework',
      title: 'Coding Lab',
      message: 'Homework shared for Shaurya',
      time: '1d ago',
      unread: false,
      icon: Book,
      iconColor: '#74A4BC',
      chatId: 5
    },
    {
      id: 8,
      type: 'cancellation',
      title: 'Dance Studio',
      message: 'Sunday batch shifted to next week',
      time: '1d ago',
      unread: false,
      icon: AlertCircle,
      iconColor: '#DC2626',
      chatId: 6
    }
  ]);

  const handleMarkAllRead = () => {
    setAlertsList(alertsList.map(alert => ({ ...alert, unread: false })));
  };

  const handleAlertClick = (alert: any) => {
    setAlertsList(alertsList.map(a => a.id === alert.id ? { ...a, unread: false } : a));

    if (alert.type === 'cancellation') {
      onAlertClick('chat', { chatId: alert.chatId });
    } else if (alert.type === 'reminder') {
      onAlertClick('chat', { chatId: alert.chatId });
    } else if (alert.type === 'overdue') {
      onAlertClick('fees');
    } else if (alert.type === 'payment') {
      onAlertClick('fees');
    } else if (alert.type === 'schedule') {
      onAlertClick('chat', { chatId: alert.chatId });
    } else if (alert.type === 'homework') {
      onAlertClick('chat', { chatId: alert.chatId });
    }
  };

  const hasUnread = alertsList.some(alert => alert.unread);

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Custom Header */}
      <div style={{
        paddingTop: '24px',
        paddingLeft: '24px',
        paddingRight: '84px',
        paddingBottom: '16px',
        backgroundColor: '#F4FAF8'
      }}>
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
              boxShadow: '0 4px 12px rgba(17,19,24,0.08)',
              flexShrink: 0
            }}
          >
            <X size={18} style={{ color: '#111318' }} />
          </button>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#111318',
            margin: 0,
            flex: 1
          }}>
            Alerts
          </h1>
          {hasUnread && (
            <button
              onClick={handleMarkAllRead}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#74A4BC',
                cursor: 'pointer',
                padding: '6px 0',
                fontFamily: 'Raleway, sans-serif',
                flexShrink: 0,
                whiteSpace: 'nowrap'
              }}
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Alerts List */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '8px' }}>
        {alertsList.map((alert) => {
          const IconComponent = alert.icon;
          return (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '18px',
                marginBottom: '12px',
                boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                position: 'relative'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: `${alert.iconColor}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <IconComponent size={22} style={{ color: alert.iconColor }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#111318',
                  lineHeight: '1.3',
                  marginBottom: '4px'
                }}>
                  {alert.title}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6E7480',
                  lineHeight: '1.4',
                  marginBottom: '4px'
                }}>
                  {alert.message}
                </p>
                <span style={{
                  fontSize: '12px',
                  color: '#9CA3B0'
                }}>
                  {alert.time}
                </span>
              </div>

              {/* Right Side */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexShrink: 0
              }}>
                {alert.unread && (
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#F11859'
                  }} />
                )}
                <ChevronRight size={20} style={{ color: '#9CA3B0' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State (hidden when there are alerts) */}
      {alertsList.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '120px',
          paddingLeft: '40px',
          paddingRight: '40px'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '16px'
          }}>
            🎉
          </div>
          <p style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#111318',
            textAlign: 'center'
          }}>
            You are all caught up!
          </p>
        </div>
      )}
    </div>
  );
}

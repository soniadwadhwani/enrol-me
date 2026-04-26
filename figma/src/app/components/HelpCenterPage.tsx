import { ArrowLeft, HelpCircle, MessageCircle, FileText, CreditCard, Calendar, ChevronRight } from 'lucide-react';

interface HelpCenterPageProps {
  onBack: () => void;
}

export default function HelpCenterPage({ onBack }: HelpCenterPageProps) {
  const helpSections = [
    { icon: HelpCircle, label: 'FAQs', subtitle: 'Common questions answered' },
    { icon: MessageCircle, label: 'Contact Support', subtitle: 'Get in touch with our team' },
    { icon: MessageCircle, label: 'Live Chat', subtitle: 'Chat with us now', badge: 'Online' },
    { icon: FileText, label: 'Refund Policy', subtitle: 'Learn about our refund process' },
    { icon: CreditCard, label: 'How Payments Work', subtitle: 'Payment methods and process' },
    { icon: Calendar, label: 'Manage Bookings', subtitle: 'Edit or cancel bookings' }
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
            Help Center
          </h1>
        </div>
      </div>

      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
        {/* Search Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(17,19,24,0.06)'
        }}>
          <input
            type="text"
            placeholder="Search for help..."
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: '#111318',
              backgroundColor: 'transparent',
              fontFamily: 'Raleway, sans-serif'
            }}
          />
        </div>

        {/* Help Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {helpSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#F4FAF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComponent size={20} style={{ color: '#111318' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div className="flex items-center" style={{ gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', margin: 0 }}>
                      {section.label}
                    </h3>
                    {section.badge && (
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#B6D6CC',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#111318'
                      }}>
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: '#6E7480', margin: 0 }}>
                    {section.subtitle}
                  </p>
                </div>

                <ChevronRight size={20} style={{ color: '#9CA3B0' }} />
              </div>
            );
          })}
        </div>

        {/* Contact Info */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '20px',
          marginTop: '24px',
          boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '12px' }}>
            Still need help?
          </h3>
          <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '16px' }}>
            Email us at support@enrolme.com
          </p>
          <button style={{
            padding: '12px 24px',
            borderRadius: '16px',
            backgroundColor: '#B6D6CC',
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            color: '#111318',
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

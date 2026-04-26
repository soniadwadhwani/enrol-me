import { ChevronRight, User, Mail, Bookmark, Users, Settings, HelpCircle, LogOut, X } from 'lucide-react';
import { useState } from 'react';
import PageHeader from './PageHeader';

interface ProfilePageProps {
  onNavigate?: (screen: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const profileSections = [
    { icon: Bookmark, label: 'Saved Classes', count: '12', screen: 'savedClasses' },
    { icon: Users, label: 'Children Profiles', count: '2', screen: 'childrenProfiles' },
    { icon: Settings, label: 'Settings', screen: 'settings' },
    { icon: HelpCircle, label: 'Help Center', screen: 'helpCenter' }
  ];

  const handleSectionClick = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const handleProfileClick = () => {
    if (onNavigate) {
      onNavigate('editProfile');
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Actual logout logic would go here
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <PageHeader title="Enrol-me" />

      {/* Content Spacing */}
      <div style={{ paddingTop: '12px', paddingBottom: '32px' }}></div>

      {/* Profile Card */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '24px' }}>
        <div
          onClick={handleProfileClick}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '24px',
            boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
            cursor: 'pointer'
          }}>
          {/* Avatar */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#B6D6CC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <User size={40} style={{ color: '#FFFFFF' }} />
          </div>

          {/* Name */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '8px'
          }}>
            Priya Sharma
          </h2>

          {/* Email */}
          <div className="flex items-center" style={{ gap: '8px' }}>
            <Mail size={16} style={{ color: '#6E7480' }} />
            <span style={{ fontSize: '16px', color: '#6E7480' }}>
              priya.sharma@email.com
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="space-y-3">
          {profileSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                onClick={() => handleSectionClick(section.screen)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '20px',
                  boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
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

                <span style={{
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#111318'
                }}>
                  {section.label}
                </span>

                {section.count && (
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#6E7480',
                    marginRight: '8px'
                  }}>
                    {section.count}
                  </span>
                )}

                <ChevronRight size={20} style={{ color: '#6E7480' }} />
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div style={{ paddingTop: '24px' }}>
          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              width: '100%',
              height: '56px',
              borderRadius: '28px',
              backgroundColor: '#FFFFFF',
              color: '#F11859',
              fontSize: '16px',
              fontWeight: 600,
              border: '1px solid #E5E8ED',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
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
            zIndex: 1000
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
              boxShadow: '0 20px 60px rgba(17,19,24,0.3)'
            }}
          >
            <h3 style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#111318',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              Are you sure?
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6E7480',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
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
                  fontFamily: 'Raleway, sans-serif'
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
                  fontFamily: 'Raleway, sans-serif'
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
}

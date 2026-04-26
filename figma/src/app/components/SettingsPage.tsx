import { ArrowLeft, Bell, CreditCard, Lock, Globe, Palette, MapPin, Shield, HelpCircle, FileText, Info, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
  onOpenAlerts?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function SettingsPage({ onBack, onOpenAlerts, onNavigate }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [showLanguageSheet, setShowLanguageSheet] = useState(false);
  const [showThemeSheet, setShowThemeSheet] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTheme, setSelectedTheme] = useState('Light');

  const handleAllNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    if (newValue) {
      setEmailNotifs(true);
      setPushNotifs(true);
    } else {
      setEmailNotifs(false);
      setPushNotifs(false);
    }
  };

  const languages = ['English', 'Hindi', 'Marathi'];
  const themes = ['Light', 'Dark', 'System'];

  const actionItems = [
    { icon: CreditCard, label: 'Payment Methods', screen: 'paymentMethods' },
    { icon: Lock, label: 'Privacy', screen: 'privacy' },
    { icon: Globe, label: 'Language', value: selectedLanguage, onClick: () => setShowLanguageSheet(true) },
    { icon: Palette, label: 'Theme', value: selectedTheme, onClick: () => setShowThemeSheet(true) },
    { icon: MapPin, label: 'Location Preferences', screen: 'locationPreferences' },
    { icon: Shield, label: 'App Permissions', screen: 'permissions' }
  ];

  const extraItems = [
    { icon: HelpCircle, label: 'Help Center', screen: 'helpCenter' },
    { icon: FileText, label: 'Terms & Policies', screen: 'terms' },
    { icon: Info, label: 'App Version', value: 'v1.0.2' }
  ];

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Header */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '84px', paddingBottom: '16px' }}>
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
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#111318', margin: 0 }}>
            Settings
          </h1>
        </div>
      </div>

      {/* Floating Alert Button */}
      {onOpenAlerts && (
        <button
          onClick={onOpenAlerts}
          style={{
            position: 'fixed',
            top: '18px',
            right: '20px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(17, 19, 24, 0.10)',
            zIndex: 100
          }}
        >
          <Bell size={20} style={{ color: '#111318' }} />
        </button>
      )}

      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
        {/* Notifications Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '16px',
          boxShadow: '0 4px 16px rgba(17,19,24,0.06)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '16px' }}>
            Notifications
          </h3>

          {/* All Notifications */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid #F4FAF8'
          }}>
            <span style={{ fontSize: '15px', color: '#111318' }}>All Notifications</span>
            <div
              onClick={handleAllNotificationsToggle}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                backgroundColor: notifications ? '#B6D6CC' : '#E5E8ED',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                top: '3px',
                left: notifications ? '23px' : '3px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
            </div>
          </div>

          {/* Email Notifications */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #F4FAF8'
          }}>
            <span style={{ fontSize: '15px', color: '#111318' }}>Email Notifications</span>
            <div
              onClick={() => setEmailNotifs(!emailNotifs)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                backgroundColor: emailNotifs ? '#B6D6CC' : '#E5E8ED',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                top: '3px',
                left: emailNotifs ? '23px' : '3px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
            </div>
          </div>

          {/* Push Notifications */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px'
          }}>
            <span style={{ fontSize: '15px', color: '#111318' }}>Push Notifications</span>
            <div
              onClick={() => setPushNotifs(!pushNotifs)}
              style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                backgroundColor: pushNotifs ? '#B6D6CC' : '#E5E8ED',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                top: '3px',
                left: pushNotifs ? '23px' : '3px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} />
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {actionItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else if (item.screen && onNavigate) {
                    onNavigate(item.screen);
                  }
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '18px',
                  boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#F4FAF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComponent size={18} style={{ color: '#111318' }} />
                </div>
                <span style={{ flex: 1, fontSize: '15px', fontWeight: 500, color: '#111318' }}>
                  {item.label}
                </span>
                {item.value && (
                  <span style={{ fontSize: '14px', color: '#6E7480', marginRight: '4px' }}>
                    {item.value}
                  </span>
                )}
                <ChevronRight size={18} style={{ color: '#9CA3B0' }} />
              </div>
            );
          })}
        </div>

        {/* Extra Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {extraItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                onClick={() => item.screen && onNavigate && onNavigate(item.screen)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '18px',
                  boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                  cursor: item.screen ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#F4FAF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComponent size={18} style={{ color: '#111318' }} />
                </div>
                <span style={{ flex: 1, fontSize: '15px', fontWeight: 500, color: '#111318' }}>
                  {item.label}
                </span>
                {item.value && (
                  <span style={{ fontSize: '14px', color: '#6E7480' }}>
                    {item.value}
                  </span>
                )}
                {item.screen && <ChevronRight size={18} style={{ color: '#9CA3B0' }} />}
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => onNavigate && onNavigate('logout')}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #FFE5E5',
            fontSize: '15px',
            fontWeight: 600,
            color: '#F11859',
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(17,19,24,0.06)'
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Language Bottom Sheet */}
      {showLanguageSheet && (
        <div
          onClick={() => setShowLanguageSheet(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(17,19,24,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '393px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              padding: '24px',
              animation: 'slideUp 0.3s ease'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111318', marginBottom: '20px' }}>
              Select Language
            </h3>
            {languages.map((lang) => (
              <div
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageSheet(false);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: selectedLanguage === lang ? '#F4FAF8' : 'transparent',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: selectedLanguage === lang ? 600 : 500,
                  color: '#111318',
                  border: selectedLanguage === lang ? '2px solid #B6D6CC' : '2px solid transparent',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Theme Bottom Sheet */}
      {showThemeSheet && (
        <div
          onClick={() => setShowThemeSheet(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(17,19,24,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '393px',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              padding: '24px'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111318', marginBottom: '20px' }}>
              Select Theme
            </h3>
            {themes.map((theme) => (
              <div
                key={theme}
                onClick={() => {
                  setSelectedTheme(theme);
                  setShowThemeSheet(false);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: selectedTheme === theme ? '#F4FAF8' : 'transparent',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: selectedTheme === theme ? 600 : 500,
                  color: '#111318',
                  border: selectedTheme === theme ? '2px solid #B6D6CC' : '2px solid transparent',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

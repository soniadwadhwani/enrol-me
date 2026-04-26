interface PremiumBottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function PremiumBottomNav({ activeTab, onTabChange }: PremiumBottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'communications', label: 'Chat' },
    { id: 'fees', label: 'Fees' },
    { id: 'profile', label: 'You' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '400px',
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
      gap: '4px'
    }}>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
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
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '0 14px',
              whiteSpace: 'nowrap',
              flexShrink: 1,
              minWidth: 0
            }}
          >
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: isActive ? '#111318' : '#6E7480',
              transition: 'color 0.3s ease'
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

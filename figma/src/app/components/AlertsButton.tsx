import { Bell } from 'lucide-react';

interface AlertsButtonProps {
  hasUnread?: boolean;
  onClick?: () => void;
}

export default function AlertsButton({ hasUnread = true, onClick }: AlertsButtonProps) {
  return (
    <button onClick={onClick} style={{
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
      position: 'relative'
    }}>
      <Bell size={18} style={{ color: '#111318' }} />
      {hasUnread && (
        <div style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#F11859',
          border: '2px solid #FFFFFF'
        }}></div>
      )}
    </button>
  );
}

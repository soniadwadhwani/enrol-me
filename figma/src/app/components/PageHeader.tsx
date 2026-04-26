import Logo from '../../imports/Logo.png';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export default function PageHeader({ showBack = false, onBack, title }: PageHeaderProps) {
  return (
    <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '12px' }}>
      <div className="flex items-center" style={{ gap: '10px' }}>
        {showBack && (
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
        )}
        <img src={Logo} alt="Enrol-Me" style={{ height: '28px' }} />
        {title && (
          <span style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#111318',
            letterSpacing: '0.1px',
            lineHeight: '22px'
          }}>{title}</span>
        )}
      </div>
    </div>
  );
}

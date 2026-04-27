import Logo from '../../imports/Logo.png';

interface ModeSelectionScreenProps {
  onSelectAppMode: () => void;
  onSelectDesktopMode: () => void;
}

export default function ModeSelectionScreen({ onSelectAppMode, onSelectDesktopMode }: ModeSelectionScreenProps) {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px', background: 'radial-gradient(circle at 20% 0%, #e9f5f1 0%, #f4faf8 45%, #e6f0ee 100%)', fontFamily: 'Raleway, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '760px', backgroundColor: '#FFFFFF', borderRadius: '34px', padding: '36px', boxShadow: '0 24px 66px rgba(17,19,24,0.16)', textAlign: 'center' }}>
        <img src={Logo} alt="Enrol-Me" style={{ height: '38px', width: 'auto', marginBottom: '16px' }} />
        <h1 style={{ fontSize: '42px', lineHeight: 1.05, margin: 0, marginBottom: '10px', color: '#111318' }}>Choose your view mode</h1>
        <p style={{ marginTop: 0, marginBottom: '26px', color: '#6E7480', fontSize: '16px' }}>App mode is complete. Start desktop mode as a full website experience.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button onClick={onSelectAppMode} style={{ height: '56px', borderRadius: '16px', border: '1px solid #D5E4E0', backgroundColor: '#FFFFFF', color: '#111318', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
            View in App Mode
          </button>
          <button onClick={onSelectDesktopMode} style={{ height: '56px', borderRadius: '16px', border: 'none', backgroundColor: '#B6D6CC', color: '#111318', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>
            View in Desktop Mode
          </button>
        </div>
      </div>
    </div>
  );
}

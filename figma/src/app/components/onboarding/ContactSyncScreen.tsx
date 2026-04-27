import { motion } from 'motion/react';
import { Users } from 'lucide-react';

interface ContactSyncScreenProps {
  onAllow: () => void;
  onSkip: () => void;
}

export default function ContactSyncScreen({ onAllow, onSkip }: ContactSyncScreenProps) {
  return (
    <div
      style={{
        height: '100%',
        backgroundColor: '#F4FAF8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        fontFamily: 'Raleway, sans-serif',
      }}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.7, bounce: 0.4 }}
        style={{
          width: '108px',
          height: '108px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #B6D6CC 0%, #74A4BC 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          boxShadow: '0 20px 56px rgba(116, 164, 188, 0.35)',
        }}
      >
        <Users size={48} color="#FFFFFF" strokeWidth={1.8} />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#111318',
          textAlign: 'center',
          marginBottom: '12px',
          lineHeight: 1.15,
        }}
      >
        Know who's already enrolled
      </motion.h1>

      {/* Sub-text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{
          fontSize: '15px',
          color: '#6E7480',
          textAlign: 'center',
          marginBottom: '36px',
          lineHeight: 1.55,
          maxWidth: '290px',
        }}
      >
        Enrol-Me can show you reviews from people in your contacts so you can trust recommendations from people you know.
      </motion.p>

      {/* Contacts permission illustration */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px',
          width: '100%',
          maxWidth: '310px',
          boxShadow: '0 8px 28px rgba(17,19,24,0.08)',
          marginBottom: '36px',
        }}
      >
        {[
          { initials: 'RS', name: 'Rahul S.', preview: 'Loves the robotics class!' },
          { initials: 'MP', name: 'Meera P.', preview: 'The swimming coaches are great.' },
          { initials: 'DA', name: 'Deepak A.', preview: 'Visible improvement in 2 months.' },
        ].map((contact, i) => (
          <div
            key={contact.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0',
              borderBottom: i < 2 ? '1px solid #F0F4F2' : 'none',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #B6D6CC, #74A4BC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              {contact.initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#111318' }}>{contact.name}</div>
              <div style={{ fontSize: '12px', color: '#6E7480', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {contact.preview}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Allow button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAllow}
        style={{
          width: '100%',
          maxWidth: '310px',
          padding: '17px',
          borderRadius: '24px',
          backgroundColor: '#B6D6CC',
          border: 'none',
          fontSize: '16px',
          fontWeight: 700,
          color: '#111318',
          cursor: 'pointer',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: '0 12px 32px rgba(182, 214, 204, 0.4)',
          marginBottom: '12px',
        }}
      >
        Allow Access
      </motion.button>

      {/* Skip link */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onSkip}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '14px',
          fontWeight: 600,
          color: '#9CA3B0',
          cursor: 'pointer',
          fontFamily: 'Raleway, sans-serif',
          padding: '8px',
        }}
      >
        Skip for now
      </motion.button>
    </div>
  );
}

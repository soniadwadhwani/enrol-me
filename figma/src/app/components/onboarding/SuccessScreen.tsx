import { motion } from 'motion/react';

interface SuccessScreenProps {
  onEnterApp: () => void;
}

export default function SuccessScreen({ onEnterApp }: SuccessScreenProps) {
  return (
    <div style={{
      height: '100%',
      backgroundColor: '#F4FAF8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#B6D6CC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          boxShadow: '0 20px 60px rgba(182, 214, 204, 0.4)'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
          style={{ fontSize: '64px' }}
        >
          🎉
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#111318',
          textAlign: 'center',
          marginBottom: '16px'
        }}
      >
        You're all set!
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: '18px',
          color: '#6E7480',
          textAlign: 'center',
          marginBottom: '64px',
          maxWidth: '300px'
        }}
      >
        Your personalised Enrol-Me dashboard is ready.
      </motion.p>

      {/* Enter App Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={onEnterApp}
        style={{
          width: '100%',
          maxWidth: '320px',
          padding: '18px',
          borderRadius: '24px',
          backgroundColor: '#B6D6CC',
          border: 'none',
          fontSize: '17px',
          fontWeight: 600,
          color: '#111318',
          cursor: 'pointer',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: '0 12px 32px rgba(182, 214, 204, 0.4)'
        }}
      >
        Enter App
      </motion.button>
    </div>
  );
}

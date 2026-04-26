import Logo from '../../../imports/Logo.png';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export default function WelcomeScreen({ onGetStarted, onSignIn }: WelcomeScreenProps) {
  return (
    <div style={{
      height: '100%',
      backgroundColor: '#F4FAF8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Background Shapes */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'rgba(182, 214, 204, 0.15)',
          filter: 'blur(40px)'
        }}
      />
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: 'rgba(116, 164, 188, 0.12)',
          filter: 'blur(50px)'
        }}
      />

      {/* Logo */}
      <motion.img
        src={Logo}
        alt="Enrol-Me"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ height: '72px', marginBottom: '48px' }}
      />

      {/* Headline */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          fontSize: '31px',
          fontWeight: 700,
          color: '#111318',
          textAlign: 'center',
          marginBottom: '16px',
          lineHeight: '1.2',
          maxWidth: '280px'
        }}
      >
        Discover great classes
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          fontSize: '16px',
          color: '#6E7480',
          textAlign: 'center',
          marginBottom: '64px',
          maxWidth: '300px',
          lineHeight: '1.4'
        }}
      >
        Sports, arts, academics near you
      </motion.p>

      {/* CTA Buttons */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={onGetStarted}
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
          boxShadow: '0 12px 32px rgba(182, 214, 204, 0.4)',
          marginBottom: '16px'
        }}
      >
        Get Started
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '12px'
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 500, color: '#6E7480', fontFamily: 'Raleway, sans-serif', pointerEvents: 'none' }}>
          Already have account?
        </span>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onSignIn}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            color: '#74A4BC',
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
            padding: '8px 12px',
            margin: '-8px -12px',
            textDecoration: 'underline',
            textDecorationColor: '#74A4BC',
            textDecorationThickness: '1px',
            textUnderlineOffset: '2px',
            transition: 'all 0.2s ease',
            position: 'relative',
            zIndex: 10,
            WebkitTapHighlightColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecorationColor = '#5A8AA0';
            e.currentTarget.style.color = '#5A8AA0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecorationColor = '#74A4BC';
            e.currentTarget.style.color = '#74A4BC';
          }}
        >
          Sign In
        </motion.button>
      </motion.div>
    </div>
  );
}
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface SignInScreenProps {
  onBack: () => void;
  onSignIn: (role: 'parent' | 'learner' | 'organisation') => void;
  onOpenOrgLogin: () => void;
}

const CREDENTIALS = {
  parent: { mobile: '9999999999', password: '000' },
  learner: { mobile: '8888888888', password: '000' }
};

export default function SignInScreen({ onBack, onSignIn, onOpenOrgLogin }: SignInScreenProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSignIn = () => {
    // Check if it's a parent account
    if (mobile === CREDENTIALS.parent.mobile && password === CREDENTIALS.parent.password) {
      setError('');
      onSignIn('parent');
      return;
    }
    
    // Check if it's a learner account
    if (mobile === CREDENTIALS.learner.mobile && password === CREDENTIALS.learner.password) {
      setError('');
      onSignIn('learner');
      return;
    }
    
    // Failed login - show error and shake animation
    setError('Invalid mobile number or password');
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#F4FAF8',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      overflowY: 'auto'
    }}>
      {/* Back Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        style={{
          alignSelf: 'flex-start',
          padding: '8px',
          marginBottom: '24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '28px',
          color: '#111318'
        }}
      >
        ←
      </motion.button>

      {/* Header */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#111318',
          marginBottom: '8px'
        }}
      >
        Welcome Back
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{
          fontSize: '16px',
          color: '#6E7480',
          marginBottom: '32px'
        }}
      >
        Sign in to continue
      </motion.p>

      {/* Input Fields */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={isShaking ? {
          x: [0, -10, 10, -10, 10, 0],
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 }
        } : { y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ marginBottom: '16px' }}
      >
        {/* Mobile Number Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '8px'
          }}>
            Mobile Number
          </label>
          <input
            type='tel'
            inputMode='numeric'
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
              setError('');
            }}
            placeholder='Enter mobile number'
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              border: error ? '2px solid #E85D75' : '2px solid #E8EEEC',
              fontSize: '16px',
              fontFamily: 'Raleway, sans-serif',
              outline: 'none',
              transition: 'border 0.3s ease',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              if (!error) e.target.style.border = '2px solid #B6D6CC';
            }}
            onBlur={(e) => {
              if (!error) e.target.style.border = '2px solid #E8EEEC';
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '8px'
          }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder='Enter password'
              style={{
                width: '100%',
                padding: '16px',
                paddingRight: '48px',
                borderRadius: '16px',
                border: error ? '2px solid #E85D75' : '2px solid #E8EEEC',
                fontSize: '16px',
                fontFamily: 'Raleway, sans-serif',
                outline: 'none',
                transition: 'border 0.3s ease',
                backgroundColor: 'white'
              }}
              onFocus={(e) => {
                if (!error) e.target.style.border = '2px solid #B6D6CC';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.border = '2px solid #E8EEEC';
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6E7480',
                display: 'flex',
                alignItems: 'center',
                padding: 0
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#FEF2F4',
                borderRadius: '12px',
                marginTop: '12px'
              }}
            >
              <AlertCircle size={16} color="#E85D75" />
              <span style={{ fontSize: '14px', color: '#E85D75', fontWeight: 500 }}>
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Remember Me & Forgot Password */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              accentColor: '#B6D6CC'
            }}
          />
          <span style={{ fontSize: '14px', color: '#6E7480' }}>Remember me</span>
        </label>

        <button
          onClick={() => {/* Handle forgot password */}}
          style={{
            background: 'none',
            border: 'none',
            color: '#74A4BC',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          Forgot Password?
        </button>
      </motion.div>

      {/* Organisation Login Link */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          textAlign: 'center',
          marginBottom: '24px'
        }}
      >
        <button
          onClick={onOpenOrgLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#74A4BC',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
            opacity: 0.8,
            textDecoration: 'underline',
            textUnderlineOffset: '2px'
          }}
        >
          Organisation login
        </button>
      </motion.div>

      {/* Sign In Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSignIn}
        disabled={!mobile || !password}
        style={{
          width: '100%',
          padding: '18px',
          borderRadius: '20px',
          backgroundColor: (!mobile || !password) ? '#E8EEEC' : '#B6D6CC',
          border: 'none',
          fontSize: '17px',
          fontWeight: 600,
          color: (!mobile || !password) ? '#6E7480' : '#111318',
          cursor: (!mobile || !password) ? 'not-allowed' : 'pointer',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: (!mobile || !password) ? 'none' : '0 8px 24px rgba(182, 214, 204, 0.4)',
          transition: 'all 0.3s ease',
          marginBottom: '24px'
        }}
      >
        Sign In
      </motion.button>

      {/* Divider */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E8EEEC' }} />
        <span style={{ fontSize: '14px', color: '#6E7480' }}>or</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E8EEEC' }} />
      </motion.div>

      {/* Continue with Google */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {/* Handle Google sign in */}}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '20px',
          backgroundColor: 'white',
          border: '2px solid #E8EEEC',
          fontSize: '16px',
          fontWeight: 600,
          color: '#111318',
          cursor: 'pointer',
          fontFamily: 'Raleway, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F4FAF8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
          <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
          <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
          <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </motion.button>

      {/* Create Account Link */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          textAlign: 'center'
        }}
      >
        <span style={{ fontSize: '15px', color: '#6E7480' }}>
          Don't have an account?{' '}
        </span>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#74A4BC',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          Create New Account
        </button>
      </motion.div>
    </div>
  );
}

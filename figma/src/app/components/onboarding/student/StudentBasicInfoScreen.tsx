import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface StudentBasicInfoScreenProps {
  onBack: () => void;
  onContinue: (data: { fullName: string; age: string; mobile: string; email: string }) => void;
  currentStep: number;
  totalSteps: number;
}

export default function StudentBasicInfoScreen({ onBack, onContinue, currentStep, totalSteps }: StudentBasicInfoScreenProps) {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const isValid = fullName.trim() && age.trim() && mobile.trim() && email.trim();

  const handleContinue = () => {
    if (isValid) {
      onContinue({ fullName, age, mobile, email });
    }
  };

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#F4FAF8',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
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

        {/* Progress Dots */}
        <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentStep ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === currentStep ? '#74A4BC' : '#E5E8ED',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '8px',
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          Tell us about yourself
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: '16px',
            color: '#6E7480',
            marginBottom: '32px',
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          Your basic information to get started
        </motion.p>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#111318',
              marginBottom: '8px',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid #E5E8ED',
                fontSize: '16px',
                fontFamily: 'Raleway, sans-serif',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#74A4BC'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#111318',
              marginBottom: '8px',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Your age"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid #E5E8ED',
                fontSize: '16px',
                fontFamily: 'Raleway, sans-serif',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#74A4BC'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#111318',
              marginBottom: '8px',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid #E5E8ED',
                fontSize: '16px',
                fontFamily: 'Raleway, sans-serif',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#74A4BC'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#111318',
              marginBottom: '8px',
              fontFamily: 'Raleway, sans-serif'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid #E5E8ED',
                fontSize: '16px',
                fontFamily: 'Raleway, sans-serif',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#74A4BC'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
            />
          </motion.div>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleContinue}
        disabled={!isValid}
        style={{
          width: '100%',
          padding: '18px',
          borderRadius: '24px',
          backgroundColor: isValid ? '#74A4BC' : '#E5E8ED',
          border: 'none',
          fontSize: '17px',
          fontWeight: 600,
          color: isValid ? '#FFFFFF' : '#9CA3B0',
          cursor: isValid ? 'pointer' : 'not-allowed',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: isValid ? '0 8px 24px rgba(116, 164, 188, 0.3)' : 'none',
          transition: 'all 0.3s ease',
          marginTop: '24px'
        }}
      >
        Continue
      </motion.button>
    </div>
  );
}

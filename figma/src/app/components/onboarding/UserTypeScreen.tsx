import { ArrowLeft, Users, User, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface UserTypeScreenProps {
  onBack: () => void;
  onContinue: (type: 'parent' | 'student' | 'organisation') => void;
  currentStep: number;
  totalSteps: number;
}

export default function UserTypeScreen({ onBack, onContinue, currentStep, totalSteps }: UserTypeScreenProps) {
  const [selectedType, setSelectedType] = useState<'parent' | 'student' | 'organisation' | null>(null);

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
                backgroundColor: i === currentStep ? '#B6D6CC' : '#E5E8ED',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#111318',
            textAlign: 'center',
            marginBottom: '48px'
          }}
        >
          Who are you joining as?
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginBottom: '48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedType('parent')}
            style={{
              backgroundColor: selectedType === 'parent' ? '#B6D6CC' : '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: selectedType === 'parent'
                ? '0 12px 32px rgba(182, 214, 204, 0.3)'
                : '0 8px 24px rgba(17,19,24,0.06)',
              cursor: 'pointer',
              border: selectedType === 'parent' ? '2px solid #B6D6CC' : '2px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: selectedType === 'parent' ? '#FFFFFF' : '#F4FAF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users size={28} style={{ color: selectedType === 'parent' ? '#B6D6CC' : '#111318' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '20px', fontWeight: 600, color: '#111318', marginBottom: '4px' }}>
                  Parent / Guardian
                </div>
                <div style={{ fontSize: '14px', color: '#6E7480' }}>
                  Create your free account
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedType('student')}
            style={{
              backgroundColor: selectedType === 'student' ? '#74A4BC' : '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: selectedType === 'student'
                ? '0 12px 32px rgba(116, 164, 188, 0.3)'
                : '0 8px 24px rgba(17,19,24,0.06)',
              cursor: 'pointer',
              border: selectedType === 'student' ? '2px solid #74A4BC' : '2px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: selectedType === 'student' ? '#FFFFFF' : '#F4FAF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User size={28} style={{ color: selectedType === 'student' ? '#74A4BC' : '#111318' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '20px', fontWeight: 600, color: '#111318', marginBottom: '4px' }}>
                  Student / Learner
                </div>
                <div style={{ fontSize: '14px', color: '#6E7480' }}>
                  Create your free account
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedType('organisation')}
            style={{
              backgroundColor: selectedType === 'organisation' ? '#FFD56F' : '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: selectedType === 'organisation'
                ? '0 12px 32px rgba(255, 213, 111, 0.3)'
                : '0 8px 24px rgba(17,19,24,0.06)',
              cursor: 'pointer',
              border: selectedType === 'organisation' ? '2px solid #FFD56F' : '2px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: selectedType === 'organisation' ? '#FFFFFF' : '#F4FAF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 size={28} style={{ color: selectedType === 'organisation' ? '#FFD56F' : '#111318' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '20px', fontWeight: 600, color: '#111318', marginBottom: '4px' }}>
                  Organisation
                </div>
                <div style={{ fontSize: '14px', color: '#6E7480' }}>
                  Create your free account
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => selectedType && onContinue(selectedType)}
        disabled={!selectedType}
        style={{
          width: '100%',
          padding: '18px',
          borderRadius: '24px',
          backgroundColor: selectedType ? '#B6D6CC' : '#E5E8ED',
          border: 'none',
          fontSize: '17px',
          fontWeight: 600,
          color: selectedType ? '#111318' : '#9CA3B0',
          cursor: selectedType ? 'pointer' : 'not-allowed',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: selectedType ? '0 8px 24px rgba(182, 214, 204, 0.3)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        Continue
      </motion.button>
    </div>
  );
}
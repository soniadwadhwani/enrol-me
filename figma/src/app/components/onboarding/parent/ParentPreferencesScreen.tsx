import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ParentPreferencesScreenProps {
  onBack: () => void;
  onContinue: (preferences: {
    budget: string;
    distance: string;
    mode: string[];
  }) => void;
  currentStep: number;
  totalSteps: number;
}

const budgetRanges = [
  '₹500 - ₹2,000 per month',
  '₹2,000 - ₹5,000 per month',
  '₹5,000 - ₹10,000 per month',
  '₹10,000+ per month'
];

const distanceOptions = [
  'Within 2 km',
  'Within 5 km',
  'Within 10 km',
  'Any distance'
];

const modeOptions = ['Online', 'Offline', 'Both'];

export default function ParentPreferencesScreen({ onBack, onContinue, currentStep, totalSteps }: ParentPreferencesScreenProps) {
  const [budget, setBudget] = useState('');
  const [distance, setDistance] = useState('');
  const [mode, setMode] = useState<string[]>([]);

  const toggleMode = (option: string) => {
    if (option === 'Both') {
      setMode(mode.includes('Both') ? [] : ['Both']);
    } else {
      const filtered = mode.filter(m => m !== 'Both');
      if (filtered.includes(option)) {
        setMode(filtered.filter(m => m !== option));
      } else {
        setMode([...filtered, option]);
      }
    }
  };

  const isValid = budget && distance && mode.length > 0;

  const handleContinue = () => {
    if (isValid) {
      onContinue({ budget, distance, mode });
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
                backgroundColor: i === currentStep ? '#B6D6CC' : '#E5E8ED',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
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
          Your preferences
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
          Help us personalize recommendations
        </motion.p>

        {/* Budget Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '32px' }}
        >
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '16px',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Monthly Budget
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {budgetRanges.map((range) => (
              <motion.button
                key={range}
                whileTap={{ scale: 0.98 }}
                onClick={() => setBudget(range)}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: budget === range ? '#B6D6CC' : '#FFFFFF',
                  border: `2px solid ${budget === range ? '#B6D6CC' : 'transparent'}`,
                  fontSize: '15px',
                  fontWeight: budget === range ? 600 : 500,
                  color: '#111318',
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  boxShadow: budget === range
                    ? '0 4px 12px rgba(182, 214, 204, 0.3)'
                    : '0 2px 8px rgba(17,19,24,0.04)'
                }}
              >
                {range}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Distance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '32px' }}
        >
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '16px',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Distance Willing to Travel
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {distanceOptions.map((option) => (
              <motion.button
                key={option}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDistance(option)}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: distance === option ? '#B6D6CC' : '#FFFFFF',
                  border: `2px solid ${distance === option ? '#B6D6CC' : 'transparent'}`,
                  fontSize: '15px',
                  fontWeight: distance === option ? 600 : 500,
                  color: '#111318',
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  boxShadow: distance === option
                    ? '0 4px 12px rgba(182, 214, 204, 0.3)'
                    : '0 2px 8px rgba(17,19,24,0.04)'
                }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Mode Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#111318',
            marginBottom: '16px',
            fontFamily: 'Raleway, sans-serif'
          }}>
            Class Mode Preference
          </h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            {modeOptions.map((option) => {
              const isSelected = mode.includes(option);
              return (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleMode(option)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: isSelected ? '#B6D6CC' : '#FFFFFF',
                    border: `2px solid ${isSelected ? '#B6D6CC' : '#E5E8ED'}`,
                    fontSize: '15px',
                    fontWeight: isSelected ? 600 : 500,
                    color: '#111318',
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif',
                    transition: 'all 0.3s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(182, 214, 204, 0.3)' : 'none'
                  }}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleContinue}
        disabled={!isValid}
        style={{
          width: '100%',
          padding: '18px',
          borderRadius: '24px',
          backgroundColor: isValid ? '#B6D6CC' : '#E5E8ED',
          border: 'none',
          fontSize: '17px',
          fontWeight: 600,
          color: isValid ? '#111318' : '#9CA3B0',
          cursor: isValid ? 'pointer' : 'not-allowed',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: isValid ? '0 8px 24px rgba(182, 214, 204, 0.3)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        Continue
      </motion.button>
    </div>
  );
}

import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Child {
  id: string;
  name: string;
  age: string;
  school: string;
  grade: string;
}

interface ParentInterestsScreenProps {
  onBack: () => void;
  onContinue: (interests: Record<string, string[]>) => void;
  currentStep: number;
  totalSteps: number;
  children: Child[];
}

const activities = [
  'Swimming',
  'Coding',
  'Football',
  'Dance',
  'Piano',
  'Art',
  'Chess',
  'Robotics',
  'Tuition',
  'Yoga',
  'Karate',
  'Basketball',
  'Guitar',
  'Singing',
  'Drawing',
  'Tennis'
];

export default function ParentInterestsScreen({ onBack, onContinue, currentStep, totalSteps, children }: ParentInterestsScreenProps) {
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [interests, setInterests] = useState<Record<string, string[]>>({});

  const currentChild = children[currentChildIndex];
  const currentInterests = interests[currentChild.id] || [];

  const toggleInterest = (activity: string) => {
    const updated = currentInterests.includes(activity)
      ? currentInterests.filter(i => i !== activity)
      : [...currentInterests, activity];
    
    setInterests({ ...interests, [currentChild.id]: updated });
  };

  const handleNext = () => {
    if (currentChildIndex < children.length - 1) {
      setCurrentChildIndex(currentChildIndex + 1);
    } else {
      onContinue(interests);
    }
  };

  const isValid = currentInterests.length > 0;
  const isLastChild = currentChildIndex === children.length - 1;

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
          key={currentChild.id}
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
          What is {currentChild.name} interested in?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: '16px',
            color: '#6E7480',
            marginBottom: '8px',
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          Select all activities that interest them
        </motion.p>

        {/* Child Progress Indicator */}
        {children.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#B6D6CC', fontFamily: 'Raleway, sans-serif' }}>
              Child {currentChildIndex + 1} of {children.length}
            </span>
          </motion.div>
        )}

        {/* Activity Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
          {activities.map((activity, index) => {
            const isSelected = currentInterests.includes(activity);
            return (
              <motion.button
                key={activity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInterest(activity)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '24px',
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
                {activity}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
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
        {isLastChild ? 'Continue' : `Next: ${children[currentChildIndex + 1]?.name}`}
      </motion.button>
    </div>
  );
}

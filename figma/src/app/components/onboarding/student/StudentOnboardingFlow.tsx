import { useState } from 'react';
import StudentBasicInfoScreen from './StudentBasicInfoScreen';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import SuccessScreen from '../SuccessScreen';

interface StudentOnboardingFlowProps {
  onBack: () => void;
  onComplete: (userData: any) => void;
}

const learningCategories = [
  'Fitness & Sports',
  'Coding & Tech',
  'Music & Dance',
  'Art & Craft',
  'Languages',
  'Tuition & Academics',
  'Upskilling',
  'Yoga & Wellness'
];

const scheduleOptions = ['Morning', 'Afternoon', 'Evening', 'Weekend'];
const budgetRanges = ['₹500-₹2k', '₹2k-₹5k', '₹5k-₹10k', '₹10k+'];
const modeOptions = ['Online', 'Offline', 'Both'];

export default function StudentOnboardingFlow({ onBack, onComplete }: StudentOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<any>(null);
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [mode, setMode] = useState<string[]>([]);

  const totalSteps = 5;

  const handleBasicInfo = (data: any) => {
    setBasicInfo(data);
    setCurrentStep(1);
  };

  const handleStepBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete({
      userType: 'student',
      basicInfo,
      location,
      interests,
      schedule,
      budget,
      mode
    });
  };

  // Step 2: Interests
  if (currentStep === 1) {
    return (
      <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={handleStepBack} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}>
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === 1 ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === 1 ? '#74A4BC' : '#E5E8ED', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>What do you want to learn?</h2>
          <p style={{ fontSize: '16px', color: '#6E7480', marginBottom: '24px', fontFamily: 'Raleway, sans-serif' }}>Select all that interest you</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {learningCategories.map((category) => {
              const isSelected = interests.includes(category);
              return (
                <button key={category} onClick={() => setInterests(isSelected ? interests.filter(i => i !== category) : [...interests, category])} style={{ padding: '12px 20px', borderRadius: '24px', backgroundColor: isSelected ? '#74A4BC' : '#FFFFFF', border: `2px solid ${isSelected ? '#74A4BC' : '#E5E8ED'}`, fontSize: '15px', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#FFFFFF' : '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s ease' }}>
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={() => interests.length > 0 && setCurrentStep(2)} disabled={interests.length === 0} style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: interests.length > 0 ? '#74A4BC' : '#E5E8ED', border: 'none', fontSize: '17px', fontWeight: 600, color: interests.length > 0 ? '#FFFFFF' : '#9CA3B0', cursor: interests.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'Raleway, sans-serif', boxShadow: interests.length > 0 ? '0 8px 24px rgba(116, 164, 188, 0.3)' : 'none', transition: 'all 0.3s ease' }}>
          Continue
        </button>
      </div>
    );
  }

  // Step 3: Schedule
  if (currentStep === 2) {
    return (
      <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={handleStepBack} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}>
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === 2 ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === 2 ? '#74A4BC' : '#E5E8ED', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>When are you available?</h2>
          <p style={{ fontSize: '16px', color: '#6E7480', marginBottom: '24px', fontFamily: 'Raleway, sans-serif' }}>Select your preferred time slots</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {scheduleOptions.map((option) => {
              const isSelected = schedule.includes(option);
              return (
                <button key={option} onClick={() => setSchedule(isSelected ? schedule.filter(s => s !== option) : [...schedule, option])} style={{ flex: '1 0 calc(50% - 6px)', padding: '16px', borderRadius: '16px', backgroundColor: isSelected ? '#74A4BC' : '#FFFFFF', border: `2px solid ${isSelected ? '#74A4BC' : '#E5E8ED'}`, fontSize: '15px', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#FFFFFF' : '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s ease' }}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={() => schedule.length > 0 && setCurrentStep(3)} disabled={schedule.length === 0} style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: schedule.length > 0 ? '#74A4BC' : '#E5E8ED', border: 'none', fontSize: '17px', fontWeight: 600, color: schedule.length > 0 ? '#FFFFFF' : '#9CA3B0', cursor: schedule.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'Raleway, sans-serif', boxShadow: schedule.length > 0 ? '0 8px 24px rgba(116, 164, 188, 0.3)' : 'none', transition: 'all 0.3s ease' }}>
          Continue
        </button>
      </div>
    );
  }

  // Step 4: Budget & Mode
  if (currentStep === 3) {
    return (
      <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={handleStepBack} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}>
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === 3 ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === 3 ? '#74A4BC' : '#E5E8ED', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>Budget & Preferences</h2>
          <p style={{ fontSize: '16px', color: '#6E7480', marginBottom: '24px', fontFamily: 'Raleway, sans-serif' }}>Help us personalize your recommendations</p>
          
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '12px', fontFamily: 'Raleway, sans-serif' }}>Monthly Budget</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            {budgetRanges.map((range) => (
              <button key={range} onClick={() => setBudget(range)} style={{ flex: '1 0 calc(50% - 6px)', padding: '14px', borderRadius: '16px', backgroundColor: budget === range ? '#74A4BC' : '#FFFFFF', border: `2px solid ${budget === range ? '#74A4BC' : '#E5E8ED'}`, fontSize: '15px', fontWeight: budget === range ? 600 : 500, color: budget === range ? '#FFFFFF' : '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s ease' }}>
                {range}
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '12px', fontFamily: 'Raleway, sans-serif' }}>Class Mode</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            {modeOptions.map((option) => {
              const isSelected = mode.includes(option);
              return (
                <button key={option} onClick={() => setMode(isSelected ? mode.filter(m => m !== option) : [option])} style={{ flex: 1, padding: '14px', borderRadius: '16px', backgroundColor: isSelected ? '#74A4BC' : '#FFFFFF', border: `2px solid ${isSelected ? '#74A4BC' : '#E5E8ED'}`, fontSize: '15px', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#FFFFFF' : '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s ease' }}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={() => budget && mode.length > 0 && setCurrentStep(4)} disabled={!budget || mode.length === 0} style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: budget && mode.length > 0 ? '#74A4BC' : '#E5E8ED', border: 'none', fontSize: '17px', fontWeight: 600, color: budget && mode.length > 0 ? '#FFFFFF' : '#9CA3B0', cursor: budget && mode.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'Raleway, sans-serif', boxShadow: budget && mode.length > 0 ? '0 8px 24px rgba(116, 164, 188, 0.3)' : 'none', transition: 'all 0.3s ease' }}>
          Continue
        </button>
      </div>
    );
  }

  // Step 5: Success
  if (currentStep === 4) {
    return <SuccessScreen onEnterApp={handleComplete} />;
  }

  // Step 1: Basic Info
  return (
    <StudentBasicInfoScreen
      onBack={handleStepBack}
      onContinue={handleBasicInfo}
      currentStep={0}
      totalSteps={totalSteps}
    />
  );
}

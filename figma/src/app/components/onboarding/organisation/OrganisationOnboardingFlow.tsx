import { useState } from 'react';
import { ArrowLeft, Building2, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import SuccessScreen from '../SuccessScreen';

interface OrganisationOnboardingFlowProps {
  onBack: () => void;
  onComplete: (userData: any) => void;
}

const businessTypes = ['Academy', 'Tutor Center', 'Sports Club', 'Dance Studio', 'Music School', 'Coaching Class', 'Other'];
const classOfferings = ['Swimming', 'Coding', 'Football', 'Dance', 'Piano', 'Art', 'Chess', 'Robotics', 'Yoga', 'Tuition', 'Public Speaking', 'Karate'];
const feeRanges = ['₹500-₹2k', '₹2k-₹5k', '₹5k-₹10k', 'Custom'];
const modeOptions = ['Online', 'Offline', 'Hybrid'];

export default function OrganisationOnboardingFlow({ onBack, onComplete }: OrganisationOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [classes, setClasses] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState('');
  const [mode, setMode] = useState<string[]>([]);

  const totalSteps = 5;

  const handleStepBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete({
      userType: 'organisation',
      orgName,
      contactName,
      email,
      phone,
      businessType,
      classes,
      feeRange,
      mode
    });
  };

  // Step 1: Basic Business Info
  if (currentStep === 0) {
    const isValid = orgName && contactName && email && phone;
    return (
      <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={handleStepBack} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}>
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === 0 ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === 0 ? '#FFD56F' : '#E5E8ED', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>Organisation Details</h2>
          <p style={{ fontSize: '16px', color: '#6E7480', marginBottom: '32px', fontFamily: 'Raleway, sans-serif' }}>Tell us about your organisation</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>Organisation Name</label>
              <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="ABC Academy" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #E5E8ED', fontSize: '16px', fontFamily: 'Raleway, sans-serif', backgroundColor: '#FFFFFF', outline: 'none' }} onFocus={(e) => e.currentTarget.style.borderColor = '#FFD56F'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>Contact Person Name</label>
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Your full name" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #E5E8ED', fontSize: '16px', fontFamily: 'Raleway, sans-serif', backgroundColor: '#FFFFFF', outline: 'none' }} onFocus={(e) => e.currentTarget.style.borderColor = '#FFD56F'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@academy.com" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #E5E8ED', fontSize: '16px', fontFamily: 'Raleway, sans-serif', backgroundColor: '#FFFFFF', outline: 'none' }} onFocus={(e) => e.currentTarget.style.borderColor = '#FFD56F'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>Phone Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #E5E8ED', fontSize: '16px', fontFamily: 'Raleway, sans-serif', backgroundColor: '#FFFFFF', outline: 'none' }} onFocus={(e) => e.currentTarget.style.borderColor = '#FFD56F'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'} />
            </div>
          </div>
        </div>
        <button onClick={() => isValid && setCurrentStep(1)} disabled={!isValid} style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: isValid ? '#FFD56F' : '#E5E8ED', border: 'none', fontSize: '17px', fontWeight: 600, color: isValid ? '#111318' : '#9CA3B0', cursor: isValid ? 'pointer' : 'not-allowed', fontFamily: 'Raleway, sans-serif', boxShadow: isValid ? '0 8px 24px rgba(255, 213, 111, 0.3)' : 'none', transition: 'all 0.3s ease', marginTop: '24px' }}>
          Continue
        </button>
      </div>
    );
  }

  // Step 2: Business Type
  if (currentStep === 1) {
    return (
      <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={handleStepBack} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}>
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === 1 ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === 1 ? '#FFD56F' : '#E5E8ED', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>What type of organisation?</h2>
          <p style={{ fontSize: '16px', color: '#6E7480', marginBottom: '24px', fontFamily: 'Raleway, sans-serif' }}>Select the category that best fits</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {businessTypes.map((type) => (
              <button key={type} onClick={() => setBusinessType(type)} style={{ padding: '16px', borderRadius: '16px', backgroundColor: businessType === type ? '#FFD56F' : '#FFFFFF', border: `2px solid ${businessType === type ? '#FFD56F' : 'transparent'}`, fontSize: '16px', fontWeight: businessType === type ? 600 : 500, color: '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', textAlign: 'left', transition: 'all 0.3s ease', boxShadow: businessType === type ? '0 4px 12px rgba(255, 213, 111, 0.3)' : '0 2px 8px rgba(17,19,24,0.04)' }}>
                {type}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => businessType && setCurrentStep(2)} disabled={!businessType} style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: businessType ? '#FFD56F' : '#E5E8ED', border: 'none', fontSize: '17px', fontWeight: 600, color: businessType ? '#111318' : '#9CA3B0', cursor: businessType ? 'pointer' : 'not-allowed', fontFamily: 'Raleway, sans-serif', boxShadow: businessType ? '0 8px 24px rgba(255, 213, 111, 0.3)' : 'none', transition: 'all 0.3s ease' }}>
          Continue
        </button>
      </div>
    );
  }

  // Step 3: Classes Offered
  if (currentStep === 2) {
    return (
      <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={handleStepBack} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}>
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === 2 ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === 2 ? '#FFD56F' : '#E5E8ED', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>What classes do you offer?</h2>
          <p style={{ fontSize: '16px', color: '#6E7480', marginBottom: '24px', fontFamily: 'Raleway, sans-serif' }}>Select all that apply</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {classOfferings.map((cls) => {
              const isSelected = classes.includes(cls);
              return (
                <button key={cls} onClick={() => setClasses(isSelected ? classes.filter(c => c !== cls) : [...classes, cls])} style={{ padding: '12px 20px', borderRadius: '24px', backgroundColor: isSelected ? '#FFD56F' : '#FFFFFF', border: `2px solid ${isSelected ? '#FFD56F' : '#E5E8ED'}`, fontSize: '15px', fontWeight: isSelected ? 600 : 500, color: '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s ease' }}>
                  {cls}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={() => classes.length > 0 && setCurrentStep(3)} disabled={classes.length === 0} style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: classes.length > 0 ? '#FFD56F' : '#E5E8ED', border: 'none', fontSize: '17px', fontWeight: 600, color: classes.length > 0 ? '#111318' : '#9CA3B0', cursor: classes.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'Raleway, sans-serif', boxShadow: classes.length > 0 ? '0 8px 24px rgba(255, 213, 111, 0.3)' : 'none', transition: 'all 0.3s ease' }}>
          Continue
        </button>
      </div>
    );
  }

  // Step 4: Pricing & Mode
  if (currentStep === 3) {
    return (
      <div style={{ height: '100%', backgroundColor: '#F4FAF8', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={handleStepBack} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(17,19,24,0.08)' }}>
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === 3 ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === 3 ? '#FFD56F' : '#E5E8ED', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#111318', marginBottom: '8px', fontFamily: 'Raleway, sans-serif' }}>Pricing & Mode</h2>
          <p style={{ fontSize: '16px', color: '#6E7480', marginBottom: '24px', fontFamily: 'Raleway, sans-serif' }}>Share your fee structure and class format</p>
          
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '12px', fontFamily: 'Raleway, sans-serif' }}>Fee Range</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            {feeRanges.map((range) => (
              <button key={range} onClick={() => setFeeRange(range)} style={{ flex: '1 0 calc(50% - 6px)', padding: '14px', borderRadius: '16px', backgroundColor: feeRange === range ? '#FFD56F' : '#FFFFFF', border: `2px solid ${feeRange === range ? '#FFD56F' : '#E5E8ED'}`, fontSize: '15px', fontWeight: feeRange === range ? 600 : 500, color: '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s ease' }}>
                {range}
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '12px', fontFamily: 'Raleway, sans-serif' }}>Class Mode</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            {modeOptions.map((option) => {
              const isSelected = mode.includes(option);
              return (
                <button key={option} onClick={() => setMode(isSelected ? mode.filter(m => m !== option) : [option])} style={{ flex: 1, padding: '14px', borderRadius: '16px', backgroundColor: isSelected ? '#FFD56F' : '#FFFFFF', border: `2px solid ${isSelected ? '#FFD56F' : '#E5E8ED'}`, fontSize: '15px', fontWeight: isSelected ? 600 : 500, color: '#111318', cursor: 'pointer', fontFamily: 'Raleway, sans-serif', transition: 'all 0.3s ease' }}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={() => feeRange && mode.length > 0 && setCurrentStep(4)} disabled={!feeRange || mode.length === 0} style={{ width: '100%', padding: '18px', borderRadius: '24px', backgroundColor: feeRange && mode.length > 0 ? '#FFD56F' : '#E5E8ED', border: 'none', fontSize: '17px', fontWeight: 600, color: feeRange && mode.length > 0 ? '#111318' : '#9CA3B0', cursor: feeRange && mode.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'Raleway, sans-serif', boxShadow: feeRange && mode.length > 0 ? '0 8px 24px rgba(255, 213, 111, 0.3)' : 'none', transition: 'all 0.3s ease' }}>
          Continue
        </button>
      </div>
    );
  }

  // Step 5: Success
  return <SuccessScreen onEnterApp={handleComplete} />;
}

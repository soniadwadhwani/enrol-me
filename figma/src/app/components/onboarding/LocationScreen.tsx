import { ArrowLeft, MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface LocationScreenProps {
  onBack: () => void;
  onContinue: (location: string) => void;
  currentStep: number;
  totalSteps: number;
}

export default function LocationScreen({ onBack, onContinue, currentStep, totalSteps }: LocationScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  const suggestions = ['Lavale', 'Hinjewadi', 'Baner', 'Aundh', 'Wakad'];

  const handleContinue = () => {
    const location = customLocation || selectedLocation;
    if (location) {
      onContinue(location);
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
      {/* Header with Progress */}
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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: '28px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '32px'
        }}
      >
        Where should we search?
      </motion.h2>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(17,19,24,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <MapPin size={20} style={{ color: '#6E7480' }} />
        <input
          type="text"
          placeholder="Enter area, locality or landmark"
          value={customLocation}
          onChange={(e) => {
            setCustomLocation(e.target.value);
            setSelectedLocation('');
          }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            color: '#111318',
            backgroundColor: 'transparent',
            fontFamily: 'Raleway, sans-serif'
          }}
        />
      </motion.div>

      {/* Current Location Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setSelectedLocation('Lavale');
          setCustomLocation('');
        }}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '18px',
          backgroundColor: '#FFFFFF',
          border: '2px dashed #B6D6CC',
          fontSize: '15px',
          fontWeight: 600,
          color: '#74A4BC',
          cursor: 'pointer',
          fontFamily: 'Raleway, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '32px'
        }}
      >
        <Navigation size={18} />
        Use Current Location
      </motion.button>

      {/* Suggestions */}
      <div style={{ marginBottom: 'auto' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#6E7480', marginBottom: '16px' }}>
          Popular Areas
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {suggestions.map((location, index) => (
            <motion.button
              key={location}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedLocation(location);
                setCustomLocation('');
              }}
              style={{
                padding: '12px 20px',
                borderRadius: '16px',
                backgroundColor: selectedLocation === location ? '#B6D6CC' : '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: selectedLocation === location ? '#111318' : '#6E7480',
                cursor: 'pointer',
                fontFamily: 'Raleway, sans-serif',
                boxShadow: selectedLocation === location
                  ? '0 4px 16px rgba(182, 214, 204, 0.3)'
                  : '0 4px 12px rgba(17,19,24,0.06)',
                transition: 'all 0.2s ease'
              }}
            >
              {location}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleContinue}
        disabled={!selectedLocation && !customLocation}
        style={{
          width: '100%',
          padding: '18px',
          borderRadius: '24px',
          backgroundColor: (selectedLocation || customLocation) ? '#B6D6CC' : '#E5E8ED',
          border: 'none',
          fontSize: '17px',
          fontWeight: 600,
          color: (selectedLocation || customLocation) ? '#111318' : '#9CA3B0',
          cursor: (selectedLocation || customLocation) ? 'pointer' : 'not-allowed',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: (selectedLocation || customLocation) ? '0 8px 24px rgba(182, 214, 204, 0.3)' : 'none',
          marginTop: '24px'
        }}
      >
        Save & Continue
      </motion.button>
    </div>
  );
}

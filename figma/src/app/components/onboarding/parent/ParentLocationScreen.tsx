import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ParentLocationScreenProps {
  onBack: () => void;
  onContinue: (location: string) => void;
  currentStep: number;
  totalSteps: number;
}

const popularAreas = [
  'Hinjewadi Phase 1',
  'Hinjewadi Phase 2',
  'Hinjewadi Phase 3',
  'Wakad',
  'Baner',
  'Balewadi',
  'Aundh',
  'Lavale',
  'Pimple Saudagar',
  'Pimple Nilakh'
];

export default function ParentLocationScreen({ onBack, onContinue, currentStep, totalSteps }: ParentLocationScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const filteredAreas = popularAreas.filter(area =>
    area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedLocation) {
      onContinue(selectedLocation);
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
          Where are you located?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: '16px',
            color: '#6E7480',
            marginBottom: '24px',
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          We'll show you classes nearby
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'relative',
            marginBottom: '24px'
          }}
        >
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6E7480'
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your area..."
            style={{
              width: '100%',
              padding: '16px 16px 16px 48px',
              borderRadius: '16px',
              border: '2px solid #E5E8ED',
              fontSize: '16px',
              fontFamily: 'Raleway, sans-serif',
              backgroundColor: '#FFFFFF',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#B6D6CC'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
          />
        </motion.div>

        {/* Popular Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#6E7480',
            marginBottom: '16px',
            fontFamily: 'Raleway, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Popular Areas in Pune
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                onClick={() => setSelectedLocation(area)}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: selectedLocation === area ? '#B6D6CC' : '#FFFFFF',
                  border: `2px solid ${selectedLocation === area ? '#B6D6CC' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: selectedLocation === area
                    ? '0 8px 24px rgba(182, 214, 204, 0.3)'
                    : '0 4px 12px rgba(17,19,24,0.06)'
                }}
              >
                <MapPin size={20} style={{ color: selectedLocation === area ? '#111318' : '#6E7480' }} />
                <span style={{
                  fontSize: '16px',
                  fontWeight: selectedLocation === area ? 600 : 500,
                  color: '#111318',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  {area}
                </span>
              </motion.div>
            ))}
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
        disabled={!selectedLocation}
        style={{
          width: '100%',
          padding: '18px',
          borderRadius: '24px',
          backgroundColor: selectedLocation ? '#B6D6CC' : '#E5E8ED',
          border: 'none',
          fontSize: '17px',
          fontWeight: 600,
          color: selectedLocation ? '#111318' : '#9CA3B0',
          cursor: selectedLocation ? 'pointer' : 'not-allowed',
          fontFamily: 'Raleway, sans-serif',
          boxShadow: selectedLocation ? '0 8px 24px rgba(182, 214, 204, 0.3)' : 'none',
          transition: 'all 0.3s ease',
          marginTop: '24px'
        }}
      >
        Continue
      </motion.button>
    </div>
  );
}

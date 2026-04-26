import { MapPin, Search } from 'lucide-react';
import PageHeader from './PageHeader';
import { useState } from 'react';

interface LocationSettingsProps {
  onBack: () => void;
  onConfirm: (city: string) => void;
  currentCity: string;
}

export default function LocationSettings({ onBack, onConfirm, currentCity }: LocationSettingsProps) {
  const [selectedCity, setSelectedCity] = useState(currentCity);
  const [searchQuery, setSearchQuery] = useState('');

  const suggestions = [
    'Lavale',
    'Hinjewadi',
    'Wakad',
    'Pune',
    'Koregaon Park',
    'Viman Nagar'
  ];

  const filteredSuggestions = searchQuery
    ? suggestions.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleConfirm = () => {
    onConfirm(selectedCity);
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <PageHeader showBack={true} onBack={onBack} title="Location" />

      {/* Content Spacing */}
      <div style={{ paddingTop: '12px', paddingBottom: '20px' }}></div>

      {/* Map Section */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '20px' }}>
        <div style={{
          height: '360px',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 8px 24px rgba(17,19,24,0.1)'
        }}>
          {/* Map Image - Using a clean map style */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #E8F3F1 0%, #D7E7E4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Decorative map elements */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: '120px',
              height: '2px',
              backgroundColor: '#B6D6CC',
              transform: 'rotate(-15deg)'
            }} />
            <div style={{
              position: 'absolute',
              top: '40%',
              right: '20%',
              width: '80px',
              height: '2px',
              backgroundColor: '#74A4BC',
              transform: 'rotate(25deg)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '25%',
              width: '60px',
              height: '2px',
              backgroundColor: '#B6D6CC',
              transform: 'rotate(-45deg)'
            }} />

            {/* Center Pin Marker */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              zIndex: 10
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#F11859',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                boxShadow: '0 8px 20px rgba(241,24,89,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={24} style={{ color: '#FFFFFF', transform: 'rotate(45deg)' }} />
              </div>
            </div>

            {/* Selected City Label */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(17,19,24,0.12)',
              fontSize: '15px',
              fontWeight: 600,
              color: '#111318'
            }}>
              {selectedCity}
            </div>
          </div>
        </div>
      </div>

      {/* Search Field */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '24px', position: 'relative' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 16px rgba(17,19,24,0.08)'
        }}>
          <Search size={20} style={{ color: '#6E7480' }} />
          <input
            type="text"
            placeholder="Search city or area"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#111318',
              backgroundColor: 'transparent',
              fontFamily: 'Raleway, sans-serif'
            }}
          />
        </div>

        {/* Search Suggestions */}
        {filteredSuggestions.length > 0 && (
          <div style={{
            marginTop: '8px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(17,19,24,0.08)',
            overflow: 'hidden'
          }}>
            {filteredSuggestions.map((city, index) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setSearchQuery('');
                }}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  fontSize: '15px',
                  color: '#111318',
                  cursor: 'pointer',
                  borderBottom: index < filteredSuggestions.length - 1 ? '1px solid #F4FAF8' : 'none',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '24px' }}>
        <button
          onClick={handleConfirm}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '26px',
            backgroundColor: '#F11859',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '17px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(241,24,89,0.25)',
            fontFamily: 'Raleway, sans-serif'
          }}
        >
          Confirm Location
        </button>
      </div>
    </div>
  );
}

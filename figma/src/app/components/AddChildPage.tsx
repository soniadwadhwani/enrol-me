import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface AddChildPageProps {
  onBack: () => void;
  onSave?: (childData: any) => void;
}

export default function AddChildPage({ onBack, onSave }: AddChildPageProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestOptions = [
    'Swimming', 'Coding', 'Football', 'Piano', 'Dance',
    'Art', 'Yoga', 'Robotics', 'Music', 'Tennis',
    'Basketball', 'Chess', 'Drama', 'Crafts'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSave = () => {
    if (name && age) {
      const childData = {
        name,
        age: parseInt(age),
        school,
        interests: selectedInterests
      };
      if (onSave) {
        onSave(childData);
      }
      onBack();
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Header */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '16px' }}>
        <div className="flex items-center" style={{ gap: '12px' }}>
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
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#111318', margin: 0 }}>
            Add Child
          </h1>
        </div>
      </div>

      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#6E7480',
              marginBottom: '8px'
            }}>
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter child's name"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #E5E8ED',
                fontSize: '15px',
                color: '#111318',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Raleway, sans-serif',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#6E7480',
              marginBottom: '8px'
            }}>
              Age *
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #E5E8ED',
                fontSize: '15px',
                color: '#111318',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Raleway, sans-serif',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#6E7480',
              marginBottom: '8px'
            }}>
              School
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Enter school name"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '16px',
                border: '1px solid #E5E8ED',
                fontSize: '15px',
                color: '#111318',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Raleway, sans-serif',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 600,
              color: '#6E7480',
              marginBottom: '8px'
            }}>
              Interests
            </label>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid #E5E8ED'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '12px',
                      backgroundColor: selectedInterests.includes(interest) ? '#74A4BC' : '#F4FAF8',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: selectedInterests.includes(interest) ? '#FFFFFF' : '#111318',
                      cursor: 'pointer',
                      fontFamily: 'Raleway, sans-serif',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: '#F4FAF8',
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              color: '#111318',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name || !age}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: '20px',
              backgroundColor: name && age ? '#74A4BC' : '#E5E8ED',
              border: 'none',
              fontSize: '16px',
              fontWeight: 600,
              color: name && age ? '#FFFFFF' : '#9CA3B0',
              cursor: name && age ? 'pointer' : 'not-allowed',
              fontFamily: 'Raleway, sans-serif',
              boxShadow: name && age ? '0 8px 20px rgba(116,164,188,0.3)' : 'none'
            }}
          >
            Save Child
          </button>
        </div>
      </div>
    </div>
  );
}

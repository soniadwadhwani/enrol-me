import { ArrowLeft, Camera } from 'lucide-react';
import { useState } from 'react';

interface EditProfilePageProps {
  onBack: () => void;
}

export default function EditProfilePage({ onBack }: EditProfilePageProps) {
  const [name, setName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@email.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Lavale, Pune');
  const [location, setLocation] = useState('Lavale');

  const handleSave = () => {
    // Save logic here
    onBack();
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Header */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '16px' }}>
        <div className="flex items-center" style={{ gap: '12px', marginBottom: '8px' }}>
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
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111318', margin: 0 }}>
            Edit Profile
          </h1>
        </div>
      </div>

      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
        {/* Photo Upload */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#B6D6CC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '40px', color: '#FFFFFF' }}>P</span>
            </div>
            <button style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F11859',
              border: '2px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Camera size={18} style={{ color: '#FFFFFF' }} />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6E7480', marginBottom: '8px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6E7480', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6E7480', marginBottom: '8px' }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6E7480', marginBottom: '8px' }}>
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6E7480', marginBottom: '8px' }}>
              Preferred Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
            >
              <option value="Lavale">Lavale</option>
              <option value="Hinjewadi">Hinjewadi</option>
              <option value="Wakad">Wakad</option>
              <option value="Viman Nagar">Viman Nagar</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            marginTop: '32px',
            padding: '16px',
            borderRadius: '24px',
            backgroundColor: '#B6D6CC',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            color: '#111318',
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
            boxShadow: '0 8px 20px rgba(182,214,204,0.3)'
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

import { ArrowLeft, ChevronRight, Plus, User, Bell } from 'lucide-react';
import { useState } from 'react';

interface ChildrenProfilesPageProps {
  onBack: () => void;
  onOpenAlerts?: () => void;
  onOpenChildDetail?: (childId: number) => void;
  onOpenAddChild?: () => void;
}

export default function ChildrenProfilesPage({ onBack, onOpenAlerts, onOpenChildDetail, onOpenAddChild }: ChildrenProfilesPageProps) {
  const [children] = useState([
    {
      id: 1,
      name: 'Shaurya',
      age: 11,
      school: 'Delhi Public School',
      interests: 'Swimming, Coding, Football',
      classes: 5,
      color: '#74A4BC'
    },
    {
      id: 2,
      name: 'Asmi',
      age: 8,
      school: 'Orchids International',
      interests: 'Piano, Dance, Art',
      classes: 4,
      color: '#B6D6CC'
    }
  ]);

  const handleChildClick = (childId: number) => {
    if (onOpenChildDetail) {
      onOpenChildDetail(childId);
    }
  };

  const handleAddChild = () => {
    if (onOpenAddChild) {
      onOpenAddChild();
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Header */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '84px', paddingBottom: '16px' }}>
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
              boxShadow: '0 4px 12px rgba(17,19,24,0.08)',
              flexShrink: 0
            }}
          >
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#111318', margin: 0 }}>
            Children Profiles
          </h1>
        </div>
      </div>

      {/* Floating Alert Button */}
      {onOpenAlerts && (
        <button
          onClick={onOpenAlerts}
          style={{
            position: 'absolute',
            top: '18px',
            right: '20px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(17, 19, 24, 0.10)',
            zIndex: 100
          }}
        >
          <Bell size={20} style={{ color: '#111318' }} />
        </button>
      )}

      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px' }}>
        {/* Children Cards */}
        {children.map((child) => (
          <div
            key={child.id}
            onClick={() => handleChildClick(child.id)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 8px 24px rgba(17,19,24,0.06)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(17,19,24,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(17,19,24,0.06)';
            }}
          >
            <div className="flex items-center" style={{ gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: `${child.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={28} style={{ color: child.color }} />
              </div>

              <div style={{ flex: 1 }}>
                <div className="flex items-center" style={{ gap: '8px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111318', margin: 0 }}>
                    {child.name}
                  </h3>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#6E7480' }}>
                    Age {child.age}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '6px' }}>
                  {child.school}
                </p>
                <div style={{ fontSize: '13px', color: '#9CA3B0' }}>
                  {child.interests}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: child.color, marginTop: '6px' }}>
                  {child.classes} enrolled classes
                </div>
              </div>

              <ChevronRight size={20} style={{ color: '#9CA3B0' }} />
            </div>
          </div>
        ))}

        {/* Add Child Button */}
        <button
          onClick={handleAddChild}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
            border: '2px dashed #E5E8ED',
            fontSize: '16px',
            fontWeight: 600,
            color: '#74A4BC',
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F4FAF8';
            e.currentTarget.style.borderColor = '#74A4BC';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(116,164,188,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#E5E8ED';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Plus size={20} />
          Add Child
        </button>
      </div>
    </div>
  );
}

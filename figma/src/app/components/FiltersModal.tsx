import { X } from 'lucide-react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiltersModal({ isOpen, onClose }: FiltersModalProps) {
  if (!isOpen) return null;

  const categories = ['Sports', 'Academics', 'Arts', 'Tutors'];
  const distances = ['1 km', '5 km', '10 km'];
  const prices = ['₹', '₹₹', '₹₹₹'];
  const ageGroups = ['Kids', 'Teens', 'Adults'];
  const modes = ['Online', 'Offline'];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(17,19,24,0.18)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          height: '68%',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '30px',
          borderTopRightRadius: '30px',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          padding: '18px 22px 16px 22px'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111318' }}>Filters</h2>
          <button
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#F4FAF8',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} style={{ color: '#111318' }} />
          </button>
        </div>

        {/* Content */}
        <div>
          {/* Category */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
              Category
            </h3>
            <div className="flex flex-wrap" style={{ gap: '8px' }}>
              {categories.map((category, index) => (
                <button
                  key={category}
                  style={{
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    height: '36px',
                    borderRadius: '18px',
                    backgroundColor: index === 0 ? '#6F9FB2' : '#FFFFFF',
                    color: index === 0 ? '#FFFFFF' : '#111318',
                    border: index === 0 ? 'none' : '1px solid #DCE5E3',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    boxShadow: index === 0 ? '0 4px 10px rgba(111,159,178,0.18)' : 'none'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
              Distance
            </h3>
            <div className="flex" style={{ gap: '8px' }}>
              {distances.map((distance, index) => (
                <button
                  key={distance}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '18px',
                    backgroundColor: index === 1 ? '#6F9FB2' : '#FFFFFF',
                    color: index === 1 ? '#FFFFFF' : '#111318',
                    border: index === 1 ? 'none' : '1px solid #DCE5E3',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    boxShadow: index === 1 ? '0 4px 10px rgba(111,159,178,0.18)' : 'none'
                  }}
                >
                  {distance}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
              Price
            </h3>
            <div className="flex" style={{ gap: '8px' }}>
              {prices.map((price) => (
                <button
                  key={price}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '18px',
                    backgroundColor: '#FFFFFF',
                    color: '#111318',
                    border: '1px solid #DCE5E3',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
              Age Group
            </h3>
            <div className="flex" style={{ gap: '8px' }}>
              {ageGroups.map((age) => (
                <button
                  key={age}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '18px',
                    backgroundColor: '#FFFFFF',
                    color: '#111318',
                    border: '1px solid #DCE5E3',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
              Mode
            </h3>
            <div className="flex" style={{ gap: '8px' }}>
              {modes.map((mode, index) => (
                <button
                  key={mode}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '18px',
                    backgroundColor: index === 1 ? '#6F9FB2' : '#FFFFFF',
                    color: index === 1 ? '#FFFFFF' : '#111318',
                    border: index === 1 ? 'none' : '1px solid #DCE5E3',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    boxShadow: index === 1 ? '0 4px 10px rgba(111,159,178,0.18)' : 'none'
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                color: 'rgba(17,19,24,0.7)',
                border: 'none',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '0'
              }}
            >
              Reset
            </button>
            <button
              onClick={onClose}
              style={{
                width: '148px',
                height: '40px',
                borderRadius: '20px',
                backgroundColor: '#F11859',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(241,24,89,0.15)'
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

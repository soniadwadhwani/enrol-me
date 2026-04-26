import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Child {
  id: string;
  name: string;
  age: string;
  school: string;
  grade: string;
}

interface ParentChildrenScreenProps {
  onBack: () => void;
  onContinue: (children: Child[]) => void;
  currentStep: number;
  totalSteps: number;
}

export default function ParentChildrenScreen({ onBack, onContinue, currentStep, totalSteps }: ParentChildrenScreenProps) {
  const [children, setChildren] = useState<Child[]>([
    { id: '1', name: '', age: '', school: '', grade: '' }
  ]);

  const addChild = () => {
    setChildren([...children, { id: Date.now().toString(), name: '', age: '', school: '', grade: '' }]);
  };

  const removeChild = (id: string) => {
    if (children.length > 1) {
      setChildren(children.filter(child => child.id !== id));
    }
  };

  const updateChild = (id: string, field: keyof Child, value: string) => {
    setChildren(children.map(child =>
      child.id === id ? { ...child, [field]: value } : child
    ));
  };

  const isValid = children.length > 0 && children.every(child =>
    child.name.trim() && child.age.trim() && child.school.trim() && child.grade.trim()
  );

  const handleContinue = () => {
    if (isValid) {
      onContinue(children);
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
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
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
          Tell us about your {children.length > 1 ? 'children' : 'child'}
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
          Add details for each child
        </motion.p>

        {/* Children Cards */}
        <AnimatePresence>
          {children.map((child, index) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '16px',
                boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                position: 'relative'
              }}
            >
              {children.length > 1 && (
                <button
                  onClick={() => removeChild(child.id)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#FEF2F4',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} style={{ color: '#E85D75' }} />
                </button>
              )}

              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#111318',
                marginBottom: '16px',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Child {index + 1}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) => updateChild(child.id, 'name', e.target.value)}
                  placeholder="Child's name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '2px solid #E5E8ED',
                    fontSize: '15px',
                    fontFamily: 'Raleway, sans-serif',
                    backgroundColor: '#F4FAF8',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#B6D6CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input
                    type="number"
                    value={child.age}
                    onChange={(e) => updateChild(child.id, 'age', e.target.value)}
                    placeholder="Age"
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid #E5E8ED',
                      fontSize: '15px',
                      fontFamily: 'Raleway, sans-serif',
                      backgroundColor: '#F4FAF8',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#B6D6CC'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
                  />

                  <input
                    type="text"
                    value={child.grade}
                    onChange={(e) => updateChild(child.id, 'grade', e.target.value)}
                    placeholder="Grade"
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: '2px solid #E5E8ED',
                      fontSize: '15px',
                      fontFamily: 'Raleway, sans-serif',
                      backgroundColor: '#F4FAF8',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#B6D6CC'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
                  />
                </div>

                <input
                  type="text"
                  value={child.school}
                  onChange={(e) => updateChild(child.id, 'school', e.target.value)}
                  placeholder="School name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '2px solid #E5E8ED',
                    fontSize: '15px',
                    fontFamily: 'Raleway, sans-serif',
                    backgroundColor: '#F4FAF8',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#B6D6CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E8ED'}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Another Child Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={addChild}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '2px dashed #B6D6CC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'Raleway, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            color: '#B6D6CC',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F4FAF8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
        >
          <Plus size={20} />
          Add another child
        </motion.button>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleContinue}
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
        Continue
      </motion.button>
    </div>
  );
}

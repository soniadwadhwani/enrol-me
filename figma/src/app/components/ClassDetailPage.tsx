import { Share2, Star, MapPin, Clock, CheckCircle2, Quote } from 'lucide-react';
import PageHeader from './PageHeader';

interface ClassDetailPageProps {
  classData: any;
  onBack: () => void;
}

export default function ClassDetailPage({ classData, onBack }: ClassDetailPageProps) {
  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'Great coaches and safe environment.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      text: 'My daughter loves coming here.',
      rating: 5
    }
  ];

  return (
    <div className="flex-1 overflow-auto pb-32" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Top Header */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '12px', position: 'relative' }}>
        <PageHeader showBack={true} onBack={onBack} title="Class Details" />
        <button
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '40px',
            height: '40px',
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
          <Share2 size={20} style={{ color: '#111318' }} />
        </button>
      </div>

      {/* Hero Image */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '24px' }}>
        <div style={{
          height: '260px',
          borderRadius: '28px',
          boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
          overflow: 'hidden'
        }}>
          <img
            src={
              classData.id === 1
                ? 'https://images.unsplash.com/photo-1761839447370-8873d86f5b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
                : classData.id === 2
                ? 'https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
                : 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            }
            alt={classData.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

      {/* Class Info */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '28px' }}>
        <div className="flex items-start justify-between" style={{ marginBottom: '12px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#111318',
            lineHeight: '1.2'
          }}>
            {classData.title}
          </h1>
          {classData.verified && (
            <div style={{
              padding: '6px 12px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #B6D6CC',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 12px 30px rgba(17,19,24,0.08)'
            }}>
              <CheckCircle2 size={14} style={{ color: '#B6D6CC' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#111318' }}>Verified</span>
            </div>
          )}
        </div>

        <div className="flex items-center" style={{ gap: '16px', marginBottom: '16px' }}>
          <div className="flex items-center" style={{ gap: '6px' }}>
            <Star size={16} fill="#F11859" style={{ color: '#F11859' }} />
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#111318' }}>{classData.rating}</span>
          </div>
          <div className="flex items-center" style={{ gap: '6px' }}>
            <MapPin size={16} style={{ color: '#6E7480' }} />
            <span style={{ fontSize: '14px', color: '#6E7480' }}>{classData.location}</span>
          </div>
        </div>

        <div style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#F11859',
          marginBottom: '8px'
        }}>
          {classData.price}
        </div>
      </div>

      {/* About Section */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '28px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '12px'
        }}>
          About
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6E7480',
          lineHeight: '1.6'
        }}>
          {classData.description}
        </p>
      </div>

      {/* Timings Section */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '28px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '12px'
        }}>
          Timings
        </h2>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px 20px',
          boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Clock size={20} style={{ color: '#111318' }} />
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#111318' }}>
            {classData.timings}
          </span>
        </div>
      </div>

      {/* Trusted by Parents */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '16px'
        }}>
          Trusted by Parents
        </h2>

        <div className="space-y-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '20px',
                boxShadow: '0 12px 30px rgba(17,19,24,0.08)'
              }}
            >
              <div className="flex items-start justify-between" style={{ marginBottom: '12px' }}>
                <div className="flex items-start" style={{ gap: '8px', flex: 1 }}>
                  <Quote size={16} style={{ color: '#F11859', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{
                    fontSize: '14px',
                    color: '#111318',
                    lineHeight: '1.5',
                    fontStyle: 'italic'
                  }}>
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center" style={{ gap: '2px', marginLeft: '12px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="#F11859" style={{ color: '#F11859' }} />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#111318' }}>
                – {testimonial.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div style={{
        position: 'fixed',
        bottom: '110px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '345px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '28px',
        boxShadow: '0 12px 30px rgba(17,19,24,0.12)'
      }}>
        <button style={{
          width: '100%',
          height: '56px',
          borderRadius: '28px',
          backgroundColor: '#F11859',
          color: '#FFFFFF',
          fontSize: '18px',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(241,24,89,0.3)'
        }}>
          Enroll Now
        </button>
      </div>
    </div>
  );
}

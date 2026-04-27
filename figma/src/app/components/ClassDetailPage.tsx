import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, MapPin, Share2, ShieldCheck, Star } from 'lucide-react';

interface ClassDetailPageProps {
  classData: any;
  onBack: () => void;
  onSubmitApplication?: (application: {
    classTitle: string;
    location: string;
    studentName: string;
    parentName: string;
    preferredBatch: string;
    preferredTiming: string;
    phoneNumber: string;
    notes: string;
  }) => void;
}

export default function ClassDetailPage({ classData, onBack, onSubmitApplication }: ClassDetailPageProps) {
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    age: '',
    parentName: '',
    phoneNumber: '',
    preferredBatch: '',
    preferredTiming: '',
    notes: '',
  });

  const details = useMemo(() => {
    const title = classData?.title ?? 'Class';
    const about = classData?.description ?? 'High-quality coaching with personalised attention and progress tracking.';
    return {
      title,
      location: classData?.location ?? 'Lavale',
      rating: classData?.rating ?? 4.8,
      price: classData?.price ?? '₹2,500/mo',
      imageUrl: classData?.imageUrl ?? 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      about,
      timings: classData?.timings ?? 'Mon Wed Fri • 5 PM',
      fees: classData?.price ?? '₹2,500/mo',
      ageGroup: classData?.ageGroup ?? '6-15 years',
      facilities: classData?.facilities ?? ['Certified instructors', 'Small batches', 'Progress updates', 'Safe campus'],
      reviewsPreview: classData?.reviewsPreview ?? 'Parents appreciate the clear communication and measurable progress.',
    };
  }, [classData]);

  const reviews = [
    { name: 'Priya Sharma', text: details.reviewsPreview, rating: 5 },
    { name: 'Amit Patel', text: 'My child enjoys every session and the staff is very supportive.', rating: 5 },
  ];

  const updateForm = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const submitApplication = () => {
    if (!formData.studentName || !formData.age || !formData.parentName || !formData.phoneNumber || !formData.preferredBatch || !formData.preferredTiming) {
      return;
    }
    onSubmitApplication?.({
      classTitle: details.title,
      location: details.location,
      studentName: formData.studentName,
      parentName: formData.parentName,
      preferredBatch: formData.preferredBatch,
      preferredTiming: formData.preferredTiming,
      phoneNumber: formData.phoneNumber,
      notes: formData.notes,
    });
    setApplicationSent(true);
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative', backgroundColor: '#F4FAF8' }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingBottom: '124px' }}>
        <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onBack}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(17,19,24,0.08)',
            }}
          >
            <ArrowLeft size={18} style={{ color: '#111318' }} />
          </button>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#111318' }}>Class Details</div>
          <button
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(17,19,24,0.08)',
            }}
          >
            <Share2 size={18} style={{ color: '#111318' }} />
          </button>
        </div>

        <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '20px' }}>
          <div style={{ height: '230px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(17,19,24,0.08)' }}>
            <img src={details.imageUrl} alt={details.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '18px' }}>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#111318', lineHeight: 1.2, marginBottom: '8px' }}>{details.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={14} fill="#F11859" style={{ color: '#F11859' }} />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{details.rating}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} style={{ color: '#6E7480' }} />
              <span style={{ fontSize: '14px', color: '#6E7480' }}>{details.location}</span>
            </div>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#F11859' }}>{details.price}</div>
        </div>

        <div style={{ paddingLeft: '24px', paddingRight: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', boxShadow: '0 8px 24px rgba(17,19,24,0.06)' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>About Class</div>
            <div style={{ fontSize: '14px', color: '#6E7480', lineHeight: 1.45 }}>{details.about}</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', boxShadow: '0 8px 24px rgba(17,19,24,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6E7480', marginBottom: '4px' }}>Timing</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{details.timings}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6E7480', marginBottom: '4px' }}>Fees</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{details.fees}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6E7480', marginBottom: '4px' }}>Age Group</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111318' }}>{details.ageGroup}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#74A4BC" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#111318' }}>Verified Institute</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', boxShadow: '0 8px 24px rgba(17,19,24,0.06)' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Facilities</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {details.facilities.map((item: string) => (
                <span key={item} style={{ padding: '6px 10px', borderRadius: '999px', backgroundColor: '#E8F5F1', fontSize: '12px', fontWeight: 700, color: '#111318' }}>{item}</span>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', boxShadow: '0 8px 24px rgba(17,19,24,0.06)' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Reviews Preview</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {reviews.map((review) => (
                <div key={review.name} style={{ backgroundColor: '#F8FBFA', borderRadius: '12px', padding: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{review.name}</div>
                  <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '6px' }}>{review.text}</div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={`${review.name}-${idx}`} size={12} fill="#F11859" style={{ color: '#F11859' }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '18px', zIndex: 40 }}>
        <button
          onClick={() => {
            setShowEnrollForm(true);
            setApplicationSent(false);
          }}
          style={{
            width: '100%',
            height: '54px',
            borderRadius: '999px',
            backgroundColor: '#F11859',
            color: '#FFFFFF',
            fontSize: '17px',
            fontWeight: 700,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 12px 22px rgba(241,24,89,0.34)',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          Enroll Now
        </button>
      </div>

      <AnimatePresence>
        {showEnrollForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEnrollForm(false)}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 90,
              backgroundColor: 'rgba(17,19,24,0.38)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '52px 18px 96px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '344px',
                maxHeight: '100%',
                overflowY: 'auto',
                backgroundColor: '#FFFFFF',
                borderRadius: '22px',
                padding: '16px',
                boxShadow: '0 16px 44px rgba(17,19,24,0.24)',
              }}
            >
              {!applicationSent ? (
                <>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#111318', marginBottom: '10px' }}>Organisation Application Form</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    <input value={formData.studentName} onChange={(event) => updateForm('studentName', event.target.value)} placeholder="Student Name" style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    <input value={formData.age} onChange={(event) => updateForm('age', event.target.value)} placeholder="Age" style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    <input value={formData.parentName} onChange={(event) => updateForm('parentName', event.target.value)} placeholder="Parent Name" style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    <input value={formData.phoneNumber} onChange={(event) => updateForm('phoneNumber', event.target.value)} placeholder="Phone Number" style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    <input value={formData.preferredBatch} onChange={(event) => updateForm('preferredBatch', event.target.value)} placeholder="Preferred Batch" style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    <input value={formData.preferredTiming} onChange={(event) => updateForm('preferredTiming', event.target.value)} placeholder="Preferred Timing" style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                    <textarea value={formData.notes} onChange={(event) => updateForm('notes', event.target.value)} placeholder="Notes" style={{ border: '1px solid #E3ECEA', borderRadius: '10px', padding: '10px', minHeight: '72px', resize: 'vertical', fontSize: '14px', fontFamily: 'Raleway, sans-serif' }} />
                  </div>
                  <button onClick={submitApplication} style={{ width: '100%', marginTop: '12px', height: '46px', borderRadius: '14px', border: 'none', backgroundColor: '#F11859', color: '#FFFFFF', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Send Application</button>
                </>
              ) : (
                <div style={{ textAlign: 'center', paddingTop: '16px', paddingBottom: '8px' }}>
                  <CheckCircle2 size={38} color="#2F8D61" style={{ margin: '0 auto 10px' }} />
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>Application sent to institute</div>
                  <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '12px' }}>The organisation has received your application and will contact you shortly.</div>
                  <button onClick={() => setShowEnrollForm(false)} style={{ width: '100%', height: '44px', borderRadius: '12px', border: 'none', backgroundColor: '#B6D6CC', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Done</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

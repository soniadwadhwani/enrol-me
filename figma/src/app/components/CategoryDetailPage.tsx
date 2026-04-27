import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryDetailPageProps {
  categoryName: string;
  onBack: () => void;
  onOpenClassDetail: (classData: any) => void;
}

interface ExploreClassItem {
  id: number;
  title: string;
  location: string;
  rating: number;
  price: string;
  description: string;
  timings: string;
  imageUrl: string;
  ageGroup: string;
  facilities: string[];
  reviewsPreview: string;
  verified: boolean;
}

const areaPool = ['Lavale', 'Hinjewadi', 'Wakad', 'Baner', 'Pashan'];

const seededImage = (seed: string, width = 900, height = 700) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

const buildListings = (categoryTitle: string): ExploreClassItem[] => {
  const base = categoryTitle;
  const categoryKey = categoryTitle.toLowerCase().replace(/\s+/g, '-');
  const listingImageOne = seededImage(`listing-${categoryKey}-1`);
  const listingImageTwo = seededImage(`listing-${categoryKey}-2`);
  const listingImageThree = seededImage(`listing-${categoryKey}-3`);
  
  return [
    {
      id: Math.abs(categoryKey.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0)) + 1,
      title: `${base} Hub`,
      location: areaPool[(categoryKey.length + 1) % areaPool.length],
      rating: 4.7,
      price: '₹2,500/mo',
      description: `${base} sessions with experienced mentors and small, focused batches.`,
      timings: 'Mon Wed Fri • 5 PM',
      imageUrl: listingImageOne,
      ageGroup: '6-15 years',
      facilities: ['Certified trainers', 'Progress tracking', 'Weekend options'],
      reviewsPreview: 'Excellent coaching and supportive mentors for every level.',
      verified: true,
    },
    {
      id: Math.abs(categoryKey.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0)) + 2,
      title: `${base} Studio`,
      location: areaPool[(categoryKey.length + 2) % areaPool.length],
      rating: 4.8,
      price: '₹3,000/mo',
      description: `Structured ${base.toLowerCase()} classes with hands-on practice and assessments.`,
      timings: 'Tue Thu Sat • 4 PM',
      imageUrl: listingImageTwo,
      ageGroup: '7-16 years',
      facilities: ['Expert faculty', 'Flexible batches', 'Practice support'],
      reviewsPreview: 'Very practical curriculum and noticeable improvement in a few weeks.',
      verified: true,
    },
    {
      id: Math.abs(categoryKey.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0)) + 3,
      title: `${base} Academy`,
      location: areaPool[(categoryKey.length + 3) % areaPool.length],
      rating: 4.6,
      price: '₹2,200/mo',
      description: `${base} coaching for beginners and advanced learners with confidence-building focus.`,
      timings: 'Weekend • 10 AM',
      imageUrl: listingImageThree,
      ageGroup: '6-14 years',
      facilities: ['Friendly environment', 'Performance reviews', 'Parent updates'],
      reviewsPreview: 'Great place to start and build consistent progress.',
      verified: true,
    },
  ];
};

export default function CategoryDetailPage({ categoryName, onBack, onOpenClassDetail }: CategoryDetailPageProps) {
  const listings = useMemo(() => buildListings(categoryName), [categoryName]);

  return (
    <div className="flex-1 overflow-auto pb-24" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#FFFFFF',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 4px 12px rgba(17, 19, 24, 0.08)',
          zIndex: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#F4FAF8',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <ArrowLeft size={20} style={{ color: '#111318' }} />
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', margin: 0 }}>
            {categoryName}
          </h1>
          <p style={{ fontSize: '12px', color: '#6E7480', margin: '4px 0 0 0' }}>
            {listings.length} classes available
          </p>
        </div>
      </div>

      {/* Class Listings - Grid */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
        <div className="flex flex-col" style={{ gap: '16px' }}>
          {listings.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onOpenClassDetail(item)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 12px 30px rgba(17, 19, 24, 0.08)',
                transition: 'transform 0.2s',
              }}
            >
              {/* Image Section */}
              <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {item.verified && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#B6D6CC',
                      color: '#111318',
                      padding: '6px 12px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 700,
                    }}
                  >
                    ✓ Verified
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div style={{ padding: '16px' }}>
                {/* Title and Rating */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111318', margin: '0 0 4px 0' }}>
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Star size={14} style={{ color: '#F11859', fill: '#F11859' }} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#111318' }}>
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#F11859', margin: 0 }}>
                      {item.price}
                    </p>
                  </div>
                </div>

                {/* Location and Timings */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                  <MapPin size={14} style={{ color: '#6E7480' }} />
                  <span style={{ fontSize: '12px', color: '#6E7480', fontWeight: 500 }}>
                    {item.location}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '13px', color: '#6E7480', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                  {item.description}
                </p>

                {/* Timings */}
                <p style={{ fontSize: '12px', color: '#6E7480', fontWeight: 500, margin: '0 0 10px 0' }}>
                  📅 {item.timings}
                </p>

                {/* Age Group and Facilities */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <div
                    style={{
                      backgroundColor: '#F4FAF8',
                      color: '#111318',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    {item.ageGroup}
                  </div>
                </div>

                {/* Review Preview */}
                <p style={{ fontSize: '12px', color: '#6E7480', fontStyle: 'italic', margin: '0', lineHeight: 1.3 }}>
                  "{item.reviewsPreview}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Bell, MapPin, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ExploreScreenProps {
  onBack?: () => void;
  onOpenClassDetail: (classData: any) => void;
  preselectedCategoryName?: string;
}

interface ExploreCategory {
  key: string;
  title: string;
  subtitle: string;
  imageUrl: string;
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

const CATEGORY_BATCH_SIZE = 8;

const allCategories: ExploreCategory[] = [
  { key: 'football-academy', title: 'Football Academy', subtitle: 'Skills and teamwork', imageUrl: 'https://source.unsplash.com/900x700/?football,training,kids' },
  { key: 'cricket-coaching', title: 'Cricket Coaching', subtitle: 'Batting and bowling drills', imageUrl: 'https://source.unsplash.com/900x700/?cricket,coaching,academy' },
  { key: 'swimming-academy', title: 'Swimming Academy', subtitle: 'Water confidence first', imageUrl: 'https://source.unsplash.com/900x700/?swimming,pool,coach' },
  { key: 'basketball-club', title: 'Basketball Club', subtitle: 'Agility and game IQ', imageUrl: 'https://source.unsplash.com/900x700/?basketball,academy,kids' },
  { key: 'badminton-center', title: 'Badminton Center', subtitle: 'Speed and reflex training', imageUrl: 'https://source.unsplash.com/900x700/?badminton,training' },
  { key: 'tennis-training', title: 'Tennis Training', subtitle: 'Serve, rally, repeat', imageUrl: 'https://source.unsplash.com/900x700/?tennis,coach,kids' },
  { key: 'skating-class', title: 'Skating Class', subtitle: 'Balance and control', imageUrl: 'https://source.unsplash.com/900x700/?roller-skating,class' },
  { key: 'martial-arts', title: 'Martial Arts', subtitle: 'Discipline and defense', imageUrl: 'https://source.unsplash.com/900x700/?martial-arts,training' },
  { key: 'gymnastics', title: 'Gymnastics', subtitle: 'Strength and flexibility', imageUrl: 'https://source.unsplash.com/900x700/?gymnastics,kids,academy' },
  { key: 'yoga-kids', title: 'Yoga Kids', subtitle: 'Calm minds, strong bodies', imageUrl: 'https://source.unsplash.com/900x700/?kids,yoga,class' },

  { key: 'math-tuition', title: 'Math Tuition', subtitle: 'Concepts made easy', imageUrl: 'https://source.unsplash.com/900x700/?math,tutoring,students' },
  { key: 'science-tuition', title: 'Science Tuition', subtitle: 'Learn by experiments', imageUrl: 'https://source.unsplash.com/900x700/?science,classroom,kids' },
  { key: 'coding-class', title: 'Coding Class', subtitle: 'Build logic and apps', imageUrl: 'https://source.unsplash.com/900x700/?coding,students,laptop' },
  { key: 'robotics-lab', title: 'Robotics Lab', subtitle: 'Future innovators', imageUrl: 'https://source.unsplash.com/900x700/?robotics,lab,kids' },
  { key: 'chess-academy', title: 'Chess Academy', subtitle: 'Think ahead always', imageUrl: 'https://source.unsplash.com/900x700/?chess,kids,training' },
  { key: 'abacus-class', title: 'Abacus Class', subtitle: 'Faster number sense', imageUrl: 'https://source.unsplash.com/900x700/?abacus,children,learning' },
  { key: 'language-class', title: 'Language Class', subtitle: 'Speak with confidence', imageUrl: 'https://source.unsplash.com/900x700/?language,classroom' },
  { key: 'public-speaking', title: 'Public Speaking', subtitle: 'Voice and confidence', imageUrl: 'https://source.unsplash.com/900x700/?public-speaking,students' },

  { key: 'art-classes', title: 'Art Classes', subtitle: 'Paint and create', imageUrl: 'https://source.unsplash.com/900x700/?art,class,painting,kids' },
  { key: 'dance-studio', title: 'Dance Studio', subtitle: 'Rhythm and movement', imageUrl: 'https://source.unsplash.com/900x700/?dance,studio,kids' },
  { key: 'music-class', title: 'Music Class', subtitle: 'Melody and expression', imageUrl: 'https://source.unsplash.com/900x700/?music,lesson,kids' },
  { key: 'piano-lessons', title: 'Piano Lessons', subtitle: 'Learn keys and rhythm', imageUrl: 'https://source.unsplash.com/900x700/?piano,lesson,child' },
  { key: 'guitar-studio', title: 'Guitar Studio', subtitle: 'Strings and chords', imageUrl: 'https://source.unsplash.com/900x700/?guitar,studio,lesson' },
  { key: 'drama-theatre', title: 'Drama & Theatre', subtitle: 'Stage confidence', imageUrl: 'https://source.unsplash.com/900x700/?theatre,drama,students' },
  { key: 'photography-class', title: 'Photography Class', subtitle: 'Capture great stories', imageUrl: 'https://source.unsplash.com/900x700/?photography,workshop,students' },
  { key: 'craft-studio', title: 'Craft Studio', subtitle: 'Hands-on creativity', imageUrl: 'https://source.unsplash.com/900x700/?craft,workshop,kids' },

  { key: 'cooking-class', title: 'Cooking Class', subtitle: 'Kitchen confidence', imageUrl: 'https://source.unsplash.com/900x700/?cooking,class,kids' },
  { key: 'baking-workshop', title: 'Baking Workshop', subtitle: 'Mix, bake, decorate', imageUrl: 'https://source.unsplash.com/900x700/?baking,workshop' },
  { key: 'personality-development', title: 'Personality Development', subtitle: 'Soft skills that matter', imageUrl: 'https://source.unsplash.com/900x700/?personality-development,students' },
  { key: 'meditation', title: 'Meditation', subtitle: 'Mindfulness for focus', imageUrl: 'https://source.unsplash.com/900x700/?meditation,class' },
  { key: 'handwriting-class', title: 'Handwriting Class', subtitle: 'Neat writing habits', imageUrl: 'https://source.unsplash.com/900x700/?handwriting,children' },
  { key: 'entrepreneurship-kids', title: 'Entrepreneurship Kids', subtitle: 'Build mini ventures', imageUrl: 'https://source.unsplash.com/900x700/?entrepreneurship,children' },
  { key: 'fashion-design-basics', title: 'Fashion Design Basics', subtitle: 'Create your style', imageUrl: 'https://source.unsplash.com/900x700/?fashion-design,students' },
  { key: 'content-creator-bootcamp', title: 'Content Creator Bootcamp', subtitle: 'Create and publish', imageUrl: 'https://source.unsplash.com/900x700/?content-creator,workshop' },
];

const areaPool = ['Lavale', 'Hinjewadi', 'Wakad', 'Baner', 'Pashan'];

const seededImage = (seed: string, width = 900, height = 700) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

const getCategoryImage = (category: ExploreCategory) => {
  if (category.imageUrl && !category.imageUrl.includes('source.unsplash.com')) {
    return category.imageUrl;
  }
  return seededImage(`category-${category.key}`);
};

const toTitleCase = (value: string) => value
  .replace(/-/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase());

const buildListings = (category: ExploreCategory): ExploreClassItem[] => {
  const base = category.title;
  const listingImageOne = seededImage(`listing-${category.key}-1`);
  const listingImageTwo = seededImage(`listing-${category.key}-2`);
  const listingImageThree = seededImage(`listing-${category.key}-3`);
  return [
    {
      id: Math.abs(category.key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) + 1,
      title: `${base} Hub`,
      location: areaPool[(category.key.length + 1) % areaPool.length],
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
      id: Math.abs(category.key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) + 2,
      title: `${base} Studio`,
      location: areaPool[(category.key.length + 2) % areaPool.length],
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
      id: Math.abs(category.key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) + 3,
      title: `${base} Academy`,
      location: areaPool[(category.key.length + 3) % areaPool.length],
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

export default function ExploreScreen({ onBack, onOpenClassDetail, preselectedCategoryName }: ExploreScreenProps) {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Auto-select category if preselected name is provided
  useEffect(() => {
    if (preselectedCategoryName) {
      // Find the category by title that matches the provided name
      const matchingCategory = allCategories.find(
        (cat) => cat.title.toLowerCase().includes(preselectedCategoryName.toLowerCase()) ||
                 cat.title.split(' ')[0].toLowerCase() === preselectedCategoryName.toLowerCase()
      );
      if (matchingCategory) {
        setActiveCategoryKey(matchingCategory.key);
      }
    }
  }, [preselectedCategoryName]);

  const activeCategory = useMemo(
    () => allCategories.find((item) => item.key === activeCategoryKey) ?? null,
    [activeCategoryKey],
  );

  const visibleCategories = useMemo(
    () => allCategories.slice(0, visibleCount),
    [visibleCount],
  );

  const categoryListings = useMemo(
    () => (activeCategory ? buildListings(activeCategory) : []),
    [activeCategory],
  );

  useEffect(() => {
    if (activeCategoryKey) return undefined;
    if (!loadMoreRef.current) return undefined;

    const node = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (visibleCount >= allCategories.length) return;
        if (loadingMore) return;

        setLoadingMore(true);
        window.setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + CATEGORY_BATCH_SIZE, allCategories.length));
          setLoadingMore(false);
        }, 420);
      },
      { root: null, rootMargin: '140px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activeCategoryKey, visibleCount, loadingMore]);

  const handleBack = () => {
    if (activeCategoryKey) {
      setActiveCategoryKey(null);
      return;
    }
    onBack?.();
  };

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleBack}
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
              }}
            >
              <ArrowLeft size={18} style={{ color: '#111318' }} />
            </button>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111318', lineHeight: 1.2 }}>Explore Near Me</h1>
          </div>
          <button
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
              position: 'relative',
            }}
          >
            <Bell size={17} color="#111318" />
            <span style={{ position: 'absolute', top: '4px', right: '5px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#F11859' }} />
          </button>
        </div>
        <p style={{ fontSize: '14px', color: '#6E7480' }}>
          {activeCategory ? `${toTitleCase(activeCategory.title)} near your location` : 'Find classes around your area'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!activeCategory ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ paddingLeft: '24px', paddingRight: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
          >
            {visibleCategories.map((category) => (
              <motion.button
                key={category.key}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategoryKey(category.key)}
                style={{
                  border: 'none',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  padding: 0,
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 10px 24px rgba(17,19,24,0.08)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ height: '124px', position: 'relative' }}>
                  <img src={getCategoryImage(category)} alt={category.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,19,24,0.04) 40%, rgba(17,19,24,0.5) 100%)' }} />
                  <div style={{ position: 'absolute', left: '10px', right: '10px', bottom: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '2px', lineHeight: 1.2 }}>{category.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.2 }}>{category.subtitle}</div>
                  </div>
                </div>
              </motion.button>
            ))}

            <div ref={loadMoreRef} style={{ gridColumn: '1 / -1', minHeight: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '12px' }}>
              {visibleCount < allCategories.length ? (
                <div style={{ fontSize: '12px', color: '#6E7480' }}>
                  {loadingMore ? 'Loading more nearby options...' : 'Scroll to discover more'}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: '#9CA3B0' }}>More categories coming near you</div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ paddingLeft: '24px', paddingRight: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {categoryListings.map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenClassDetail(item)}
                style={{
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  boxShadow: '0 8px 22px rgba(17,19,24,0.07)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '102px', height: '102px', borderRadius: '14px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="#6E7480" />
                        <span style={{ fontSize: '12px', color: '#6E7480' }}>{item.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Star size={12} color="#F11859" fill="#F11859" />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#111318' }}>{item.rating}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>{item.price}</div>
                    <div style={{ fontSize: '12px', color: '#6E7480', lineHeight: 1.35 }}>{item.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Search, ChevronDown, SlidersHorizontal, Trophy, BookOpen, Palette, GraduationCap, Star, Heart, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from '../../imports/Logo.png';

interface HomeScreenProps {
  onNavigateToExplore: () => void;
  onOpenFilters: () => void;
  onOpenClassDetail: (classData: any) => void;
  onNavigateToSchedule: () => void;
  onOpenLocationSettings: () => void;
  currentCity: string;
}

export default function HomeScreen({ onNavigateToExplore, onOpenFilters, onOpenClassDetail, onNavigateToSchedule, onOpenLocationSettings, currentCity }: HomeScreenProps) {
  const quickCategories = [
    { name: 'Sports', icon: Trophy },
    { name: 'Academics', icon: BookOpen },
    { name: 'Arts', icon: Palette },
    { name: 'Tutors', icon: GraduationCap },
    { name: 'Health', icon: Heart },
    { name: 'Activity', icon: Zap }
  ];

  const trending = [
    {
      id: 1,
      title: 'Swimming Academy',
      location: 'Lavale',
      rating: 4.9,
      price: '₹2,500/mo',
      description: 'Professional swimming classes for all age groups. Expert coaches with 10+ years experience.',
      timings: 'Mon Wed Fri • 5 PM',
      verified: true
    },
    {
      id: 2,
      title: 'Piano Studio',
      location: 'Hinjewadi',
      rating: 4.8,
      price: '₹3,000/mo',
      description: 'Learn piano from certified instructors. Individual and group classes available.',
      timings: 'Tue Thu Sat • 4 PM',
      verified: true
    },
    {
      id: 3,
      title: 'Football Academy',
      location: 'Lavale',
      rating: 4.7,
      price: '₹1,800/mo',
      description: 'Professional football training for kids and teenagers. Build skills and teamwork.',
      timings: 'Weekends • 6 AM',
      verified: true
    },
    {
      id: 4,
      title: 'Coding Lab',
      location: 'Wakad',
      rating: 4.9,
      price: '₹3,500/mo',
      description: 'Coding classes for kids and teens. Python, Scratch, Web Development and more.',
      timings: 'Weekends • 10 AM',
      verified: true
    },
    {
      id: 5,
      title: 'Dance Hub',
      location: 'Lavale',
      rating: 4.6,
      price: '₹2,200/mo',
      description: 'Traditional Kathak dance classes by expert instructors. All age groups welcome.',
      timings: 'Mon Wed Fri • 6 PM',
      verified: true
    },
    {
      id: 6,
      title: 'Robotics Club',
      location: 'Hinjewadi',
      rating: 4.8,
      price: '₹4,000/mo',
      description: 'Hands-on robotics and STEM learning. Build, code, and innovate.',
      timings: 'Sat Sun • 2 PM',
      verified: true
    },
    {
      id: 7,
      title: 'Yoga Kids',
      location: 'Lavale',
      rating: 4.7,
      price: '₹1,500/mo',
      description: 'Hatha and Vinyasa yoga sessions for stress relief and fitness.',
      timings: 'Daily • 7 AM',
      verified: true
    },
    {
      id: 8,
      title: 'Art House',
      location: 'Wakad',
      rating: 4.5,
      price: '₹2,000/mo',
      description: 'Learn drawing, sketching, and painting techniques from professional artists.',
      timings: 'Tue Thu • 5 PM',
      verified: true
    },
    {
      id: 9,
      title: 'Tuition Point',
      location: 'Hinjewadi',
      rating: 4.6,
      price: '₹2,800/mo',
      description: 'Improve fluency and confidence in English communication.',
      timings: 'Mon Wed Fri • 7 PM',
      verified: true
    },
    {
      id: 10,
      title: 'Chess Champs',
      location: 'Lavale',
      rating: 4.9,
      price: '₹3,200/mo',
      description: 'Strategic chess training for all skill levels. Develop analytical thinking.',
      timings: 'Weekends • 11 AM',
      verified: true
    },
    {
      id: 11,
      title: 'Chess Academy',
      location: 'Wakad',
      rating: 4.7,
      price: '₹1,600/mo',
      description: 'Strategic chess training for all skill levels. Develop analytical thinking.',
      timings: 'Sat Sun • 11 AM',
      verified: true
    },
    {
      id: 12,
      title: 'Karate Classes',
      location: 'Lavale',
      rating: 4.8,
      price: '₹2,400/mo',
      description: 'Traditional martial arts training for discipline and self-defense.',
      timings: 'Mon Wed Fri • 6 PM',
      verified: true
    }
  ];

  const recommended = [
    {
      id: 13,
      title: 'Guitar Lessons',
      location: 'Lavale',
      rating: 4.7,
      price: '₹2,600/mo',
      description: 'Learn acoustic and electric guitar from certified instructors.',
      timings: 'Tue Thu Sat • 5 PM',
      verified: true
    },
    {
      id: 14,
      title: 'Table Tennis Coaching',
      location: 'Hinjewadi',
      rating: 4.5,
      price: '₹1,800/mo',
      description: 'Professional table tennis training for all age groups.',
      timings: 'Weekends • 4 PM',
      verified: true
    },
    {
      id: 15,
      title: 'Mathematics Tuition',
      location: 'Lavale',
      rating: 4.9,
      price: '₹3,000/mo',
      description: 'Expert math tutoring for classes 6-12. Concept clarity and problem solving.',
      timings: 'Daily • 6 PM',
      verified: true
    },
    {
      id: 16,
      title: 'Bharatanatyam Dance',
      location: 'Wakad',
      rating: 4.6,
      price: '₹2,400/mo',
      description: 'Classical Bharatanatyam dance training by certified Guru.',
      timings: 'Mon Wed Fri • 5 PM',
      verified: true
    },
    {
      id: 17,
      title: 'Basketball Academy',
      location: 'Lavale',
      rating: 4.8,
      price: '₹2,200/mo',
      description: 'Basketball skills training and team practice sessions.',
      timings: 'Weekends • 6 AM',
      verified: true
    },
    {
      id: 18,
      title: 'Science Workshop',
      location: 'Hinjewadi',
      rating: 4.7,
      price: '₹2,800/mo',
      description: 'Fun hands-on science experiments and projects for curious minds.',
      timings: 'Sat Sun • 10 AM',
      verified: true
    }
  ];

  const popular = [
    {
      id: 19,
      title: 'Zumba Fitness',
      location: 'Lavale',
      rating: 4.6,
      price: '₹1,400/mo',
      description: 'High-energy Zumba dance fitness classes for all levels.',
      timings: 'Mon Wed Fri • 7 AM',
      verified: true
    },
    {
      id: 20,
      title: 'Violin Classes',
      location: 'Lavale',
      rating: 4.7,
      price: '₹2,800/mo',
      description: 'Classical and contemporary violin training for beginners to advanced.',
      timings: 'Tue Thu Sat • 6 PM',
      verified: true
    },
    {
      id: 21,
      title: 'Badminton Coaching',
      location: 'Lavale',
      rating: 4.8,
      price: '₹2,000/mo',
      description: 'Professional badminton coaching with court facilities.',
      timings: 'Weekends • 5 PM',
      verified: true
    },
    {
      id: 22,
      title: 'French Language Classes',
      location: 'Wakad',
      rating: 4.5,
      price: '₹3,200/mo',
      description: 'Learn French from native speakers. A1 to B2 levels.',
      timings: 'Mon Wed Fri • 7 PM',
      verified: true
    },
    {
      id: 23,
      title: 'Cooking Classes',
      location: 'Lavale',
      rating: 4.6,
      price: '₹2,400/mo',
      description: 'Learn Indian and international cuisines from expert chefs.',
      timings: 'Sat Sun • 11 AM',
      verified: true
    },
    {
      id: 24,
      title: 'Calligraphy Workshop',
      location: 'Hinjewadi',
      rating: 4.4,
      price: '₹1,800/mo',
      description: 'Beautiful handwriting and modern calligraphy techniques.',
      timings: 'Weekends • 3 PM',
      verified: true
    }
  ];

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      {/* Top Header */}
      <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '24px' }}>
        <div className="flex items-center" style={{ gap: '8px' }}>
          <img src={Logo} alt="Enrol-Me" style={{ height: '28px' }} />
          <button
            onClick={onOpenLocationSettings}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0'
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#111318' }}>{currentCity}</span>
            <ChevronDown size={16} style={{ color: '#111318' }} />
          </button>
        </div>
      </div>

      {/* New Circular Interactive Hero */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '24px' }}>
        <div className="flex flex-col items-center">
          {/* AI Companion Character */}
          <motion.button
            onClick={onNavigateToExplore}
            whileTap={{ scale: 1.05, y: -4 }}
            style={{
              width: '170px',
              height: '170px',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'visible',
              padding: 0,
              background: 'transparent'
            }}
          >
            {/* Floating Shadow */}
            <motion.div
              animate={{
                opacity: [0.08, 0.12, 0.08],
                scale: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50%',
                height: '18px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(100, 150, 190, 0.18) 0%, rgba(80, 130, 170, 0.06) 60%, transparent 80%)',
                filter: 'blur(10px)'
              }}
            />

            {/* Character Container with Floating + Wobble */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
                rotate: [-0.6, 0.6, -0.6]
              }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
              }}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
            >
              {/* Main Blob Body with Breathing */}
              <motion.div
                animate={{
                  scaleY: [1, 1.02, 1, 0.98, 1],
                  scaleX: [1, 0.99, 1, 1.01, 1]
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  top: '6%',
                  left: '-35%',
                  width: '90%',
                  height: '88%',
                  borderRadius: '48% 52% 50% 50% / 44% 44% 78% 78%',
                  background: 'linear-gradient(180deg, rgba(190, 160, 230, 0.96) 0%, rgba(205, 170, 235, 0.97) 10%, rgba(220, 180, 228, 0.97) 20%, rgba(240, 190, 210, 0.97) 32%, rgba(255, 220, 180, 0.98) 44%, rgba(210, 245, 215, 0.97) 56%, rgba(170, 235, 230, 0.98) 68%, rgba(140, 215, 240, 0.99) 82%, rgba(110, 205, 240, 0.99) 100%)',
                  boxShadow: '0 24px 52px rgba(120, 160, 200, 0.55), 0 10px 28px rgba(17, 19, 24, 0.15), inset -10px -14px 35px rgba(80, 170, 225, 0.6), inset 10px 10px 35px rgba(255, 255, 255, 0.95)',
                  overflow: 'visible',
                  filter: 'blur(0.5px)'
                }}
              >
                {/* Outer Pale Blue Rim Glow */}
                <div style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '48% 52% 50% 50% / 44% 44% 78% 78%',
                  background: 'linear-gradient(180deg, rgba(190, 215, 245, 0.75) 0%, rgba(175, 225, 248, 0.72) 50%, rgba(165, 230, 250, 0.78) 100%)',
                  filter: 'blur(12px)',
                  zIndex: -1
                }} />

                {/* Strong Top Glossy Highlight */}
                <motion.div
                  animate={{
                    opacity: [0.95, 1, 0.95],
                    scale: [1, 1.06, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '12%',
                    left: '28%',
                    width: '32%',
                    height: '20%',
                    borderRadius: '55% 45% 50% 50% / 60% 65% 35% 40%',
                    background: 'radial-gradient(ellipse at 35% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.88) 30%, rgba(255, 255, 255, 0.5) 62%, transparent 85%)',
                    filter: 'blur(4px)'
                  }}
                />

                {/* Lavender Pink Top Area */}
                <motion.div
                  animate={{
                    opacity: [0.92, 1, 0.92],
                    scale: [1, 1.04, 1]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '14%',
                    width: '72%',
                    height: '34%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at 50% 35%, rgba(180, 145, 225, 0.96) 0%, rgba(190, 155, 230, 0.88) 38%, rgba(200, 165, 235, 0.6) 68%, transparent 88%)',
                    filter: 'blur(16px)'
                  }}
                />

                {/* Soft Pink Blush */}
                <motion.div
                  animate={{
                    opacity: [0.88, 0.96, 0.88],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '22%',
                    left: '18%',
                    width: '64%',
                    height: '32%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(235, 170, 210, 0.92) 0%, rgba(240, 180, 220, 0.82) 38%, rgba(245, 190, 230, 0.55) 68%, transparent 88%)',
                    filter: 'blur(14px)'
                  }}
                />

                {/* Warm Peachy Yellow Center Face */}
                <motion.div
                  animate={{
                    opacity: [0.94, 1, 0.94],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '24%',
                    width: '52%',
                    height: '34%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 220, 160, 0.96) 0%, rgba(255, 228, 175, 0.88) 36%, rgba(255, 235, 190, 0.65) 66%, transparent 88%)',
                    filter: 'blur(12px)'
                  }}
                />

                {/* Light Mint Green Lower Center */}
                <motion.div
                  animate={{
                    opacity: [0.92, 1, 0.92],
                    y: ['0%', '2%', '0%']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '48%',
                    left: '18%',
                    width: '64%',
                    height: '38%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at 50% 46%, rgba(160, 235, 210, 0.96) 0%, rgba(175, 240, 220, 0.88) 36%, rgba(190, 245, 230, 0.68) 66%, transparent 88%)',
                    filter: 'blur(14px)'
                  }}
                />

                {/* Light Cyan Blue Lower Body */}
                <motion.div
                  animate={{
                    opacity: [0.96, 1, 0.96],
                    y: ['0%', '3%', '0%']
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '12%',
                    left: '14%',
                    width: '72%',
                    height: '48%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at 50% 54%, rgba(125, 215, 245, 0.98) 0%, rgba(145, 225, 248, 0.92) 36%, rgba(165, 235, 250, 0.78) 66%, transparent 88%)',
                    filter: 'blur(14px)'
                  }}
                />

                {/* Additional Cyan Intensity */}
                <motion.div
                  animate={{
                    opacity: [0.92, 1, 0.92]
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '18%',
                    left: '22%',
                    width: '56%',
                    height: '42%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(105, 210, 240, 0.98) 0%, rgba(125, 220, 245, 0.82) 48%, transparent 78%)',
                    filter: 'blur(17px)'
                  }}
                />

                {/* Bottom Point Glow */}
                <motion.div
                  animate={{
                    opacity: [0.9, 0.98, 0.9],
                    scaleY: [1, 1.03, 1]
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '3%',
                    left: '40%',
                    width: '20%',
                    height: '18%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at 50% 28%, rgba(115, 210, 240, 0.98) 0%, rgba(135, 220, 245, 0.78) 45%, transparent 72%)',
                    filter: 'blur(10px)'
                  }}
                />

                {/* Inner White Pearl Glow */}
                <motion.div
                  animate={{
                    opacity: [0.56, 0.72, 0.56],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: '26%',
                    left: '28%',
                    width: '44%',
                    height: '42%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.76) 0%, rgba(250, 252, 255, 0.46) 48%, transparent 78%)',
                    filter: 'blur(22px)'
                  }}
                />

                {/* Right Side Subtle Reflection */}
                <div style={{
                  position: 'absolute',
                  top: '20%',
                  right: '12%',
                  width: '22%',
                  height: '38%',
                  borderRadius: '50%',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.52) 0%, rgba(245, 250, 255, 0.3) 48%, transparent 100%)',
                  filter: 'blur(9px)'
                }} />
              </motion.div>

              {/* Left Arm - Cyan */}
              <motion.div
                animate={{
                  x: [-1.5, 0.8, -1.5],
                  scaleX: [1, 1.04, 1],
                  scaleY: [1, 1.02, 1]
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.15
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '2%',
                  width: '30px',
                  height: '42px',
                  borderRadius: '50% 45% 48% 52% / 45% 50% 50% 55%',
                  background: 'linear-gradient(155deg, rgba(175, 235, 248, 0.85) 0%, rgba(185, 238, 250, 0.82) 50%, rgba(165, 230, 245, 0.8) 100%)',
                  boxShadow: 'inset -2px 1px 8px rgba(125, 200, 235, 0.32), 0 4px 10px rgba(160, 215, 240, 0.28)',
                  filter: 'blur(0.5px)'
                }}
              >
                {/* Arm Highlight */}
                <div style={{
                  position: 'absolute',
                  top: '18%',
                  left: '15%',
                  width: '48%',
                  height: '42%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(225, 248, 255, 0.22) 60%, transparent 85%)',
                  filter: 'blur(5px)'
                }} />
              </motion.div>

              {/* Right Arm - Cyan */}
              <motion.div
                animate={{
                  x: [1.5, -0.8, 1.5],
                  scaleX: [1, 1.04, 1],
                  scaleY: [1, 1.02, 1]
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.45
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '22%',
                  width: '30px',
                  height: '42px',
                  borderRadius: '45% 50% 52% 48% / 50% 45% 55% 50%',
                  background: 'linear-gradient(-155deg, rgba(175, 235, 248, 0.85) 0%, rgba(185, 238, 250, 0.82) 50%, rgba(165, 230, 245, 0.8) 100%)',
                  boxShadow: 'inset 2px 1px 8px rgba(125, 200, 235, 0.32), 0 4px 10px rgba(160, 215, 240, 0.28)',
                  filter: 'blur(0.5px)',
                  zIndex: -1
                }}
              >
                {/* Arm Highlight */}
                <div style={{
                  position: 'absolute',
                  top: '18%',
                  right: '15%',
                  width: '48%',
                  height: '42%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(225, 248, 255, 0.22) 60%, transparent 85%)',
                  filter: 'blur(5px)'
                }} />
              </motion.div>

              {/* Face Container */}
              <div style={{
                position: 'absolute',
                top: '30%',
                left: '30%',
                transform: 'translateX(-50%)',
                width: '88px',
                height: '52px'
              }}>
                {/* Left Eye - Vertical Rounded Blue - Looking slightly right */}
                <motion.div
                  animate={{
                    scaleY: [1, 0.05, 1, 1, 1, 1, 1]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.025, 0.05, 0.08, 0.94, 0.97, 1],
                    repeatDelay: 3
                  }}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    left: '24px',
                    width: '10px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
                    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(75, 137, 184, 0.35)'
                  }}
                />

                {/* Right Eye - Vertical Rounded Blue - Looking slightly right */}
                <motion.div
                  animate={{
                    scaleY: [1, 0.05, 1, 1, 1, 1, 1]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.025, 0.05, 0.08, 0.94, 0.97, 1],
                    repeatDelay: 3
                  }}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '20px',
                    width: '10px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
                    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(75, 137, 184, 0.35)'
                  }}
                />

                {/* Smile - Curved Blue */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '32px',
                  height: '16px',
                  borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                  background: 'linear-gradient(180deg, #5B9AC8 0%, #4A89B8 100%)',
                  boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.18)',
                  overflow: 'hidden'
                }} />
              </div>

              {/* Outer Soft Glow Halo */}
              <motion.div
                animate={{
                  opacity: [0.16, 0.24, 0.16],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  inset: '-16px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(180, 220, 248, 0.28) 0%, rgba(160, 210, 243, 0.18) 50%, rgba(140, 200, 238, 0.08) 75%, transparent 90%)',
                  filter: 'blur(22px)',
                  pointerEvents: 'none'
                }}
              />

              {/* Speech Bubble */}
              <motion.div
                animate={{
                  opacity: [0.92, 1, 0.92],
                  y: [-1, 1, -1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  position: 'absolute',
                  top: '22%',
                  right: '-75px',
                  width: '130px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '10px 12px',
                  boxShadow: '0 8px 24px rgba(17, 19, 24, 0.16)',
                  pointerEvents: 'none'
                }}
              >
                {/* Speech Bubble Tail */}
                <div style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '0',
                  height: '0',
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderRight: '10px solid #FFFFFF'
                }} />

                <div style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#111318',
                  lineHeight: '1.35',
                  textAlign: 'center'
                }}>
                  Click here to explore classes near me
                </div>
              </motion.div>
            </motion.div>

            {/* Tap Brighten Glow */}
            <motion.div
              whileTap={{
                opacity: [0, 0.75, 0],
                scale: [0.88, 1.18, 1]
              }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(230, 245, 255, 0.65) 0%, rgba(200, 235, 250, 0.45) 55%, transparent 80%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
                opacity: 0
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Search Bar Below Circle */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '32px' }}>
        <div className="flex items-center" style={{
          height: '58px',
          backgroundColor: '#FFFFFF',
          borderRadius: '29px',
          paddingLeft: '24px',
          paddingRight: '12px',
          boxShadow: '0 12px 30px rgba(17,19,24,0.12)',
          gap: '12px'
        }}>
          <Search size={20} style={{ color: '#6E7480' }} />
          <input
            type="text"
            placeholder="Search classes, tutors, sports"
            className="flex-1 outline-none border-none bg-transparent"
            style={{ fontSize: '16px', color: '#6E7480', fontFamily: 'Raleway, sans-serif' }}
          />
          <button
            onClick={onOpenFilters}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F4FAF8',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <SlidersHorizontal size={16} style={{ color: '#111318' }} />
          </button>
        </div>
      </div>

      {/* Quick Categories - 6 Perfect Circles */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* First Row - 3 categories */}
          <div className="flex justify-between items-center">
            {quickCategories.slice(0, 3).map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.name} className="flex flex-col items-center" style={{ gap: '8px' }}>
                  <button
                    style={{
                      width: '72px',
                      height: '72px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      border: 'none',
                      boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    <IconComponent size={28} style={{ color: '#111318' }} />
                  </button>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#111318',
                    textAlign: 'center'
                  }}>
                    {category.name}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Second Row - 3 categories */}
          <div className="flex justify-between items-center">
            {quickCategories.slice(3, 6).map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.name} className="flex flex-col items-center" style={{ gap: '8px' }}>
                  <button
                    style={{
                      width: '72px',
                      height: '72px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      border: 'none',
                      boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    <IconComponent size={28} style={{ color: '#111318' }} />
                  </button>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#111318',
                    textAlign: 'center'
                  }}>
                    {category.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trending This Week */}
      <div style={{ paddingTop: '48px', paddingLeft: '24px', paddingBottom: '32px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '20px',
          paddingRight: '24px'
        }}>
          Trending This Week
        </h2>

        <div className="flex overflow-x-auto" style={{ gap: '16px', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {trending.map((item) => {
            const getImageUrl = (id: number) => {
              const images = [
                'https://images.unsplash.com/photo-1761839447370-8873d86f5b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1555597673-b21d5c935865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
              ];
              return images[(id - 1) % images.length];
            };

            return (
              <div
                key={item.id}
                onClick={() => onOpenClassDetail(item)}
                style={{
                  width: '280px',
                  flexShrink: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{
                  height: '140px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={getImageUrl(item.id)}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111318',
                  marginBottom: '8px'
                }}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#6E7480' }}>{item.location}</span>
                  <div className="flex items-center" style={{ gap: '4px' }}>
                    <Star size={14} fill="#F11859" style={{ color: '#F11859' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111318' }}>{item.rating}</span>
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#111318' }}>
                  {item.price}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Near You */}
      <div style={{ paddingLeft: '24px', paddingBottom: '32px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '20px',
          paddingRight: '24px'
        }}>
          Recommended Near You
        </h2>

        <div className="flex overflow-x-auto" style={{ gap: '16px', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {recommended.map((item) => {
            const getImageUrl = (id: number) => {
              const images = [
                'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1576678927484-cc907957088c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1509228468518-180dd4864904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1546519638-68e109498ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
              ];
              return images[(id - 13) % images.length];
            };

            return (
              <div
                key={item.id}
                onClick={() => onOpenClassDetail(item)}
                style={{
                  width: '280px',
                  flexShrink: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{
                  height: '140px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={getImageUrl(item.id)}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111318',
                  marginBottom: '8px'
                }}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#6E7480' }}>{item.location}</span>
                  <div className="flex items-center" style={{ gap: '4px' }}>
                    <Star size={14} fill="#F11859" style={{ color: '#F11859' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111318' }}>{item.rating}</span>
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#111318' }}>
                  {item.price}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Popular in Lavale */}
      <div style={{ paddingLeft: '24px', paddingBottom: '32px' }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '20px',
          paddingRight: '24px'
        }}>
          Popular in Lavale
        </h2>

        <div className="flex overflow-x-auto" style={{ gap: '16px', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          {popular.map((item) => {
            const getImageUrl = (id: number) => {
              const images = [
                'https://images.unsplash.com/photo-1518611012118-696072aa579a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1543109740-4bdb38fda756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
              ];
              return images[(id - 19) % images.length];
            };

            return (
              <div
                key={item.id}
                onClick={() => onOpenClassDetail(item)}
                style={{
                  width: '280px',
                  flexShrink: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              >
                <div style={{
                  height: '140px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={getImageUrl(item.id)}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111318',
                  marginBottom: '8px'
                }}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#6E7480' }}>{item.location}</span>
                  <div className="flex items-center" style={{ gap: '4px' }}>
                    <Star size={14} fill="#F11859" style={{ color: '#F11859' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111318' }}>{item.rating}</span>
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#111318' }}>
                  {item.price}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
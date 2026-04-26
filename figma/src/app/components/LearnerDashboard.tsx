import { useState } from 'react';
import { BookOpen, Calendar, MessageCircle, User, Clock, Star, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export default function LearnerDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  const upcomingClasses = [
    { id: 1, name: 'Swimming - Advanced', time: 'Today, 4:00 PM', location: 'Elite Swim Academy', instructor: 'Coach Sarah' },
    { id: 2, name: 'Piano Lessons', time: 'Tomorrow, 5:30 PM', location: 'Melody Music School', instructor: 'Ms. Jennifer' },
    { id: 3, name: 'Coding Club', time: 'Wed, 3:00 PM', location: 'TechKids Academy', instructor: 'Mr. Rahul' }
  ];

  const achievements = [
    { id: 1, title: 'Perfect Attendance', icon: '🎯', points: '+50' },
    { id: 2, title: 'Quick Learner', icon: '⚡', points: '+30' },
    { id: 3, title: 'Team Player', icon: '🤝', points: '+40' }
  ];

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#F4FAF8',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Raleway, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 20px',
        backgroundColor: 'white',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#B6D6CC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            👦
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '2px' }}>
              Welcome back, Arjun!
            </h1>
            <p style={{ fontSize: '14px', color: '#6E7480' }}>Ready to learn today?</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        {activeTab === 'home' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  backgroundColor: '#E8F5F1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <BookOpen size={20} color="#74A4BC" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>5</div>
                <div style={{ fontSize: '13px', color: '#6E7480' }}>Active Classes</div>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.97 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  backgroundColor: '#FFF4E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Trophy size={20} color="#F5A623" />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>320</div>
                <div style={{ fontSize: '13px', color: '#6E7480' }}>Total Points</div>
              </motion.div>
            </div>

            {/* Upcoming Classes */}
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Upcoming Classes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {upcomingClasses.map((cls) => (
                <motion.div
                  key={cls.id}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318' }}>{cls.name}</h3>
                    <div style={{
                      backgroundColor: '#E8F5F1',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#74A4BC'
                    }}>
                      {cls.time.split(',')[0]}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Clock size={14} color="#6E7480" />
                    <span style={{ fontSize: '14px', color: '#6E7480' }}>{cls.time}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#6E7480' }}>
                    {cls.instructor} • {cls.location}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Recent Achievements
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF4E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {achievement.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111318', marginBottom: '2px' }}>
                      {achievement.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6E7480' }}>Unlocked today</p>
                  </div>
                  <div style={{
                    backgroundColor: '#E8F5F1',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#74A4BC'
                  }}>
                    {achievement.points}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              My Learning Schedule
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
                    {cls.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>
                    📍 {cls.location}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6E7480' }}>
                    🕐 {cls.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Messages
            </h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
            }}>
              <MessageCircle size={48} color="#B6D6CC" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontSize: '16px', color: '#6E7480' }}>No new messages</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              My Profile
            </h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#B6D6CC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                margin: '0 auto 16px'
              }}>
                👦
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>
                Arjun Sharma
              </h3>
              <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '24px' }}>
                Student • Grade 5
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingTop: '24px',
                borderTop: '1px solid #E8EEEC'
              }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318' }}>5</div>
                  <div style={{ fontSize: '13px', color: '#6E7480' }}>Classes</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318' }}>320</div>
                  <div style={{ fontSize: '13px', color: '#6E7480' }}>Points</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318' }}>12</div>
                  <div style={{ fontSize: '13px', color: '#6E7480' }}>Badges</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
        padding: '12px 20px 24px',
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        {[
          { id: 'home', icon: BookOpen, label: 'Home' },
          { id: 'schedule', icon: Calendar, label: 'Schedule' },
          { id: 'messages', icon: MessageCircle, label: 'Messages' },
          { id: 'profile', icon: User, label: 'Profile' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '16px',
                backgroundColor: isActive ? '#E8F5F1' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Icon
                size={22}
                color={isActive ? '#74A4BC' : '#6E7480'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span style={{
                fontSize: '11px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#74A4BC' : '#6E7480',
                fontFamily: 'Raleway, sans-serif'
              }}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

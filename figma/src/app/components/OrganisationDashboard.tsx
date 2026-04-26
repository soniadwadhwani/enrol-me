import { useState } from 'react';
import { Users, Calendar, DollarSign, BarChart3, MessageSquare, Star, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrganisationDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'New Leads', value: '12', icon: TrendingUp, color: '#74A4BC', bgColor: '#E8F5F1' },
    { label: 'Active Students', value: '86', icon: Users, color: '#F5A623', bgColor: '#FFF4E8' },
    { label: 'Pending Fees', value: '₹18,500', icon: AlertCircle, color: '#E85D75', bgColor: '#FEF2F4' }
  ];

  const todaySchedule = [
    { time: '9:00 AM', class: 'Beginner Swimming', students: 12, instructor: 'Coach Sarah' },
    { time: '11:00 AM', class: 'Advanced Swimming', students: 8, instructor: 'Coach Mike' },
    { time: '3:00 PM', class: 'Kids Swimming', students: 15, instructor: 'Coach Sarah' },
    { time: '5:00 PM', class: 'Adult Swimming', students: 6, instructor: 'Coach Mike' }
  ];

  const recentStudents = [
    { name: 'Aarav Sharma', joinDate: 'Today', status: 'Active', level: 'Beginner' },
    { name: 'Diya Patel', joinDate: 'Yesterday', status: 'Active', level: 'Intermediate' },
    { name: 'Rohan Kumar', joinDate: '2 days ago', status: 'Trial', level: 'Beginner' }
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
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>
          Welcome, Elite Swim Academy
        </h1>
        <p style={{ fontSize: '14px', color: '#6E7480' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
      }}>
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '12px',
              marginBottom: '24px'
            }}>
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '16px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      backgroundColor: stat.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} color={stat.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '4px' }}>
                        {stat.label}
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318' }}>
                        {stat.value}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Today's Schedule */}
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Schedule Today
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {todaySchedule.map((session, index) => (
                <motion.div
                  key={index}
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
                    <div>
                      <div style={{
                        display: 'inline-block',
                        backgroundColor: '#E8F5F1',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#74A4BC',
                        marginBottom: '8px'
                      }}>
                        {session.time}
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '4px' }}>
                        {session.class}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6E7480' }}>
                        {session.instructor} • {session.students} students
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Quick Actions
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              {[
                { label: 'Reviews', icon: Star, count: '4.8' },
                { label: 'Messages', icon: MessageSquare, count: '5' },
                { label: 'Analytics', icon: BarChart3, count: 'View' },
                { label: 'Calendar', icon: Calendar, count: 'Open' }
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#E8F5F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}>
                      <Icon size={22} color="#74A4BC" />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#111318', marginBottom: '4px' }}>
                      {action.label}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6E7480' }}>
                      {action.count}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318' }}>
                Students
              </h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: '#B6D6CC',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#111318',
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif'
                }}
              >
                + Add Student
              </motion.button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentStudents.map((student, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#E8F5F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#74A4BC'
                    }}>
                      {student.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '4px' }}>
                        {student.name}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#6E7480' }}>
                        {student.level} • Joined {student.joinDate}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: student.status === 'Active' ? '#E8F5F1' : '#FFF4E8',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: student.status === 'Active' ? '#74A4BC' : '#F5A623'
                    }}>
                      {student.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Full Schedule
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {todaySchedule.map((session, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111318', marginBottom: '8px' }}>
                    {session.class}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>
                    🕐 {session.time}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6E7480' }}>
                    👨‍🏫 {session.instructor} • {session.students} students
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Payments
            </h2>
            <motion.div
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                marginBottom: '16px'
              }}
            >
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '8px' }}>
                Total Revenue (This Month)
              </div>
              <div style={{ fontSize: '32px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>
                ₹2,45,000
              </div>
              <div style={{ fontSize: '14px', color: '#74A4BC' }}>
                +12% from last month
              </div>
            </motion.div>
            <div style={{
              backgroundColor: '#FEF2F4',
              borderRadius: '16px',
              padding: '20px',
              border: '2px solid #FFE8EC'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <AlertCircle size={20} color="#E85D75" />
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#E85D75' }}>
                  Pending Fees
                </span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#E85D75' }}>
                ₹18,500
              </div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginTop: '4px' }}>
                From 7 students
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '16px' }}>
              Organisation Profile
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
                fontSize: '36px',
                margin: '0 auto 16px'
              }}>
                🏊
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>
                Elite Swim Academy
              </h3>
              <p style={{ fontSize: '14px', color: '#6E7480', marginBottom: '8px' }}>
                admin@enrolme.com
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: '#FFF4E8',
                padding: '6px 12px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <Star size={16} color="#F5A623" fill="#F5A623" />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5A623' }}>
                  4.8 Rating
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingTop: '24px',
                borderTop: '1px solid #E8EEEC'
              }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318' }}>86</div>
                  <div style={{ fontSize: '13px', color: '#6E7480' }}>Students</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318' }}>12</div>
                  <div style={{ fontSize: '13px', color: '#6E7480' }}>Classes</div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318' }}>3</div>
                  <div style={{ fontSize: '13px', color: '#6E7480' }}>Locations</div>
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
        padding: '12px 8px 24px',
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        {[
          { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
          { id: 'students', icon: Users, label: 'Students' },
          { id: 'schedule', icon: Calendar, label: 'Schedule' },
          { id: 'payments', icon: DollarSign, label: 'Payments' },
          { id: 'profile', icon: Star, label: 'Profile' }
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
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: '12px',
                backgroundColor: isActive ? '#E8F5F1' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <Icon
                size={20}
                color={isActive ? '#74A4BC' : '#6E7480'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span style={{
                fontSize: '10px',
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

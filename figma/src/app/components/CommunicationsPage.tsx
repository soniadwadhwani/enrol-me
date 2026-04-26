import { ChevronRight, ArrowLeft, Send, Paperclip, Waves, Music, Code, Trophy, Bot, Palette, Users as DancerIcon, Heart, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import PageHeader from './PageHeader';

interface CommunicationsPageProps {
  initialChatId?: number | null;
}

export default function CommunicationsPage({ initialChatId }: CommunicationsPageProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(initialChatId || null);

  useEffect(() => {
    if (initialChatId) {
      setSelectedChat(initialChatId);
    }
  }, [initialChatId]);

  const conversations = [
    {
      id: 1,
      name: 'Zen Wellness Lavale',
      lastMessage: 'Today Yoga Kids class has been cancelled',
      time: '15 min ago',
      unread: true,
      urgent: true,
      icon: Heart,
      iconColor: '#B6D6CC',
      messages: [
        { sender: 'instructor', text: 'Hi Parent, due to instructor unavailability, today Yoga Kids session has been cancelled. Makeup session details will be shared soon.', time: '15 min ago' }
      ]
    },
    {
      id: 2,
      name: 'Elite Swim Academy',
      lastMessage: 'Class starts at 5 PM tomorrow',
      time: '2h ago',
      unread: true,
      urgent: false,
      icon: Waves,
      iconColor: '#74A4BC',
      messages: [
        { sender: 'coach', text: 'Please bring goggles tomorrow.', time: '2h ago' },
        { sender: 'parent', text: 'Sure, thank you!', time: '1h ago' }
      ]
    },
    {
      id: 3,
      name: 'Accounts Team',
      lastMessage: 'Swimming Academy fee due on 28 Apr',
      time: '3h ago',
      unread: true,
      urgent: false,
      icon: DollarSign,
      iconColor: '#F11859',
      messages: [
        { sender: 'admin', text: 'Hi, this is a reminder that your payment for Swimming Academy (₹2,500) is due on 28 Apr.', time: '3h ago' },
        { sender: 'admin', text: 'Piano Studio fee of ₹3,000 is also due on 30 Apr.', time: '3h ago' }
      ]
    },
    {
      id: 4,
      name: 'Piano Studio',
      lastMessage: 'May schedule has been shared',
      time: '5h ago',
      unread: false,
      urgent: false,
      icon: Music,
      iconColor: '#B6D6CC',
      messages: [
        { sender: 'instructor', text: 'May schedule has been shared via email. Please check.', time: '5h ago' },
        { sender: 'parent', text: 'Got it, thanks!', time: '4h ago' }
      ]
    },
    {
      id: 5,
      name: 'Coding Lab Hinjewadi',
      lastMessage: 'Homework uploaded for Shaurya',
      time: '1d ago',
      unread: true,
      urgent: false,
      icon: Code,
      iconColor: '#74A4BC',
      messages: [
        { sender: 'teacher', text: 'Homework for this week has been uploaded to the portal. Shaurya should complete Module 3.', time: '1d ago' }
      ]
    },
    {
      id: 6,
      name: 'Dance Studio',
      lastMessage: 'Sunday batch shifted to next week',
      time: '1d ago',
      unread: false,
      urgent: true,
      icon: DancerIcon,
      iconColor: '#B6D6CC',
      messages: [
        { sender: 'instructor', text: 'Hi Parent, we need to reschedule this Sunday batch to next week due to a venue booking conflict. Sorry for the inconvenience.', time: '1d ago' },
        { sender: 'parent', text: 'No problem, thanks for letting us know!', time: '1d ago' }
      ]
    },
    {
      id: 7,
      name: 'Art Class Wakad',
      lastMessage: 'New materials list shared',
      time: '2d ago',
      unread: false,
      urgent: false,
      icon: Palette,
      iconColor: '#B6D6CC',
      messages: [
        { sender: 'teacher', text: 'Updated materials list for next month attached. Please bring watercolor set.', time: '2d ago' },
        { sender: 'parent', text: 'Thank you, I will get them.', time: '2d ago' }
      ]
    },
    {
      id: 8,
      name: 'Football Coaching',
      lastMessage: 'Rain cancellation for practice',
      time: '2d ago',
      unread: false,
      urgent: true,
      icon: Trophy,
      iconColor: '#74A4BC',
      messages: [
        { sender: 'coach', text: 'Due to heavy rain, today practice has been cancelled. We will resume next session.', time: '2d ago' },
        { sender: 'parent', text: 'Understood, thank you!', time: '2d ago' }
      ]
    },
    {
      id: 9,
      name: 'Robotics Camp',
      lastMessage: 'Registration confirmed',
      time: '3d ago',
      unread: false,
      urgent: false,
      icon: Bot,
      iconColor: '#74A4BC',
      messages: [
        { sender: 'admin', text: 'Registration for Robotics Camp confirmed! First class is on Thursday at 4 PM.', time: '3d ago' },
        { sender: 'parent', text: 'Great, looking forward to it!', time: '3d ago' }
      ]
    },
    {
      id: 10,
      name: 'Tennis Academy Lavale',
      lastMessage: 'Court booking confirmed for Wed',
      time: '4d ago',
      unread: false,
      urgent: false,
      icon: Trophy,
      iconColor: '#74A4BC',
      messages: [
        { sender: 'admin', text: 'Your court booking for Wednesday 6 PM has been confirmed.', time: '4d ago' },
        { sender: 'parent', text: 'Perfect, thank you!', time: '4d ago' }
      ]
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  if (selectedChat && selectedConversation) {
    // Chat Detail View
    return (
      <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
        {/* Chat Header */}
        <div style={{ paddingTop: '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '12px' }}>
          <div className="flex items-center" style={{ gap: '12px' }}>
            <button
              onClick={() => setSelectedChat(null)}
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

            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <selectedConversation.icon size={24} style={{ color: selectedConversation.iconColor }} />
            </div>

            <div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#111318'
              }}>
                {selectedConversation.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '20px', paddingBottom: '100px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {selectedConversation.messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'parent' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '75%',
                  backgroundColor: message.sender === 'parent' ? '#B6D6CC' : '#FFFFFF',
                  borderRadius: '20px',
                  padding: '14px 16px',
                  boxShadow: '0 4px 16px rgba(17,19,24,0.06)'
                }}>
                  <p style={{
                    fontSize: '15px',
                    color: '#111318',
                    lineHeight: '1.5',
                    marginBottom: '6px'
                  }}>
                    {message.text}
                  </p>
                  <span style={{
                    fontSize: '12px',
                    color: '#6E7480'
                  }}>
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '393px',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingBottom: '16px',
          backgroundColor: '#F4FAF8',
          paddingTop: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '12px 16px',
            boxShadow: '0 8px 24px rgba(17,19,24,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <button style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Paperclip size={20} style={{ color: '#6E7480' }} />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#111318',
                backgroundColor: 'transparent',
                fontFamily: 'Raleway, sans-serif'
              }}
            />

            <button style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#B6D6CC',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Send size={18} style={{ color: '#111318' }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chat List View
  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <PageHeader title="Chat" />

      {/* Content Spacing */}
      <div style={{ paddingTop: '12px', paddingBottom: '24px' }}></div>

      {/* Conversation List */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {conversations.map((chat) => {
            const IconComponent = chat.icon;

            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '18px',
                  minHeight: '92px',
                  boxShadow: '0 12px 30px rgba(17,19,24,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                {/* Icon Avatar */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: `2px solid ${chat.iconColor}20`,
                  flexShrink: 0,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={28} style={{ color: chat.iconColor }} />
                  {chat.unread && (
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#F11859',
                      border: '2px solid #FFFFFF'
                    }}></div>
                  )}
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '4px'
                }}>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#111318',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {chat.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: chat.urgent ? '#DC2626' : '#6E7480',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Time & Arrow */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: '6px',
                  flexShrink: 0
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#9CA3B0',
                    whiteSpace: 'nowrap'
                  }}>
                    {chat.time}
                  </span>
                  <ChevronRight size={18} style={{ color: '#9CA3B0' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

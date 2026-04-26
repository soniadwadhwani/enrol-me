import { Calendar } from 'lucide-react';
import { useState } from 'react';
import PageHeader from './PageHeader';

export default function FeesPage() {
  const [historyFilter, setHistoryFilter] = useState<'all' | 'paid' | 'pending'>('all');

  const duePayments = [
    {
      id: 1,
      className: 'Swimming Academy',
      child: 'Shaurya',
      amount: '₹2,500',
      dueDate: '28 Apr',
      childColor: '#74A4BC'
    },
    {
      id: 2,
      className: 'Piano Studio',
      child: 'Asmi',
      amount: '₹3,000',
      dueDate: '30 Apr',
      childColor: '#B6D6CC'
    }
  ];

  const overduePayments = [
    {
      id: 1,
      className: 'Art Class',
      child: 'Asmi',
      amount: '₹700',
      daysLate: 5,
      childColor: '#B6D6CC'
    },
    {
      id: 2,
      className: 'Football Coaching',
      child: 'Shaurya',
      amount: '₹500',
      daysLate: 2,
      childColor: '#74A4BC'
    }
  ];

  const allHistory = [
    {
      id: 1,
      className: 'Football Academy',
      child: 'Shaurya',
      amount: '₹1,800',
      date: '05 Apr',
      status: 'paid',
      childColor: '#74A4BC'
    },
    {
      id: 2,
      className: 'Art Class',
      child: 'Asmi',
      amount: '₹2,200',
      date: '01 Apr',
      status: 'paid',
      childColor: '#B6D6CC'
    },
    {
      id: 3,
      className: 'Coding Class',
      child: 'Shaurya',
      amount: '₹2,000',
      date: 'Pending',
      status: 'pending',
      childColor: '#74A4BC'
    }
  ];

  const paymentHistory = historyFilter === 'all'
    ? allHistory
    : allHistory.filter(p => p.status === historyFilter);

  const totalDue = duePayments.reduce((sum, payment) => {
    const amount = parseInt(payment.amount.replace('₹', '').replace(',', ''));
    return sum + amount;
  }, 0);

  const monthPaid = allHistory
    .filter(p => p.status === 'paid')
    .reduce((sum, payment) => {
      const amount = parseInt(payment.amount.replace('₹', '').replace(',', ''));
      return sum + amount;
    }, 0);

  const monthPending = totalDue;

  const totalOverdue = overduePayments.reduce((sum, payment) => {
    const amount = parseInt(payment.amount.replace('₹', '').replace(',', ''));
    return sum + amount;
  }, 0);

  return (
    <div className="flex-1 overflow-auto pb-28" style={{ backgroundColor: '#F4FAF8' }}>
      <PageHeader title="Fees" />

      {/* Content Spacing */}
      <div style={{ paddingTop: '12px', paddingBottom: '20px' }}></div>

      {/* MODULE 1: What is Due */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '32px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          padding: '24px',
          boxShadow: '0 12px 30px rgba(17,19,24,0.08)'
        }}>
          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#6E7480',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Due Now
            </span>
            <span style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#F11859'
            }}>
              ₹{totalDue.toLocaleString()}
            </span>
          </div>

          {/* Due Payment Items */}
          <div style={{ marginBottom: '20px' }}>
            {duePayments.map((payment) => (
              <div
                key={payment.id}
                style={{
                  backgroundColor: '#F4FAF8',
                  borderRadius: '20px',
                  padding: '16px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div className="flex items-center" style={{ gap: '8px', marginBottom: '6px' }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: payment.childColor
                    }} />
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#111318'
                    }}>
                      {payment.className}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#6E7480',
                    marginBottom: '4px'
                  }}>
                    {payment.child}
                  </div>
                  <div className="flex items-center" style={{ gap: '6px' }}>
                    <Calendar size={12} style={{ color: '#6E7480' }} />
                    <span style={{
                      fontSize: '12px',
                      color: '#6E7480'
                    }}>
                      Due: {payment.dueDate}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#111318',
                    marginBottom: '8px'
                  }}>
                    {payment.amount}
                  </div>
                  <button style={{
                    padding: '6px 16px',
                    borderRadius: '14px',
                    backgroundColor: '#F11859',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif'
                  }}>
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Manage Payments Section */}
          <div style={{ marginTop: '16px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#6E7480',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Manage Payments
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: '#F4FAF8',
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                color: '#111318',
                cursor: 'pointer',
                fontFamily: 'Raleway, sans-serif'
              }}>
                View all dues
              </button>
              <button style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: '#F4FAF8',
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                color: '#111318',
                cursor: 'pointer',
                fontFamily: 'Raleway, sans-serif'
              }}>
                Invoices
              </button>
              <button style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: '#F4FAF8',
                border: 'none',
                fontSize: '13px',
                fontWeight: 500,
                color: '#111318',
                cursor: 'pointer',
                fontFamily: 'Raleway, sans-serif'
              }}>
                History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 2: Track Your Payments */}
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111318',
          marginBottom: '16px'
        }}>
          Track Your Payments
        </h2>

        {/* Summary Row */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '16px',
          marginBottom: '16px',
          boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '13px',
              color: '#6E7480',
              marginBottom: '4px'
            }}>
              This Month Paid
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#B6D6CC'
            }}>
              ₹{monthPaid.toLocaleString()}
            </div>
          </div>
          <div style={{
            width: '1px',
            backgroundColor: '#E5E8ED'
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '13px',
              color: '#6E7480',
              marginBottom: '4px'
            }}>
              Pending
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#F11859'
            }}>
              ₹{monthPending.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Overdue Payments Module */}
        {overduePayments.length > 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
            border: '1px solid #FFE5E5'
          }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#E57373',
                  marginBottom: '4px'
                }}>
                  Overdue Payments
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9CA3B0'
                }}>
                  Payments needing immediate attention
                </div>
              </div>
              <div style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#E57373'
              }}>
                ₹{totalOverdue.toLocaleString()}
              </div>
            </div>

            {/* Overdue Items */}
            <div style={{ marginTop: '16px' }}>
              {overduePayments.map((payment) => (
                <div
                  key={payment.id}
                  style={{
                    backgroundColor: '#FFF8F8',
                    borderRadius: '16px',
                    padding: '14px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center" style={{ gap: '8px', marginBottom: '4px' }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: payment.childColor
                      }} />
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#111318'
                      }}>
                        {payment.className}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#6E7480',
                      marginBottom: '4px'
                    }}>
                      {payment.child}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#E57373'
                    }}>
                      {payment.amount} overdue • {payment.daysLate} days late
                    </div>
                  </div>
                  <button style={{
                    padding: '6px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#E57373',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif',
                    whiteSpace: 'nowrap'
                  }}>
                    Pay Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#6E7480'
            }}>
              No overdue payments 🎉
            </div>
          </div>
        )}

        {/* Toggle Filter */}
        <div style={{
          display: 'inline-flex',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '4px',
          marginBottom: '16px',
          boxShadow: '0 4px 16px rgba(17,19,24,0.06)'
        }}>
          <button
            onClick={() => setHistoryFilter('all')}
            style={{
              padding: '8px 20px',
              borderRadius: '16px',
              backgroundColor: historyFilter === 'all' ? '#B6D6CC' : 'transparent',
              border: 'none',
              fontSize: '14px',
              fontWeight: historyFilter === 'all' ? 600 : 500,
              color: historyFilter === 'all' ? '#111318' : '#6E7480',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            All
          </button>
          <button
            onClick={() => setHistoryFilter('paid')}
            style={{
              padding: '8px 20px',
              borderRadius: '16px',
              backgroundColor: historyFilter === 'paid' ? '#B6D6CC' : 'transparent',
              border: 'none',
              fontSize: '14px',
              fontWeight: historyFilter === 'paid' ? 600 : 500,
              color: historyFilter === 'paid' ? '#111318' : '#6E7480',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Paid
          </button>
          <button
            onClick={() => setHistoryFilter('pending')}
            style={{
              padding: '8px 20px',
              borderRadius: '16px',
              backgroundColor: historyFilter === 'pending' ? '#B6D6CC' : 'transparent',
              border: 'none',
              fontSize: '14px',
              fontWeight: historyFilter === 'pending' ? 600 : 500,
              color: historyFilter === 'pending' ? '#111318' : '#6E7480',
              cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Pending
          </button>
        </div>

        {/* Payment History */}
        <div>
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '16px',
                marginBottom: '12px',
                boxShadow: '0 4px 16px rgba(17,19,24,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ flex: 1 }}>
                <div className="flex items-center" style={{ gap: '8px', marginBottom: '6px' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: payment.childColor
                  }} />
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#111318'
                  }}>
                    {payment.className}
                  </span>
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#6E7480',
                  marginBottom: '4px'
                }}>
                  {payment.child}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6E7480'
                }}>
                  {payment.status === 'paid' ? `Paid on ${payment.date}` : payment.date}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#111318',
                  marginBottom: '8px'
                }}>
                  {payment.amount}
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  backgroundColor: payment.status === 'paid' ? '#B6D6CC' : '#F9C74F',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: payment.status === 'paid' ? '#FFFFFF' : '#111318'
                }}>
                  {payment.status === 'paid' ? 'Paid' : 'Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

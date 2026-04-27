import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, Calendar, CheckCircle2, Clock3, Download, XCircle } from 'lucide-react';
import PageHeader from './PageHeader';

type FeesPanel = 'overview' | 'dues' | 'invoices' | 'history';
type FeeStatus = 'pending' | 'paid' | 'overdue';
type PaymentFlowStage = 'processing' | 'success' | 'failed';

interface FeeItem {
  id: number;
  className: string;
  child: string;
  amount: number;
  dueDate: string;
  status: FeeStatus;
  daysLate?: number;
  paidOn?: string;
}

interface InvoiceItem {
  id: number;
  title: string;
  amount: number;
  status: 'paid' | 'pending';
}

const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

const getTodayLabel = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
};

export default function FeesPage() {
  const [fees, setFees] = useState<FeeItem[]>([
    { id: 1, className: 'Swimming Academy', child: 'Shaurya', amount: 2500, dueDate: '28 Apr', status: 'pending' },
    { id: 2, className: 'Piano Studio', child: 'Asmi', amount: 3000, dueDate: '30 Apr', status: 'pending' },
    { id: 3, className: 'Art Class', child: 'Asmi', amount: 700, dueDate: '22 Apr', status: 'overdue', daysLate: 5 },
    { id: 4, className: 'Football Coaching', child: 'Shaurya', amount: 500, dueDate: '25 Apr', status: 'overdue', daysLate: 2 },
    { id: 5, className: 'Football Academy', child: 'Shaurya', amount: 1800, dueDate: '05 Apr', status: 'paid', paidOn: '03 Apr' },
    { id: 6, className: 'Coding Class', child: 'Shaurya', amount: 2000, dueDate: '01 Apr', status: 'paid', paidOn: '01 Apr' },
  ]);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    { id: 1, title: 'April Swimming Fee', amount: 2500, status: 'pending' },
    { id: 2, title: 'April Piano Fee', amount: 3000, status: 'pending' },
    { id: 3, title: 'March Football Fee', amount: 1800, status: 'paid' },
  ]);

  const [historyFilter, setHistoryFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [panel, setPanel] = useState<FeesPanel>('overview');
  const [downloadMessage, setDownloadMessage] = useState('');

  const [activePaymentItemId, setActivePaymentItemId] = useState<number | null>(null);
  const [paymentFlowOpen, setPaymentFlowOpen] = useState(false);
  const [paymentFlowStage, setPaymentFlowStage] = useState<PaymentFlowStage>('processing');

  const activePaymentItem = fees.find((item) => item.id === activePaymentItemId) ?? null;

  const duePayments = fees.filter((item) => item.status === 'pending');
  const overduePayments = fees.filter((item) => item.status === 'overdue');

  const paymentHistory = useMemo(() => {
    if (historyFilter === 'all') return fees;
    return fees.filter((item) => item.status === historyFilter);
  }, [fees, historyFilter]);

  const monthPending = fees
    .filter((item) => item.status === 'pending' || item.status === 'overdue')
    .reduce((sum, item) => sum + item.amount, 0);

  const monthPaid = fees
    .filter((item) => item.status === 'paid')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalDueNow = duePayments.reduce((sum, item) => sum + item.amount, 0);
  const totalOverdue = overduePayments.reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    if (!paymentFlowOpen || paymentFlowStage !== 'processing') return;

    const timer = window.setTimeout(() => {
      setPaymentFlowStage('success');
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [paymentFlowOpen, paymentFlowStage]);

  const openPaymentFlow = (itemId: number) => {
    setActivePaymentItemId(itemId);
    setPaymentFlowOpen(true);
    setPaymentFlowStage('processing');
  };

  const triggerManualFailure = () => {
    if (paymentFlowStage !== 'processing') return;
    setPaymentFlowStage('failed');
  };

  const closePaymentFlow = () => {
    setPaymentFlowOpen(false);
    setPaymentFlowStage('processing');
  };

  const retryPayment = () => {
    setPaymentFlowStage('processing');
  };

  const confirmSuccessfulPayment = () => {
    if (!activePaymentItem) return;

    setFees((prev) => prev.map((item) => (
      item.id === activePaymentItem.id
        ? {
            ...item,
            status: 'paid',
            paidOn: getTodayLabel(),
            daysLate: undefined,
          }
        : item
    )));

    setInvoices((prev) => prev.map((invoice) => {
      const matchesSwimming = activePaymentItem.className.includes('Swimming') && invoice.title.includes('Swimming');
      const matchesPiano = activePaymentItem.className.includes('Piano') && invoice.title.includes('Piano');
      if (matchesSwimming || matchesPiano) {
        return { ...invoice, status: 'paid' };
      }
      return invoice;
    }));

    closePaymentFlow();
  };

  const renderPanelHeader = (title: string, subtitle: string) => (
    <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        <button
          onClick={() => setPanel('overview')}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(17,19,24,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} color="#111318" />
        </button>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#111318' }}>{title}</div>
      </div>
      <div style={{ fontSize: '13px', color: '#6E7480' }}>{subtitle}</div>
    </div>
  );

  if (paymentFlowOpen && activePaymentItem) {
    return (
      <div style={{ flex: 1, background: 'linear-gradient(160deg, #edf8f4 0%, #f4faf8 55%, #eaf4f1 100%)', padding: '24px', overflow: 'auto' }}>
        <AnimatePresence mode="wait">
          {paymentFlowStage === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={triggerManualFailure}
              style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  triggerManualFailure();
                }}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: '#FFFFFF', boxShadow: '0 4px 12px rgba(17,19,24,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <ArrowLeft size={18} color="#111318" />
              </button>

              <div style={{ marginTop: '78px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '70px', height: '70px', borderRadius: '50%', border: '4px solid #D7ECE5', borderTopColor: '#74A4BC', marginBottom: '18px' }}
                />
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Processing Payment...</div>
                <div style={{ fontSize: '14px', color: '#6E7480', maxWidth: '260px', lineHeight: 1.4, marginBottom: '26px' }}>
                  Please wait while we confirm your payment.
                </div>

                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '16px', width: '100%', maxWidth: '320px', boxShadow: '0 8px 24px rgba(17,19,24,0.08)' }}>
                  <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>{activePaymentItem.className}</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#111318', marginBottom: '6px' }}>{formatCurrency(activePaymentItem.amount)}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6E7480' }}>
                    <Clock3 size={12} />
                    Auto-confirming in 5 seconds
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {paymentFlowStage === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '88px' }}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, type: 'spring' }}
                style={{ width: '86px', height: '86px', borderRadius: '50%', backgroundColor: '#EAF7F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}
              >
                <CheckCircle2 size={46} color="#2F8D61" />
              </motion.div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Payment Successful</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '20px' }}>Your fee has been paid successfully.</div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '16px', width: '100%', maxWidth: '320px', marginBottom: '14px', boxShadow: '0 8px 24px rgba(17,19,24,0.08)' }}>
                <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '4px' }}>{activePaymentItem.className}</div>
                <div style={{ fontSize: '30px', fontWeight: 700, color: '#111318' }}>{formatCurrency(activePaymentItem.amount)}</div>
              </div>

              <div style={{ width: '100%', maxWidth: '320px' }}>
                <button onClick={confirmSuccessfulPayment} style={{ width: '100%', height: '44px', borderRadius: '12px', border: 'none', backgroundColor: '#B6D6CC', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Done</button>
              </div>
            </motion.div>
          )}

          {paymentFlowStage === 'failed' && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '96px' }}
            >
              <div style={{ width: '84px', height: '84px', borderRadius: '50%', backgroundColor: '#FDECEF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <XCircle size={44} color="#E85D75" />
              </div>
              <div style={{ fontSize: '27px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>Payment Failed</div>
              <div style={{ fontSize: '14px', color: '#6E7480', marginBottom: '24px', maxWidth: '260px' }}>Something went wrong. Please try again.</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', maxWidth: '320px' }}>
                <button onClick={retryPayment} style={{ height: '44px', borderRadius: '12px', border: 'none', backgroundColor: '#F11859', color: '#FFFFFF', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Retry Payment</button>
                <button onClick={closePaymentFlow} style={{ height: '44px', borderRadius: '12px', border: 'none', backgroundColor: '#E8F5F1', color: '#111318', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Back to Fees</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#F4FAF8', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div className="flex-1 overflow-auto pb-28">
        <PageHeader title="Fees" />
        <div style={{ paddingTop: '12px', paddingBottom: '16px' }} />

      {panel === 'overview' && (
        <>
          <div style={{ paddingLeft: '24px', paddingRight: '24px', marginBottom: '26px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '28px', padding: '24px', boxShadow: '0 12px 30px rgba(17,19,24,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#6E7480', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due Now</span>
                <span style={{ fontSize: '28px', fontWeight: 700, color: '#F11859' }}>{formatCurrency(totalDueNow)}</span>
              </div>

              <div style={{ marginBottom: '14px' }}>
                {duePayments.map((payment) => (
                  <div key={payment.id} style={{ backgroundColor: '#F4FAF8', borderRadius: '20px', padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{payment.className}</div>
                      <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '4px' }}>{payment.child}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={12} color="#6E7480" />
                        <span style={{ fontSize: '12px', color: '#6E7480' }}>Due: {payment.dueDate}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '19px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>{formatCurrency(payment.amount)}</div>
                      <button onClick={() => openPaymentFlow(payment.id)} style={{ padding: '6px 16px', borderRadius: '14px', backgroundColor: '#F11859', color: '#FFFFFF', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Pay Now</button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111318', marginBottom: '14px' }}>Track Your Payments</h2>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '16px', marginBottom: '14px', boxShadow: '0 4px 16px rgba(17,19,24,0.06)', display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '4px' }}>This Month Paid</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#2F8D61' }}>{formatCurrency(monthPaid)}</div>
              </div>
              <div style={{ width: '1px', backgroundColor: '#E5E8ED' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '4px' }}>Pending</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#F11859' }}>{formatCurrency(monthPending)}</div>
              </div>
            </div>

            {overduePayments.length > 0 && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '18px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(17,19,24,0.06)', border: '1px solid #FFE5E5' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#E57373', marginBottom: '2px' }}>Overdue Payments</div>
                    <div style={{ fontSize: '12px', color: '#9CA3B0' }}>Payments needing immediate attention</div>
                  </div>
                  <div style={{ fontSize: '21px', fontWeight: 700, color: '#E57373' }}>{formatCurrency(totalOverdue)}</div>
                </div>

                {overduePayments.map((payment) => (
                  <div key={payment.id} style={{ backgroundColor: '#FFF8F8', borderRadius: '16px', padding: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{payment.className}</div>
                      <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '4px' }}>{payment.child}</div>
                      <div style={{ fontSize: '12px', color: '#E57373' }}>{formatCurrency(payment.amount)} overdue • {payment.daysLate} days late</div>
                    </div>
                    <button onClick={() => openPaymentFlow(payment.id)} style={{ padding: '6px 14px', borderRadius: '12px', backgroundColor: '#E57373', color: '#FFFFFF', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif', whiteSpace: 'nowrap' }}>Pay Now</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {panel === 'dues' && (
        <>
          {renderPanelHeader('All Dues', 'All unpaid and overdue fee items')}
          <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            {[...duePayments, ...overduePayments].map((payment) => (
              <div key={`dues-${payment.id}`} style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', marginBottom: '10px', boxShadow: '0 4px 16px rgba(17,19,24,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{payment.className}</div>
                  <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '3px' }}>{payment.child}</div>
                  <div style={{ fontSize: '12px', color: payment.status === 'overdue' ? '#E57373' : '#6E7480' }}>{payment.status === 'overdue' ? `Overdue • ${payment.daysLate} days` : `Due: ${payment.dueDate}`}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '8px' }}>{formatCurrency(payment.amount)}</div>
                  <button onClick={() => openPaymentFlow(payment.id)} style={{ padding: '6px 14px', borderRadius: '12px', backgroundColor: '#F11859', color: '#FFFFFF', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif' }}>Pay Now</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {panel === 'invoices' && (
        <>
          {renderPanelHeader('Invoices', 'Monthly invoices and receipts')}
          <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            {invoices.map((invoice) => (
              <div key={invoice.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', marginBottom: '10px', boxShadow: '0 4px 16px rgba(17,19,24,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#111318' }}>{invoice.title}</div>
                  <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: invoice.status === 'paid' ? '#1F8A5B' : '#BE7A00', backgroundColor: invoice.status === 'paid' ? '#EAF7F0' : '#FFF4E8' }}>{invoice.status === 'paid' ? 'Paid' : 'Pending'}</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '10px' }}>{formatCurrency(invoice.amount)}</div>
                <button
                  onClick={() => setDownloadMessage(`Receipt downloaded for ${invoice.title}`)}
                  style={{ border: 'none', borderRadius: '10px', padding: '8px 10px', backgroundColor: '#E8F5F1', color: '#111318', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Raleway, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={14} />
                  Download receipt
                </button>
              </div>
            ))}
            {downloadMessage && <div style={{ fontSize: '13px', color: '#2F8D61', fontWeight: 600, marginTop: '6px' }}>{downloadMessage}</div>}
          </div>
        </>
      )}

      {panel === 'history' && (
        <>
          {renderPanelHeader('Payment History', 'Recent paid and pending fee records')}
          <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
            <div style={{ display: 'inline-flex', backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '4px', marginBottom: '12px', boxShadow: '0 4px 16px rgba(17,19,24,0.06)' }}>
              {(['all', 'paid', 'pending'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setHistoryFilter(filter)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '16px',
                    backgroundColor: historyFilter === filter ? '#B6D6CC' : 'transparent',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: historyFilter === filter ? 700 : 500,
                    color: historyFilter === filter ? '#111318' : '#6E7480',
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif',
                    textTransform: 'capitalize',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>

            {paymentHistory.map((payment) => (
              <div key={`history-${payment.id}`} style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '14px', marginBottom: '10px', boxShadow: '0 4px 16px rgba(17,19,24,0.06)' }}>
                <div style={{ fontSize: '13px', color: '#6E7480', marginBottom: '4px' }}>
                  {payment.status === 'paid' ? `Paid on ${payment.paidOn ?? payment.dueDate}` : `Due ${payment.dueDate}`}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#111318', marginBottom: '3px' }}>{payment.className}</div>
                    <div style={{ fontSize: '13px', color: '#6E7480' }}>{payment.child}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#111318', marginBottom: '4px' }}>{formatCurrency(payment.amount)}</div>
                    <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: payment.status === 'paid' ? '#1F8A5B' : '#BE7A00', backgroundColor: payment.status === 'paid' ? '#EAF7F0' : '#FFF4E8' }}>{payment.status === 'paid' ? 'Paid' : 'Pending'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      </div>

    </div>
  );
}

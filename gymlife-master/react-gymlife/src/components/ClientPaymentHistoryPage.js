import React from 'react';
import { CreditCard, TrendingUp, Calendar, CheckCircle, Clock, AlertCircle, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';

const ClientPaymentHistoryPage = () => {
  const { user } = useAuth();
  const { getMember } = useGymData();
  const member = getMember(user?.id);

  // Build payment records from member's payment data in context
  const memberPayments = member?.payments || [];
  const payments = memberPayments.map((p, index) => ({
    id: `PAY-${String(index + 1).padStart(3, '0')}`,
    date: p.date,
    amount: p.amount,
    status: p.status,
    method: 'Credit Card',
    description: p.month ? `Monthly Membership - ${p.month.split(' ')[0]}` : 'Membership Payment',
    cardLast4: '4242',
  }));

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const overdueAmount = payments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'paid': return { background: '#252525', color: '#f36100', border: '1px solid #464646' };
      case 'pending': return { background: '#252525', color: '#F7931E', border: '1px solid #464646' };
      case 'overdue': return { background: '#252525', color: '#a9a9a9', border: '1px solid #464646' };
      default: return {};
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'overdue': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .summary-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .summary-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
        }

        .payment-row {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .payment-row:hover {
          background: #252525 !important;
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>PAYMENT HISTORY</h1>
          <p style={styles.subtitle}>Track your membership payments and transactions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div className="summary-card" style={{ ...styles.summaryCard, animationDelay: '0s' }}>
          <div style={styles.summaryIcon}>
            <TrendingUp size={24} color="#f36100" />
          </div>
          <div style={styles.summaryLabel}>Total Paid</div>
          <div style={{ ...styles.summaryValue, color: '#f36100' }}>
            ${totalPaid.toFixed(2)}
          </div>
        </div>
        <div className="summary-card" style={{ ...styles.summaryCard, animationDelay: '0.1s' }}>
          <div style={styles.summaryIcon}>
            <Clock size={24} color="#F7931E" />
          </div>
          <div style={styles.summaryLabel}>Pending</div>
          <div style={{ ...styles.summaryValue, color: '#F7931E' }}>
            ${pendingAmount.toFixed(2)}
          </div>
        </div>
        <div className="summary-card" style={{ ...styles.summaryCard, animationDelay: '0.2s' }}>
          <div style={styles.summaryIcon}>
            <AlertCircle size={24} color="#a9a9a9" />
          </div>
          <div style={styles.summaryLabel}>Overdue</div>
          <div style={{ ...styles.summaryValue, color: '#a9a9a9' }}>
            ${overdueAmount.toFixed(2)}
          </div>
        </div>
        <div className="summary-card" style={{ ...styles.summaryCard, animationDelay: '0.3s' }}>
          <div style={styles.summaryIcon}>
            <CreditCard size={24} color="#f36100" />
          </div>
          <div style={styles.summaryLabel}>Current Plan</div>
          <div style={{ ...styles.summaryValue, color: '#f36100', fontSize: '24px' }}>
            Monthly
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div style={styles.tableTitle}>TRANSACTIONS</div>
        </div>

        <div style={styles.tableHeaderRow}>
          <div style={{ ...styles.headerCell, flex: 1 }}>Date</div>
          <div style={{ ...styles.headerCell, flex: 2 }}>Description</div>
          <div style={{ ...styles.headerCell, flex: 1 }}>Method</div>
          <div style={{ ...styles.headerCell, flex: 1 }}>Amount</div>
          <div style={{ ...styles.headerCell, flex: 1 }}>Status</div>
          <div style={{ ...styles.headerCell, flex: 0.5 }}></div>
        </div>

        {payments.map((payment, index) => (
          <div
            key={payment.id}
            className="payment-row"
            style={{
              ...styles.paymentRow,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <div style={{ ...styles.cell, flex: 1 }}>
              <Calendar size={14} style={{ marginRight: '8px', opacity: 0.5 }} />
              {new Date(payment.date).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              })}
            </div>
            <div style={{ ...styles.cell, flex: 2 }}>
              <div style={styles.descriptionText}>{payment.description}</div>
              <div style={styles.paymentId}>{payment.id}</div>
            </div>
            <div style={{ ...styles.cell, flex: 1 }}>
              <CreditCard size={14} style={{ marginRight: '8px', opacity: 0.5 }} />
              {payment.method}
              {payment.cardLast4 && (
                <span style={styles.cardLast4}> •••• {payment.cardLast4}</span>
              )}
            </div>
            <div style={{ ...styles.cell, flex: 1, fontWeight: '700', color: '#fff' }}>
              ${payment.amount.toFixed(2)}
            </div>
            <div style={{ ...styles.cell, flex: 1 }}>
              <span style={{ ...styles.statusBadge, ...getStatusStyle(payment.status) }}>
                {getStatusIcon(payment.status)}
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
            <div style={{ ...styles.cell, flex: 0.5, justifyContent: 'center' }}>
              {payment.status === 'paid' && (
                <button style={styles.downloadBtn} title="Download Receipt">
                  <Download size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Info */}
      <div style={styles.infoCard}>
        <div style={styles.infoTitle}>PAYMENT INFORMATION</div>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Payment Method</div>
            <div style={styles.infoValue}>Visa ending in 4242</div>
          </div>
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Billing Cycle</div>
            <div style={styles.infoValue}>Monthly (15th of each month)</div>
          </div>
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Next Payment</div>
            <div style={styles.infoValue}>February 15, 2025</div>
          </div>
          <div style={styles.infoItem}>
            <div style={styles.infoLabel}>Member Since</div>
            <div style={styles.infoValue}>August 15, 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Muli', sans-serif",
  },
  header: { marginBottom: '48px' },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0',
    letterSpacing: '4px',
    textTransform: 'uppercase',
  },
  subtitle: { color: '#a9a9a9', fontSize: '18px', marginTop: '8px' },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  summaryCard: {
    padding: '28px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    textAlign: 'center',
  },
  summaryIcon: { marginBottom: '12px' },
  summaryLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    color: '#a9a9a9',
    letterSpacing: '2px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  summaryValue: { fontSize: '32px', fontWeight: '700' },
  tableCard: {
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    overflow: 'hidden',
    marginBottom: '40px',
  },
  tableHeader: {
    padding: '24px 28px',
    borderBottom: '1px solid #464646',
  },
  tableTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  tableHeaderRow: {
    display: 'flex',
    padding: '16px 28px',
    borderBottom: '1px solid #363636',
    background: '#151515',
  },
  headerCell: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    color: '#a9a9a9',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  paymentRow: {
    display: 'flex',
    padding: '20px 28px',
    borderBottom: '1px solid #252525',
    alignItems: 'center',
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    color: '#c4c4c4',
    fontSize: '14px',
  },
  descriptionText: { fontWeight: '500' },
  paymentId: { color: '#a9a9a9', fontSize: '12px', marginTop: '4px' },
  cardLast4: { color: '#a9a9a9', fontSize: '12px' },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '0',
    fontSize: '13px',
    fontWeight: '600',
  },
  downloadBtn: {
    background: 'none',
    border: '1px solid #464646',
    color: '#a9a9a9',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    padding: '32px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  infoTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '3px',
    marginBottom: '24px',
    textTransform: 'uppercase',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
  },
  infoItem: {},
  infoLabel: {
    color: '#a9a9a9',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  infoValue: { color: '#c4c4c4', fontSize: '16px', fontWeight: '500' },
};

export default ClientPaymentHistoryPage;

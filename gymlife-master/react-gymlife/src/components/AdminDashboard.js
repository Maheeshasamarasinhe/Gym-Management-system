import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Apple, Dumbbell, Users, Edit, Save, X } from 'lucide-react';

const AdminMemberPage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  // Sample data
  const memberData = {
    id: 'M001',
    name: 'John Mitchell',
    email: 'john.mitchell@email.com',
    phone: '+1 234 567 8900',
    registeredDate: '2024-01-15',
    plan: 'Premium',
    status: 'active'
  };

  const weightData = [
    { month: 'Jan', weight: 85 },
    { month: 'Feb', weight: 83 },
    { month: 'Mar', weight: 81 },
    { month: 'Apr', weight: 80 },
    { month: 'May', weight: 78 },
    { month: 'Jun', weight: 77 },
  ];

  const chestData = [
    { month: 'Jan', chest: 96 },
    { month: 'Feb', chest: 97 },
    { month: 'Mar', chest: 98 },
    { month: 'Apr', chest: 99 },
    { month: 'May', chest: 101 },
    { month: 'Jun', chest: 102 },
  ];

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, date: '2024-06-01', month: 'June 2024', amount: 99, status: 'paid' },
    { id: 2, date: '2024-05-01', month: 'May 2024', amount: 99, status: 'paid' },
    { id: 3, date: '2024-04-01', month: 'April 2024', amount: 99, status: 'paid' },
    { id: 4, date: '2024-03-01', month: 'March 2024', amount: 99, status: 'pending' },
  ]);

  const [schedule, setSchedule] = useState([
    {
      id: 1,
      name: 'Bench Press',
      steps: 4,
      rounds: 3,
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400',
      video: 'https://youtube.com/watch?v=bench-press'
    },
    {
      id: 2,
      name: 'Squats',
      steps: 5,
      rounds: 4,
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
      video: 'https://youtube.com/watch?v=squats'
    },
  ]);

  const [nutrition, setNutrition] = useState({
    protein: 150,
    carbs: 200,
    water: 3.5,
    fiber: 30
  });

  const [attendance, setAttendance] = useState([
    { month: 'June', days: 24, total: 30 },
    { month: 'May', days: 28, total: 31 },
    { month: 'April', days: 25, total: 30 },
  ]);

  const renderAboutSection = () => (
    <div style={styles.sectionContent}>
      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <div style={styles.infoLabel}>Full Name</div>
          <div style={styles.infoValue}>{memberData.name}</div>
        </div>
        <div style={styles.infoCard}>
          <div style={styles.infoLabel}>Member ID</div>
          <div style={styles.infoValue}>{memberData.id}</div>
        </div>
        <div style={styles.infoCard}>
          <div style={styles.infoLabel}>Registration Date</div>
          <div style={styles.infoValue}>{memberData.registeredDate}</div>
        </div>
        <div style={styles.infoCard}>
          <div style={styles.infoLabel}>Membership Plan</div>
          <div style={styles.infoValue}>{memberData.plan}</div>
        </div>
      </div>

      <div style={styles.chartsContainer}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>WEIGHT PROGRESS (KG)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#8892b0" />
              <YAxis stroke="#8892b0" />
              <Tooltip 
                contentStyle={{ background: '#1a1f3a', border: '1px solid rgba(255,255,255,0.1)' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#FF6B35" strokeWidth={3} dot={{ fill: '#FF6B35', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>CHEST SIZE (CM)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chestData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#8892b0" />
              <YAxis stroke="#8892b0" />
              <Tooltip 
                contentStyle={{ background: '#1a1f3a', border: '1px solid rgba(255,255,255,0.1)' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="chest" stroke="#4ECDC4" strokeWidth={3} dot={{ fill: '#4ECDC4', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderPaymentSection = () => (
    <div style={styles.sectionContent}>
      <h3 style={styles.sectionTitle}>Payment History</h3>
      <div style={styles.paymentList}>
        {paymentHistory.map(payment => (
          <div key={payment.id} style={styles.paymentCard}>
            <div>
              <div style={styles.paymentMonth}>{payment.month}</div>
              <div style={styles.paymentDate}>Paid on: {payment.date}</div>
            </div>
            <div style={styles.paymentRight}>
              <div style={styles.paymentAmount}>${payment.amount}</div>
              <span style={{
                ...styles.paymentStatus,
                ...(payment.status === 'paid' ? styles.paidStatus : styles.pendingStatus)
              }}>
                {payment.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduleSection = () => (
    <div style={styles.sectionContent}>
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Exercise Schedule</h3>
        <button style={styles.addButton}>+ Add Exercise</button>
      </div>
      
      <div style={styles.exerciseGrid}>
        {schedule.map(exercise => (
          <div key={exercise.id} style={styles.exerciseCard}>
            <img src={exercise.image} alt={exercise.name} style={styles.exerciseImage} />
            <div style={styles.exerciseContent}>
              <h4 style={styles.exerciseName}>{exercise.name}</h4>
              <div style={styles.exerciseDetails}>
                <span style={styles.exerciseDetail}>{exercise.steps} Steps</span>
                <span style={styles.exerciseDetail}>{exercise.rounds} Rounds</span>
              </div>
              <a href={exercise.video} style={styles.videoLink} target="_blank" rel="noopener noreferrer">
                Watch Video →
              </a>
              <div style={styles.exerciseActions}>
                <button style={styles.iconButton}><Edit size={16} /></button>
                <button style={{ ...styles.iconButton, ...styles.deleteIconButton }}><X size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNutritionSection = () => (
    <div style={styles.sectionContent}>
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Nutrition Plan</h3>
        <button style={styles.addButton} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save Changes' : 'Edit Plan'}
        </button>
      </div>

      <div style={styles.nutritionGrid}>
        <div style={styles.nutritionCard}>
          <div style={styles.nutritionIcon}>🥩</div>
          <div style={styles.nutritionLabel}>Protein</div>
          <div style={styles.nutritionValue}>{nutrition.protein}g</div>
          <div style={styles.nutritionSubtext}>per day</div>
        </div>
        <div style={styles.nutritionCard}>
          <div style={styles.nutritionIcon}>🍞</div>
          <div style={styles.nutritionLabel}>Carbs</div>
          <div style={styles.nutritionValue}>{nutrition.carbs}g</div>
          <div style={styles.nutritionSubtext}>per day</div>
        </div>
        <div style={styles.nutritionCard}>
          <div style={styles.nutritionIcon}>💧</div>
          <div style={styles.nutritionLabel}>Water</div>
          <div style={styles.nutritionValue}>{nutrition.water}L</div>
          <div style={styles.nutritionSubtext}>per day</div>
        </div>
        <div style={styles.nutritionCard}>
          <div style={styles.nutritionIcon}>🌾</div>
          <div style={styles.nutritionLabel}>Fiber</div>
          <div style={styles.nutritionValue}>{nutrition.fiber}g</div>
          <div style={styles.nutritionSubtext}>per day</div>
        </div>
      </div>
    </div>
  );

  const renderAttendanceSection = () => (
    <div style={styles.sectionContent}>
      <h3 style={styles.sectionTitle}>Attendance Record</h3>
      <div style={styles.attendanceList}>
        {attendance.map((record, index) => (
          <div key={index} style={styles.attendanceCard}>
            <div style={styles.attendanceMonth}>{record.month}</div>
            <div style={styles.attendanceBar}>
              <div style={{
                ...styles.attendanceProgress,
                width: `${(record.days / record.total) * 100}%`
              }} />
            </div>
            <div style={styles.attendanceDays}>{record.days} / {record.total} days</div>
          </div>
        ))}
      </div>
    </div>
  );

  const sections = [
    { id: 'about', label: 'About', icon: Users },
    { id: 'payment', label: 'Payment History', icon: DollarSign },
    { id: 'schedule', label: 'Schedule', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition Plan', icon: Apple },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
  ];

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        .sidebar-item {
          transition: all 0.3s ease;
        }
        
        .sidebar-item:hover {
          transform: translateX(8px);
          background: rgba(255, 107, 53, 0.1);
        }
        
        .sidebar-item.active {
          background: rgba(255, 107, 53, 0.2);
          border-left: 4px solid #FF6B35;
        }
      `}</style>

      <div style={styles.sidebar}>
        <div style={styles.memberHeader}>
          <div style={styles.memberAvatar}>JM</div>
          <div>
            <div style={styles.memberHeaderName}>{memberData.name}</div>
            <div style={styles.memberHeaderId}>{memberData.id}</div>
          </div>
        </div>

        <div style={styles.sidebarMenu}>
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                style={styles.sidebarItem}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={20} />
                <span>{section.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.mainContent}>
        {activeSection === 'about' && renderAboutSection()}
        {activeSection === 'payment' && renderPaymentSection()}
        {activeSection === 'schedule' && renderScheduleSection()}
        {activeSection === 'nutrition' && renderNutritionSection()}
        {activeSection === 'attendance' && renderAttendanceSection()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    fontFamily: "'Work Sans', sans-serif",
  },
  sidebar: {
    width: '320px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '40px 0',
  },
  memberHeader: {
    display: 'flex',
    gap: '16px',
    padding: '0 32px 32px 32px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '32px',
  },
  memberAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
  },
  memberHeaderName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '4px',
  },
  memberHeaderId: {
    fontSize: '14px',
    color: '#8892b0',
  },
  sidebarMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 32px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
    overflowY: 'auto',
  },
  sectionContent: {
    animation: 'fadeIn 0.4s ease-out',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '36px',
    color: '#fff',
    letterSpacing: '2px',
    margin: '0 0 32px 0',
  },
  addButton: {
    background: 'rgba(78, 205, 196, 0.2)',
    border: '1px solid #4ECDC4',
    color: '#4ECDC4',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '48px',
  },
  infoCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  infoValue: {
    fontSize: '20px',
    color: '#fff',
    fontWeight: '600',
  },
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px',
  },
  chartCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '32px',
  },
  chartTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '20px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '24px',
  },
  paymentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  paymentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
  },
  paymentMonth: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '4px',
  },
  paymentDate: {
    fontSize: '14px',
    color: '#8892b0',
  },
  paymentRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  paymentAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#4ECDC4',
  },
  paymentStatus: {
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  paidStatus: {
    background: 'rgba(78, 205, 196, 0.2)',
    color: '#4ECDC4',
  },
  pendingStatus: {
    background: 'rgba(255, 193, 7, 0.2)',
    color: '#FFC107',
  },
  exerciseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  exerciseCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  exerciseImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  exerciseContent: {
    padding: '20px',
  },
  exerciseName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '12px',
  },
  exerciseDetails: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  exerciseDetail: {
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#8892b0',
  },
  videoLink: {
    color: '#FF6B35',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '16px',
  },
  exerciseActions: {
    display: 'flex',
    gap: '8px',
  },
  iconButton: {
    background: 'rgba(78, 205, 196, 0.1)',
    border: '1px solid rgba(78, 205, 196, 0.3)',
    color: '#4ECDC4',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  deleteIconButton: {
    background: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    color: '#FF6B6B',
  },
  nutritionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  nutritionCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
  },
  nutritionIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  nutritionLabel: {
    fontSize: '14px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  nutritionValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '4px',
  },
  nutritionSubtext: {
    fontSize: '12px',
    color: '#8892b0',
  },
  attendanceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  attendanceCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
  },
  attendanceMonth: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '12px',
  },
  attendanceBar: {
    width: '100%',
    height: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  attendanceProgress: {
    height: '100%',
    background: 'linear-gradient(90deg, #FF6B35, #4ECDC4)',
    transition: 'width 0.3s ease',
  },
  attendanceDays: {
    fontSize: '14px',
    color: '#8892b0',
  },
};

export default AdminMemberPage;
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Award, Activity, Edit2, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';

const ClientHomePage = () => {
  const { user } = useAuth();
  const { getMember, updateMemberMeasurements } = useGymData();
  const [isEditing, setIsEditing] = useState(false);

  // Get member data from context using the logged-in user's ID
  const member = getMember(user?.id);

  // Fallback if member not found
  const userData = member ? {
    name: member.name,
    id: member.id,
    registeredDate: member.registeredDate,
    plan: member.plan + ' Membership',
    currentWeight: member.currentWeight,
    currentHeight: member.currentHeight,
    currentChest: member.currentChest,
  } : {
    name: user?.email || 'User',
    id: user?.id || 'N/A',
    registeredDate: 'N/A',
    plan: 'N/A',
    currentWeight: 0,
    currentHeight: 0,
    currentChest: 0,
  };

  const [measurements, setMeasurements] = useState({
    weight: userData.currentWeight,
    height: userData.currentHeight,
    chest: userData.currentChest,
  });

  const weightData = member?.weightHistory || [];
  const chestData = member?.chestHistory || [];

  // Compute stat changes from history
  const weightChange = weightData.length >= 2
    ? userData.currentWeight - weightData[0].weight
    : 0;
  const chestChange = chestData.length >= 2
    ? userData.currentChest - chestData[0].chest
    : 0;

  const handleSaveMeasurements = () => {
    if (member) {
      updateMemberMeasurements(member.id, {
        currentWeight: Number(measurements.weight),
        currentHeight: Number(measurements.height),
        currentChest: Number(measurements.chest),
      });
    }
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-card {
          animation: fadeIn 0.5s ease-out backwards;
        }

        .chart-card {
          animation: fadeIn 0.6s ease-out backwards;
        }

        .edit-button:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.welcomeText}>Welcome back,</div>
          <h1 style={styles.userName}>{userData.name}</h1>
          <div style={styles.userMeta}>
            <span style={styles.userId}>ID: {userData.id}</span>
            <span style={styles.divider}>•</span>
            <span style={styles.planBadge}>{userData.plan}</span>
          </div>
        </div>

        <div style={styles.heroStats}>
          <div style={styles.heroStatItem}>
            <Calendar size={24} color="#4ECDC4" />
            <div>
              <div style={styles.heroStatLabel}>Member Since</div>
              <div style={styles.heroStatValue}>{userData.registeredDate}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.1s' }}>
          <div style={styles.statIcon}>
            <Activity size={32} color="#FF6B35" />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>Current Weight</div>
            <div style={styles.statValue}>{userData.currentWeight} kg</div>
            <div style={styles.statChange}>{weightChange <= 0 ? weightChange : '+' + weightChange} kg from start</div>
          </div>
        </div>

        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.2s' }}>
          <div style={styles.statIcon}>
            <TrendingUp size={32} color="#4ECDC4" />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>Height</div>
            <div style={styles.statValue}>{userData.currentHeight} cm</div>
            <div style={styles.statChange}>Unchanged</div>
          </div>
        </div>

        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.3s' }}>
          <div style={styles.statIcon}>
            <Award size={32} color="#F7931E" />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>Chest Size</div>
            <div style={styles.statValue}>{userData.currentChest} cm</div>
            <div style={styles.statChange}>{chestChange >= 0 ? '+' + chestChange : chestChange} cm from start</div>
          </div>
        </div>
      </div>

      <div style={styles.updateSection}>
        <div style={styles.updateHeader}>
          <h2 style={styles.sectionTitle}>Update Measurements</h2>
          {!isEditing ? (
            <button
              className="edit-button"
              style={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={18} />
              Edit
            </button>
          ) : (
            <button
              className="edit-button"
              style={styles.saveButton}
              onClick={handleSaveMeasurements}
            >
              <Save size={18} />
              Save
            </button>
          )}
        </div>

        <div style={styles.measurementGrid}>
          <div style={styles.measurementCard}>
            <label style={styles.measurementLabel}>Weight (kg)</label>
            <input
              type="number"
              value={measurements.weight}
              onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
              disabled={!isEditing}
              style={{
                ...styles.measurementInput,
                ...(isEditing ? styles.measurementInputActive : {})
              }}
            />
          </div>

          <div style={styles.measurementCard}>
            <label style={styles.measurementLabel}>Height (cm)</label>
            <input
              type="number"
              value={measurements.height}
              onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
              disabled={!isEditing}
              style={{
                ...styles.measurementInput,
                ...(isEditing ? styles.measurementInputActive : {})
              }}
            />
          </div>

          <div style={styles.measurementCard}>
            <label style={styles.measurementLabel}>Chest (cm)</label>
            <input
              type="number"
              value={measurements.chest}
              onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
              disabled={!isEditing}
              style={{
                ...styles.measurementInput,
                ...(isEditing ? styles.measurementInputActive : {})
              }}
            />
          </div>
        </div>
      </div>

      <div style={styles.chartsSection}>
        <div className="chart-card" style={{ ...styles.chartCard, animationDelay: '0.4s' }}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>WEIGHT PROGRESS</h3>
            <div style={styles.chartSubtitle}>Last 6 months</div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={weightData}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#8892b0" />
              <YAxis stroke="#8892b0" />
              <Tooltip
                contentStyle={{
                  background: '#1a1f3a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#FF6B35"
                strokeWidth={3}
                dot={{ fill: '#FF6B35', r: 6 }}
                fill="url(#weightGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" style={{ ...styles.chartCard, animationDelay: '0.5s' }}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>CHEST GROWTH</h3>
            <div style={styles.chartSubtitle}>Last 6 months</div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chestData}>
              <defs>
                <linearGradient id="chestGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#8892b0" />
              <YAxis stroke="#8892b0" />
              <Tooltip
                contentStyle={{
                  background: '#1a1f3a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="chest"
                stroke="#4ECDC4"
                strokeWidth={3}
                dot={{ fill: '#4ECDC4', r: 6 }}
                fill="url(#chestGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Work Sans', sans-serif",
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    animation: 'fadeIn 0.6s ease-out',
  },
  heroContent: { flex: 1 },
  welcomeText: { fontSize: '18px', color: '#8892b0', marginBottom: '8px' },
  userName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0 0 16px 0',
    letterSpacing: '4px',
    textShadow: '2px 2px 20px rgba(255, 107, 53, 0.3)',
  },
  userMeta: { display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px' },
  userId: { color: '#FF6B35', fontWeight: '600' },
  divider: { color: '#8892b0' },
  planBadge: {
    padding: '6px 16px',
    background: 'rgba(78, 205, 196, 0.2)',
    color: '#4ECDC4',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
  },
  heroStats: { display: 'flex', gap: '24px' },
  heroStatItem: {
    display: 'flex',
    gap: '16px',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  heroStatLabel: {
    fontSize: '12px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  heroStatValue: { fontSize: '18px', color: '#fff', fontWeight: '600' },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: '48px',
  },
  statCard: {
    display: 'flex',
    gap: '20px',
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  statIcon: {
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    flexShrink: 0,
  },
  statContent: { flex: 1 },
  statLabel: {
    fontSize: '14px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  statValue: { fontSize: '36px', fontWeight: '700', color: '#fff', marginBottom: '4px' },
  statChange: { fontSize: '13px', color: '#4ECDC4', fontWeight: '600' },
  updateSection: {
    marginBottom: '48px',
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  updateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '32px',
    color: '#fff',
    margin: 0,
    letterSpacing: '2px',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(78, 205, 196, 0.1)',
    border: '1px solid rgba(78, 205, 196, 0.3)',
    color: '#4ECDC4',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
    border: 'none',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  measurementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  measurementCard: { display: 'flex', flexDirection: 'column' },
  measurementLabel: {
    fontSize: '12px',
    color: '#8892b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  measurementInput: {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '24px',
    fontWeight: '700',
    outline: 'none',
  },
  measurementInputActive: {
    background: 'rgba(255, 107, 53, 0.1)',
    border: '1px solid rgba(255, 107, 53, 0.3)',
  },
  chartsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px',
  },
  chartCard: {
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  chartHeader: { marginBottom: '24px' },
  chartTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  chartSubtitle: { fontSize: '14px', color: '#8892b0' },
};

export default ClientHomePage;

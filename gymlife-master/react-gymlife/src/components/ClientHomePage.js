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
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');
        
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
            <Calendar size={24} color="#f36100" />
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
            <Activity size={32} color="#f36100" />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>Current Weight</div>
            <div style={styles.statValue}>{userData.currentWeight} kg</div>
            <div style={styles.statChange}>{weightChange <= 0 ? weightChange : '+' + weightChange} kg from start</div>
          </div>
        </div>

        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.2s' }}>
          <div style={styles.statIcon}>
            <TrendingUp size={32} color="#f36100" />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statLabel}>Height</div>
            <div style={styles.statValue}>{userData.currentHeight} cm</div>
            <div style={styles.statChange}>Unchanged</div>
          </div>
        </div>

        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.3s' }}>
          <div style={styles.statIcon}>
            <Award size={32} color="#f36100" />
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
                  <stop offset="5%" stopColor="#f36100" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f36100" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#a9a9a9" />
              <YAxis stroke="#a9a9a9" />
              <Tooltip
                contentStyle={{
                  background: '#0a0a0a',
                  border: '1px solid #363636',
                  borderRadius: '0'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#f36100"
                strokeWidth={3}
                dot={{ fill: '#f36100', r: 6 }}
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
                  <stop offset="5%" stopColor="#f36100" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f36100" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#a9a9a9" />
              <YAxis stroke="#a9a9a9" />
              <Tooltip
                contentStyle={{
                  background: '#0a0a0a',
                  border: '1px solid #363636',
                  borderRadius: '0'
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="chest"
                stroke="#f36100"
                strokeWidth={3}
                dot={{ fill: '#f36100', r: 6 }}
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
    fontFamily: "'Muli', sans-serif",
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    padding: '40px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    animation: 'fadeIn 0.6s ease-out',
  },
  heroContent: { flex: 1 },
  welcomeText: { fontSize: '18px', color: '#a9a9a9', marginBottom: '8px' },
  userName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0 0 16px 0',
    letterSpacing: '4px',
    textTransform: 'uppercase',
  },
  userMeta: { display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px' },
  userId: { color: '#f36100', fontWeight: '600' },
  divider: { color: '#a9a9a9' },
  planBadge: {
    padding: '6px 16px',
    background: '#252525',
    color: '#f36100',
    borderRadius: '0',
    fontSize: '14px',
    fontWeight: '600',
    border: '1px solid #464646',
  },
  heroStats: { display: 'flex', gap: '24px' },
  heroStatItem: {
    display: 'flex',
    gap: '16px',
    padding: '24px',
    background: '#252525',
    borderRadius: '0',
    border: '1px solid #464646',
    alignItems: 'center',
  },
  heroStatLabel: {
    fontSize: '12px',
    color: '#a9a9a9',
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
    background: '#252525',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  statIcon: {
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    borderRadius: '0',
    flexShrink: 0,
  },
  statContent: { flex: 1 },
  statLabel: {
    fontSize: '14px',
    color: '#a9a9a9',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  statValue: { fontSize: '36px', fontWeight: '700', color: '#fff', marginBottom: '4px' },
  statChange: { fontSize: '13px', color: '#f36100', fontWeight: '600' },
  updateSection: {
    marginBottom: '48px',
    padding: '32px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  updateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    color: '#fff',
    margin: 0,
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid #f36100',
    color: '#f36100',
    padding: '12px 24px',
    borderRadius: '0',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f36100',
    border: 'none',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '0',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
  },
  measurementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  measurementCard: { display: 'flex', flexDirection: 'column' },
  measurementLabel: {
    fontSize: '12px',
    color: '#a9a9a9',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  measurementInput: {
    padding: '16px',
    background: '#252525',
    border: '1px solid #464646',
    borderRadius: '0',
    color: '#fff',
    fontSize: '24px',
    fontWeight: '700',
    outline: 'none',
  },
  measurementInputActive: {
    background: 'transparent',
    border: '1px solid #f36100',
  },
  chartsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px',
  },
  chartCard: {
    padding: '32px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  chartHeader: { marginBottom: '24px' },
  chartTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  chartSubtitle: { fontSize: '14px', color: '#a9a9a9' },
};

export default ClientHomePage;

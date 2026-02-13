import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';

const ClientAttendancePage = () => {
  const { user } = useAuth();
  const { getMember } = useGymData();
  const member = getMember(user?.id);

  // Build attendance data from member's attendance records in context
  const memberAttendance = member?.attendance || [];

  const attendanceData = useMemo(() => {
    const totalDays = memberAttendance.reduce((sum, r) => sum + r.total, 0);
    const presentDays = memberAttendance.reduce((sum, r) => sum + r.days, 0);

    // Generate monthly data with day grids
    const monthly = memberAttendance.map((record, i) => {
      // Determine year/month from the record's month name
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthIndex = monthNames.findIndex(m => m.startsWith(record.month));
      const year = 2024;
      return {
        month: `${record.month} ${year}`,
        present: record.days,
        total: record.total,
        days: generateDays(year, monthIndex >= 0 ? monthIndex : i, record.days, record.total),
      };
    });

    return {
      totalDays,
      presentDays,
      streak: Math.min(presentDays, 12),
      bestStreak: Math.min(presentDays, 24),
      monthly,
    };
  }, [memberAttendance]);

  const overallPercentage = Math.round((attendanceData.presentDays / attendanceData.totalDays) * 100);

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .month-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .month-card:hover {
          transform: translateX(8px);
        }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>ATTENDANCE</h1>
        <p style={styles.subtitle}>Your gym attendance records and statistics</p>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0s' }}>
          <Calendar size={28} color="#FF6B35" />
          <div style={styles.statLabel}>Total Days</div>
          <div style={{ ...styles.statValue, color: '#FF6B35' }}>{attendanceData.totalDays}</div>
        </div>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.1s' }}>
          <CheckCircle size={28} color="#4ECDC4" />
          <div style={styles.statLabel}>Days Present</div>
          <div style={{ ...styles.statValue, color: '#4ECDC4' }}>{attendanceData.presentDays}</div>
        </div>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.2s' }}>
          <TrendingUp size={28} color="#F7931E" />
          <div style={styles.statLabel}>Overall Rate</div>
          <div style={{ ...styles.statValue, color: '#F7931E' }}>{overallPercentage}%</div>
        </div>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.3s' }}>
          <span style={{ fontSize: '28px' }}>🔥</span>
          <div style={styles.statLabel}>Current Streak</div>
          <div style={{ ...styles.statValue, color: '#FF6B6B' }}>{attendanceData.streak} days</div>
        </div>
      </div>

      {/* Overall Progress */}
      <div style={styles.overallCard}>
        <div style={styles.overallHeader}>
          <div style={styles.overallTitle}>OVERALL ATTENDANCE</div>
          <div style={styles.overallPercent}>{overallPercentage}%</div>
        </div>
        <div style={styles.overallBar}>
          <div style={{ ...styles.overallFill, width: `${overallPercentage}%` }} />
        </div>
        <div style={styles.overallFooter}>
          <span>Best streak: <strong style={{ color: '#FF6B35' }}>{attendanceData.bestStreak} days</strong></span>
          <span>{attendanceData.presentDays} / {attendanceData.totalDays} days</span>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div style={styles.sectionTitle}>MONTHLY BREAKDOWN</div>
      <div style={styles.monthlyList}>
        {attendanceData.monthly.map((month, index) => {
          const percent = Math.round((month.present / month.total) * 100);
          return (
            <div
              key={month.month}
              className="month-card"
              style={{ ...styles.monthCard, animationDelay: `${index * 0.1}s` }}
            >
              <div style={styles.monthHeader}>
                <div>
                  <div style={styles.monthName}>{month.month}</div>
                  <div style={styles.monthSub}>
                    {month.present} / {month.total} days
                  </div>
                </div>
                <div style={styles.monthPercent}>{percent}%</div>
              </div>

              <div style={styles.monthBar}>
                <div
                  style={{
                    ...styles.monthFill,
                    width: `${percent}%`,
                    background: percent >= 90
                      ? '#4ECDC4'
                      : percent >= 75
                        ? '#F7931E'
                        : '#FF6B6B',
                  }}
                />
              </div>

              {/* Day Grid */}
              <div style={styles.dayGrid}>
                {month.days.map((day, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.dayCell,
                      background: day.present
                        ? 'rgba(78, 205, 196, 0.3)'
                        : day.scheduled
                          ? 'rgba(255, 107, 107, 0.2)'
                          : 'rgba(255, 255, 255, 0.03)',
                      border: day.present
                        ? '1px solid rgba(78, 205, 196, 0.5)'
                        : day.scheduled
                          ? '1px solid rgba(255, 107, 107, 0.3)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    title={`Day ${day.day}: ${day.present ? 'Present' : day.scheduled ? 'Absent' : 'No Session'}`}
                  >
                    <span style={styles.dayNumber}>{day.day}</span>
                    {day.present && <CheckCircle size={10} color="#4ECDC4" />}
                    {!day.present && day.scheduled && <XCircle size={10} color="#FF6B6B" />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: '#4ECDC4' }} />
          <span>Present</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: '#FF6B6B' }} />
          <span>Absent</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: 'rgba(255, 255, 255, 0.1)' }} />
          <span>No Session</span>
        </div>
      </div>
    </div>
  );
};

function generateDays(year, month, presentCount, totalScheduled) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  const scheduledDays = new Set();

  // Generate scheduled days (skip some weekends)
  let scheduled = 0;
  for (let d = 1; d <= daysInMonth && scheduled < totalScheduled; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay();
    if (dow !== 0) { // skip Sundays
      scheduledDays.add(d);
      scheduled++;
    }
  }

  // Pick present days from scheduled
  const scheduledArr = Array.from(scheduledDays);
  const presentDays = new Set();
  const shuffled = [...scheduledArr].sort(() => 0.5 - Math.random());
  for (let i = 0; i < presentCount && i < shuffled.length; i++) {
    presentDays.add(shuffled[i]);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      day: d,
      scheduled: scheduledDays.has(d),
      present: presentDays.has(d),
    });
  }

  return days;
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Work Sans', sans-serif",
  },
  header: { marginBottom: '48px' },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0',
    letterSpacing: '4px',
    textShadow: '2px 2px 20px rgba(255, 107, 53, 0.3)',
  },
  subtitle: { color: '#8892b0', fontSize: '18px', marginTop: '8px' },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  statCard: {
    padding: '28px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  statLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '16px',
    color: '#8892b0',
    letterSpacing: '2px',
  },
  statValue: { fontSize: '36px', fontWeight: '700' },
  overallCard: {
    padding: '32px',
    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.08), rgba(78, 205, 196, 0.08))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    marginBottom: '48px',
  },
  overallHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  overallTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '3px',
  },
  overallPercent: { fontSize: '42px', fontWeight: '700', color: '#4ECDC4' },
  overallBar: {
    width: '100%',
    height: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  overallFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #FF6B35, #4ECDC4)',
    borderRadius: '8px',
    transition: 'width 0.5s ease',
  },
  overallFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#8892b0',
    fontSize: '14px',
  },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '32px',
    color: '#fff',
    letterSpacing: '3px',
    marginBottom: '24px',
  },
  monthlyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '40px',
  },
  monthCard: {
    padding: '28px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  monthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  monthName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
  },
  monthSub: { color: '#8892b0', fontSize: '14px', marginTop: '4px' },
  monthPercent: { fontSize: '32px', fontWeight: '700', color: '#4ECDC4' },
  monthBar: {
    width: '100%',
    height: '10px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  monthFill: {
    height: '100%',
    borderRadius: '5px',
    transition: 'width 0.5s ease',
  },
  dayGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
    gap: '6px',
  },
  dayCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 4px',
    borderRadius: '6px',
    gap: '2px',
  },
  dayNumber: { fontSize: '11px', color: '#8892b0' },
  legend: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    padding: '24px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#8892b0',
    fontSize: '14px',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '3px',
  },
};

export default ClientAttendancePage;

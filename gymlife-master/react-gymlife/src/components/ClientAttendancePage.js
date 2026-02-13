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
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
        }

        .month-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .month-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
        }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>ATTENDANCE</h1>
        <p style={styles.subtitle}>Your gym attendance records and statistics</p>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0s' }}>
          <Calendar size={28} color="#f36100" />
          <div style={styles.statLabel}>Total Days</div>
          <div style={{ ...styles.statValue, color: '#f36100' }}>{attendanceData.totalDays}</div>
        </div>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.1s' }}>
          <CheckCircle size={28} color="#f36100" />
          <div style={styles.statLabel}>Days Present</div>
          <div style={{ ...styles.statValue, color: '#f36100' }}>{attendanceData.presentDays}</div>
        </div>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.2s' }}>
          <TrendingUp size={28} color="#f36100" />
          <div style={styles.statLabel}>Overall Rate</div>
          <div style={{ ...styles.statValue, color: '#f36100' }}>{overallPercentage}%</div>
        </div>
        <div className="stat-card" style={{ ...styles.statCard, animationDelay: '0.3s' }}>
          <span style={{ fontSize: '28px' }}>🔥</span>
          <div style={styles.statLabel}>Current Streak</div>
          <div style={{ ...styles.statValue, color: '#f36100' }}>{attendanceData.streak} days</div>
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
          <span>Best streak: <strong style={{ color: '#f36100' }}>{attendanceData.bestStreak} days</strong></span>
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
                      ? '#f36100'
                      : percent >= 75
                        ? '#f36100'
                        : '#a9a9a9',
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
                        ? 'rgba(243, 97, 0, 0.3)'
                        : day.scheduled
                          ? 'rgba(169, 169, 169, 0.2)'
                          : '#151515',
                      border: day.present
                        ? '1px solid #f36100'
                        : day.scheduled
                          ? '1px solid #464646'
                          : '1px solid #252525',
                    }}
                    title={`Day ${day.day}: ${day.present ? 'Present' : day.scheduled ? 'Absent' : 'No Session'}`}
                  >
                    <span style={styles.dayNumber}>{day.day}</span>
                    {day.present && <CheckCircle size={10} color="#f36100" />}
                    {!day.present && day.scheduled && <XCircle size={10} color="#a9a9a9" />}
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
          <div style={{ ...styles.legendDot, background: '#f36100' }} />
          <span>Present</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: '#a9a9a9' }} />
          <span>Absent</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: '#252525' }} />
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  statCard: {
    padding: '28px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  statLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    color: '#a9a9a9',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  statValue: { fontSize: '36px', fontWeight: '700' },
  overallCard: {
    padding: '32px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    marginBottom: '48px',
  },
  overallHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  overallTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
  overallPercent: { fontSize: '42px', fontWeight: '700', color: '#f36100' },
  overallBar: {
    width: '100%',
    height: '16px',
    background: '#252525',
    borderRadius: '0',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  overallFill: {
    height: '100%',
    background: '#f36100',
    borderRadius: '0',
    transition: 'width 0.5s ease',
  },
  overallFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#a9a9a9',
    fontSize: '14px',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    color: '#fff',
    letterSpacing: '3px',
    marginBottom: '24px',
    textTransform: 'uppercase',
  },
  monthlyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    marginBottom: '40px',
  },
  monthCard: {
    padding: '28px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  monthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  monthName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  monthSub: { color: '#a9a9a9', fontSize: '14px', marginTop: '4px' },
  monthPercent: { fontSize: '32px', fontWeight: '700', color: '#f36100' },
  monthBar: {
    width: '100%',
    height: '10px',
    background: '#252525',
    borderRadius: '0',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  monthFill: {
    height: '100%',
    borderRadius: '0',
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
    borderRadius: '0',
    gap: '2px',
  },
  dayNumber: { fontSize: '11px', color: '#a9a9a9' },
  legend: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    padding: '24px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#a9a9a9',
    fontSize: '14px',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '0',
  },
};

export default ClientAttendancePage;

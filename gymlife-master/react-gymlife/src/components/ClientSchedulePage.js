import React, { useState } from 'react';
import { Play, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';

const ClientSchedulePage = () => {
  const { user } = useAuth();
  const { getMember } = useGymData();
  const member = getMember(user?.id);

  // Load exercises from member's schedule with local completion tracking
  const memberSchedule = member?.schedule || [];
  const [completedIds, setCompletedIds] = useState([]);

  const exercises = memberSchedule.map(ex => ({
    ...ex,
    completed: completedIds.includes(ex.id),
  }));

  const toggleComplete = (id) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const completedCount = completedIds.length;
  const totalCount = exercises.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .exercise-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .exercise-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
        }

        .check-button {
          transition: all 0.3s ease;
        }

        .check-button:hover {
          background: #f36100 !important;
          color: #fff !important;
          border-color: #f36100 !important;
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>TODAY'S WORKOUT</h1>
          <p style={styles.subtitle}>Your personalized training schedule</p>
        </div>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressHeader}>
          <div>
            <div style={styles.progressTitle}>Today's Progress</div>
            <div style={styles.progressText}>
              {completedCount} of {exercises.length} exercises completed
            </div>
          </div>
          <div style={styles.progressPercentage}>{Math.round(progressPercentage)}%</div>
        </div>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${progressPercentage}%`
            }}
          />
        </div>
      </div>

      <div style={styles.exercisesList}>
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className="exercise-card"
            style={{
              ...styles.exerciseCard,
              ...(exercise.completed ? styles.exerciseCardCompleted : {}),
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div style={styles.exerciseImageContainer}>
              <img
                src={exercise.image}
                alt={exercise.name}
                style={{
                  ...styles.exerciseImage,
                  ...(exercise.completed ? styles.exerciseImageCompleted : {})
                }}
              />
              {exercise.completed && (
                <div style={styles.completedOverlay}>
                  <CheckCircle size={48} color="#f36100" />
                </div>
              )}
              <div style={styles.categoryBadge}>{exercise.category}</div>
            </div>

            <div style={styles.exerciseContent}>
              <div style={styles.exerciseMain}>
                <h3 style={styles.exerciseName}>{exercise.name}</h3>

                <div style={styles.exerciseDetails}>
                  <div style={styles.detailItem}>
                    <Clock size={16} />
                    <span>{exercise.steps} Steps</span>
                  </div>
                  <div style={styles.detailDivider}>•</div>
                  <div style={styles.detailItem}>
                    <span>{exercise.rounds} Rounds</span>
                  </div>
                </div>

                <a
                  href={exercise.video}
                  style={styles.videoButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play size={16} />
                  Watch Tutorial
                </a>
              </div>

              <button
                className="check-button"
                onClick={() => toggleComplete(exercise.id)}
                style={{
                  ...styles.checkButton,
                  ...(exercise.completed ? styles.checkButtonCompleted : {})
                }}
              >
                <CheckCircle size={20} />
                {exercise.completed ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {completedCount === exercises.length && (
        <div style={styles.congratsCard}>
          <div style={styles.congratsIcon}>🎉</div>
          <div style={styles.congratsTitle}>Workout Complete!</div>
          <div style={styles.congratsText}>
            Great job! You've completed all exercises for today.
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Muli', sans-serif",
  },
  header: {
    marginBottom: '48px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0',
    letterSpacing: '4px',
    textTransform: 'uppercase',
  },
  subtitle: { color: '#a9a9a9', fontSize: '18px', marginTop: '8px' },
  progressSection: {
    padding: '32px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    marginBottom: '40px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  progressTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  progressText: { color: '#a9a9a9', fontSize: '16px' },
  progressPercentage: { fontSize: '48px', fontWeight: '700', color: '#f36100' },
  progressBar: {
    width: '100%',
    height: '16px',
    background: '#252525',
    borderRadius: '0',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: '#f36100',
    borderRadius: '0',
    transition: 'width 0.5s ease',
  },
  exercisesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  exerciseCard: {
    display: 'flex',
    gap: '24px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    overflow: 'hidden',
    padding: '24px',
  },
  exerciseCardCompleted: {
    background: '#151515',
    border: '1px solid #f36100',
  },
  exerciseImageContainer: {
    position: 'relative',
    width: '200px',
    height: '200px',
    flexShrink: 0,
    borderRadius: '0',
    overflow: 'hidden',
  },
  exerciseImage: { width: '100%', height: '100%', objectFit: 'cover' },
  exerciseImageCompleted: { opacity: 0.5 },
  completedOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#000',
    padding: '6px 12px',
    borderRadius: '0',
    color: '#f36100',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  exerciseContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  exerciseMain: { flex: 1 },
  exerciseName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    color: '#fff',
    margin: '0 0 16px 0',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  exerciseDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
    color: '#a9a9a9',
    fontSize: '16px',
  },
  detailItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  detailDivider: { color: '#a9a9a9' },
  videoButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'transparent',
    border: '1px solid #f36100',
    borderRadius: '0',
    color: '#f36100',
    fontSize: '14px',
    fontWeight: '700',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  checkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 32px',
    background: 'transparent',
    border: '1px solid #f36100',
    borderRadius: '0',
    color: '#f36100',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop: '12px',
    textTransform: 'uppercase',
  },
  checkButtonCompleted: {
    background: '#f36100',
    border: '1px solid #f36100',
    color: '#fff',
  },
  congratsCard: {
    marginTop: '40px',
    padding: '48px',
    background: '#0a0a0a',
    border: '2px solid #f36100',
    borderRadius: '0',
    textAlign: 'center',
  },
  congratsIcon: { fontSize: '64px', marginBottom: '16px' },
  congratsTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '36px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  congratsText: { fontSize: '18px', color: '#a9a9a9' },
};

export default ClientSchedulePage;

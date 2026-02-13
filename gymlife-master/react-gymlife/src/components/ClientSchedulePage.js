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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .exercise-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .exercise-card:hover {
          transform: translateX(8px);
        }

        .check-button {
          transition: all 0.3s ease;
        }

        .check-button:hover {
          transform: scale(1.05);
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
                  <CheckCircle size={48} color="#4ECDC4" />
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
    fontFamily: "'Work Sans', sans-serif",
  },
  header: {
    marginBottom: '48px',
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '56px',
    color: '#fff',
    margin: '0',
    letterSpacing: '4px',
    textShadow: '2px 2px 20px rgba(255, 107, 53, 0.3)',
  },
  subtitle: { color: '#8892b0', fontSize: '18px', marginTop: '8px' },
  progressSection: {
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    marginBottom: '40px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  progressTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '8px',
  },
  progressText: { color: '#8892b0', fontSize: '16px' },
  progressPercentage: { fontSize: '48px', fontWeight: '700', color: '#4ECDC4' },
  progressBar: {
    width: '100%',
    height: '16px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #FF6B35, #4ECDC4)',
    borderRadius: '8px',
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
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    padding: '24px',
  },
  exerciseCardCompleted: {
    background: 'rgba(78, 205, 196, 0.05)',
    border: '1px solid rgba(78, 205, 196, 0.2)',
  },
  exerciseImageContainer: {
    position: 'relative',
    width: '200px',
    height: '200px',
    flexShrink: 0,
    borderRadius: '12px',
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
    background: 'rgba(0, 0, 0, 0.8)',
    padding: '6px 12px',
    borderRadius: '6px',
    color: '#FF6B35',
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
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '32px',
    color: '#fff',
    margin: '0 0 16px 0',
    letterSpacing: '2px',
  },
  exerciseDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
    color: '#8892b0',
    fontSize: '16px',
  },
  detailItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  detailDivider: { color: '#8892b0' },
  videoButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'rgba(255, 107, 53, 0.1)',
    border: '1px solid rgba(255, 107, 53, 0.3)',
    borderRadius: '8px',
    color: '#FF6B35',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  checkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 32px',
    background: 'rgba(78, 205, 196, 0.1)',
    border: '1px solid rgba(78, 205, 196, 0.3)',
    borderRadius: '8px',
    color: '#4ECDC4',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop: '12px',
  },
  checkButtonCompleted: {
    background: 'rgba(78, 205, 196, 0.2)',
    border: '1px solid #4ECDC4',
  },
  congratsCard: {
    marginTop: '40px',
    padding: '48px',
    background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 107, 53, 0.1))',
    border: '2px solid rgba(78, 205, 196, 0.3)',
    borderRadius: '16px',
    textAlign: 'center',
  },
  congratsIcon: { fontSize: '64px', marginBottom: '16px' },
  congratsTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '36px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '12px',
  },
  congratsText: { fontSize: '18px', color: '#8892b0' },
};

export default ClientSchedulePage;

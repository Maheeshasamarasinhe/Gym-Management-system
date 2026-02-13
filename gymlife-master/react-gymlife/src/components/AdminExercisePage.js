import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { useGymData } from '../context/GymDataContext';

const AdminExercisePage = () => {
  const {
    exercises,
    addExercise,
    editExercise,
    deleteExercise: deleteExerciseFromLibrary,
  } = useGymData();

  const [showModal, setShowModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    steps: '',
    rounds: '',
    image: '',
    video: '',
    category: ''
  });

  const handleAdd = () => {
    setEditingExercise(null);
    setFormData({ name: '', steps: '', rounds: '', image: '', video: '', category: '' });
    setShowModal(true);
  };

  const handleEdit = (exercise) => {
    setEditingExercise(exercise);
    setFormData(exercise);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      deleteExerciseFromLibrary(id);
    }
  };

  const handleSave = () => {
    if (editingExercise) {
      editExercise(editingExercise.id, {
        name: formData.name,
        steps: Number(formData.steps),
        rounds: Number(formData.rounds),
        image: formData.image,
        video: formData.video,
        category: formData.category,
      });
    } else {
      addExercise({
        name: formData.name,
        steps: Number(formData.steps),
        rounds: Number(formData.rounds),
        image: formData.image,
        video: formData.video,
        category: formData.category,
      });
    }
    setShowModal(false);
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .exercise-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .exercise-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
        }

        .modal-content {
          animation: modalIn 0.3s ease-out;
        }

        .action-button {
          transition: all 0.2s ease;
        }

        .action-button:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>EXERCISE LIBRARY</h1>
          <p style={styles.subtitle}>Manage all available exercises</p>
        </div>
        <button style={styles.addButton} onClick={handleAdd}>
          <Plus size={20} />
          Add New Exercise
        </button>
      </div>

      <div style={styles.exerciseGrid}>
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className="exercise-card"
            style={{
              ...styles.exerciseCard,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div style={styles.imageContainer}>
              <img src={exercise.image} alt={exercise.name} style={styles.exerciseImage} />
              <div style={styles.categoryBadge}>{exercise.category}</div>
            </div>

            <div style={styles.exerciseContent}>
              <h3 style={styles.exerciseName}>{exercise.name}</h3>

              <div style={styles.exerciseStats}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{exercise.steps}</div>
                  <div style={styles.statLabel}>Steps</div>
                </div>
                <div style={styles.statDivider} />
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{exercise.rounds}</div>
                  <div style={styles.statLabel}>Rounds</div>
                </div>
              </div>

              <a href={exercise.video} style={styles.videoLink} target="_blank" rel="noopener noreferrer">
                Watch Tutorial →
              </a>

              <div style={styles.actionButtons}>
                <button
                  className="action-button"
                  style={styles.editButton}
                  onClick={() => handleEdit(exercise)}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  className="action-button"
                  style={styles.deleteButton}
                  onClick={() => handleDelete(exercise.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
              </h2>
              <button style={styles.closeButton} onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Exercise Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., Bench Press"
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Steps</label>
                  <input
                    type="number"
                    value={formData.steps}
                    onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                    style={styles.input}
                    placeholder="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rounds</label>
                  <input
                    type="number"
                    value={formData.rounds}
                    onChange={(e) => setFormData({ ...formData, rounds: e.target.value })}
                    style={styles.input}
                    placeholder="0"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={styles.select}
                >
                  <option value="">Select category</option>
                  <option value="Chest">Chest</option>
                  <option value="Back">Back</option>
                  <option value="Legs">Legs</option>
                  <option value="Arms">Arms</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Core">Core</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={styles.input}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Video URL</label>
                <input
                  type="text"
                  value={formData.video}
                  onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                  style={styles.input}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelButtonModal} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button style={styles.saveButton} onClick={handleSave}>
                <Save size={18} />
                Save Exercise
              </button>
            </div>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  subtitle: {
    color: '#a9a9a9',
    fontSize: '18px',
    marginTop: '8px',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#f36100',
    border: 'none',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: '0',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  exerciseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '32px',
  },
  exerciseCard: {
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: '220px',
    overflow: 'hidden',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(0, 0, 0, 0.85)',
    padding: '8px 16px',
    borderRadius: '0',
    color: '#f36100',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  exerciseContent: {
    padding: '24px',
  },
  exerciseName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
    color: '#fff',
    margin: '0 0 20px 0',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  exerciseStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
    padding: '16px',
    background: '#252525',
    borderRadius: '0',
  },
  statItem: {
    flex: 1,
    textAlign: 'center',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#f36100',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#a9a9a9',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: '#464646',
  },
  videoLink: {
    display: 'block',
    color: '#f36100',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    marginBottom: '20px',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
  },
  editButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid #f36100',
    color: '#f36100',
    padding: '12px',
    borderRadius: '0',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  deleteButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid #a9a9a9',
    color: '#a9a9a9',
    padding: '12px',
    borderRadius: '0',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px',
    borderBottom: '1px solid #464646',
  },
  modalTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    color: '#fff',
    margin: 0,
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#a9a9a9',
    cursor: 'pointer',
    padding: '8px',
  },
  modalBody: {
    padding: '32px',
  },
  formGroup: {
    marginBottom: '24px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  label: {
    display: 'block',
    color: '#a9a9a9',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'transparent',
    border: '1px solid #363636',
    borderRadius: '0',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    background: '#151515',
    border: '1px solid #363636',
    borderRadius: '0',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  modalFooter: {
    display: 'flex',
    gap: '16px',
    padding: '32px',
    borderTop: '1px solid #464646',
  },
  cancelButtonModal: {
    flex: 1,
    padding: '14px',
    background: 'transparent',
    border: '1px solid #464646',
    borderRadius: '0',
    color: '#a9a9a9',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  saveButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
    background: '#f36100',
    border: 'none',
    borderRadius: '0',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
};

export default AdminExercisePage;

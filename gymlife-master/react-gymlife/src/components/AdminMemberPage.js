import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Apple, Dumbbell, Users, Edit, Save, X, Trash2, Plus, ArrowLeft, Bell } from 'lucide-react';
import { useGymData } from '../context/GymDataContext';

const AdminMemberPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const {
    getMember,
    addExerciseToMember,
    editMemberExercise,
    deleteMemberExercise,
    updateMemberNutrition,
  } = useGymData();
  const [activeSection, setActiveSection] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  // Schedule CRUD - hooks must be before any conditional return
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [exerciseForm, setExerciseForm] = useState({ name: '', steps: '', rounds: '', image: '', video: '' });

  // Nutrition CRUD
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [nutritionForm, setNutritionForm] = useState({ protein: 0, carbs: 0, water: 0, fiber: 0 });

  // Get member data from shared context
  const member = getMember(memberId);

  // If member not found, show error
  if (!member) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#8892b0', fontFamily: "'Work Sans', sans-serif" }}>
        <h2 style={{ color: '#fff', marginBottom: '16px' }}>Member Not Found</h2>
        <p>No member with ID "{memberId}" exists in the system.</p>
        <button onClick={() => navigate('/admin/members')} style={{ marginTop: '24px', padding: '12px 24px', background: 'linear-gradient(135deg, #FF6B35, #F7931E)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '15px', cursor: 'pointer' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Back to Members
        </button>
      </div>
    );
  }

  // Read data from context member object
  const memberData = {
    id: member.id,
    name: member.name,
    email: member.email,
    phone: member.phone,
    registeredDate: member.registeredDate,
    plan: member.plan,
    status: member.membership,
  };

  const weightData = member.weightHistory;
  const chestData = member.chestHistory;
  const paymentHistory = member.payments;
  const schedule = member.schedule;
  const nutrition = member.nutrition;
  const attendance = member.attendance;

  const handleAddExercise = () => {
    setEditingExercise(null);
    setExerciseForm({ name: '', steps: '', rounds: '', image: '', video: '' });
    setShowExerciseModal(true);
  };

  const handleEditExercise = (exercise) => {
    setEditingExercise(exercise);
    setExerciseForm(exercise);
    setShowExerciseModal(true);
  };

  const handleDeleteExercise = (id) => {
    if (window.confirm('Delete this exercise from schedule?')) {
      deleteMemberExercise(memberId, id);
    }
  };

  const handleSaveExercise = () => {
    if (editingExercise) {
      editMemberExercise(memberId, editingExercise.id, {
        name: exerciseForm.name,
        steps: Number(exerciseForm.steps),
        rounds: Number(exerciseForm.rounds),
        image: exerciseForm.image,
        video: exerciseForm.video,
      });
    } else {
      addExerciseToMember(memberId, {
        name: exerciseForm.name,
        steps: Number(exerciseForm.steps),
        rounds: Number(exerciseForm.rounds),
        image: exerciseForm.image,
        video: exerciseForm.video,
      });
    }
    setShowExerciseModal(false);
  };

  const handleEditNutrition = () => {
    setNutritionForm({ ...nutrition });
    setShowNutritionModal(true);
  };

  const handleSaveNutrition = () => {
    updateMemberNutrition(memberId, {
      protein: Number(nutritionForm.protein),
      carbs: Number(nutritionForm.carbs),
      water: Number(nutritionForm.water),
      fiber: Number(nutritionForm.fiber),
    });
    setShowNutritionModal(false);
  };

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
        <div style={styles.infoCard}>
          <div style={styles.infoLabel}>Email</div>
          <div style={styles.infoValue}>{memberData.email}</div>
        </div>
        <div style={styles.infoCard}>
          <div style={styles.infoLabel}>Phone</div>
          <div style={styles.infoValue}>{memberData.phone}</div>
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
                contentStyle={{ background: '#1a1f3a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
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
                contentStyle={{ background: '#1a1f3a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
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
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={styles.addButton} onClick={() => navigate('/admin/exercises')}>
            Browse Exercises
          </button>
          <button style={styles.addButton} onClick={handleAddExercise}>
            <Plus size={16} /> Add Exercise
          </button>
        </div>
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
                <button style={styles.iconButton} onClick={() => handleEditExercise(exercise)}><Edit size={16} /></button>
                <button style={{ ...styles.iconButton, ...styles.deleteIconButton }} onClick={() => handleDeleteExercise(exercise.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {schedule.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#8892b0' }}>
          <Dumbbell size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <p>No exercises assigned yet. Add exercises from the library.</p>
        </div>
      )}
    </div>
  );

  const renderNutritionSection = () => (
    <div style={styles.sectionContent}>
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Nutrition Plan</h3>
        <button style={styles.addButton} onClick={handleEditNutrition}>
          <Edit size={16} /> Edit Plan
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
        {attendance.map((record, index) => {
          const percentage = Math.round((record.days / record.total) * 100);
          return (
            <div key={index} style={styles.attendanceCard}>
              <div style={styles.attendanceHeader}>
                <div style={styles.attendanceMonth}>{record.month}</div>
                <div style={styles.attendancePercent}>{percentage}%</div>
              </div>
              <div style={styles.attendanceBar}>
                <div style={{
                  ...styles.attendanceProgress,
                  width: `${percentage}%`
                }} />
              </div>
              <div style={styles.attendanceDays}>{record.days} / {record.total} days</div>
            </div>
          );
        })}
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .sidebar-item {
          transition: all 0.3s ease;
        }
        
        .sidebar-item:hover {
          transform: translateX(8px);
          background: rgba(255, 107, 53, 0.1) !important;
        }
        
        .sidebar-item.active {
          background: rgba(255, 107, 53, 0.2) !important;
          border-left: 4px solid #FF6B35 !important;
        }
      `}</style>

      <div style={styles.sidebar}>
        <button style={styles.backButton} onClick={() => navigate('/admin/members')}>
          <ArrowLeft size={18} />
          <span>Back to Members</span>
        </button>

        <div style={styles.memberHeader}>
          <div style={styles.memberAvatar}>
            {memberData.name.split(' ').map(n => n[0]).join('')}
          </div>
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

      {/* Exercise Modal */}
      {showExerciseModal && (
        <div style={styles.modalOverlay} onClick={() => setShowExerciseModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingExercise ? 'Edit Exercise' : 'Add Exercise to Schedule'}
              </h2>
              <button style={styles.closeButton} onClick={() => setShowExerciseModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Exercise Name</label>
                <input type="text" value={exerciseForm.name} onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })} style={styles.input} placeholder="e.g., Bench Press" />
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Steps</label>
                  <input type="number" value={exerciseForm.steps} onChange={(e) => setExerciseForm({ ...exerciseForm, steps: e.target.value })} style={styles.input} placeholder="0" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rounds</label>
                  <input type="number" value={exerciseForm.rounds} onChange={(e) => setExerciseForm({ ...exerciseForm, rounds: e.target.value })} style={styles.input} placeholder="0" />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Image URL</label>
                <input type="text" value={exerciseForm.image} onChange={(e) => setExerciseForm({ ...exerciseForm, image: e.target.value })} style={styles.input} placeholder="https://..." />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Video URL</label>
                <input type="text" value={exerciseForm.video} onChange={(e) => setExerciseForm({ ...exerciseForm, video: e.target.value })} style={styles.input} placeholder="https://youtube.com/..." />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelButton} onClick={() => setShowExerciseModal(false)}>Cancel</button>
              <button style={styles.saveButton} onClick={handleSaveExercise}>
                <Save size={18} /> Save Exercise
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nutrition Modal */}
      {showNutritionModal && (
        <div style={styles.modalOverlay} onClick={() => setShowNutritionModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit Nutrition Plan</h2>
              <button style={styles.closeButton} onClick={() => setShowNutritionModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Protein (g/day)</label>
                  <input type="number" value={nutritionForm.protein} onChange={(e) => setNutritionForm({ ...nutritionForm, protein: e.target.value })} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Carbs (g/day)</label>
                  <input type="number" value={nutritionForm.carbs} onChange={(e) => setNutritionForm({ ...nutritionForm, carbs: e.target.value })} style={styles.input} />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Water (L/day)</label>
                  <input type="number" step="0.1" value={nutritionForm.water} onChange={(e) => setNutritionForm({ ...nutritionForm, water: e.target.value })} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Fiber (g/day)</label>
                  <input type="number" value={nutritionForm.fiber} onChange={(e) => setNutritionForm({ ...nutritionForm, fiber: e.target.value })} style={styles.input} />
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelButton} onClick={() => setShowNutritionModal(false)}>Cancel</button>
              <button style={styles.saveButton} onClick={handleSaveNutrition}>
                <Save size={18} /> Save Changes
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
    display: 'flex',
    minHeight: 'calc(100vh - 70px)',
    fontFamily: "'Work Sans', sans-serif",
  },
  sidebar: {
    width: '320px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '24px 0',
    flexShrink: 0,
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 32px',
    background: 'transparent',
    border: 'none',
    color: '#8892b0',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '24px',
    transition: 'color 0.3s ease',
  },
  memberHeader: {
    display: 'flex',
    gap: '16px',
    padding: '0 32px 32px 32px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '32px',
    alignItems: 'center',
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
    flexShrink: 0,
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
    gap: '4px',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 32px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    borderLeft: '4px solid transparent',
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
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
    marginTop: 0,
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
  attendanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  attendanceMonth: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fff',
  },
  attendancePercent: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#4ECDC4',
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
    borderRadius: '6px',
    transition: 'width 0.5s ease',
  },
  attendanceDays: {
    fontSize: '14px',
    color: '#8892b0',
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#1a1f3a',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '560px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '28px 32px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '28px',
    color: '#fff',
    margin: 0,
    letterSpacing: '2px',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#8892b0',
    cursor: 'pointer',
    padding: '8px',
  },
  modalBody: {
    padding: '28px 32px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  label: {
    display: 'block',
    color: '#8892b0',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  modalFooter: {
    display: 'flex',
    gap: '16px',
    padding: '24px 32px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#8892b0',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default AdminMemberPage;

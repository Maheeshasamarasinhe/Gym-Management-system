import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Apple, Dumbbell, Users, Edit, Save, X, Trash2, Plus, ArrowLeft, Search } from 'lucide-react';
import { useGymData } from '../context/GymDataContext';

const AdminMemberPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const {
    getMember,
    exercises: exerciseLibrary,
    addExerciseToMember,
    editMemberExercise,
    deleteMemberExercise,
    updateMemberNutrition,
    addMealToMember,
    editMemberMeal,
    deleteMemberMeal,
  } = useGymData();
  const [activeSection, setActiveSection] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  // Schedule CRUD - hooks must be before any conditional return
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [exerciseForm, setExerciseForm] = useState({ name: '', steps: '', rounds: '', image: '', video: '' });

  // Browse Exercises
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const [browseSearch, setBrowseSearch] = useState('');
  const [browseCategory, setBrowseCategory] = useState('All');

  // Nutrition CRUD
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [nutritionForm, setNutritionForm] = useState({ protein: 0, carbs: 0, water: 0, fiber: 0 });

  // Meal Plan CRUD
  const [showMealModal, setShowMealModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealForm, setMealForm] = useState({ name: '', time: '', items: '', calories: '' });

  // Get member data from shared context
  const member = getMember(memberId);

  // If member not found, show error
  if (!member) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#a9a9a9', fontFamily: "'Muli', sans-serif" }}>
        <h2 style={{ color: '#fff', marginBottom: '16px' }}>Member Not Found</h2>
        <p>No member with ID "{memberId}" exists in the system.</p>
        <button onClick={() => navigate('/admin/members')} style={{ marginTop: '24px', padding: '12px 24px', background: '#f36100', border: 'none', borderRadius: '0', color: '#fff', fontSize: '15px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: '700' }}>
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
  const mealPlan = member.mealPlan || [];

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

  const handleSelectFromLibrary = (exercise) => {
    addExerciseToMember(memberId, {
      name: exercise.name,
      steps: exercise.steps,
      rounds: exercise.rounds,
      image: exercise.image,
      video: exercise.video,
      category: exercise.category,
    });
    setShowBrowseModal(false);
  };

  const filteredLibrary = exerciseLibrary.filter(ex => {
    const matchSearch = ex.name.toLowerCase().includes(browseSearch.toLowerCase());
    const matchCategory = browseCategory === 'All' || ex.category === browseCategory;
    return matchSearch && matchCategory;
  });

  const libraryCategories = ['All', ...new Set(exerciseLibrary.map(ex => ex.category))];

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

  // Meal Plan handlers
  const handleAddMeal = () => {
    setEditingMeal(null);
    setMealForm({ name: '', time: '', items: '', calories: '' });
    setShowMealModal(true);
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setMealForm({
      name: meal.name,
      time: meal.time,
      items: meal.items.join(', '),
      calories: meal.calories,
    });
    setShowMealModal(true);
  };

  const handleDeleteMeal = (mealId) => {
    deleteMemberMeal(memberId, mealId);
  };

  const handleSaveMeal = () => {
    const mealData = {
      name: mealForm.name,
      time: mealForm.time,
      items: mealForm.items.split(',').map(i => i.trim()).filter(Boolean),
      calories: Number(mealForm.calories) || 0,
    };
    if (editingMeal) {
      editMemberMeal(memberId, editingMeal.id, mealData);
    } else {
      addMealToMember(memberId, mealData);
    }
    setShowMealModal(false);
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
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#a9a9a9" />
              <YAxis stroke="#a9a9a9" />
              <Tooltip
                contentStyle={{ background: '#0a0a0a', border: '1px solid #363636', borderRadius: '0' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#f36100" strokeWidth={3} dot={{ fill: '#f36100', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>CHEST SIZE (CM)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chestData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#a9a9a9" />
              <YAxis stroke="#a9a9a9" />
              <Tooltip
                contentStyle={{ background: '#0a0a0a', border: '1px solid #363636', borderRadius: '0' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="chest" stroke="#f36100" strokeWidth={3} dot={{ fill: '#f36100', r: 6 }} />
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
          <button style={styles.addButton} onClick={() => { setBrowseSearch(''); setBrowseCategory('All'); setShowBrowseModal(true); }}>
            <Search size={16} /> Browse Exercises
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
        <div style={{ textAlign: 'center', padding: '60px', color: '#a9a9a9' }}>
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

      {/* Meal Plan Section */}
      <div style={{ ...styles.sectionHeader, marginTop: '48px' }}>
        <h3 style={styles.sectionTitle}>Meal Plan</h3>
        <button style={styles.addButton} onClick={handleAddMeal}>
          <Plus size={16} /> Add Meal
        </button>
      </div>

      <div style={styles.mealPlanList}>
        {mealPlan.map(meal => (
          <div key={meal.id} style={styles.mealPlanCard}>
            <div style={styles.mealPlanHeader}>
              <div>
                <div style={styles.mealPlanName}>{meal.name}</div>
                <div style={styles.mealPlanTime}>{meal.time}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={styles.mealPlanCalories}>{meal.calories} kcal</div>
                <button style={styles.iconButton} onClick={() => handleEditMeal(meal)}><Edit size={16} /></button>
                <button style={{ ...styles.iconButton, ...styles.deleteIconButton }} onClick={() => handleDeleteMeal(meal.id)}><Trash2 size={16} /></button>
              </div>
            </div>
            <div style={styles.mealPlanItems}>
              {meal.items.map((item, i) => (
                <span key={i} style={styles.mealPlanItem}>
                  <span style={styles.mealPlanDot} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {mealPlan.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#a9a9a9' }}>
          <Apple size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <p>No meals added yet. Create a meal plan for this member.</p>
        </div>
      )}
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
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .sidebar-item {
          transition: all 0.3s ease;
        }
        
        .sidebar-item:hover {
          background: #252525 !important;
        }
        
        .sidebar-item.active {
          background: #252525 !important;
          border-left: 4px solid #f36100 !important;
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

      {/* Browse Exercises Modal */}
      {showBrowseModal && (
        <div style={styles.modalOverlay} onClick={() => setShowBrowseModal(false)}>
          <div style={{ ...styles.modalContent, maxWidth: '720px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Browse Exercise Library</h2>
              <button style={styles.closeButton} onClick={() => setShowBrowseModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '16px 32px', borderBottom: '1px solid #464646' }}>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#a9a9a9' }} />
                <input
                  type="text"
                  value={browseSearch}
                  onChange={(e) => setBrowseSearch(e.target.value)}
                  placeholder="Search exercises..."
                  style={{ ...styles.input, paddingLeft: '42px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {libraryCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setBrowseCategory(cat)}
                    style={{
                      padding: '6px 16px',
                      background: browseCategory === cat ? '#f36100' : 'transparent',
                      border: browseCategory === cat ? '1px solid #f36100' : '1px solid #464646',
                      color: browseCategory === cat ? '#fff' : '#a9a9a9',
                      borderRadius: '0',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
              {filteredLibrary.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#a9a9a9' }}>
                  <Dumbbell size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <p>No exercises match your search.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {filteredLibrary.map(exercise => {
                    const alreadyAdded = schedule.some(s => s.name === exercise.name);
                    return (
                      <div
                        key={exercise.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '16px',
                          background: '#151515',
                          border: '1px solid #363636',
                          borderRadius: '0',
                          opacity: alreadyAdded ? 0.5 : 1,
                        }}
                      >
                        <img src={exercise.image} alt={exercise.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '0', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '4px', fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', letterSpacing: '1px' }}>{exercise.name}</div>
                          <div style={{ display: 'flex', gap: '16px', color: '#a9a9a9', fontSize: '13px' }}>
                            <span>{exercise.steps} Steps</span>
                            <span>{exercise.rounds} Rounds</span>
                            <span style={{ color: '#f36100' }}>{exercise.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => !alreadyAdded && handleSelectFromLibrary(exercise)}
                          disabled={alreadyAdded}
                          style={{
                            padding: '10px 20px',
                            background: alreadyAdded ? '#252525' : '#f36100',
                            border: 'none',
                            borderRadius: '0',
                            color: alreadyAdded ? '#a9a9a9' : '#fff',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: alreadyAdded ? 'default' : 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {alreadyAdded ? 'Added' : '+ Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

      {/* Meal Plan Modal */}
      {showMealModal && (
        <div style={styles.modalOverlay} onClick={() => setShowMealModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingMeal ? 'Edit Meal' : 'Add Meal'}
              </h2>
              <button style={styles.closeButton} onClick={() => setShowMealModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Meal Name</label>
                <input type="text" value={mealForm.name} onChange={(e) => setMealForm({ ...mealForm, name: e.target.value })} style={styles.input} placeholder="e.g., Breakfast, Lunch, Dinner" />
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Time</label>
                  <input type="text" value={mealForm.time} onChange={(e) => setMealForm({ ...mealForm, time: e.target.value })} style={styles.input} placeholder="e.g., 7:00 AM" />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Calories (kcal)</label>
                  <input type="number" value={mealForm.calories} onChange={(e) => setMealForm({ ...mealForm, calories: e.target.value })} style={styles.input} placeholder="0" />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Food Items (comma separated)</label>
                <input type="text" value={mealForm.items} onChange={(e) => setMealForm({ ...mealForm, items: e.target.value })} style={styles.input} placeholder="e.g., Oatmeal, Eggs, Toast, Orange juice" />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelButton} onClick={() => setShowMealModal(false)}>Cancel</button>
              <button style={styles.saveButton} onClick={handleSaveMeal}>
                <Save size={18} /> {editingMeal ? 'Save Changes' : 'Add Meal'}
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
    fontFamily: "'Muli', sans-serif",
  },
  sidebar: {
    width: '320px',
    background: '#0a0a0a',
    borderRight: '1px solid #464646',
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
    color: '#a9a9a9',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '24px',
    transition: 'color 0.3s ease',
  },
  memberHeader: {
    display: 'flex',
    gap: '16px',
    padding: '0 32px 32px 32px',
    borderBottom: '1px solid #464646',
    marginBottom: '32px',
    alignItems: 'center',
  },
  memberAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '0',
    background: '#f36100',
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
    fontFamily: "'Oswald', sans-serif",
  },
  memberHeaderId: {
    fontSize: '14px',
    color: '#a9a9a9',
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
    fontFamily: "'Oswald', sans-serif",
    fontSize: '36px',
    color: '#fff',
    letterSpacing: '2px',
    margin: '0 0 32px 0',
    textTransform: 'uppercase',
  },
  addButton: {
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
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '48px',
  },
  infoCard: {
    background: '#252525',
    border: '1px solid #464646',
    borderRadius: '0',
    padding: '24px',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#a9a9a9',
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
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    padding: '32px',
  },
  chartTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '24px',
    textTransform: 'uppercase',
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
    background: '#252525',
    border: '1px solid #464646',
    borderRadius: '0',
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
    color: '#a9a9a9',
  },
  paymentRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  paymentAmount: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#f36100',
  },
  paymentStatus: {
    padding: '8px 16px',
    borderRadius: '0',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  paidStatus: {
    background: 'rgba(243, 97, 0, 0.2)',
    color: '#f36100',
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
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
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
    fontFamily: "'Oswald', sans-serif",
  },
  exerciseDetails: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  exerciseDetail: {
    padding: '6px 12px',
    background: '#252525',
    borderRadius: '0',
    fontSize: '13px',
    color: '#a9a9a9',
  },
  videoLink: {
    color: '#f36100',
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
    background: 'transparent',
    border: '1px solid #f36100',
    color: '#f36100',
    padding: '8px 12px',
    borderRadius: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  deleteIconButton: {
    background: 'transparent',
    border: '1px solid #a9a9a9',
    color: '#a9a9a9',
  },
  nutritionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
  },
  nutritionCard: {
    background: '#252525',
    border: '1px solid #464646',
    borderRadius: '0',
    padding: '32px',
    textAlign: 'center',
  },
  nutritionIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  nutritionLabel: {
    fontSize: '14px',
    color: '#a9a9a9',
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
    color: '#a9a9a9',
  },
  // Meal Plan styles
  mealPlanList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mealPlanCard: {
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    padding: '24px',
  },
  mealPlanHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  mealPlanName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '22px',
    color: '#fff',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  mealPlanTime: {
    color: '#a9a9a9',
    fontSize: '14px',
    marginTop: '4px',
  },
  mealPlanCalories: {
    color: '#f36100',
    fontSize: '18px',
    fontWeight: '700',
  },
  mealPlanItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  mealPlanItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#c4c4c4',
    fontSize: '14px',
    padding: '8px 16px',
    background: '#252525',
    borderRadius: '0',
  },
  mealPlanDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#f36100',
    flexShrink: 0,
    display: 'inline-block',
  },
  attendanceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  attendanceCard: {
    background: '#252525',
    border: '1px solid #464646',
    borderRadius: '0',
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
    color: '#f36100',
  },
  attendanceBar: {
    width: '100%',
    height: '12px',
    background: '#363636',
    borderRadius: '0',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  attendanceProgress: {
    height: '100%',
    background: '#f36100',
    borderRadius: '0',
    transition: 'width 0.5s ease',
  },
  attendanceDays: {
    fontSize: '14px',
    color: '#a9a9a9',
  },
  // Modal styles
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
    maxWidth: '560px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '28px 32px',
    borderBottom: '1px solid #464646',
  },
  modalTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '28px',
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
    color: '#a9a9a9',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'transparent',
    border: '1px solid #363636',
    borderRadius: '0',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  modalFooter: {
    display: 'flex',
    gap: '16px',
    padding: '24px 32px',
    borderTop: '1px solid #464646',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    background: 'transparent',
    border: '1px solid #464646',
    borderRadius: '0',
    color: '#a9a9a9',
    fontSize: '15px',
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
    padding: '12px',
    background: '#f36100',
    border: 'none',
    borderRadius: '0',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
};

export default AdminMemberPage;

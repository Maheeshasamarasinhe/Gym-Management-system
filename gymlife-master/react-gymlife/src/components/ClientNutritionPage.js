import React, { useState } from 'react';
import { Droplets, Flame, Wheat, Leaf, Edit3, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';

const ClientNutritionPage = () => {
  const { user } = useAuth();
  const { getMember } = useGymData();
  const member = getMember(user?.id);

  // Load nutrition targets from context
  const memberNutrition = member?.nutrition || { protein: 0, carbs: 0, water: 0, fiber: 0 };

  const [nutritionData, setNutritionData] = useState({
    protein: { current: Math.round(memberNutrition.protein * 0.8), target: memberNutrition.protein, unit: 'g' },
    carbs: { current: Math.round(memberNutrition.carbs * 0.8), target: memberNutrition.carbs, unit: 'g' },
    water: { current: Math.round(memberNutrition.water * 0.83 * 10) / 10, target: memberNutrition.water, unit: 'L' },
    fiber: { current: Math.round(memberNutrition.fiber * 0.67), target: memberNutrition.fiber, unit: 'g' },
  });

  const [meals] = useState([
    {
      id: 1,
      name: 'Breakfast',
      time: '7:00 AM',
      items: ['Oatmeal with berries', 'Scrambled eggs (3)', 'Whole wheat toast', 'Orange juice'],
      calories: 650,
    },
    {
      id: 2,
      name: 'Mid-Morning Snack',
      time: '10:00 AM',
      items: ['Greek yogurt', 'Mixed nuts (30g)', 'Banana'],
      calories: 350,
    },
    {
      id: 3,
      name: 'Lunch',
      time: '1:00 PM',
      items: ['Grilled chicken breast', 'Brown rice', 'Steamed broccoli', 'Mixed salad'],
      calories: 750,
    },
    {
      id: 4,
      name: 'Pre-Workout Snack',
      time: '4:00 PM',
      items: ['Protein shake', 'Rice cakes with peanut butter'],
      calories: 300,
    },
    {
      id: 5,
      name: 'Post-Workout',
      time: '6:30 PM',
      items: ['Whey protein shake', 'Banana'],
      calories: 250,
    },
    {
      id: 6,
      name: 'Dinner',
      time: '8:00 PM',
      items: ['Salmon fillet', 'Sweet potato', 'Asparagus', 'Quinoa salad'],
      calories: 700,
    },
  ]);

  const [tips] = useState([
    'Drink 500ml water 30 min before each meal',
    'Eat protein within 30 min after workout',
    'Include colorful vegetables in every meal',
    'Limit processed sugar intake to < 25g daily',
    'Take multivitamin with breakfast',
  ]);

  const [editingNutrient, setEditingNutrient] = useState(null);
  const [editValue, setEditValue] = useState('');

  const nutrientIcons = {
    protein: <Flame size={24} />,
    carbs: <Wheat size={24} />,
    water: <Droplets size={24} />,
    fiber: <Leaf size={24} />,
  };

  const nutrientColors = {
    protein: '#FF6B35',
    carbs: '#4ECDC4',
    water: '#64B5F6',
    fiber: '#81C784',
  };

  const handleEdit = (key) => {
    setEditingNutrient(key);
    setEditValue(nutritionData[key].current.toString());
  };

  const handleSave = (key) => {
    const val = parseFloat(editValue);
    if (!isNaN(val)) {
      setNutritionData(prev => ({
        ...prev,
        [key]: { ...prev[key], current: val },
      }));
    }
    setEditingNutrient(null);
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@300;400;600;700&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nutrition-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .nutrition-card:hover {
          transform: translateY(-4px);
        }

        .meal-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .meal-card:hover {
          transform: translateX(8px);
        }
      `}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>NUTRITION PLAN</h1>
        <p style={styles.subtitle}>Your daily nutrition targets and meal plan</p>
      </div>

      {/* Nutrition Targets */}
      <div style={styles.targetsGrid}>
        {Object.entries(nutritionData).map(([key, data], index) => {
          const percent = Math.min((data.current / data.target) * 100, 100);
          return (
            <div
              key={key}
              className="nutrition-card"
              style={{ ...styles.targetCard, animationDelay: `${index * 0.1}s` }}
            >
              <div style={styles.targetHeader}>
                <div style={{ ...styles.targetIcon, color: nutrientColors[key] }}>
                  {nutrientIcons[key]}
                </div>
                <div style={styles.targetLabel}>{key.toUpperCase()}</div>
                {editingNutrient !== key ? (
                  <button onClick={() => handleEdit(key)} style={styles.editBtn}>
                    <Edit3 size={14} />
                  </button>
                ) : (
                  <div style={styles.editActions}>
                    <button onClick={() => handleSave(key)} style={styles.saveBtn}>
                      <Check size={14} />
                    </button>
                    <button onClick={() => setEditingNutrient(null)} style={styles.cancelBtn}>
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div style={styles.targetValues}>
                {editingNutrient === key ? (
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={styles.editInput}
                    autoFocus
                  />
                ) : (
                  <span style={{ ...styles.currentValue, color: nutrientColors[key] }}>
                    {data.current}
                  </span>
                )}
                <span style={styles.targetValue}>
                  / {data.target}{data.unit}
                </span>
              </div>

              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${percent}%`,
                    background: nutrientColors[key],
                  }}
                />
              </div>
              <div style={styles.progressPercent}>{Math.round(percent)}% of target</div>
            </div>
          );
        })}
      </div>

      {/* Daily Calorie Summary */}
      <div style={styles.calorieSummary}>
        <div style={styles.calorieTitle}>TOTAL DAILY INTAKE</div>
        <div style={styles.calorieValue}>{totalCalories} <span style={styles.calorieUnit}>kcal</span></div>
      </div>

      {/* Meal Plan */}
      <div style={styles.sectionTitle}>MEAL PLAN</div>
      <div style={styles.mealsList}>
        {meals.map((meal, index) => (
          <div
            key={meal.id}
            className="meal-card"
            style={{ ...styles.mealCard, animationDelay: `${index * 0.1}s` }}
          >
            <div style={styles.mealHeader}>
              <div>
                <div style={styles.mealName}>{meal.name}</div>
                <div style={styles.mealTime}>{meal.time}</div>
              </div>
              <div style={styles.mealCalories}>{meal.calories} kcal</div>
            </div>
            <div style={styles.mealItems}>
              {meal.items.map((item, i) => (
                <div key={i} style={styles.mealItem}>
                  <div style={styles.mealDot} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Nutrition Tips */}
      <div style={styles.sectionTitle}>NUTRITION TIPS</div>
      <div style={styles.tipsCard}>
        {tips.map((tip, index) => (
          <div key={index} style={styles.tipItem}>
            <div style={styles.tipNumber}>{index + 1}</div>
            <div style={styles.tipText}>{tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  targetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  targetCard: {
    padding: '28px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  targetHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  targetIcon: {},
  targetLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '20px',
    color: '#fff',
    letterSpacing: '2px',
    flex: 1,
  },
  editBtn: {
    background: 'none',
    border: 'none',
    color: '#8892b0',
    cursor: 'pointer',
    padding: '4px',
  },
  editActions: { display: 'flex', gap: '4px' },
  saveBtn: {
    background: 'rgba(78, 205, 196, 0.2)',
    border: 'none',
    color: '#4ECDC4',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
  },
  cancelBtn: {
    background: 'rgba(255, 107, 107, 0.2)',
    border: 'none',
    color: '#FF6B6B',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
  },
  targetValues: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '16px',
  },
  currentValue: {
    fontSize: '36px',
    fontWeight: '700',
  },
  targetValue: { color: '#8892b0', fontSize: '16px' },
  editInput: {
    width: '80px',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '24px',
    fontWeight: '700',
    outline: 'none',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '5px',
    transition: 'width 0.5s ease',
  },
  progressPercent: { color: '#8892b0', fontSize: '13px' },
  calorieSummary: {
    padding: '32px',
    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(78, 205, 196, 0.1))',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    textAlign: 'center',
    marginBottom: '48px',
  },
  calorieTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '20px',
    color: '#8892b0',
    letterSpacing: '3px',
    marginBottom: '8px',
  },
  calorieValue: {
    fontSize: '64px',
    fontWeight: '700',
    color: '#FF6B35',
  },
  calorieUnit: { fontSize: '24px', color: '#8892b0' },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '32px',
    color: '#fff',
    letterSpacing: '3px',
    marginBottom: '24px',
    marginTop: '24px',
  },
  mealsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '48px',
  },
  mealCard: {
    padding: '28px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
  },
  mealHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  mealName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
  },
  mealTime: { color: '#8892b0', fontSize: '14px', marginTop: '4px' },
  mealCalories: { color: '#FF6B35', fontSize: '18px', fontWeight: '700' },
  mealItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  mealItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ccd6f6',
    fontSize: '15px',
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
  },
  mealDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#4ECDC4',
    flexShrink: 0,
  },
  tipsCard: {
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  tipItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  tipNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255, 107, 53, 0.2)',
    color: '#FF6B35',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
    flexShrink: 0,
  },
  tipText: { color: '#ccd6f6', fontSize: '16px' },
};

export default ClientNutritionPage;

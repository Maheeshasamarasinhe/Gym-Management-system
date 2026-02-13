import React, { useState } from 'react';
import { Droplets, Flame, Wheat, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGymData } from '../context/GymDataContext';

const ClientNutritionPage = () => {
  const { user } = useAuth();
  const { getMember } = useGymData();
  const member = getMember(user?.id);

  // Load nutrition targets from context
  const memberNutrition = member?.nutrition || { protein: 0, carbs: 0, water: 0, fiber: 0 };

  const nutritionData = {
    protein: { current: Math.round(memberNutrition.protein * 0.8), target: memberNutrition.protein, unit: 'g' },
    carbs: { current: Math.round(memberNutrition.carbs * 0.8), target: memberNutrition.carbs, unit: 'g' },
    water: { current: Math.round(memberNutrition.water * 0.83 * 10) / 10, target: memberNutrition.water, unit: 'L' },
    fiber: { current: Math.round(memberNutrition.fiber * 0.67), target: memberNutrition.fiber, unit: 'g' },
  };

  // Load meals from context (admin-managed, read-only for client)
  const meals = member?.mealPlan || [];

  const [tips] = useState([
    'Drink 500ml water 30 min before each meal',
    'Eat protein within 30 min after workout',
    'Include colorful vegetables in every meal',
    'Limit processed sugar intake to < 25g daily',
    'Take multivitamin with breakfast',
  ]);

  const nutrientIcons = {
    protein: <Flame size={24} />,
    carbs: <Wheat size={24} />,
    water: <Droplets size={24} />,
    fiber: <Leaf size={24} />,
  };

  const nutrientColors = {
    protein: '#f36100',
    carbs: '#f36100',
    water: '#f36100',
    fiber: '#f36100',
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Muli:wght@300;400;600;700&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nutrition-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .nutrition-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
        }

        .meal-card {
          animation: slideIn 0.4s ease-out backwards;
          transition: all 0.3s ease;
        }

        .meal-card:hover {
          border-left: 4px solid #f36100;
          background: #252525 !important;
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
              </div>

              <div style={styles.targetValues}>
                <span style={{ ...styles.currentValue, color: nutrientColors[key] }}>
                  {data.current}
                </span>
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
      {meals.length > 0 ? (
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
      ) : (
        <div style={{ textAlign: 'center', padding: '48px', background: '#0a0a0a', border: '1px solid #464646', marginBottom: '48px' }}>
          <p style={{ color: '#a9a9a9', fontSize: '16px', margin: 0 }}>No meal plan assigned yet. Your trainer will create one for you.</p>
        </div>
      )}

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
  targetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  targetCard: {
    padding: '28px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  targetHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  targetIcon: {},
  targetLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    color: '#fff',
    letterSpacing: '2px',
    flex: 1,
    textTransform: 'uppercase',
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
  targetValue: { color: '#a9a9a9', fontSize: '16px' },
  progressBar: {
    width: '100%',
    height: '10px',
    background: '#252525',
    borderRadius: '0',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressFill: {
    height: '100%',
    borderRadius: '0',
    transition: 'width 0.5s ease',
  },
  progressPercent: { color: '#a9a9a9', fontSize: '13px' },
  calorieSummary: {
    padding: '32px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
    textAlign: 'center',
    marginBottom: '48px',
  },
  calorieTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    color: '#a9a9a9',
    letterSpacing: '3px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  calorieValue: {
    fontSize: '64px',
    fontWeight: '700',
    color: '#f36100',
  },
  calorieUnit: { fontSize: '24px', color: '#a9a9a9' },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    color: '#fff',
    letterSpacing: '3px',
    marginBottom: '24px',
    marginTop: '24px',
    textTransform: 'uppercase',
  },
  mealsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '48px',
  },
  mealCard: {
    padding: '28px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
  },
  mealHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  mealName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  mealTime: { color: '#a9a9a9', fontSize: '14px', marginTop: '4px' },
  mealCalories: { color: '#f36100', fontSize: '18px', fontWeight: '700' },
  mealItems: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  mealItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#c4c4c4',
    fontSize: '15px',
    padding: '8px 16px',
    background: '#252525',
    borderRadius: '0',
  },
  mealDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#f36100',
    flexShrink: 0,
  },
  tipsCard: {
    padding: '32px',
    background: '#0a0a0a',
    border: '1px solid #464646',
    borderRadius: '0',
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
    borderRadius: '0',
    background: '#252525',
    color: '#f36100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
    flexShrink: 0,
  },
  tipText: { color: '#c4c4c4', fontSize: '16px' },
};

export default ClientNutritionPage;

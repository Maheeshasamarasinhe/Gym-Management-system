import React, { createContext, useContext, useState, useCallback } from 'react';

const GymDataContext = createContext();

export const useGymData = () => {
  const context = useContext(GymDataContext);
  if (!context) {
    throw new Error('useGymData must be used within a GymDataProvider');
  }
  return context;
};

// ─── Initial Data ──────────────────────────────────────────────────────────
const initialMembers = [
  {
    id: 'M001',
    name: 'John Mitchell',
    email: 'john@email.com',
    phone: '+1 234 567 8900',
    registeredDate: '2024-01-15',
    plan: 'Premium',
    membership: 'active',
    currentWeight: 77,
    currentHeight: 182,
    currentChest: 102,
    weightHistory: [
      { month: 'Jan', weight: 85 },
      { month: 'Feb', weight: 83 },
      { month: 'Mar', weight: 81 },
      { month: 'Apr', weight: 80 },
      { month: 'May', weight: 78 },
      { month: 'Jun', weight: 77 },
    ],
    chestHistory: [
      { month: 'Jan', chest: 96 },
      { month: 'Feb', chest: 97 },
      { month: 'Mar', chest: 98 },
      { month: 'Apr', chest: 99 },
      { month: 'May', chest: 101 },
      { month: 'Jun', chest: 102 },
    ],
    payments: [
      { id: 1, date: '2024-06-01', month: 'June 2024', amount: 99, status: 'paid' },
      { id: 2, date: '2024-05-01', month: 'May 2024', amount: 99, status: 'paid' },
      { id: 3, date: '2024-04-01', month: 'April 2024', amount: 99, status: 'paid' },
      { id: 4, date: '2024-03-01', month: 'March 2024', amount: 99, status: 'pending' },
    ],
    schedule: [
      { id: 1, name: 'Bench Press', steps: 4, rounds: 3, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400', video: 'https://youtube.com/watch?v=bench-press', category: 'Chest' },
      { id: 2, name: 'Squats', steps: 5, rounds: 4, image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', video: 'https://youtube.com/watch?v=squats', category: 'Legs' },
    ],
    nutrition: { protein: 150, carbs: 200, water: 3.5, fiber: 30 },
    attendance: [
      { month: 'June', days: 24, total: 30 },
      { month: 'May', days: 28, total: 31 },
      { month: 'April', days: 25, total: 30 },
      { month: 'March', days: 22, total: 31 },
      { month: 'February', days: 20, total: 29 },
      { month: 'January', days: 26, total: 31 },
    ],
  },
  {
    id: 'M002',
    name: 'Sarah Chen',
    email: 'sarah@email.com',
    phone: '+1 234 567 8901',
    registeredDate: '2024-02-20',
    plan: 'Basic',
    membership: 'active',
    currentWeight: 62,
    currentHeight: 165,
    currentChest: 88,
    weightHistory: [
      { month: 'Jan', weight: 68 },
      { month: 'Feb', weight: 67 },
      { month: 'Mar', weight: 65 },
      { month: 'Apr', weight: 64 },
      { month: 'May', weight: 63 },
      { month: 'Jun', weight: 62 },
    ],
    chestHistory: [
      { month: 'Jan', chest: 84 },
      { month: 'Feb', chest: 85 },
      { month: 'Mar', chest: 86 },
      { month: 'Apr', chest: 86 },
      { month: 'May', chest: 87 },
      { month: 'Jun', chest: 88 },
    ],
    payments: [
      { id: 1, date: '2024-06-01', month: 'June 2024', amount: 49, status: 'paid' },
      { id: 2, date: '2024-05-01', month: 'May 2024', amount: 49, status: 'paid' },
      { id: 3, date: '2024-04-01', month: 'April 2024', amount: 49, status: 'pending' },
    ],
    schedule: [
      { id: 1, name: 'Deadlift', steps: 6, rounds: 3, image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400', video: 'https://youtube.com/watch?v=deadlift', category: 'Back' },
      { id: 2, name: 'Pull-ups', steps: 3, rounds: 5, image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', video: 'https://youtube.com/watch?v=pullups', category: 'Back' },
    ],
    nutrition: { protein: 110, carbs: 180, water: 2.5, fiber: 25 },
    attendance: [
      { month: 'June', days: 20, total: 30 },
      { month: 'May', days: 22, total: 31 },
      { month: 'April', days: 18, total: 30 },
      { month: 'March', days: 19, total: 31 },
    ],
  },
  {
    id: 'M003',
    name: 'Mike Rodriguez',
    email: 'mike@email.com',
    phone: '+1 234 567 8902',
    registeredDate: '2023-11-10',
    plan: 'Standard',
    membership: 'inactive',
    currentWeight: 90,
    currentHeight: 178,
    currentChest: 105,
    weightHistory: [
      { month: 'Jan', weight: 95 },
      { month: 'Feb', weight: 94 },
      { month: 'Mar', weight: 93 },
      { month: 'Apr', weight: 92 },
      { month: 'May', weight: 91 },
      { month: 'Jun', weight: 90 },
    ],
    chestHistory: [
      { month: 'Jan', chest: 100 },
      { month: 'Feb', chest: 101 },
      { month: 'Mar', chest: 102 },
      { month: 'Apr', chest: 103 },
      { month: 'May', chest: 104 },
      { month: 'Jun', chest: 105 },
    ],
    payments: [
      { id: 1, date: '2024-06-01', month: 'June 2024', amount: 69, status: 'pending' },
      { id: 2, date: '2024-05-01', month: 'May 2024', amount: 69, status: 'paid' },
    ],
    schedule: [
      { id: 1, name: 'Shoulder Press', steps: 4, rounds: 3, image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400', video: 'https://youtube.com/watch?v=shoulder-press', category: 'Shoulders' },
    ],
    nutrition: { protein: 180, carbs: 250, water: 4.0, fiber: 35 },
    attendance: [
      { month: 'June', days: 10, total: 30 },
      { month: 'May', days: 15, total: 31 },
    ],
  },
  {
    id: 'M004',
    name: 'Emily Watson',
    email: 'emily@email.com',
    phone: '+1 234 567 8903',
    registeredDate: '2024-03-05',
    plan: 'Premium',
    membership: 'active',
    currentWeight: 58,
    currentHeight: 170,
    currentChest: 85,
    weightHistory: [
      { month: 'Mar', weight: 63 },
      { month: 'Apr', weight: 61 },
      { month: 'May', weight: 60 },
      { month: 'Jun', weight: 58 },
    ],
    chestHistory: [
      { month: 'Mar', chest: 82 },
      { month: 'Apr', chest: 83 },
      { month: 'May', chest: 84 },
      { month: 'Jun', chest: 85 },
    ],
    payments: [
      { id: 1, date: '2024-06-01', month: 'June 2024', amount: 99, status: 'paid' },
      { id: 2, date: '2024-05-01', month: 'May 2024', amount: 99, status: 'paid' },
    ],
    schedule: [
      { id: 1, name: 'Bicep Curls', steps: 3, rounds: 4, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400', video: 'https://youtube.com/watch?v=bicep-curls', category: 'Arms' },
      { id: 2, name: 'Bench Press', steps: 4, rounds: 3, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400', video: 'https://youtube.com/watch?v=bench-press', category: 'Chest' },
    ],
    nutrition: { protein: 100, carbs: 160, water: 2.5, fiber: 22 },
    attendance: [
      { month: 'June', days: 26, total: 30 },
      { month: 'May', days: 27, total: 31 },
      { month: 'April', days: 28, total: 30 },
    ],
  },
  {
    id: 'M005',
    name: 'David Park',
    email: 'david@email.com',
    phone: '+1 234 567 8904',
    registeredDate: '2023-12-18',
    plan: 'Basic',
    membership: 'inactive',
    currentWeight: 82,
    currentHeight: 175,
    currentChest: 98,
    weightHistory: [
      { month: 'Jan', weight: 88 },
      { month: 'Feb', weight: 86 },
      { month: 'Mar', weight: 85 },
      { month: 'Apr', weight: 84 },
      { month: 'May', weight: 83 },
      { month: 'Jun', weight: 82 },
    ],
    chestHistory: [
      { month: 'Jan', chest: 94 },
      { month: 'Feb', chest: 95 },
      { month: 'Mar', chest: 96 },
      { month: 'Apr', chest: 97 },
      { month: 'May', chest: 97 },
      { month: 'Jun', chest: 98 },
    ],
    payments: [
      { id: 1, date: '2024-05-01', month: 'May 2024', amount: 49, status: 'paid' },
      { id: 2, date: '2024-04-01', month: 'April 2024', amount: 49, status: 'paid' },
    ],
    schedule: [
      { id: 1, name: 'Squats', steps: 5, rounds: 4, image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', video: 'https://youtube.com/watch?v=squats', category: 'Legs' },
    ],
    nutrition: { protein: 130, carbs: 200, water: 3.0, fiber: 28 },
    attendance: [
      { month: 'June', days: 8, total: 30 },
      { month: 'May', days: 12, total: 31 },
    ],
  },
];

const initialExercises = [
  { id: 1, name: 'Bench Press', steps: 4, rounds: 3, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400', video: 'https://youtube.com/watch?v=bench-press', category: 'Chest' },
  { id: 2, name: 'Squats', steps: 5, rounds: 4, image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', video: 'https://youtube.com/watch?v=squats', category: 'Legs' },
  { id: 3, name: 'Deadlift', steps: 6, rounds: 3, image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400', video: 'https://youtube.com/watch?v=deadlift', category: 'Back' },
  { id: 4, name: 'Pull-ups', steps: 3, rounds: 5, image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400', video: 'https://youtube.com/watch?v=pullups', category: 'Back' },
  { id: 5, name: 'Shoulder Press', steps: 4, rounds: 3, image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400', video: 'https://youtube.com/watch?v=shoulder-press', category: 'Shoulders' },
  { id: 6, name: 'Bicep Curls', steps: 3, rounds: 4, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400', video: 'https://youtube.com/watch?v=bicep-curls', category: 'Arms' },
];

const initialTrainers = [
  { id: 'T001', name: 'Marcus Thompson', status: 'active', experience: '8 years', email: 'marcus.thompson@gym.com', phone: '+1 234 567 8901', instagram: '@marcusfit', facebook: 'marcus.thompson', specialty: 'Strength Training', image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400' },
  { id: 'T002', name: 'Lisa Chen', status: 'active', experience: '5 years', email: 'lisa.chen@gym.com', phone: '+1 234 567 8902', instagram: '@lisafitnesscoach', facebook: 'lisa.chen.fitness', specialty: 'Yoga & Pilates', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400' },
  { id: 'T003', name: 'David Rodriguez', status: 'inactive', experience: '10 years', email: 'david.rodriguez@gym.com', phone: '+1 234 567 8903', instagram: '@davidtrains', facebook: 'david.rodriguez.trainer', specialty: 'HIIT & Cardio', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400' },
  { id: 'T004', name: 'Sarah Williams', status: 'active', experience: '6 years', email: 'sarah.williams@gym.com', phone: '+1 234 567 8904', instagram: '@sarahfitnesslife', facebook: 'sarah.williams.trainer', specialty: 'Nutrition & Wellness', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400' },
];

// ─── Provider ──────────────────────────────────────────────────────────────
export const GymDataProvider = ({ children }) => {
  const [members, setMembers] = useState(initialMembers);
  const [exercises, setExercises] = useState(initialExercises);
  const [trainers, setTrainers] = useState(initialTrainers);
  const [notifications, setNotifications] = useState([]);

  // ── Notification helper ────────────────────────────────────────────────
  const addNotification = useCallback((memberId, type, title, message) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      memberId,
      type,       // 'schedule' | 'nutrition' | 'payment' | 'profile'
      title,
      message,
      time: new Date().toLocaleString(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  // ── Member CRUD ────────────────────────────────────────────────────────
  const getMember = useCallback((memberId) => {
    return members.find(m => m.id === memberId);
  }, [members]);

  const getMemberByEmail = useCallback((email) => {
    return members.find(m => m.email === email);
  }, [members]);

  const deleteMember = useCallback((memberId) => {
    setMembers(prev => prev.filter(m => m.id !== memberId));
    // Also clear their notifications
    setNotifications(prev => prev.filter(n => n.memberId !== memberId));
  }, []);

  const updateMemberProfile = useCallback((memberId, updates) => {
    setMembers(prev => prev.map(m =>
      m.id === memberId ? { ...m, ...updates } : m
    ));
  }, []);

  // ── Schedule CRUD (admin managing a member's schedule) ─────────────────
  const addExerciseToMember = useCallback((memberId, exercise) => {
    const newExercise = { ...exercise, id: Date.now() };
    setMembers(prev => prev.map(m =>
      m.id === memberId
        ? { ...m, schedule: [...m.schedule, newExercise] }
        : m
    ));
    addNotification(memberId, 'schedule', 'Schedule Updated',
      `Admin added "${exercise.name}" to your workout schedule.`);
    return newExercise;
  }, [addNotification]);

  const editMemberExercise = useCallback((memberId, exerciseId, updates) => {
    setMembers(prev => prev.map(m =>
      m.id === memberId
        ? { ...m, schedule: m.schedule.map(ex => ex.id === exerciseId ? { ...ex, ...updates } : ex) }
        : m
    ));
    addNotification(memberId, 'schedule', 'Exercise Updated',
      `Admin updated "${updates.name || 'an exercise'}" in your schedule.`);
  }, [addNotification]);

  const deleteMemberExercise = useCallback((memberId, exerciseId) => {
    let exerciseName = '';
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const ex = m.schedule.find(e => e.id === exerciseId);
        if (ex) exerciseName = ex.name;
        return { ...m, schedule: m.schedule.filter(e => e.id !== exerciseId) };
      }
      return m;
    }));
    addNotification(memberId, 'schedule', 'Exercise Removed',
      `Admin removed "${exerciseName}" from your workout schedule.`);
  }, [addNotification]);

  // ── Nutrition CRUD ─────────────────────────────────────────────────────
  const updateMemberNutrition = useCallback((memberId, nutritionData) => {
    setMembers(prev => prev.map(m =>
      m.id === memberId ? { ...m, nutrition: nutritionData } : m
    ));
    addNotification(memberId, 'nutrition', 'Nutrition Plan Changed',
      `Admin updated your nutrition plan. Protein: ${nutritionData.protein}g, Carbs: ${nutritionData.carbs}g, Water: ${nutritionData.water}L, Fiber: ${nutritionData.fiber}g`);
  }, [addNotification]);

  // ── Client self-update (measurements) ──────────────────────────────────
  const updateMemberMeasurements = useCallback((memberId, measurements) => {
    setMembers(prev => prev.map(m => {
      if (m.id !== memberId) return m;
      const updated = { ...m, ...measurements };
      // Add to history
      const currentMonth = new Date().toLocaleString('default', { month: 'short' });
      if (measurements.currentWeight !== undefined) {
        const existing = m.weightHistory.find(h => h.month === currentMonth);
        if (existing) {
          updated.weightHistory = m.weightHistory.map(h =>
            h.month === currentMonth ? { ...h, weight: measurements.currentWeight } : h
          );
        } else {
          updated.weightHistory = [...m.weightHistory, { month: currentMonth, weight: measurements.currentWeight }];
        }
      }
      if (measurements.currentChest !== undefined) {
        const existing = m.chestHistory.find(h => h.month === currentMonth);
        if (existing) {
          updated.chestHistory = m.chestHistory.map(h =>
            h.month === currentMonth ? { ...h, chest: measurements.currentChest } : h
          );
        } else {
          updated.chestHistory = [...m.chestHistory, { month: currentMonth, chest: measurements.currentChest }];
        }
      }
      return updated;
    }));
  }, []);

  // ── Exercise Library CRUD (global) ─────────────────────────────────────
  const addExercise = useCallback((exercise) => {
    const newEx = { ...exercise, id: Date.now() };
    setExercises(prev => [...prev, newEx]);
    return newEx;
  }, []);

  const editExercise = useCallback((exerciseId, updates) => {
    setExercises(prev => prev.map(ex =>
      ex.id === exerciseId ? { ...ex, ...updates } : ex
    ));
  }, []);

  const deleteExercise = useCallback((exerciseId) => {
    setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  }, []);

  // ── Notifications for a member ─────────────────────────────────────────
  const getNotificationsForMember = useCallback((memberId) => {
    return notifications.filter(n => n.memberId === memberId);
  }, [notifications]);

  const markNotificationRead = useCallback((notificationId) => {
    setNotifications(prev => prev.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ));
  }, []);

  const markAllNotificationsRead = useCallback((memberId) => {
    setNotifications(prev => prev.map(n =>
      n.memberId === memberId ? { ...n, read: true } : n
    ));
  }, []);

  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const value = {
    // Data
    members,
    exercises,
    trainers,
    // Member ops
    getMember,
    getMemberByEmail,
    deleteMember,
    updateMemberProfile,
    updateMemberMeasurements,
    // Schedule ops
    addExerciseToMember,
    editMemberExercise,
    deleteMemberExercise,
    // Nutrition ops
    updateMemberNutrition,
    // Exercise library ops
    addExercise,
    editExercise,
    deleteExercise,
    // Notification ops
    getNotificationsForMember,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
  };

  return (
    <GymDataContext.Provider value={value}>
      {children}
    </GymDataContext.Provider>
  );
};

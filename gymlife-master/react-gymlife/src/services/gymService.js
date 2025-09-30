// Gym Management Service - Handles all data operations
class GymService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    // Initialize with demo data if not exists
    if (!localStorage.getItem('gymUsers')) {
      const initialUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          membershipStatus: 'Active',
          paymentStatus: 'Paid',
          joinDate: '2024-01-15',
          lastPayment: '2024-01-15',
          weight: '75kg',
          height: '180cm',
          fitnessLevel: 'Intermediate',
          schedule: [],
          nutritionPlan: '',
          attendance: ['2024-01-15', '2024-01-16', '2024-01-18'],
          fitnessData: [
            { id: 1, date: '2024-01-15', weight: '75', bodyFat: '15', muscle: '65', notes: 'Starting measurements' }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '098-765-4321',
          membershipStatus: 'Active',
          paymentStatus: 'Pending',
          joinDate: '2024-02-01',
          lastPayment: '2023-12-01',
          weight: '60kg',
          height: '165cm',
          fitnessLevel: 'Beginner',
          schedule: [],
          nutritionPlan: '',
          attendance: ['2024-02-01', '2024-02-03'],
          fitnessData: []
        }
      ];
      localStorage.setItem('gymUsers', JSON.stringify(initialUsers));
    }

    if (!localStorage.getItem('gymExercises')) {
      const initialExercises = [
        { id: 1, name: 'Push-ups', category: 'Chest', difficulty: 'Beginner', description: 'Basic push-up exercise for chest and arms' },
        { id: 2, name: 'Squats', category: 'Legs', difficulty: 'Beginner', description: 'Basic squat exercise for legs and glutes' },
        { id: 3, name: 'Deadlifts', category: 'Back', difficulty: 'Advanced', description: 'Compound lifting exercise for back and legs' },
        { id: 4, name: 'Bench Press', category: 'Chest', difficulty: 'Intermediate', description: 'Chest strengthening exercise with weights' },
        { id: 5, name: 'Pull-ups', category: 'Back', difficulty: 'Intermediate', description: 'Upper body pulling exercise' },
        { id: 6, name: 'Lunges', category: 'Legs', difficulty: 'Beginner', description: 'Single leg strengthening exercise' },
        { id: 7, name: 'Plank', category: 'Core', difficulty: 'Beginner', description: 'Core stability exercise' },
        { id: 8, name: 'Burpees', category: 'Cardio', difficulty: 'Intermediate', description: 'Full body cardio exercise' },
        { id: 9, name: 'Mountain Climbers', category: 'Cardio', difficulty: 'Intermediate', description: 'High intensity cardio exercise' },
        { id: 10, name: 'Bicep Curls', category: 'Arms', difficulty: 'Beginner', description: 'Arm strengthening exercise' }
      ];
      localStorage.setItem('gymExercises', JSON.stringify(initialExercises));
    }
  }

  // User Management
  getUsers() {
    return JSON.parse(localStorage.getItem('gymUsers') || '[]');
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  updateUser(userId, userData) {
    const users = this.getUsers();
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...userData } : user
    );
    localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    return this.getUserById(userId);
  }

  // Exercise Management
  getExercises() {
    return JSON.parse(localStorage.getItem('gymExercises') || '[]');
  }

  addExercise(exercise) {
    const exercises = this.getExercises();
    const newExercise = {
      id: Date.now(),
      ...exercise
    };
    exercises.push(newExercise);
    localStorage.setItem('gymExercises', JSON.stringify(exercises));
    return newExercise;
  }

  // Schedule Management
  addExerciseToUserSchedule(userId, exerciseId, scheduleData = {}) {
    const users = this.getUsers();
    const exercises = this.getExercises();
    const exercise = exercises.find(ex => ex.id === exerciseId);
    
    if (exercise) {
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          const schedule = [...(user.schedule || [])];
          const existingIndex = schedule.findIndex(ex => ex.id === exerciseId);
          
          if (existingIndex >= 0) {
            // Update existing exercise in schedule
            schedule[existingIndex] = { ...exercise, ...scheduleData };
          } else {
            // Add new exercise to schedule
            schedule.push({ ...exercise, ...scheduleData });
          }
          
          return { ...user, schedule };
        }
        return user;
      });
      
      localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
      return this.getUserById(userId);
    }
    return null;
  }

  removeExerciseFromUserSchedule(userId, exerciseId) {
    const users = this.getUsers();
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const schedule = (user.schedule || []).filter(ex => ex.id !== exerciseId);
        return { ...user, schedule };
      }
      return user;
    });
    
    localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    return this.getUserById(userId);
  }

  // Nutrition Management
  updateUserNutritionPlan(userId, nutritionPlan) {
    return this.updateUser(userId, { nutritionPlan });
  }

  // Attendance Management
  markUserAttendance(userId, date = null) {
    const attendanceDate = date || new Date().toISOString().split('T')[0];
    const users = this.getUsers();
    
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const attendance = [...(user.attendance || [])];
        if (!attendance.includes(attendanceDate)) {
          attendance.push(attendanceDate);
        }
        return { ...user, attendance };
      }
      return user;
    });
    
    localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    return this.getUserById(userId);
  }

  // Payment Management
  updateUserPaymentStatus(userId, paymentStatus, paymentDate = null) {
    const updateData = { 
      paymentStatus,
      lastPayment: paymentDate || new Date().toISOString().split('T')[0]
    };
    return this.updateUser(userId, updateData);
  }

  // Fitness Data Management
  addUserFitnessData(userId, fitnessData) {
    const users = this.getUsers();
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const fitnessDataArray = [...(user.fitnessData || [])];
        const newEntry = {
          id: Date.now(),
          ...fitnessData
        };
        fitnessDataArray.push(newEntry);
        return { ...user, fitnessData: fitnessDataArray };
      }
      return user;
    });
    
    localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    return this.getUserById(userId);
  }

  updateUserFitnessData(userId, entryId, fitnessData) {
    const users = this.getUsers();
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const fitnessDataArray = (user.fitnessData || []).map(entry =>
          entry.id === entryId ? { ...entry, ...fitnessData } : entry
        );
        return { ...user, fitnessData: fitnessDataArray };
      }
      return user;
    });
    
    localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    return this.getUserById(userId);
  }

  deleteUserFitnessData(userId, entryId) {
    const users = this.getUsers();
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const fitnessDataArray = (user.fitnessData || []).filter(entry => entry.id !== entryId);
        return { ...user, fitnessData: fitnessDataArray };
      }
      return user;
    });
    
    localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    return this.getUserById(userId);
  }

  // Statistics
  getGymStats() {
    const users = this.getUsers();
    const exercises = this.getExercises();
    
    return {
      totalUsers: users.length,
      activeUsers: users.filter(user => user.membershipStatus === 'Active').length,
      paidUsers: users.filter(user => user.paymentStatus === 'Paid').length,
      pendingPayments: users.filter(user => user.paymentStatus === 'Pending').length,
      totalExercises: exercises.length,
      todayAttendance: users.filter(user => {
        const today = new Date().toISOString().split('T')[0];
        return (user.attendance || []).includes(today);
      }).length
    };
  }
}

// Export singleton instance
export default new GymService();
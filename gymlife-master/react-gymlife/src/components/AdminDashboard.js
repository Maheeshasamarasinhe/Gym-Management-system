import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { membersAPI, exercisesAPI, trainersAPI, attendanceAPI, paymentsAPI, nutritionAPI, scheduleAPI } from '../services/api';

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [stats, setStats] = useState({});
  const [newExercise, setNewExercise] = useState({ name: '', steps: 0, rounds: 0, image_url: '', video_url: '' });
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [scheduleData, setScheduleData] = useState({ sets: '', reps: '', notes: '' });

  // Load data from service
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersRes, exercisesRes] = await Promise.all([
        membersAPI.getAll(),
        exercisesAPI.getAll(),
      ]);
      setUsers(usersRes.data);
      setExercises(exercisesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const markAttendance = async (userId) => {
    try {
      await attendanceAPI.create({ member_id: userId, attend_date: new Date().toISOString().split('T')[0] });
      loadData();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const updatePaymentStatus = async (userId, status) => {
    try {
      await paymentsAPI.create({ member_id: userId, payment_date: new Date().toISOString().split('T')[0], payment_month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }), status: status });
      loadData();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const addExerciseToUser = async (userId, exerciseId) => {
    try {
      await scheduleAPI.create({
        member_id: userId,
        exercise_name: exercises.find(e => e.id === exerciseId)?.name || '',
        steps: parseInt(scheduleData.sets) || 0,
        rounds: parseInt(scheduleData.notes) || 0
      });
      setScheduleData({ sets: '', notes: '' });
      loadData();
      if (selectedUser && selectedUser.id === userId) {
        const userRes = await membersAPI.getById(userId);
        setSelectedUser(userRes.data);
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const removeExerciseFromUser = async (userId, exerciseId) => {
    try {
      await scheduleAPI.remove(exerciseId);
      loadData();
      if (selectedUser && selectedUser.id === userId) {
        const userRes = await membersAPI.getById(userId);
        setSelectedUser(userRes.data);
      }
    } catch (error) {
      console.error('Error removing exercise:', error);
    }
  };

  const updateNutritionPlan = async (userId, plan) => {
    try {
      await nutritionAPI.create({ member_id: userId, ...plan });
      loadData();
      if (selectedUser && selectedUser.id === userId) {
        const userRes = await membersAPI.getById(userId);
        setSelectedUser(userRes.data);
      }
    } catch (error) {
      console.error('Error updating nutrition plan:', error);
    }
  };

  const addNewExercise = async () => {
    try {
      if (newExercise.name) {
        await exercisesAPI.create(newExercise);
        setNewExercise({ name: '', steps: 0, rounds: 0, image_url: '', video_url: '' });
        setShowAddExercise(false);
        loadData();
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  return (
    <div style={{ background: '#151515', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#ffffff' }}>Admin Dashboard</h2>
              <div>
                <span style={{ color: '#c4c4c4', marginRight: '20px' }}>Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="primary-btn">Logout</button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="row" style={{ marginBottom: '30px' }}>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div style={{ background: '#902828ff', padding: '20px', border: '1px solid #363636', textAlign: 'center' }}>
                  <h3 style={{ color: '#f36100', margin: '0' }}>{stats.totalUsers}</h3>
                  <p style={{ color: '#c4c4c4', margin: '5px 0 0 0' }}>Total Users</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636', textAlign: 'center' }}>
                  <h3 style={{ color: '#4CAF50', margin: '0' }}>{stats.activeUsers}</h3>
                  <p style={{ color: '#c4c4c4', margin: '5px 0 0 0' }}>Active Members</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636', textAlign: 'center' }}>
                  <h3 style={{ color: '#4CAF50', margin: '0' }}>{stats.paidUsers}</h3>
                  <p style={{ color: '#c4c4c4', margin: '5px 0 0 0' }}>Paid Users</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636', textAlign: 'center' }}>
                  <h3 style={{ color: '#f36100', margin: '0' }}>{stats.pendingPayments}</h3>
                  <p style={{ color: '#c4c4c4', margin: '5px 0 0 0' }}>Pending Payments</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636', textAlign: 'center' }}>
                  <h3 style={{ color: '#f36100', margin: '0' }}>{stats.totalExercises}</h3>
                  <p style={{ color: '#c4c4c4', margin: '5px 0 0 0' }}>Total Exercises</p>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636', textAlign: 'center' }}>
                  <h3 style={{ color: '#4CAF50', margin: '0' }}>{stats.todayAttendance}</h3>
                  <p style={{ color: '#c4c4c4', margin: '5px 0 0 0' }}>Today's Attendance</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ marginBottom: '30px' }}>
              <button 
                onClick={() => setActiveTab('users')}
                className={`primary-btn ${activeTab === 'users' ? '' : 'btn-normal'}`}
                style={{ marginRight: '10px', background: activeTab === 'users' ? '#f36100' : '#363636' }}
              >
                User Management
              </button>
              <button 
                onClick={() => setActiveTab('exercises')}
                className={`primary-btn ${activeTab === 'exercises' ? '' : 'btn-normal'}`}
                style={{ marginRight: '10px', background: activeTab === 'exercises' ? '#f36100' : '#363636' }}
              >
                Exercise Library
              </button>
              <button 
                onClick={() => setActiveTab('attendance')}
                className={`primary-btn ${activeTab === 'attendance' ? '' : 'btn-normal'}`}
                style={{ background: activeTab === 'attendance' ? '#f36100' : '#363636' }}
              >
                Attendance
              </button>
            </div>

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div>
                <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>User Management</h3>
                <div className="row">
                  {users.map(user => (
                    <div key={user.id} className="col-lg-6 col-md-12" style={{ marginBottom: '20px' }}>
                      <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636' }}>
                        <h5 style={{ color: '#ffffff' }}>{user.name}</h5>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Email: {user.email}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Phone: {user.phone}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>
                          Payment Status: 
                          <span style={{ color: user.paymentStatus === 'Paid' ? '#4CAF50' : '#f36100', marginLeft: '5px' }}>
                            {user.paymentStatus}
                          </span>
                        </p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Weight: {user.weight} | Height: {user.height}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Fitness Level: {user.fitnessLevel}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Attendance: {(user.attendance || []).length} days</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Exercises: {(user.schedule || []).length}</p>
                        
                        <div style={{ marginTop: '15px' }}>
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="primary-btn"
                            style={{ marginRight: '10px', fontSize: '12px', padding: '8px 15px' }}
                          >
                            Manage Schedule
                          </button>
                          <button 
                            onClick={() => updatePaymentStatus(user.id, user.paymentStatus === 'Paid' ? 'Pending' : 'Paid')}
                            className="primary-btn btn-normal"
                            style={{ fontSize: '12px', padding: '8px 15px', background: '#363636' }}
                          >
                            Toggle Payment
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exercise Library Tab */}
            {activeTab === 'exercises' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: '#ffffff' }}>Exercise Library</h3>
                  <button 
                    onClick={() => setShowAddExercise(true)}
                    className="primary-btn"
                  >
                    Add New Exercise
                  </button>
                </div>
                <div className="row">
                  {exercises.map(exercise => (
                    <div key={exercise.id} className="col-lg-4 col-md-6" style={{ marginBottom: '20px' }}>
                      <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636' }}>
                        <h5 style={{ color: '#ffffff' }}>{exercise.name}</h5>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Category: {exercise.category}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Difficulty: {exercise.difficulty}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>{exercise.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Attendance Management</h3>
                <div className="row">
                  {users.map(user => (
                    <div key={user.id} className="col-lg-6 col-md-12" style={{ marginBottom: '20px' }}>
                      <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636' }}>
                        <h5 style={{ color: '#ffffff' }}>{user.name}</h5>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>
                          Attendance Days: {(user.attendance || []).length}
                        </p>
                        <button 
                          onClick={() => markAttendance(user.id)}
                          className="primary-btn"
                          style={{ fontSize: '12px', padding: '8px 15px' }}
                        >
                          Mark Today's Attendance
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Schedule Management Modal */}
            {selectedUser && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  background: '#151515',
                  padding: '30px',
                  border: '1px solid #363636',
                  maxWidth: '600px',
                  width: '90%',
                  maxHeight: '80vh',
                  overflowY: 'auto'
                }}>
                  <h4 style={{ color: '#ffffff', marginBottom: '20px' }}>
                    Manage Schedule for {selectedUser.name}
                  </h4>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ color: '#ffffff' }}>Add Exercise:</h5>
                    <select 
                      onChange={(e) => {
                        if (e.target.value) {
                          addExerciseToUser(selectedUser.id, parseInt(e.target.value));
                          e.target.value = '';
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '40px',
                        background: 'transparent',
                        border: '1px solid #363636',
                        color: '#c4c4c4',
                        paddingLeft: '10px',
                        marginBottom: '10px'
                      }}
                    >
                      <option value="">Select Exercise</option>
                      {exercises.map(exercise => (
                        <option key={exercise.id} value={exercise.id} style={{ background: '#151515' }}>
                          {exercise.name} - {exercise.category}
                        </option>
                      ))}
                    </select>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <input
                        type="text"
                        placeholder="Sets (e.g., 3x12)"
                        value={scheduleData.sets}
                        onChange={(e) => setScheduleData({...scheduleData, sets: e.target.value})}
                        style={{
                          flex: 1,
                          height: '35px',
                          background: 'transparent',
                          border: '1px solid #363636',
                          color: '#c4c4c4',
                          paddingLeft: '10px'
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Notes"
                        value={scheduleData.notes}
                        onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                        style={{
                          flex: 2,
                          height: '35px',
                          background: 'transparent',
                          border: '1px solid #363636',
                          color: '#c4c4c4',
                          paddingLeft: '10px'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ color: '#ffffff' }}>Current Schedule:</h5>
                    {(selectedUser.schedule || []).map(exercise => (
                      <div key={exercise.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        color: '#c4c4c4', 
                        padding: '8px 0',
                        borderBottom: '1px solid #363636'
                      }}>
                        <div>
                          <strong>{exercise.name}</strong> ({exercise.category})
                          {exercise.sets && <div style={{ fontSize: '12px' }}>Sets: {exercise.sets}</div>}
                          {exercise.notes && <div style={{ fontSize: '12px' }}>Notes: {exercise.notes}</div>}
                        </div>
                        <button 
                          onClick={() => removeExerciseFromUser(selectedUser.id, exercise.id)}
                          style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            color: '#f36100', 
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {(!selectedUser.schedule || selectedUser.schedule.length === 0) && (
                      <p style={{ color: '#c4c4c4', fontStyle: 'italic' }}>No exercises assigned yet</p>
                    )}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ color: '#ffffff' }}>Nutrition Plan:</h5>
                    <textarea
                      value={selectedUser.nutritionPlan}
                      onChange={(e) => updateNutritionPlan(selectedUser.id, e.target.value)}
                      placeholder="Enter nutrition advice and plan..."
                      style={{
                        width: '100%',
                        height: '100px',
                        background: 'transparent',
                        border: '1px solid #363636',
                        color: '#c4c4c4',
                        padding: '10px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="primary-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Add Exercise Modal */}
            {showAddExercise && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  background: '#151515',
                  padding: '30px',
                  border: '1px solid #363636',
                  maxWidth: '500px',
                  width: '90%'
                }}>
                  <h4 style={{ color: '#ffffff', marginBottom: '20px' }}>Add New Exercise</h4>
                  
                  <input
                    type="text"
                    placeholder="Exercise Name"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                    style={{
                      width: '100%',
                      height: '40px',
                      background: 'transparent',
                      border: '1px solid #363636',
                      color: '#c4c4c4',
                      paddingLeft: '10px',
                      marginBottom: '15px'
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Category (e.g., Chest, Legs, Back)"
                    value={newExercise.category}
                    onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
                    style={{
                      width: '100%',
                      height: '40px',
                      background: 'transparent',
                      border: '1px solid #363636',
                      color: '#c4c4c4',
                      paddingLeft: '10px',
                      marginBottom: '15px'
                    }}
                  />

                  <select
                    value={newExercise.difficulty}
                    onChange={(e) => setNewExercise({...newExercise, difficulty: e.target.value})}
                    style={{
                      width: '100%',
                      height: '40px',
                      background: 'transparent',
                      border: '1px solid #363636',
                      color: '#c4c4c4',
                      paddingLeft: '10px',
                      marginBottom: '15px'
                    }}
                  >
                    <option value="Beginner" style={{ background: '#151515' }}>Beginner</option>
                    <option value="Intermediate" style={{ background: '#151515' }}>Intermediate</option>
                    <option value="Advanced" style={{ background: '#151515' }}>Advanced</option>
                  </select>

                  <textarea
                    placeholder="Description"
                    value={newExercise.description}
                    onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                    style={{
                      width: '100%',
                      height: '80px',
                      background: 'transparent',
                      border: '1px solid #363636',
                      color: '#c4c4c4',
                      padding: '10px',
                      marginBottom: '20px',
                      resize: 'vertical'
                    }}
                  />

                  <div>
                    <button onClick={addNewExercise} className="primary-btn" style={{ marginRight: '10px' }}>
                      Add Exercise
                    </button>
                    <button 
                      onClick={() => setShowAddExercise(false)}
                      className="primary-btn btn-normal"
                      style={{ background: '#363636' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
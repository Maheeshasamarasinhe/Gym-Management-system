import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { progressAPI, notificationsAPI } from '../services/api';

const UserDashboard = () => {
  const { user, logout, isClient } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedule');
  const [userProfile, setUserProfile] = useState({});
  const [fitnessData, setFitnessData] = useState([]);
  const [editingFitness, setEditingFitness] = useState(false);
  const [newFitnessEntry, setNewFitnessEntry] = useState({
    date: '',
    weight: '',
    bodyFat: '',
    muscle: '',
    notes: ''
  });

  // Load user data from service
  useEffect(() => {
    if (user?.id) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const response = await progressAPI.getMyData();
      const userData = response.data;
      setUserProfile(userData);
      setFitnessData(userData.fitnessData || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  if (!isClient) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const addFitnessEntry = async () => {
    try {
      if (newFitnessEntry.date && newFitnessEntry.weight) {
        await progressAPI.add({
          month: newFitnessEntry.date,
          weight: parseFloat(newFitnessEntry.weight),
          chest: parseFloat(newFitnessEntry.muscle) || 0
        });
        setNewFitnessEntry({ date: '', weight: '', bodyFat: '', muscle: '', notes: '' });
        setEditingFitness(false);
        loadUserData();
      }
    } catch (error) {
      console.error('Error adding fitness data:', error);
    }
  };

  const deleteFitnessEntry = async (id) => {
    try {
      await progressAPI.remove(id);
      loadUserData();
    } catch (error) {
      console.error('Error deleting fitness data:', error);
    }
  };

  return (
    <div style={{ background: '#151515', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#ffffff' }}>User Dashboard</h2>
              <div>
                <span style={{ color: '#c4c4c4', marginRight: '20px' }}>Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="primary-btn">Logout</button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ marginBottom: '30px' }}>
              <button 
                onClick={() => setActiveTab('schedule')}
                className={`primary-btn ${activeTab === 'schedule' ? '' : 'btn-normal'}`}
                style={{ marginRight: '10px', background: activeTab === 'schedule' ? '#f36100' : '#363636' }}
              >
                My Schedule
              </button>
              <button 
                onClick={() => setActiveTab('nutrition')}
                className={`primary-btn ${activeTab === 'nutrition' ? '' : 'btn-normal'}`}
                style={{ marginRight: '10px', background: activeTab === 'nutrition' ? '#f36100' : '#363636' }}
              >
                Nutrition Plan
              </button>
              <button 
                onClick={() => setActiveTab('fitness')}
                className={`primary-btn ${activeTab === 'fitness' ? '' : 'btn-normal'}`}
                style={{ marginRight: '10px', background: activeTab === 'fitness' ? '#f36100' : '#363636' }}
              >
                Fitness Data
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`primary-btn ${activeTab === 'profile' ? '' : 'btn-normal'}`}
                style={{ background: activeTab === 'profile' ? '#f36100' : '#363636' }}
              >
                Profile
              </button>
            </div>

            {/* My Schedule Tab */}
            {activeTab === 'schedule' && (
              <div>
                <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>My Workout Schedule</h3>
                <div className="row">
                  {userProfile.schedule?.map(exercise => (
                    <div key={exercise.id} className="col-lg-4 col-md-6" style={{ marginBottom: '20px' }}>
                      <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636' }}>
                        <h5 style={{ color: '#ffffff' }}>{exercise.name}</h5>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Category: {exercise.category}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Sets: {exercise.sets}</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Notes: {exercise.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {(!userProfile.schedule || userProfile.schedule.length === 0) && (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: '#c4c4c4' }}>No exercises assigned yet. Contact your trainer to get a personalized workout plan.</p>
                  </div>
                )}
              </div>
            )}

            {/* Nutrition Plan Tab */}
            {activeTab === 'nutrition' && (
              <div>
                <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>My Nutrition Plan</h3>
                <div style={{ background: '#0a0a0a', padding: '30px', border: '1px solid #363636' }}>
                  {userProfile.nutritionPlan ? (
                    <pre style={{ color: '#c4c4c4', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {userProfile.nutritionPlan}
                    </pre>
                  ) : (
                    <p style={{ color: '#c4c4c4', textAlign: 'center' }}>
                      No nutrition plan assigned yet. Contact your trainer to get a personalized nutrition plan.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Fitness Data Tab */}
            {activeTab === 'fitness' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: '#ffffff' }}>My Fitness Data</h3>
                  <button 
                    onClick={() => setEditingFitness(true)}
                    className="primary-btn"
                  >
                    Add New Entry
                  </button>
                </div>

                <div className="row">
                  {fitnessData.map(entry => (
                    <div key={entry.id} className="col-lg-6 col-md-12" style={{ marginBottom: '20px' }}>
                      <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #363636' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h5 style={{ color: '#ffffff' }}>{entry.date}</h5>
                          <button 
                            onClick={() => deleteFitnessEntry(entry.id)}
                            style={{ background: 'transparent', border: 'none', color: '#f36100', cursor: 'pointer' }}
                          >
                            ✕
                          </button>
                        </div>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Weight: {entry.weight}kg</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Body Fat: {entry.bodyFat}%</p>
                        <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Muscle Mass: {entry.muscle}kg</p>
                        {entry.notes && <p style={{ color: '#c4c4c4', margin: '5px 0' }}>Notes: {entry.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                {fitnessData.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ color: '#c4c4c4' }}>No fitness data recorded yet. Start tracking your progress!</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>My Profile</h3>
                <div className="row">
                  <div className="col-lg-6">
                    <div style={{ background: '#0a0a0a', padding: '30px', border: '1px solid #363636' }}>
                      <h5 style={{ color: '#ffffff', marginBottom: '15px' }}>Personal Information</h5>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>Name: {userProfile.name}</p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>Email: {userProfile.email}</p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>Phone: {userProfile.phone}</p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>Height: {userProfile.height}</p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>Current Weight: {userProfile.weight}</p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>Fitness Level: {userProfile.fitnessLevel}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div style={{ background: '#0a0a0a', padding: '30px', border: '1px solid #363636' }}>
                      <h5 style={{ color: '#ffffff', marginBottom: '15px' }}>Membership Details</h5>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>Join Date: {userProfile.joinDate}</p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>
                        Membership Status: 
                        <span style={{ color: '#4CAF50', marginLeft: '5px' }}>{userProfile.membershipStatus}</span>
                      </p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>
                        Payment Status: 
                        <span style={{ color: userProfile.paymentStatus === 'Paid' ? '#4CAF50' : '#f36100', marginLeft: '5px' }}>
                          {userProfile.paymentStatus}
                        </span>
                      </p>
                      <p style={{ color: '#c4c4c4', margin: '10px 0' }}>
                        Total Attendance: {userProfile.attendance?.length || 0} days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add Fitness Entry Modal */}
            {editingFitness && (
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
                  <h4 style={{ color: '#ffffff', marginBottom: '20px' }}>Add Fitness Entry</h4>
                  
                  <input
                    type="date"
                    value={newFitnessEntry.date}
                    onChange={(e) => setNewFitnessEntry({...newFitnessEntry, date: e.target.value})}
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
                    type="number"
                    placeholder="Weight (kg)"
                    value={newFitnessEntry.weight}
                    onChange={(e) => setNewFitnessEntry({...newFitnessEntry, weight: e.target.value})}
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
                    type="number"
                    placeholder="Body Fat (%)"
                    value={newFitnessEntry.bodyFat}
                    onChange={(e) => setNewFitnessEntry({...newFitnessEntry, bodyFat: e.target.value})}
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
                    type="number"
                    placeholder="Muscle Mass (kg)"
                    value={newFitnessEntry.muscle}
                    onChange={(e) => setNewFitnessEntry({...newFitnessEntry, muscle: e.target.value})}
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

                  <textarea
                    placeholder="Notes (optional)"
                    value={newFitnessEntry.notes}
                    onChange={(e) => setNewFitnessEntry({...newFitnessEntry, notes: e.target.value})}
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
                    <button onClick={addFitnessEntry} className="primary-btn" style={{ marginRight: '10px' }}>
                      Add Entry
                    </button>
                    <button 
                      onClick={() => setEditingFitness(false)}
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

export default UserDashboard;
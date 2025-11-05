import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpertSelection = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const navigate = useNavigate();

  const experts = [
    { id: 1, name: "John Smith", specialty: "Weight Training", image: "/img/team/team-1.jpg" },
    { id: 2, name: "Sarah Johnson", specialty: "Cardio & Fitness", image: "/img/team/team-2.jpg" },
    { id: 3, name: "Mike Wilson", specialty: "Strength Training", image: "/img/team/team-3.jpg" },
    { id: 4, name: "Lisa Brown", specialty: "Yoga & Flexibility", image: "/img/team/team-4.jpg" }
  ];

  const handleSelectExpert = (expert) => {
    setSelectedExpert(expert);
    localStorage.setItem('selectedExpert', JSON.stringify(expert));
    navigate('/pricing?from=expert');
  };

  return (
    <section className="team-section spad">
      <div className="container">
        <div className="section-title">
          <span>Choose Your Expert</span>
          <h2>TRAIN WITH PROFESSIONALS</h2>
        </div>
        <div className="row">
          {experts.map((expert) => (
            <div key={expert.id} className="col-lg-3 col-md-6">
              <div className="ts-item set-bg" style={{ backgroundImage: `url(${expert.image})` }}>
                <div className="ts_text">
                  <h4>{expert.name}</h4>
                  <span>{expert.specialty}</span>
                  <button 
                    onClick={() => handleSelectExpert(expert)}
                    className="primary-btn"
                    style={{ marginTop: '15px', width: '100%' }}
                  >
                    Select Expert
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertSelection;
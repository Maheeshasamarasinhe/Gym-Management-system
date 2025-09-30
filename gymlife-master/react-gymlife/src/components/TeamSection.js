import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Athart Rachel",
      position: "Gym Trainer",
      image: "/img/team/team-1.jpg"
    },
    {
      id: 2,
      name: "Athart Rachel",
      position: "Gym Trainer",
      image: "/img/team/team-2.jpg"
    },
    {
      id: 3,
      name: "Athart Rachel",
      position: "Gym Trainer",
      image: "/img/team/team-3.jpg"
    },
    {
      id: 4,
      name: "Athart Rachel",
      position: "Gym Trainer",
      image: "/img/team/team-4.jpg"
    },
    {
      id: 5,
      name: "Athart Rachel",
      position: "Gym Trainer",
      image: "/img/team/team-5.jpg"
    },
    {
      id: 6,
      name: "Athart Rachel",
      position: "Gym Trainer",
      image: "/img/team/team-6.jpg"
    }
  ];

  return (
    <section className="team-section team-page spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="team-title">
              <div className="section-title">
                <span>Our Team</span>
                <h2>TRAIN WITH EXPERTS</h2>
              </div>
              <button className="primary-btn btn-normal appoinment-btn">appointment</button>
            </div>
          </div>
        </div>
        <div className="row">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-lg-4 col-sm-6">
              <div 
                className="ts-item set-bg" 
                style={{ backgroundImage: `url(${member.image})` }}
              >
                <div className="ts_text">
                  <h4>{member.name}</h4>
                  <span>{member.position}</span>
                  <div className="tt_social">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-youtube-play"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-envelope-o"></i></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
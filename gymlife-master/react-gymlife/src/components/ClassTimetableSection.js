import React from 'react';

const ClassTimetableSection = () => {
  return (
    <section className="class-timetable-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <span>Class timetable</span>
              <h2>Working hours</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="table-controls">
              <ul>
                <li className="active">All Classes</li>
                <li>Cardio</li>
                <li>CrossFit</li>
                <li>Martial Arts</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="class-timetable">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="class-time">6.00am - 8.00am</td>
                    <td className="hover-bg ts-meta">
                      <h5>Weight lifting</h5>
                      <span>RLefew D. Loee</span>
                    </td>
                    <td></td>
                    <td className="hover-bg ts-meta">
                      <h5>Cardio</h5>
                      <span>RLefew D. Loee</span>
                    </td>
                    <td></td>
                    <td className="hover-bg ts-meta">
                      <h5>CrossFit</h5>
                      <span>RLefew D. Loee</span>
                    </td>
                    <td></td>
                    <td className="hover-bg ts-meta">
                      <h5>Martial Arts</h5>
                      <span>RLefew D. Loee</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassTimetableSection;
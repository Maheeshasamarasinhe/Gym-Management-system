import React, { useState } from 'react';

const BMICalculatorSection = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInM = height / 100;
      const bmiValue = (weight / (heightInM * heightInM)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  return (
    <section className="bmi-calculator-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title chart-title">
              <span>Check your body</span>
              <h2>BMI CALCULATOR CHART</h2>
            </div>
            <div className="chart-table">
              <table>
                <thead>
                  <tr>
                    <th>BMI</th>
                    <th>WEIGHT STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="point">Below 18.5</td>
                    <td>Underweight</td>
                  </tr>
                  <tr>
                    <td className="point">18.5 - 24.9</td>
                    <td>Healthy</td>
                  </tr>
                  <tr>
                    <td className="point">25.0 - 29.9</td>
                    <td>Overweight</td>
                  </tr>
                  <tr>
                    <td className="point">30.0 and Above</td>
                    <td>Obese</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-title chart-calculate-title">
              <span>Check your body</span>
              <h2>CALCULATE YOUR BMI</h2>
            </div>
            <div className="chart-calculate-form">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <form onSubmit={calculateBMI}>
                <div className="row">
                  <div className="col-sm-6">
                    <input 
                      type="text" 
                      placeholder="Height / cm" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input 
                      type="text" 
                      placeholder="Weight / kg" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12">
                    <button type="submit">Calculate</button>
                  </div>
                </div>
              </form>
              {bmi && (
                <div className="bmi-result">
                  <h4>Your BMI: {bmi}</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculatorSection;
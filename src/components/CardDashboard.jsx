// Updated CardDashboard.jsx
import React from 'react';
import "../styles/DashboardCss.css"

const CardDashboard = ({ props }) => {
  // Add animation to the number display
  return (
    <div className="dashboard-value">
      {props}
    </div>
  );
};

export default CardDashboard;
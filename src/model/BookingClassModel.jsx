import React from "react";
import "../styles/BookingClassModel.css"; // Import the CSS file

const BookingClassModel = ({tracker, className}) => {
    // Set default values to avoid null/undefined errors
    const attended = tracker?.attended || 0;
    const noShow = tracker?.noShow || 0;
    const waitlist = tracker?.waitlist || 0;
    
    return (
        <div className="booking-model-container">
            <div className="booking-model-card">
                
                <p className="booking-subtitle">Book your next training session</p>

                {/* Card Content */}
                <div className="booking-info-container">
                    <h3 className="booking-title">{className || "Muay Thai Class"}</h3>

                    {/* Row to display the columns */}
                    <div className="booking-stats-row">
                        {/* First Column */}
                        <div className="booking-stat-column">
                            <div className="booking-stat-box">
                                <p className="booking-stat-value">{attended}</p>
                                <p className="booking-stat-label">Attending</p>
                            </div>
                        </div>

                        {/* Second Column */}
                        <div className="booking-stat-column">
                            <div className="booking-stat-box">
                                <p className="booking-stat-value">{noShow}</p>
                                <p className="booking-stat-label">Canceled</p>
                            </div>
                        </div>

                        {/* Third Column */}
                        <div className="booking-stat-column">
                            <div className="booking-stat-box">
                                <p className="booking-stat-value">{waitlist}</p>
                                <p className="booking-stat-label">Waiting</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingClassModel;
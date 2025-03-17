import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    // Disable past dates
    const disablePastDates = ({ date }) => {
        const today = new Date();
        return date < today.setHours(0, 0, 0, 0); // Disable dates before today
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold">Booking Calendar</h2>
            <Calendar 
                onChange={setDate} 
                value={date} 
                className="border p-3 shadow"
                minDate={new Date()} // Prevent selecting past dates
                tileDisabled={disablePastDates} // Visually disable past dates
            />
            <p className="mt-3">Selected Date: {date.toDateString()}</p>
        </div>
    );
};

export default CalendarComponent;

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ selectedDate, setSelectedDate }) => {
    // Disable past dates
    const disablePastDates = ({ date }) => {
        const today = new Date();
        return date < today.setHours(0, 0, 0, 0);
    };

    // Ensure selected date does not have a time component to prevent timezone shifts
    const handleDateChange = (date) => {
        const fixedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        setSelectedDate(fixedDate);
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold">Booking Calendar</h2>
            <Calendar 
                onChange={handleDateChange} 
                value={selectedDate} 
                className="border p-3 shadow"
                minDate={new Date()} // Prevent selecting past dates
                tileDisabled={disablePastDates} // Visually disable past dates
            />
            <p className="mt-3">Selected Date: {selectedDate ? selectedDate.toDateString() : "None"}</p>
        </div>
    );
};

export default CalendarComponent;

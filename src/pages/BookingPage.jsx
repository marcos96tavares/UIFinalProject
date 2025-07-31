import React, { useState, useEffect } from "react";
import SideNavBar from "../components/SideNavBarComp";
import MuyThaiClassComp from "../components/MuyThaiClassComp";
import CalendarComponent from "../components/CalendarComponent ";
import ChatBootComponent from "../components/ChatBootCompoent";
import { listAllClass } from "../api/Booking"; // ✅ API Import
import "../styles/BookingPage.css"; // Import the CSS file
import { getUser } from '../api/User';


const BookingPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [listOfClass, setListOfClass] = useState([]);
    const [trackerData, setTrackerData] = useState([]);
    const [bookedClassId, setBookedClassId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            const selectedDay = selectedDate.toISOString().split("T")[0];
            
            console.log("Fetching classes for:", selectedDay);
            console.log(localStorage.key("userid"))
            try {
                const data = await listAllClass(selectedDay);
                console.log("Fetched Classes:", data);
                
                const extractedClasses = data.map(item => item.muayThaiClassDto);
                const extractedTrackers = data.map(item => ({
                    classId: item.muayThaiClassDto?.classIdDto || null,
                    trackerId: item.classTrackerIdDto || null,
                    
                    attended: item.numberPeopleAttendedClassDto || 0,
                    waitlist: item.numberPeopleOnWaitListDto || 0,
                    noShow: item.numberPeopleDidNotAttendClassDto || 0
                }));
                
                setListOfClass(extractedClasses);
                setTrackerData(extractedTrackers);
                setError(null);
            } catch (error) {
                console.error("Error fetching classes:", error);
                setListOfClass([]);
                setTrackerData([]);
                setError("Failed to load classes");
            } finally {
                setLoading(false);
            }
        };
        
        fetchClasses();
    }, [selectedDate]);

    // Format date for display
    const formatDate = (date) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="booking-page-container">
            <div className="booking-page-layout">
                {/* Sidebar */}
                <div className="booking-sidebar">
                    <SideNavBar />
                </div>

                {/* Main Content */}
                <div className="booking-main-content">
                    <div className="booking-header">
                        <h1>Book Your Classes</h1>
                        <p className="booking-date">
                            Selected date: <span>{formatDate(selectedDate)}</span>
                        </p>
                    </div>

                    <div className="booking-content">
                        {/* Calendar Section */}
                        <div className="booking-calendar-section">
                            <div className="calendar-wrapper">
                                <h2>Select Date</h2>
                                <CalendarComponent 
                                    selectedDate={selectedDate} 
                                    setSelectedDate={setSelectedDate} 
                                />
                            </div>
                        </div>

                        {/* Classes Section */}
                        <div className="booking-classes-section">
                            <h2>Available Classes</h2>
                            
                            {loading ? (
                                <div className="loading-indicator">
                                    <div className="spinner"></div>
                                    <p>Loading classes...</p>
                                </div>
                            ) : error ? (
                                <div className="error-message">
                                    <p>{error}</p>
                                    <button onClick={() => window.location.reload()}>Try Again</button>
                                </div>
                            ) : listOfClass.length > 0 ? (
                                <div className="classes-list">
                                    {listOfClass.map((cls) => {
                                        const tracker = trackerData.find(t => t.classId === cls.classIdDto) || 
                                            { classId: cls.classIdDto };
                                        
                                        return (
                                            <MuyThaiClassComp 
                                                key={cls.classIdDto}  
                                                classData={cls} 
                                                tracker={tracker}  
                                                bookedClassId={bookedClassId} // ✅ Pass down state
                                                setBookedClassId={setBookedClassId} 
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="no-classes-message">
                                    <p>No classes available for this day.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Chatbot */}
            <div className="booking-chatbot">
                <ChatBootComponent />
            </div>
        </div>
    );
};

export default BookingPage;
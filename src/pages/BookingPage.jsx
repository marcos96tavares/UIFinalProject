import React, { useState, useEffect } from "react";
import SideNavBar from "../components/SideNavBarComp";
import MuyThaiClassComp from "../components/MuyThaiClassComp";
import CalendarComponent from "../components/CalendarComponent ";
import ChatBootComponent from "../components/ChatBootCompoent";
import { listAllClass } from "../api/Booking"; // ✅ API Import

const BookingPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [listOfClass, setListOfClass] = useState([]); 
    const [trackerData, setTrackerData] = useState([]); 
    const [bookedClassId, setBookedClassId] = useState(null); // ✅ Track a single booked class

    useEffect(() => {
        const fetchClasses = async () => {
            const selectedDay = selectedDate.toISOString().split("T")[0]; 
            console.log("Fetching classes for:", selectedDay);

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
            } catch (error) {
                console.error("Error fetching classes:", error);
                setListOfClass([]); 
                setTrackerData([]);
            }
        };

        fetchClasses();
    }, [selectedDate]);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2 bg-light p-3">
                    <SideNavBar />
                </div>

                {/* Main Content */}
                <div className="col-md-10 d-flex">
                    {/* Calendar */}
                    <div className="col-md-5 p-3">
                        <CalendarComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    </div>

                    {/* Booking Card */}
                    <div className="col-md-7 p-5">
                        {listOfClass.length > 0 ? (
                            listOfClass.map((cls) => {
                                const tracker = trackerData.find(t => t.classId === cls.classIdDto) || { classId: cls.classIdDto };

                                return (
                                    <MuyThaiClassComp 
                                        key={cls.classIdDto}  
                                        classData={cls} 
                                        tracker={tracker}  
                                        bookedClassId={bookedClassId} // ✅ Pass down state
                                        setBookedClassId={setBookedClassId} 
                                    />
                                );
                            })
                        ) : (
                            <p>No classes available for this day.</p>
                        )}
                    </div>

                    {/* Chatbot */}
                    <div>
                        <ChatBootComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;

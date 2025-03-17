import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa"; // Import chat icon
import SideNavBar from "../components/SideNavBarComp";
import MuyThaiClassComp from "../components/MuyThaiClassComp";
import CalendarComponent from "../components/CalendarComponent ";


const classData = {
    classNameDto: "Beginner Muay Thai",
    classTimeStarDto: "10:00 AM",
    classTimeEndDto: "11:00 AM",
    coachName: "Coach Mike",
    classDuration: 60,
    classLevel: "Beginner",
};

const BookingPage = () => {
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    // Function to send message to LLM backend
    const sendMessage = async () => {
        const res = await fetch("http://localhost:5000/chat", { // Adjust to your LLM backend URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        setResponse(data.reply); // Assuming backend sends { reply: "response text" }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar (Left) */}
                <div className="col-md-2 bg-light p-3">
                    <SideNavBar />
                </div>

                {/* Main Content */}
                <div className="col-md-10 d-flex">
                    {/* Calendar (Left Side) */}
                    <div className="col-md-5 p-3">
                        <CalendarComponent />
                    </div>

                    {/* Booking Card (Right Side) */}
                    <div className="col-md-7 p-5">
                        <MuyThaiClassComp classData={classData} />
                    </div>
                </div>
            </div>

            {/* Chat Button (Floating) */}
            <button 
                className="btn btn-dark rounded-circle position-fixed bottom-3 end-3 p-3 shadow"
                style={{ right: "20px", bottom: "20px" }}
                onClick={() => setShowChat(!showChat)}
            >
                <FaCommentDots size={24} />
            </button>

            {/* Chat Input Box */}
            {showChat && (
                <div className="position-fixed bottom-5 end-3 bg-white shadow-lg p-3 rounded"
                     style={{ width: "300px", right: "20px", bottom: "80px" }}>
                    <textarea 
                        className="form-control mb-2" 
                        rows="2"
                        placeholder="Ask something..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="btn btn-primary w-100" onClick={sendMessage}>
                        Send
                    </button>
                    {response && <p className="mt-2 text-muted">{response}</p>}
                </div>
            )}
        </div>
    );
};

export default BookingPage;

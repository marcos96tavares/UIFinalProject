import React, { useState } from "react";
import axios from "axios";
import { FaCommentDots } from "react-icons/fa";

const ChatBootComponent = () => {
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("userid"));

            if (!userId) {
                console.error("User ID not found in localStorage.");
                return;
            }

            const res = await axios.post("http://localhost:8082/api/ai", {
                message,
                userId,
            });

            console.log("Full response from backend:", res.data); // Debugging output

            if (res.data && res.data.response) {
                setChatHistory((prev) => [...prev, { user: message, bot: res.data.response }]);
                setMessage(""); // Clear input field after sending
            } else {
                setChatHistory((prev) => [...prev, { user: message, bot: "No valid response from AI." }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setChatHistory((prev) => [...prev, { user: message, bot: "Failed to get response. Try again." }]);
        }
    };

    return (
        <div>
            {/* Chat Button */}
            <button
                className="btn btn-dark rounded-circle position-fixed bottom-3 end-3 p-3 shadow"
                style={{ right: "20px", bottom: "20px" }}
                onClick={() => setShowChat(!showChat)}
            >
                <FaCommentDots size={20} />
            </button>

            {/* Chat Box */}
            {showChat && (
                <div
                    className="position-fixed bottom-5 end-3 bg-white shadow-lg p-3 rounded"
                    style={{ width: "400px", right: "20px", bottom: "80px" }}
                >
                    {/* Chat History */}
                    <div
                        className="chat-box"
                        style={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            marginBottom: "10px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        {chatHistory.length === 0 ? (
                            <p className="text-muted text-center">Start a conversation...</p>
                        ) : (
                            chatHistory.map((chat, index) => (
                                <div key={index} style={{ marginBottom: "10px" }}>
                                    {/* User Message */}
                                    <div style={{ textAlign: "right", marginBottom: "5px" }}>
                                        <span
                                            style={{
                                                background: "#007bff",
                                                color: "white",
                                                padding: "8px 12px",
                                                borderRadius: "15px",
                                                display: "inline-block",
                                                maxWidth: "80%",
                                            }}
                                        >
                                            {chat.user}
                                        </span>
                                    </div>

                                    {/* Bot Message */}
                                    <div style={{ textAlign: "left", marginBottom: "5px" }}>
                                        <span
                                            style={{
                                                background: "#e0e0e0",
                                                color: "black",
                                                padding: "8px 12px",
                                                borderRadius: "15px",
                                                display: "inline-block",
                                                maxWidth: "80%",
                                            }}
                                        >
                                            {chat.bot}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Chat Input */}
                    <textarea
                        className="form-control mb-2"
                        style={{ height: "80px" }}
                        rows="2"
                        placeholder="Ask something..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    {/* Send Button */}
                    <button className="btn btn-primary w-100" onClick={sendMessage} disabled={!message.trim()}>
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatBootComponent;

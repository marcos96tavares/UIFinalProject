import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaCommentDots, FaPaperPlane, FaTimes, FaExclamationTriangle } from "react-icons/fa";

const ChatBotComponent = () => {
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const [error, setError] = useState(null);
    const chatBoxRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom of chat when new messages arrive
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatHistory, typing]);

    // Focus on input when chat opens
    useEffect(() => {
        if (showChat && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 300);
        }
    }, [showChat]);

    // Handle Enter key press to send message
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleChat = () => {
        setShowChat(!showChat);
        // Clear error when toggling chat
        if (!showChat) {
            setError(null);
        }
    };

    const sendMessage = async () => {
        if (!message.trim() || loading) return;

        const userMessage = message.trim();
        setMessage("");
        setLoading(true);
        setError(null);

        // Add user message to chat history immediately
        setChatHistory(prev => [...prev, { user: userMessage, bot: null }]);

        // Simulate typing indicator
        setTimeout(() => setTyping(true), 500);

        try {
            // Get user ID with safer parsing and fallback
            let userId = "guest-user";
            try {
                const storedId = localStorage.getItem("userid");
                if (storedId) {
                    // Handle possible JSON format with quotes
                    const parsedId = storedId.replace(/"/g, '');
                    // Make sure it's a valid ID
                    userId = !isNaN(parsedId) ? parsedId : "guest-user";
                }
            } catch (e) {
                console.warn("Error getting user ID from localStorage:", e);
            }

            console.log("Sending message with userId:", userId);

            const res = await axios.post("http://localhost:8082/api/ai", {
                message: userMessage,
                userId: userId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30-second timeout
            });

            setTyping(false);

            // Add bot response with slight delay for natural feel
            setTimeout(() => {
                setChatHistory(prev => [
                    ...prev.filter(msg => msg.user !== userMessage || msg.bot !== null), // Remove placeholder
                    { user: userMessage, bot: res.data?.response || "No response from AI." }
                ]);
                setLoading(false);
            }, 300);

        } catch (error) {
            console.error("Error sending message:", error);
            setTyping(false);
            setError("Failed to get response from AI service. Please try again later.");

            // Update the existing user message with an error response
            setTimeout(() => {
                setChatHistory(prev =>
                    prev.map(chat =>
                        chat.user === userMessage && chat.bot === null
                            ? { ...chat, bot: "Sorry, I couldn't process your request. The service might be unavailable." }
                            : chat
                    )
                );
                setLoading(false);
            }, 300);
        }
    };

    const formatTimestamp = () => {
        const now = new Date();
        return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    };

    return (
        <div className="chat-widget">
            {/* Chat Button with notification dot when closed */}
            <button
                className={`chat-button ${showChat ? 'active' : ''}`}
                onClick={toggleChat}
                style={{
                    position: "fixed",
                    right: "25px",
                    bottom: "25px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#4A6FFF",
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    zIndex: 1000,
                }}
            >
                {showChat ? <FaTimes size={22} /> : <FaCommentDots size={22} />}
                {!showChat && chatHistory.length > 0 && (
                    <span style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        backgroundColor: "#FF4A4A",
                        border: "2px solid white"
                    }}></span>
                )}
            </button>

            {/* Chat Container */}
            <div
                className={`chat-container ${showChat ? 'show' : 'hide'}`}
                style={{
                    position: "fixed",
                    right: "25px",
                    bottom: "100px",
                    width: "380px",
                    height: "520px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    transition: "all 0.3s ease, opacity 0.2s ease",
                    opacity: showChat ? 1 : 0,
                    transform: showChat ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                    transformOrigin: "bottom right",
                    zIndex: 999,
                    visibility: showChat ? "visible" : "hidden",
                }}
            >
                {/* Chat Header */}
                <div style={{
                    padding: "16px 20px",
                    backgroundColor: "#4A6FFF",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px"
                        }}>
                            <FaCommentDots size={18} color="#4A6FFF" />
                        </div>
                        <span>AI Assistant</span>
                    </div>
                    <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: error ? "#FF4A4A" : "#4AFF91",
                        boxShadow: `0 0 0 2px ${error ? "rgba(255, 74, 74, 0.3)" : "rgba(74, 255, 145, 0.3)"}`,
                    }}></div>
                </div>

                {/* Chat Messages Area */}
                <div
                    ref={chatBoxRef}
                    style={{
                        flex: 1,
                        padding: "20px",
                        overflowY: "auto",
                        backgroundColor: "#F8FAFF",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    {/* Global Error Message */}
                    {error && (
                        <div style={{
                            padding: "10px 15px",
                            backgroundColor: "#FFEBEE",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px",
                            borderLeft: "4px solid #FF4A4A"
                        }}>
                            <FaExclamationTriangle color="#FF4A4A" style={{ marginRight: "10px" }} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Welcome Message */}
                    {chatHistory.length === 0 && (
                        <div className="bot-message" style={{
                            alignSelf: "flex-start",
                            backgroundColor: "#EEF2FF",
                            color: "#333",
                            padding: "14px 18px",
                            borderRadius: "18px 18px 18px 4px",
                            maxWidth: "85%",
                            marginBottom: "15px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                            animation: "fadeIn 0.5s ease"
                        }}>
                            <p style={{ margin: 0 }}>Hello! How can I assist you today?</p>
                            <div style={{
                                fontSize: "11px",
                                marginTop: "5px",
                                opacity: 0.7,
                                textAlign: "right"
                            }}>
                                {formatTimestamp()}
                            </div>
                        </div>
                    )}

                    {/* Chat History Messages */}
                    {chatHistory.map((chat, index) => (
                        <React.Fragment key={index}>
                            {/* User Message */}
                            {chat.user && (
                                <div style={{
                                    alignSelf: "flex-end",
                                    backgroundColor: "#4A6FFF",
                                    color: "white",
                                    padding: "14px 18px",
                                    borderRadius: "18px 18px 4px 18px",
                                    maxWidth: "85%",
                                    marginBottom: "15px",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                    animation: "slideInRight 0.3s ease"
                                }}>
                                    <p style={{ margin: 0 }}>{chat.user}</p>
                                    <div style={{
                                        fontSize: "11px",
                                        marginTop: "5px",
                                        opacity: 0.7,
                                        textAlign: "right"
                                    }}>
                                        {formatTimestamp()}
                                    </div>
                                </div>
                            )}

                            {/* Bot Message */}
                            {chat.bot && (
                                <div style={{
                                    alignSelf: "flex-start",
                                    backgroundColor: "#EEF2FF",
                                    color: "#333",
                                    padding: "14px 18px",
                                    borderRadius: "18px 18px 18px 4px",
                                    maxWidth: "85%",
                                    marginBottom: "15px",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                    animation: "slideInLeft 0.3s ease"
                                }}>
                                    <p style={{ margin: 0 }}>{chat.bot}</p>
                                    <div style={{
                                        fontSize: "11px",
                                        marginTop: "5px",
                                        opacity: 0.7,
                                        textAlign: "right"
                                    }}>
                                        {formatTimestamp()}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    {/* Typing indicator */}
                    {typing && (
                        <div style={{
                            alignSelf: "flex-start",
                            backgroundColor: "#EEF2FF",
                            color: "#333",
                            padding: "14px 18px",
                            borderRadius: "18px 18px 18px 4px",
                            maxWidth: "85%",
                            marginBottom: "15px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <div className="typing-indicator" style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px"
                            }}>
                                <div className="dot" style={{
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#4A6FFF",
                                    borderRadius: "50%",
                                    animation: "bounce 1.4s infinite ease-in-out",
                                    animationDelay: "0s"
                                }}></div>
                                <div className="dot" style={{
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#4A6FFF",
                                    borderRadius: "50%",
                                    animation: "bounce 1.4s infinite ease-in-out",
                                    animationDelay: "0.2s"
                                }}></div>
                                <div className="dot" style={{
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#4A6FFF",
                                    borderRadius: "50%",
                                    animation: "bounce 1.4s infinite ease-in-out",
                                    animationDelay: "0.4s"
                                }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div style={{
                    padding: "15px",
                    backgroundColor: "#FFFFFF",
                    borderTop: "1px solid #EAEDF5"
                }}>
                    <div style={{
                        display: "flex",
                        position: "relative"
                    }}>
                        <textarea
                            ref={inputRef}
                            style={{
                                flex: 1,
                                padding: "12px 50px 12px 15px",
                                borderRadius: "24px",
                                border: "1px solid #E1E5EE",
                                resize: "none",
                                outline: "none",
                                fontSize: "15px",
                                lineHeight: "1.4",
                                transition: "border 0.3s ease",
                                height: "60px",
                                fontFamily: "inherit"
                            }}
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading || typing}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!message.trim() || loading || typing}
                            style={{
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                backgroundColor: !message.trim() || loading || typing ? "#E1E5EE" : "#4A6FFF",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: !message.trim() || loading || typing ? "not-allowed" : "pointer",
                                transition: "all 0.3s ease"
                            }}
                        >
                            <FaPaperPlane size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideInRight {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes slideInLeft {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }

                @keyframes bounce {
                    0%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-8px); }
                }

                .chat-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
                }

                textarea:focus {
                    border-color: #4A6FFF;
                    box-shadow: 0 0 0 3px rgba(74, 111, 255, 0.15);
                }
            `}</style>
        </div>
    );
};

export default ChatBotComponent;
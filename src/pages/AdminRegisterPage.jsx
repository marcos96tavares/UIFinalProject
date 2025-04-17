import React, { useState } from "react";
import axios from 'axios';
import { FaExclamationTriangle, FaCheckCircle, FaUser, FaLock } from 'react-icons/fa';

const AdminRegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Update admin state when email or password changes
    const [admin, setAdmin] = useState({
        "email": '',
        "password": ''
    });
    
    // Update admin object when email changes
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setAdmin(prev => ({ ...prev, email: newEmail }));
        
        // Clear error message when user starts typing
        if (message) setMessage('');
    };
    
    // Update admin object when password changes
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setAdmin(prev => ({ ...prev, password: newPassword }));
        
        // Clear error message when user starts typing
        if (message) setMessage('');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Basic validation
            if (!email.trim()) {
                throw new Error("Email is required");
            }
            
            if (!password.trim()) {
                throw new Error("Password is required");
            }
            
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            
            const response = await axios.post(`http://localhost:8081/api/admin/register`, admin);
            const data = response.data;
            setMessage(`Registration successful!`);
            
            // Redirect only if registration is successful
            if (data) {
                setTimeout(() => {
                    window.location.href = '/admin/dashboard';
                }, 1500);
            }
        } catch (error) {
            console.error("Registration error:", error);
            
            // Handle different types of errors
            if (error.response) {
                // The server responded with an error status
                if (error.response.status === 409) {
                    setMessage("This email is already registered");
                } else if (error.response.status === 400) {
                    setMessage(error.response.data.message || "Invalid information provided");
                } else {
                    setMessage(error.response.data.message || "Registration failed. Please try again.");
                }
            } else if (error.request) {
                // The request was made but no response was received
                setMessage("Unable to connect to the server. Please check your internet connection.");
            } else {
                // Something happened in setting up the request
                setMessage(error.message || "Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh', background: '#f8f9fa' }}>
            <div className="card shadow-lg border-0" style={{ width: '450px', borderRadius: '15px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
                            <FaUser size={30} />
                        </div>
                        <h2 className="fw-bold">Admin Registration</h2>
                        <p className="text-muted">Create an admin account to manage the system</p>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Success or Error Alert */}
                        {message && (
                            <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'} d-flex align-items-center mb-4`} role="alert">
                                {message.includes('successful') ? 
                                    <FaCheckCircle className="me-2" size={18} /> : 
                                    <FaExclamationTriangle className="me-2" size={18} />
                                }
                                <div>{message}</div>
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light">
                                    <FaUser className="text-primary" />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light">
                                    <FaLock className="text-primary" />
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Create a secure password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-text">Password must be at least 6 characters long</div>
                        </div>
                        
                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-primary py-2" 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    "Register Admin Account"
                                )}
                            </button>
                            
                            <a href="/admin/login" className="btn btn-outline-secondary py-2">
                                Already have an account? Sign in
                            </a>
                        </div>
                    </form>
                    
                    <p className="mt-4 mb-0 text-center text-muted small">© 2024 Admin Dashboard. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegisterPage;
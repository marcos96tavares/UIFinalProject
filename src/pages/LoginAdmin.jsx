import React, { useState } from "react";
import { loginAdmin } from "../api/LoginApi";
import { FaExclamationTriangle, FaCheckCircle, FaUserShield, FaLock } from 'react-icons/fa';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // Clear error message when user starts typing
        if (message) setMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
            
            const data = await loginAdmin(email, password);
            setMessage(`Login successful!`);
            
            // Redirect only if login is successful
            if (data.accessToken) {
                setTimeout(() => {
                    window.location.href = '/admin/dashboard';
                }, 1500);
            }
        } catch (error) {
            console.error("Login error:", error);
            
            // Handle different types of errors
            if (error.response) {
                // The server responded with an error status
                if (error.response.status === 401) {
                    setMessage("Invalid email or password. Please try again.");
                } else if (error.response.status === 403) {
                    setMessage("You do not have permission to access the admin area.");
                } else {
                    setMessage(error.response.data.message || "Login failed. Please try again.");
                }
            } else if (error.request) {
                // The request was made but no response was received
                setMessage("Unable to connect to the server. Please check your internet connection.");
            } else {
                // Something happened in setting up the request
                setMessage(error.message || "Login failed. Please try again.");
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
                            <FaUserShield size={30} />
                        </div>
                        <h2 className="fw-bold">Admin Login</h2>
                        <p className="text-muted">Sign in to access the admin dashboard</p>
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
                                    <FaUserShield className="text-primary" />
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
                                    placeholder="Enter your password" 
                                    autoComplete="off" 
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                        </div>
    
                        <div className="form-check mb-4">
                            <input className="form-check-input" type="checkbox" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                            </label>
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
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in to Dashboard"
                                )}
                            </button>
                            
                            <a href="/admin/register" className="btn btn-outline-secondary py-2">
                                Need an account? Register
                            </a>
                        </div>
                    </form>
                    
                    <p className="mt-4 mb-0 text-center text-muted small">© 2024 Admin Dashboard. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
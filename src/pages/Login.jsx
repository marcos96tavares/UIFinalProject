import React, { useState } from 'react';
import { login } from '../api/LoginApi';
import { getUser } from '../api/User';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaLock, FaEnvelope, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        if (!email || !password) {
            setError('Please fill in both fields.');
            setLoading(false);
            return;
        }
    
        try {
            const data = await login(email, password);
    
            if (data.accessToken) {
                const user = await getUser(email);
                console.log(user);
    
                setTimeout(() => {
                    window.location.href = '/api/videos';
                }, 3000);
                return;
            } else {
                setError('Login failed. Check your credentials.');
            }
        } catch (error) {
            setError(error.message || 'Login failed. Check your credentials.');
        }
    
        setLoading(false);
    };
    
    return (
        <div className="min-vh-100 d-flex align-items-center" style={{
            background: "linear-gradient(135deg, #172a74 0%, #21a9af 100%)",
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        {loading ? (
                            <div className="text-center bg-white p-5 rounded-4 shadow-lg">
                                <LoadingSpinner />
                                <p className="mt-3 text-muted">Logging you in...</p>
                            </div>
                        ) : (
                            <div className="bg-white p-5 rounded-4 shadow-lg">
                                <div className="text-center mb-4">
                                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                        <FaLock size={24} />
                                    </div>
                                    <h2 className="mt-3 fw-bold">Welcome Back</h2>
                                    <p className="text-muted">Please enter your credentials to continue</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Email Input */}
                                    <div className="mb-4 position-relative">
                                        <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <FaEnvelope className="text-primary" />
                                            </span>
                                            <input 
                                                type="email" 
                                                className="form-control border-start-0 ps-0"
                                                id="email" 
                                                placeholder="name@example.com" 
                                                autoComplete="off" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-4 position-relative">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                            <a href="#" className="text-decoration-none small text-primary">Forgot Password?</a>
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <FaLock className="text-primary" />
                                            </span>
                                            <input 
                                                type="password" 
                                                className="form-control border-start-0 ps-0" 
                                                id="password" 
                                                placeholder="Enter your password" 
                                                autoComplete="off" 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Remember Me */}
                                    <div className="form-check mb-4">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="rememberMe" 
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe">
                                            Remember me
                                        </label>
                                    </div>

                                    {/* Enhanced Error Message Alert */}
                                    {error && (
                                        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                                            <FaExclamationTriangle className="flex-shrink-0 me-2" />
                                            <div>
                                                {error === 'Login failed. Check your credentials.' ? 
                                                    'Invalid credentials. Please check your email and password.' : 
                                                    error}
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button 
                                        className="btn btn-primary w-100 py-2 mb-4 position-relative" 
                                        type="submit"
                                        style={{
                                            transition: 'all 0.3s ease',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <span>Sign In</span>
                                        <FaArrowRight className="position-absolute" style={{ right: '20px' }} />
                                    </button>
                                    
                                    <div className="text-center">
                                        <p className="text-muted mb-0">Don't have an account? <a href="/register" className="text-primary text-decoration-none fw-semibold">Create one</a></p>
                                    </div>
                                </form>
                                <p className="mt-4 mb-0 text-center text-muted small">© 2024 Team Shark. All rights reserved.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
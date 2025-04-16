import React, { useState } from "react";
import axios from 'axios';

const AdminRegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
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
    };
    
    // Update admin object when password changes
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setAdmin(prev => ({ ...prev, password: newPassword }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8081/api/admin/register`, admin);
            const data = response.data;
            setMessage(`Registration successful!`);
            
            // Redirect only if registration is successful
            if (data) {
                window.location.href = '/admin/dashboard';
            }
        } catch (error) {
            setMessage(error.message || 'Registration failed. Check your credentials.');
        }
    };
    
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ width: '400px' }}>
                <h1 className="h3 mb-3 fw-normal text-center">Admin Registration</h1>
                
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        autoComplete="off"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        autoComplete="off"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                
                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                
                <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
                
                {message && (
                    <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'} mt-3`}>
                        {message}
                    </div>
                )}
                
                <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2024</p>
            </form>
        </div>
    );
};

export default AdminRegisterPage;
import React, { useRef, useState, useEffect } from "react";
import {loginAdmin} from "../api/LoginApi"





const LoginAdmin = () => {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [message, setMessage] = useState('');
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const data = await loginAdmin(email, password);
                setMessage(`Login successful! Token: ${data.accessToken}`);
                
                // Redirect only if login is successful
                if (data.accessToken) {
                    window.location.href = '/api/videos';
                }
            } catch (error) {
                setMessage(error.message || 'Login failed. Check your credentials.');
            }
        };
    
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
               
                <form onSubmit={handleSubmit} style={{ width: '400px' }}>
                    <h1 className="h3 mb-3 fw-normal text-center">Please sign in Admin</h1>
    
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com" 
                            autoComplete="off" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
    
                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    <p className="text-center mt-3">{message}</p>
                    <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2024</p>
                </form>
            </div>
        );
    

}


export default LoginAdmin;
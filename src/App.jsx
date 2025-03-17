import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Video from './pages/VideoPage';
import BookingPage from './pages/BookingPage';



export default function App() {
    return (
        <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element ={<Register />} />
            <Route path="/api/videos" element={<Video />} />
            <Route path="/api/booking" element={<BookingPage />} />
        </Routes>
    </Router>    
    
);
}
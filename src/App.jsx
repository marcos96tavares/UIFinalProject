import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Video from './pages/VideoPage';
import BookingPage from './pages/BookingPage';
import SettingPage from './pages/SettingPage';
import PaymentPage from './pages/PaymentPage';
import LoginAdmin from './pages/LoginAdmin';
import ClassesAdminPage from './pages/ClassesAdminPage';
import Dashboard from './pages/Dashboard';
import Page404 from './pages/Page404';
import VideoAdminPage from './pages/VideoAdminPage';
import AdminRegisterPage from './pages/AdminRegisterPage';


export default function App() {
    return (
        <Router>
        <Routes>
        {/*This is the Client side*/}
             
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element ={<Register />} />
            <Route path="/api/videos" element={<Video />} />
            <Route path="/api/booking" element={<BookingPage />} />
            <Route path="/api/setting" element={<SettingPage />} />
            <Route path="/payments" element={<PaymentPage />} />

           {/*This is the Admin side*/}
           <Route path="/admin/login" element={<LoginAdmin />} />
           <Route path="/admin/class" element={<ClassesAdminPage />} />
           <Route path="/admin/dashboard" element={<Dashboard />} />
           <Route path="/admin/video" element={<VideoAdminPage />} />
           <Route path="/admin/register" element={<AdminRegisterPage />} />

           <Route path='*' element={<Page404 />} />

        </Routes>
    </Router>    
    
);
}
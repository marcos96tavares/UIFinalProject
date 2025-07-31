import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaCreditCard, FaVideo, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { GiSharkJaws } from "react-icons/gi";
import Logout from './Logout';
import "../styles/SideNavBarAdminCss.css"; // Using the admin CSS file

const SideNavBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    
    // Check if route is active
    const isActive = (path) => {
        return location.pathname.startsWith(path) ? 'active' : '';
    };

    return (
        <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo-container">
                    <GiSharkJaws className="logo-icon" />
                    {!collapsed && <span className="logo-text">Team Shark</span>}
                </div>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {collapsed ? <FaBars /> : <FaTimes />}
                </button>
            </div>
            
            <div className="sidebar-divider">
                <span></span>
            </div>
            
            <div className="profile-section">
                <div className="profile-avatar">
                    <span>U</span>
                </div>
                {!collapsed && (
                    <div className="profile-info">
                        <h5>User</h5>
                        <p>Member</p>
                    </div>
                )}
            </div>
            
            <div className="sidebar-divider">
                <span></span>
            </div>
            
            <div className="sidebar-menu">
                <h6 className={`menu-category ${collapsed ? 'collapsed-text' : ''}`}>MENU</h6>
                <ul className="nav-links">
                    <li className={isActive('/api/booking')}>
                        <Link to="/api/booking">
                            <div className="icon-container">
                                <FaCalendarAlt />
                            </div>
                            {!collapsed && <span>Booking Classes</span>}
                            {!collapsed && isActive('/api/booking') && <div className="active-indicator"></div>}
                        </Link>
                    </li>
                    <li className={isActive('/payments')}>
                        <Link to="/payments">
                            <div className="icon-container">
                                <FaCreditCard />
                            </div>
                            {!collapsed && <span>Payments</span>}
                            {!collapsed && isActive('/payments') && <div className="active-indicator"></div>}
                        </Link>
                    </li>
                    <li className={isActive('/api/videos')}>
                        <Link to="/api/videos">
                            <div className="icon-container">
                                <FaVideo />
                            </div>
                            {!collapsed && <span>Videos</span>}
                            {!collapsed && isActive('/api/videos') && <div className="active-indicator"></div>}
                        </Link>
                    </li>
                </ul>
                
                <h6 className={`menu-category ${collapsed ? 'collapsed-text' : ''}`}>SETTINGS</h6>
                <ul className="nav-links">
                    <li className={isActive('/api/setting')}>
                        <Link to="/api/setting">
                            <div className="icon-container">
                                <FaCog />
                            </div>
                            {!collapsed && <span>Settings</span>}
                            {!collapsed && isActive('/api/setting') && <div className="active-indicator"></div>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="logout-btn">
                            <div className="icon-container">
                                <FaSignOutAlt />
                            </div>
                            {!collapsed && <span>Logout</span>}
                        </Link>
                    </li>
                </ul>
            </div>
            
            <div className="sidebar-footer">
                {!collapsed && (
                    <div className="user-status">
                        <span className="status-dot"></span>
                        <span>Online</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideNavBar;
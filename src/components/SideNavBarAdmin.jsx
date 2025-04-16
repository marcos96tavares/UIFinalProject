import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaChartLine, FaUser, FaBars, FaTimes, FaVideo } from 'react-icons/fa';
import { GiSharkJaws } from "react-icons/gi";
import Logout from './Logout';
import "../styles/SideNavBarAdminCss.css";

const SideNavBarAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    
    // Check if route is active
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
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
                    <span>A</span>
                </div>
                {!collapsed && (
                    <div className="profile-info">
                        <h5>Admin User</h5>
                        <p>Administrator</p>
                    </div>
                )}
            </div>
            
            <div className="sidebar-divider">
                <span></span>
            </div>
            
            <div className="sidebar-menu">
                <h6 className={`menu-category ${collapsed ? 'collapsed-text' : ''}`}>MENU</h6>
                <ul className="nav-links">
                    <li className={isActive('/admin/dashboard')}>
                        <Link to="/admin/dashboard">
                            <div className="icon-container">
                                <FaChartLine />
                            </div>
                            {!collapsed && <span>Dashboard</span>}
                            {!collapsed && isActive('/admin/dashboard') && <div className="active-indicator"></div>}
                        </Link>
                    </li>
                    <li className={isActive('/admin/class')}>
                        <Link to="/admin/class">
                            <div className="icon-container">
                                <FaCalendarAlt />
                            </div>
                            {!collapsed && <span>Classes</span>}
                            {!collapsed && isActive('/admin/class') && <div className="active-indicator"></div>}
                        </Link>
                    </li>
                    <li className={isActive('/admin/videos')}>
                        <Link to="/admin/video">
                            <div className="icon-container">
                                <FaVideo />
                            </div>
                            {!collapsed && <span>Videos</span>}
                            {!collapsed && isActive('/admin/videos') && <div className="active-indicator"></div>}
                        </Link>
                    </li>
                </ul>
                
                <h6 className={`menu-category ${collapsed ? 'collapsed-text' : ''}`}>ACCOUNT</h6>
                <ul className="nav-links">
                    <li>
                        <Logout customClass="logout-btn" collapsed={collapsed} />
                    </li>
                </ul>
            </div>
            
            <div className="sidebar-footer">
                {!collapsed && (
                    <div className="admin-status">
                        <span className="status-dot"></span>
                        <span>Active Session</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideNavBarAdmin;
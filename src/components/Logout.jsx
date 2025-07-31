
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = ({ customClass, collapsed }) => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <button onClick={handleLogout} className={customClass}>
            <div className="icon-container">
                <FaSignOutAlt />
            </div>
            {!collapsed && <span>Logout</span>}
        </button>
    );
};

export default Logout;
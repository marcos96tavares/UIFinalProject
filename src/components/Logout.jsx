import React from 'react';
import { FaDoorOpen } from "react-icons/fa";


const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userid');
        window.location.href = '/home';
    };

    return (
        <div className="position-fixed bottom-0 m-1">

            <button 
            
                className="btn btn-danger px-4 fw-semibold shadow"
                onClick={handleLogout}
            >
            <FaDoorOpen className='icon' />
            
            <div className='text'> Logout</div>
            </button>
        </div>
    );
};

export default Logout;

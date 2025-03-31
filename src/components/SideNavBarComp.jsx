import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideNavBar.css';
import { FaCalendarAlt, FaCreditCard, FaVideo, FaCog } from 'react-icons/fa';
import Logout from './Logout';
import { GiSharkJaws } from "react-icons/gi";

const SideNavBar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <GiSharkJaws className='icon' />
                <span className="fs-4 ps-2">Team Shark</span>

            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/api/booking" className="nav-link custom-link">
                        <FaCalendarAlt className="icon" />
                        <span>Booking Classes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/payments" className="nav-link custom-link">
                        <FaCreditCard className="icon" />
                        <span>Payments</span>
                    </Link>
                </li>
                <li>
                    <Link to="/api/videos" className="nav-link custom-link">
                        <FaVideo className="icon" />
                        <span>Videos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/api/setting" className="nav-link custom-link">
                        <FaCog className="icon" />
                        <span>Settings</span>
                    </Link>
                </li>


                <li>
                    <Logout />
                </li>
            </ul>
        </div>
    );
};

export default SideNavBar;

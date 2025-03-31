import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideNavBar.css';
import { FaCalendarAlt, FaChartLine, FaUser} from 'react-icons/fa';
import { GiSharkJaws } from "react-icons/gi";
import Logout from './Logout';


const SideNavBarAdmin = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
             <GiSharkJaws className='icon' />
                <span className="fs-4 ps-2">Team Shark</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/admin/class" className="nav-link custom-link">
                        <FaCalendarAlt className="icon" />
                        <span>Classes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/dashboard" className="nav-link custom-link">
                        <FaChartLine className="icon" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Logout />
                </li>
            </ul>
        </div>
    );
};

export default SideNavBarAdmin;

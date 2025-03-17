import React from "react";
import { FaUser, FaClock, FaSignal } from "react-icons/fa"; // Icons for details

const MuyThaiClassComp = ({ classData }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row align-items-center"> {/* Ensure elements are aligned in the same row */}
                    
                    {/* Class Info (Left Side) */}
                    <div className="col-8">
                        <h3 className="text-lg font-semibold">{classData.classNameDto}</h3>
                        <p className="text-gray-500">{classData.classTimeStarDto} - {classData.classTimeEndDto}</p>

                        <div className="d-flex gap-3 mt-1 text-gray-600 text-sm">
                            <span className="d-flex align-items-center gap-1"><FaUser /> {classData.coachName}</span>
                        </div>
                    </div>

                    {/* Button (Right Side) */}
                    <div className="col-4 text-end"> {/* Aligns button to the right */}
                        <button className="btn btn-dark px-4 py-2">
                            Book Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MuyThaiClassComp;

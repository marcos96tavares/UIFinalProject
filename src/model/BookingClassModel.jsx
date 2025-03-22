import React from "react";

const BookingClassModel = ({tracker, className}) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
                
                <p className="text-gray-500 mb-4">Book your next training session</p>

                {/* Card Content */}
                <div className="bg-gray-100 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold">{className}</h3>

                    {/* Row to display the columns */}
                    <div className="row mt-4">
                        {/* First Column */}
                        <div className="col">
                            <div className="text-center bg-gray-200 p-3 rounded-lg">
                                <p className="text-xl font-bold">{tracker.attended}</p>
                                <p className="text-gray-500 text-sm">Attending</p>
                            </div>
                        </div>

                        {/* Second Column */}
                        <div className="col">
                            <div className="text-center bg-gray-200 p-3 rounded-lg">
                                <p className="text-xl font-bold">{tracker.noShow}</p>
                                <p className="text-gray-500 text-sm">Canceled</p>
                            </div>
                        </div>

                        {/* Third Column */}
                        <div className="col">
                            <div className="text-center bg-gray-200 p-3 rounded-lg">
                                <p className="text-xl font-bold">{tracker.waitlist}</p>
                                <p className="text-gray-500 text-sm">Waiting</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingClassModel;

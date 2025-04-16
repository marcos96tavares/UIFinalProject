import React, { useRef, useState, useEffect } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { FaClock, FaUserCheck, FaUserTimes, FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import BookingClassModel from "../model/BookingClassModel";
import Worming from "../model/Worming";
import apiService from "../api/apiService";


const MuyThaiClassComp = ({ classData, tracker }) => {
    const bookingModalRef = useRef(null);
    const cancelModalRef = useRef(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [bookedClassId, setBookedClassId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const studentId = localStorage.getItem("userid");

    useEffect(() => {
        if (studentId && tracker?.trackerId) {
            checkBookingStatus();
        }
    }, [tracker, studentId]);

    const checkBookingStatus = async () => {
        if (!studentId || !tracker?.trackerId) return;

        try {
            const response = await axios.get(`http://localhost:8080/api/booking/check/${studentId}/${tracker.trackerId}`);
            setBookedClassId(response.data ? tracker.trackerId : null);
        } catch (error) {
            console.error("Error checking booking status:", error);
        }
    };

    const handleNoAttend = async () => {
        if (!tracker?.trackerId) return;

        try {
            await apiService.markNoAttend(tracker.trackerId);
            console.log("✅ Marked as did not attend");
        } catch (error) {
            console.error("❌ Failed to mark no attendance");
        }
    };

    const handleAttend = async () => {
        if (!tracker?.trackerId) return;

        try {
            await apiService.markAttend(tracker.trackerId);
            console.log("✅ Marked as attended");
        } catch (error) {
            console.error("❌ Failed to mark attendance");
        }
    };

    const showStatusMessage = (message) => {
        setStatusMessage(message);
        setTimeout(() => setStatusMessage(""), 3000);
    };

    const openModal = (modalRef) => {
        if (modalRef.current) {
            const modalInstance = new Modal(modalRef.current);
            modalInstance.show();
        }
    };

    const closeModal = (modalRef) => {
        if (modalRef.current) {
            const modalInstance = Modal.getInstance(modalRef.current);
            modalInstance?.hide();
        }
    };

    const handleConfirmBooking = async () => {
        if (!studentId || !tracker?.trackerId) {
            showStatusMessage("❌ Booking failed: Missing Student ID or Class ID.");
            return;
        }

        if (bookedClassId !== null) {
            showStatusMessage("⚠️ You already have a booked class! Cancel it before booking another.");
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await axios.post(
                `http://localhost:8080/api/booking/book/${studentId}/${tracker.trackerId}`
            );

            if (response.status === 200 || response.status === 201) {
                setBookedClassId(tracker.trackerId);
                showStatusMessage("✅ Class Booked Successfully!");
                closeModal(bookingModalRef);

                // Wait for attendance to be marked after booking
                await handleAttend();
            } else {
                throw new Error("Failed to book the class");
            }
        } catch (error) {
            console.error("Booking failed:", error);
            showStatusMessage("❌ Booking failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelBooking = async () => {
        if (!studentId || !tracker?.trackerId || bookedClassId !== tracker.trackerId) {
            showStatusMessage("❌ Cancellation failed: No active booking found.");
            return;
        }

        setIsLoading(true);
        
        try {
            await apiService.deleteBooking(studentId, tracker.trackerId);
            await handleNoAttend();
            setBookedClassId(null);
            showStatusMessage("❌ Class Booking Canceled.");
            closeModal(cancelModalRef);
        } catch (error) {
            console.error("Cancellation failed:", error);
            showStatusMessage("❌ Cancellation failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card mb-3 shadow">
            <div className="card-body">
                {statusMessage && <div className="alert alert-info text-center">{statusMessage}</div>}

                <div className="row align-items-center">
                    <div className="col-md-8 col-12">
                        <h3>{classData?.classNameDto || "Unknown Class"}</h3>
                        <p className="d-flex align-items-center">
                            <FaClock className="me-2" />
                            {classData?.classTimeStarDto || "Unknown"} - {classData?.classTimeEndDto || "Unknown"}
                        </p>
                        
                        {/* Class statistics - conditionally rendered */}
                        {tracker && (
                            <div className="class-stats mt-2 d-flex">
                                <div className="stat-badge me-2">
                                    <FaUserCheck className="me-1" /> {tracker.attended || 0} attending
                                </div>
                                {tracker.waitlist > 0 && (
                                    <div className="stat-badge me-2">
                                        <span className="me-1">👥</span> {tracker.waitlist} waiting
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="col-md-4 col-12 d-flex justify-content-md-end justify-content-start mt-md-0 mt-3 gap-2">
                        <button 
                            className={`btn btn-dark ${isLoading ? 'loading' : ''}`}
                            onClick={() => openModal(bookingModalRef)}
                            disabled={bookedClassId !== null || isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <FaCalendarCheck className="me-2" />
                                    Book Now
                                </>
                            )}
                        </button>

                        <button 
                            className={`btn btn-danger ${isLoading ? 'loading' : ''}`}
                            onClick={() => openModal(cancelModalRef)}
                            disabled={bookedClassId === null || isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <FaCalendarTimes className="me-2" />
                                    Cancel
                                </>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Status badge */}
                {bookedClassId === tracker?.trackerId && (
                    <div className="booked-badge">
                        <span>Booked</span>
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            <div ref={bookingModalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Book Your Class</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => closeModal(bookingModalRef)}></button>
                        </div>
                        <div className="modal-body">
                            {tracker?.trackerId ? (
                                <BookingClassModel key={tracker.trackerId} tracker={tracker} className={classData?.classNameDto} />
                            ) : (
                                <p className="text-danger">⚠️ Missing Class ID!</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal" 
                                onClick={() => closeModal(bookingModalRef)}
                                disabled={isLoading}>
                                Close
                            </button>
                            <button 
                                type="button" 
                                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                                onClick={handleConfirmBooking}
                                disabled={bookedClassId !== null || isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    "Confirm Booking"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Modal */}
            <div ref={cancelModalRef} className="modal fade" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Cancel Your Booking</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => closeModal(cancelModalRef)}></button>
                        </div>
                        <div className="modal-body">
                            <Worming />
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                data-bs-dismiss="modal" 
                                onClick={() => closeModal(cancelModalRef)}
                                disabled={isLoading}>
                                Close
                            </button>
                            <button 
                                type="button" 
                                className={`btn btn-danger ${isLoading ? 'loading' : ''}`}
                                onClick={handleCancelBooking}
                                disabled={bookedClassId === null || isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : (
                                    "Confirm Cancellation"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MuyThaiClassComp;
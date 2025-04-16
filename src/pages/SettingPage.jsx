import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaUser, FaEnvelope, FaLock, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import SideNavBar from '../components/SideNavBarComp';
import { updateUser } from "../api/User";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/SettingPage.css";

const SettingPage = () => {
    const navigate = useNavigate();
    const deleteModalRef = useRef(null);
    
    const [UserDto, setUserDto] = useState({
        firstNameDto: '',
        lastNameDto: '',
        emailDto: '',
        passwordDto: ''
    });

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState("");

    // Get user data on component mount
    useEffect(() => {
        // You could fetch current user data here to pre-fill the form
        // For now, we'll leave it empty for the user to fill
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setUserDto({ ...UserDto, [e.target.name]: e.target.value });
        
        // Clear error message when user starts typing
        if (error) setError("");
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle form submission (async for API call)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const id = localStorage.getItem("userid");
        
        try {
            if (!id) {
                throw new Error("User ID not found. Please log in again.");
            }
            
            if (!UserDto.firstNameDto || !UserDto.lastNameDto || !UserDto.emailDto || !UserDto.passwordDto) {
                throw new Error("All fields are required!");
            }

            const response = await updateUser(id, UserDto);
            console.log('Updated User Data:', response);

            setSuccess("Profile updated successfully!");
            
            // Reset form after short delay
            setTimeout(() => {
                handleCancel();
            }, 3000);
            
        } catch (error) {
            console.error("Error updating user:", error);
            setError(error.message || "Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle cancel action (reset form)
    const handleCancel = () => {
        setUserDto({ firstNameDto: '', lastNameDto: '', emailDto: '', passwordDto: '' });
        setError("");
    };

    // Delete account functionality
    const handleDeleteAccount = async () => {
        if (confirmDelete !== "DELETE") {
            setError("Please type DELETE to confirm account deletion");
            return;
        }

        setDeleteLoading(true);
        setError("");

        try {
            const userId = localStorage.getItem("userid");
            
            if (!userId) {
                throw new Error("User ID not found. Please log in again.");
            }

            // Parse the user ID as it's stored as a string in localStorage
            const id = parseInt(userId.replace(/"/g, ''), 10);
            
            if (isNaN(id)) {
                throw new Error("Invalid user ID format. Please log in again.");
            }

            // Make the DELETE request
            await axios.delete(`http://localhost:8081/api/user/${id}`);
            
            setSuccess("Your account has been deleted successfully.");
            
            // Clear local storage
            localStorage.removeItem("userid");
            
            // Redirect to home page after short delay
            setTimeout(() => {
                navigate("/home");
            }, 2000);
            
        } catch (error) {
            console.error("Error deleting account:", error);
            setError(error.message || "Failed to delete account. Please try again.");
        } finally {
            setDeleteLoading(false);
            closeDeleteModal();
        }
    };

    // Open delete confirmation modal
    const openDeleteModal = () => {
        if (deleteModalRef.current) {
            deleteModalRef.current.style.display = "flex";
        }
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        if (deleteModalRef.current) {
            deleteModalRef.current.style.display = "none";
            setConfirmDelete("");
        }
    };

    return (
        <div className="settings-page">
            {/* Sidebar */}
            <div className="settings-sidebar">
                <SideNavBar />
            </div>

            {/* Main Content */}
            <div className="settings-main-content">
                <div className="settings-header">
                    <div className="settings-title">
                        <h1>Account Settings</h1>
                        <p>Update your personal information</p>
                    </div>
                    <button 
                        className="delete-account-button-header" 
                        onClick={openDeleteModal}
                    >
                        <FaTrash className="delete-icon" />
                        <span>Delete Account</span>
                    </button>
                </div>

                {/* Alert Messages */}
                {error && (
                    <div className="settings-alert settings-alert-error">
                        <p>{error}</p>
                    </div>
                )}
                
                {success && (
                    <div className="settings-alert settings-alert-success">
                        <p>{success}</p>
                    </div>
                )}

                <div className="settings-card">
                    <div className="settings-card-header">
                        <h2>Personal Information</h2>
                        <p>Update your account details</p>
                    </div>

                    <form className="settings-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            {/* First Name */}
                            <div className="form-group">
                                <label htmlFor="firstNameDto">
                                    <FaUser className="input-icon" />
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstNameDto"
                                    name="firstNameDto"
                                    value={UserDto.firstNameDto}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="form-group">
                                <label htmlFor="lastNameDto">
                                    <FaUser className="input-icon" />
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastNameDto"
                                    name="lastNameDto"
                                    value={UserDto.lastNameDto}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="emailDto">
                                <FaEnvelope className="input-icon" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="emailDto"
                                name="emailDto"
                                value={UserDto.emailDto}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group password-group">
                            <label htmlFor="passwordDto">
                                <FaLock className="input-icon" />
                                Password
                            </label>
                            <div className="password-input-container">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="passwordDto"
                                    name="passwordDto"
                                    value={UserDto.passwordDto}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                    tabIndex="-1"
                                >
                                    {passwordVisible ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="cancel-button" 
                                onClick={handleCancel} 
                                disabled={loading}
                            >
                                <FaTimes />
                                <span>Cancel</span>
                            </button>
                            
                            <button 
                                type="submit" 
                                className="save-button" 
                                disabled={loading}
                            >
                                <FaSave />
                                <span>{loading ? "Saving..." : "Save Changes"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Delete Account Confirmation Modal */}
            <div className="delete-modal" ref={deleteModalRef}>
                <div className="delete-modal-content">
                    <div className="delete-modal-header">
                        <h2>Delete Account</h2>
                        <button 
                            className="close-modal-button" 
                            onClick={closeDeleteModal}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="delete-modal-body">
                        <div className="warning-icon">
                            <FaExclamationTriangle />
                        </div>
                        <p className="delete-warning">
                            You are about to delete your account. This action cannot be undone.
                            All your personal information and booking history will be permanently deleted.
                        </p>
                        <p className="delete-confirm-instructions">
                            Please type <strong>DELETE</strong> to confirm:
                        </p>
                        <input
                            type="text"
                            className="delete-confirm-input"
                            value={confirmDelete}
                            onChange={(e) => setConfirmDelete(e.target.value)}
                            placeholder="Type DELETE to confirm"
                        />
                    </div>
                    <div className="delete-modal-footer">
                        <button 
                            className="cancel-delete-button" 
                            onClick={closeDeleteModal}
                            disabled={deleteLoading}
                        >
                            <FaTimes />
                            <span>Cancel</span>
                        </button>
                        <button 
                            className="confirm-delete-button" 
                            onClick={handleDeleteAccount}
                            disabled={confirmDelete !== "DELETE" || deleteLoading}
                        >
                            <FaTrash />
                            <span>{deleteLoading ? "Deleting..." : "Delete My Account"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
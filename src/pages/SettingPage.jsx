import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import SideNavBar from '../components/SideNavBarComp';
import { updateUser } from "../api/User";
import { useNavigate } from "react-router-dom";
import "../styles/SettingPage.css";

const SettingPage = () => {
    const navigate = useNavigate();
    
    const [UserDto, setUserDto] = useState({
        firstNameDto: '',
        lastNameDto: '',
        emailDto: '',
        passwordDto: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

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

    return (
        <div className="settings-page">
            {/* Sidebar */}
            <div className="settings-sidebar">
                <SideNavBar />
            </div>

            {/* Main Content */}
            <div className="settings-main-content">
                <div className="settings-header">
                    <h1>Account Settings</h1>
                    <p>Update your personal information</p>
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
        </div>
    );
};

export default SettingPage;
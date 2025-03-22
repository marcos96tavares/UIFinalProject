import React, { useState } from 'react';
import SideNavBar from '../components/SideNavBarComp';

const SettingPage = () => {
    // ✅ State to hold form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated User Data:', formData);
        // 🔹 Add API call to save user settings here
    };

    // ✅ Handle cancel action
    const handleCancel = () => {
        setFormData({ firstName: '', lastName: '', email: '', password: '' }); // Reset form
    };

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <SideNavBar />

            {/* Main Content */}
            <div className="container d-flex flex-column align-items-center mt-5">
                <h2 className="text-center">Settings</h2>

                <form className="container mt-3 p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
                    <div className="row">
                        {/* First Name */}
                        <div className="col-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="col-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="col-12 mt-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="col-12 mt-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="row mt-4">
                        <div className="col text-center">
                            <button className="btn btn-primary mx-2" type="submit">Save</button>
                            <button className="btn btn-secondary mx-2" type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingPage;

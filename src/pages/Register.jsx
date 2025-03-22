import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    // 🔹 State to store form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        paymentName: "",
        paymentCardNumber: "",
        paymentExpiration: "",
        paymentCVV: "",
    });

    // 🔹 State for handling success/error messages
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // 🔹 Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("📡 Sending registration data:", formData); // Debug log

            // API Call
            const response = await axios.post("http://localhost:8081/api/membership", {
                userId: {
                    
                    firstNameDto: formData.firstName,
                    lastNameDto: formData.lastName,
                    emailDto: formData.email,
                    passwordDto: formData.password,
                },
                paymentId: {
                    paymentNameDto: formData.paymentName,
                    paymentCardNumberDto: formData.paymentCardNumber,
                    ppaymentExpiryDateDtoString: formData.paymentExpiration,
                    paymentCvvDto: formData.paymentCVV,
                    paymentAmountDto: 20, // Fixed price for membership
                },
            });

            console.log("✅ Registration successful:", response.data); // Debug log
            setMessage("Registration successful!");
            setError(null);
        } catch (err) {
            console.error("❌ Error registering user:", err);
            setMessage(null);
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center">Registration</h2>

            {/* Success & Error Messages */}
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}

            <form className="container mt-5" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6">
                        <label className="form-label">First name</label>
                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>

                    <div className="col-6">
                        <label className="form-label">Last name</label>
                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                </div>

                <hr className="my-5" />
                <h2 className="text-center">Payment</h2>

                <div className="row gy-3">
                    <div className="col-md-6">
                        <label className="form-label">Name on card</label>
                        <input type="text" className="form-control" name="paymentName" value={formData.paymentName} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Credit card number</label>
                        <input type="text" className="form-control" name="paymentCardNumber" value={formData.paymentCardNumber} onChange={handleChange} required />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Expiration</label>
                        <input type="text" className="form-control" name="paymentExpiration" value={formData.paymentExpiration} onChange={handleChange} required />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">CVV</label>
                        <input type="text" className="form-control" name="paymentCVV" value={formData.paymentCVV} onChange={handleChange} required />
                    </div>
                </div>

                <br />
                <button type="submit" className="btn btn-dark">Pay Now £20</button>
            </form>
        </div>
    );
};

export default Register;

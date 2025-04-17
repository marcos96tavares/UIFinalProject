import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  // State to store form data
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

  // State for handling success/error messages
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Move to payment step
  const nextStep = (e) => {
    e.preventDefault();
    
    // Validate first step fields
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return;
    }
    
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return;
    }
    
    if (!formData.email.trim()) {
      setError("Email address is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!formData.password.trim()) {
      setError("Password is required");
      return;
    } else if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    // Clear any errors and proceed to next step
    setError(null);
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  // Back to personal info step
  const prevStep = (e) => {
    e.preventDefault();
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate payment fields
    if (!formData.paymentName.trim()) {
      setError("Name on card is required");
      return;
    }
    
    if (!formData.paymentCardNumber.trim() || formData.paymentCardNumber.replace(/\s/g, '').length < 16) {
      setError("Please enter a valid card number");
      return;
    }
    
    if (!formData.paymentExpiration.trim() || !/^\d{2}\/\d{2}$/.test(formData.paymentExpiration)) {
      setError("Please enter a valid expiration date (MM/YY)");
      return;
    }
    
    if (!formData.paymentCVV.trim() || !/^\d{3,4}$/.test(formData.paymentCVV)) {
      setError("Please enter a valid CVV code");
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      console.log("📡 Sending registration data:", formData);

      // API Call
      const response = await axios.post(
        "http://localhost:8081/api/membership",
        {
          userId: {
            firstNameDto: formData.firstName,
            lastNameDto: formData.lastName,
            emailDto: formData.email,
            passwordDto: formData.password,
          },
          paymentId: {
            paymentNameDto: formData.paymentName,
            paymentCardNumberDto: formData.paymentCardNumber,
            paymentExpiryDateDtoString: formData.paymentExpiration,
            paymentCvvDto: formData.paymentCVV,
            paymentAmountDto: 120, // Fixed price for membership
          },
        }
      );

      console.log("✅ Registration successful:", response.data);
      setMessage("Registration successful! Welcome to our membership.");
      setError(null);
      
      // Small delay to show success message before redirect
      setTimeout(() => {
        window.location.href = "/api/videos";
      }, 2000);
      
    } catch (err) {
      console.error("❌ Error registering user:", err);
      setMessage(null);
      
      // Handle different types of errors
      if (err.response) {
        // The server responded with a status code outside the 2xx range
        if (err.response.status === 409) {
          setError("This email is already registered. Please use a different email address.");
        } else if (err.response.status === 400) {
          setError("Invalid information provided. Please check your details and try again.");
        } else {
          setError(`Registration failed: ${err.response.data.message || "Please try again later."}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError("Unable to connect to the server. Please check your internet connection and try again.");
      } else {
        // Something happened in setting up the request
        setError("Failed to register. Please check your information and try again.");
      }
    }

    setLoading(false);
  };

  // Format credit card number with spaces
  const formatCardNumber = (e) => {
    const input = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formattedInput = input.replace(/(.{4})/g, '$1 ').trim();
    setFormData({ ...formData, paymentCardNumber: formattedInput });
  };

  // Format expiration date MM/YY
  const formatExpiryDate = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    setFormData({ ...formData, paymentExpiration: input });
  };

  // Limit CVV to numbers only
  const handleCvvChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, paymentCVV: input });
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      {loading ? (
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-3 text-muted">Processing your registration...</p>
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                <div className="card-header bg-primary text-white p-4 border-0">
                  <h2 className="mb-0 fw-bold text-center">Membership Registration</h2>
                  <p className="text-center mb-0 opacity-75">Join our exclusive community today</p>
                </div>
                
                <div className="card-body p-4">
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-1">
                      <span className={`fw-semibold ${currentStep === 1 ? 'text-primary' : 'text-muted'}`}>Personal Information</span>
                      <span className={`fw-semibold ${currentStep === 2 ? 'text-primary' : 'text-muted'}`}>Payment Details</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div 
                        className="progress-bar bg-primary" 
                        role="progressbar" 
                        style={{ width: currentStep === 1 ? "50%" : "100%" }} 
                        aria-valuenow={currentStep === 1 ? 50 : 100} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>

                  {/* Success Message - Enhanced Alert */}
                  {message && (
                    <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                      <FaCheckCircle className="flex-shrink-0 me-2" size={20} />
                      <div>{message}</div>
                    </div>
                  )}
                  
                  {/* Error Message - Enhanced Alert */}
                  {error && (
                    <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                      <FaExclamationTriangle className="flex-shrink-0 me-2" size={20} />
                      <div>{error}</div>
                    </div>
                  )}

                  <form onSubmit={currentStep === 1 ? nextStep : handleSubmit}>
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <>
                        <h5 className="card-title mb-4 text-primary">Personal Information</h5>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label fw-semibold">First name</label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="John"
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold">Last name</label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Doe"
                              required
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label fw-semibold">Email address</label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                </svg>
                              </span>
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-12">
                            <label className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                              </span>
                              <input
                                type="password"
                                className="form-control form-control-lg"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                required
                              />
                            </div>
                            <div className="form-text">Password must be at least 8 characters long</div>
                          </div>
                        </div>
                        <div className="d-grid mt-4">
                          <button type="submit" className="btn btn-primary btn-lg py-3">
                            Continue to Payment
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                          </button>
                        </div>
                      </>
                    )}

                    {/* Step 2: Payment Details */}
                    {currentStep === 2 && (
                      <>
                        <h5 className="card-title mb-4 text-primary">Payment Information</h5>
                        
                        <div className="mb-4">
                          <div className="bg-light p-3 rounded-3 d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">Membership Fee</h6>
                              <p className="text-muted mb-0">Annual Premium Membership</p>
                            </div>
                            <div>
                              <span className="badge bg-primary p-2 fs-5">£120.00</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="row g-3">
                          <div className="col-12">
                            <label className="form-label fw-semibold">Name on card</label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              name="paymentName"
                              value={formData.paymentName}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label fw-semibold">Card number</label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                                </svg>
                              </span>
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                name="paymentCardNumber"
                                value={formData.paymentCardNumber}
                                onChange={formatCardNumber}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold">Expiration (MM/YY)</label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              name="paymentExpiration"
                              value={formData.paymentExpiration}
                              onChange={formatExpiryDate}
                              placeholder="MM/YY"
                              maxLength="5"
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label fw-semibold">CVV</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                name="paymentCVV"
                                value={formData.paymentCVV}
                                onChange={handleCvvChange}
                                placeholder="123"
                                maxLength="4"
                                required
                              />
                              <span className="input-group-text" title="3-digit code on back of card">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                          <button 
                            type="button" 
                            className="btn btn-outline-secondary btn-lg px-4" 
                            onClick={prevStep}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            Back
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-success btn-lg px-4"
                          >
                            Complete Payment £120
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle ms-2" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
                
                <div className="card-footer bg-white p-4 border-top">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="text-muted small">
                      <div className="mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock me-1" viewBox="0 0 16 16">
                          <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                          <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                        </svg>
                        Secure payment processing
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle me-1" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                        </svg>
                        Need help? <a href="#" className="text-decoration-none">Contact support</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
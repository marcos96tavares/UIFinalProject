import React, { useState } from 'react';
import { FaCreditCard, FaLock, FaRegCreditCard, FaRegCalendarAlt } from 'react-icons/fa';
import SideNavBar from '../components/SideNavBarComp';
import '../styles/PaymentPage.css';

const PaymentPage = () => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardType, setCardType] = useState('');

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Format expiry date
    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        
        if (v.length >= 2 && v.length < 5) {
            return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
        }
        return value;
    };

    // Detect card type based on first digits
    const detectCardType = (number) => {
        const re = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            discover: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/
        };
        
        if (re.visa.test(number)) {
            return 'visa';
        } else if (re.mastercard.test(number)) {
            return 'mastercard';
        } else if (re.amex.test(number)) {
            return 'amex';
        } else if (re.discover.test(number)) {
            return 'discover';
        } else {
            return '';
        }
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(formatCardNumber(value));
        setCardType(detectCardType(value.replace(/\s+/g, '')));
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value;
        setExpiryDate(formatExpiryDate(value));
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 4) {
            setCvv(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate payment processing
        setTimeout(() => {
            console.log('Payment Details:', { name, cardNumber, expiryDate, cvv });
            setIsSubmitting(false);
            
            // Reset form after submission (in a real app, you'd redirect to a success page)
            alert('Payment successful!');
            setName('');
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
        }, 2000);
    };

    return (
        <div className="payment-page">
            <div className="payment-layout">
                {/* Sidebar */}
                <div className="sidebar-container">
                    <SideNavBar />
                </div>

                {/* Main Content */}
                <div className="payment-content">
                    <div className="payment-header">
                        <div className="header-content">
                            <h1>Payment</h1>
                            <p>Secure payment for your Muay Thai classes</p>
                        </div>
                        <div className="secure-badge">
                            <FaLock />
                            <span>Secure Payment</span>
                        </div>
                    </div>

                    <div className="payment-body">
                        <div className="payment-card-container">
                            <div className="payment-card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <FaCreditCard />
                                        <h2>Payment Details</h2>
                                    </div>
                                    <div className="card-icons">
                                        <span className={`card-icon visa ${cardType === 'visa' ? 'active' : ''}`}></span>
                                        <span className={`card-icon mastercard ${cardType === 'mastercard' ? 'active' : ''}`}></span>
                                        <span className={`card-icon amex ${cardType === 'amex' ? 'active' : ''}`}></span>
                                        <span className={`card-icon discover ${cardType === 'discover' ? 'active' : ''}`}></span>
                                    </div>
                                </div>

                                <form className="payment-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name on Card</label>
                                        <div className="input-icon-wrapper">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="John Smith"
                                                required
                                            />
                                            <FaRegCreditCard className="input-icon" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <div className="input-icon-wrapper">
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                placeholder="0000 0000 0000 0000"
                                                maxLength={19}
                                                required
                                            />
                                            <FaCreditCard className="input-icon" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group half">
                                            <label>Expiry Date</label>
                                            <div className="input-icon-wrapper">
                                                <input
                                                    type="text"
                                                    value={expiryDate}
                                                    onChange={handleExpiryDateChange}
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    required
                                                />
                                                <FaRegCalendarAlt className="input-icon" />
                                            </div>
                                        </div>

                                        <div className="form-group half">
                                            <label>CVV</label>
                                            <div className="input-icon-wrapper">
                                                <input
                                                    type="text"
                                                    value={cvv}
                                                    onChange={handleCvvChange}
                                                    placeholder="123"
                                                    maxLength={4}
                                                    required
                                                />
                                                <span className="input-icon text-icon">CVV</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="payment-summary">
                                        <div className="summary-row">
                                            <span>Class fee</span>
                                            <span>£115.00</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Booking fee</span>
                                            <span>£2.00</span>
                                        </div>
                                        <div className="summary-row">
                                            <span>Tax</span>
                                            <span>£3.00</span>
                                        </div>
                                        <div className="summary-row total">
                                            <span>Total</span>
                                            <span>£120.00</span>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className={`payment-button ${isSubmitting ? 'loading' : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner"></span>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaLock />
                                                <span>Pay £120.00</span>
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="security-note">
                                    <FaLock />
                                    <p>Your payment information is encrypted and secure. We never store your full card details.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
import React, { useState } from 'react';
import SideNavBar from '../components/SideNavBarComp';

const PaymentPage = () => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment Details:', { name, cardNumber, expiryDate, cvv });
    };

    return (
        <div className='container-fluid vh-100'>
            <div className='row h-100'>

                {/* Sidebar */}
                <div className='col-md-2 bg-light p-3'>
                    <SideNavBar />
                </div>

                {/* Payment details section */}
                <div className='col-md-10 d-flex justify-content-center align-items-center'>
                    <div className="card p-4 w-50 shadow-lg">
                        <h2 className="text-center">Payment details</h2>

                        <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="row gy-3">
                                <div className="col-12">
                                    <label className="form-label">Name on card</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Credit card number</label>
                                    <input type="text" className="form-control" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">Expiration</label>
                                    <input type="text" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label">CVV</label>
                                    <input type="text" className="form-control" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <button type="submit" className="btn btn-dark w-100">Pay Now £20</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentPage;

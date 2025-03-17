import React, { useState } from 'react';

const Register = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (

       
        <div className='container d-flex flex-column align-items-center'>
        
            <h2 className='text-center'>Registration</h2>
            <form className='container mt-5' onSubmit={handleSubmit}>
                <div className="row ">
                    <div className="col-6">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" required />
                        <div className="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>
                    

                    <div className="col-6">
                        <label htmlFor="lastName" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" required />
                        <div className="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
                        <div className="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" required />
                        <div className="invalid-feedback">
                            Please enter your password.
                        </div>
                    </div>
                </div>

                <hr className="my-5" />

                <h2 className='text-center'>Payment</h2>
                <div className="row gy-3">
                    <div className="col-md-6">
                        <label htmlFor="cc-name" className="form-label">Name on card</label>
                        <input type="text" className="form-control" id="cc-name" placeholder="" required />
                        <div className="invalid-feedback">
                            Name on card is required
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="cc-number" className="form-label">Credit card number</label>
                        <input type="text" className="form-control" id="cc-number" placeholder="" required />
                        <div className="invalid-feedback">
                            Credit card number is required
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                        <div className="invalid-feedback">
                            Expiration date required
                        </div>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="cc-cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                        <div className="invalid-feedback">
                            Security code required
                        </div>
                    </div>


                </div>

                <br />

                <div className="row">
                    <button  type="submit"  className="btn btn-dark">Pay Now £20</button>
                </div>
            </form>
           
        </div>
        
    );
};

export default Register;

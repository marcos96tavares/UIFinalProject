import React from 'react';


const Contacts = () => {
    return (
        <div className="container ">
            <div className="text-center">
                <h1 className="section-heading text-dark">Contact Us</h1>
                </div>
            <form id="contactForm" data-sb-form-api-token="API_TOKEN" >
                <div className="row align-items-stretch mb-5">
                    <div className="col-md-6">
                        <div className="form-group  border border-3 border-black rounded">
                            <input className="form-control" id="name" type="text" placeholder="Your Name " data-sb-validations="required" autoComplete="off" />
                            <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                        </div>
                        <div className="form-group mt-2 border border-3 border-black rounded">
                            <input className="form-control " id="email" type="email" placeholder="Your Email " data-sb-validations="required,email" />
                            <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                            <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                        </div>
                        <div className="form-group mb-md-0 mt-2 border border-3 border-black rounded">
                            <input className="form-control" id="phone" type="tel" placeholder="Your Phone " data-sb-validations="required" />
                            <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group form-group-textarea mb-md-0 border border-3 border-black rounded">
                            <textarea className="form-control" id="message" placeholder="Your Message " data-sb-validations="required"></textarea>
                            <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary btn-xl text-uppercase " id="submitButton" type="submit">Send Message</button>
                </div>
            </form>
        </div>
    );
};

export default Contacts;
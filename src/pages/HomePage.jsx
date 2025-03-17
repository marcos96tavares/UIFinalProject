import React from "react";
import { useNavigate } from "react-router-dom";
import CarouselComp from "../components/CarouserlComp";
import About from "../components/About";
import Contacts from "../components/Contacts";

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }


    const handleRegisterClick = () => {
        navigate("/register");
    }


    return (
        <div className="bg-light text-white">
            <header className="p-3 text-bg-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a
                            href="/"
                            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
                        >
                            <svg
                                className="bi me-2"
                                width="40"
                                height="32"
                                role="img"
                                aria-label="Bootstrap"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5.062 12.5c-.5 0-.938-.188-1.312-.562-.375-.375-.562-.812-.562-1.312V5.375c0-.5.188-.938.562-1.312.375-.375.812-.562 1.312-.562h3.875c.5 0 .938.188 1.312.562.375.375.562.812.562 1.312v5.25c0 .5-.188.938-.562 1.312-.375.375-.812.562-1.312.562H5.062zm0-1.25h3.875c.188 0 .344-.062.469-.188.125-.125.188-.281.188-.469V5.375c0-.188-.062-.344-.188-.469-.125-.125-.281-.188-.469-.188H5.062c-.188 0-.344.062-.469.188-.125.125-.188.281-.188.469v5.25c0 .188.062.344.188.469.125.125.281.188.469.188z"/>
                            </svg>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <a href="#" className="nav-link px-2 text-dark">
                                    ABOUT
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-2 text-dark">
                                    CONTACTS
                                </a>
                            </li>
                        </ul>

                        <div className="text-end">
                            <button type="button" className="btn btn-outline-success me-2" onClick={handleLoginClick}>
                                Login
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleRegisterClick}>
                                Sign-up
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="position-relative">
                    <CarouselComp />
                    <About />
                    <Contacts />
                </div>
            </main>

            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-body-secondary">© 2024 Company, Inc</p>

                    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                        <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                    </a>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
                    </ul>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;

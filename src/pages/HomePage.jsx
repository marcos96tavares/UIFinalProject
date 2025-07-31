import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarouselComp from "../components/CarouserlComp";
import About from "../components/About";
import Contacts from "../components/Contacts";
import { GiSharkJaws } from "react-icons/gi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Handle navigation
  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  
  // Handle scroll events
  useEffect(() => {

   localStorage.removeItem("userid")

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);


      
      // Show scroll-to-top button after scrolling down
      if (position > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-light text-dark">
      {/* Dynamic Header - changes on scroll */}
      <header className={`p-3 ${scrollPosition > 100 ? "bg-dark text-white fixed-top shadow" : "bg-transparent"} transition-all duration-300`}>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            
            {/* Logo & Name with animation */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="d-flex align-items-center text-decoration-none"
            >
              <GiSharkJaws className={`fs-1 me-2 ${scrollPosition > 100 ? "text-info" : "text-primary"}`} />
              <span className={`fs-4 fw-bold ${scrollPosition > 100 ? "text-white" : "text-dark"}`}>
                Team <span className="text-danger">Shark</span>
              </span>
            </a>

            {/* Navbar Links */}
            <ul className="nav">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  className={`nav-link px-3 fw-bold ${scrollPosition > 100 ? "text-white hover:text-info" : "text-dark hover:text-primary"}`}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contacts");
                  }}
                  className={`nav-link px-3 fw-bold ${scrollPosition > 100 ? "text-white hover:text-info" : "text-dark hover:text-primary"}`}
                >
                  CONTACTS
                </a>
              </li>
            </ul>

            {/* Buttons with hover effects */}
            <div>
              <button 
                type="button" 
                className="btn btn-outline-danger me-2 px-4 fw-semibold" 
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button 
                type="button" 
                className="btn btn-primary px-4 fw-semibold" 
                onClick={handleRegisterClick}
              >
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section overlay with text */}
        <div className="position-relative">
          <CarouselComp />
          <div className="position-absolute top-50 start-0 w-100 text-center translate-middle-y">
            <div className="container">
              <h1 className="display-2 fw-bold text-white shadow-text">TRAIN LIKE A SHARK</h1>
              <p className="lead fs-3 text-white shadow-text mb-4">Unleash your potential with Team Shark Gym</p>
              <button onClick={handleRegisterClick} className="btn btn-danger btn-lg px-5 py-3 fw-bold animate-pulse">
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
        
        {/* Content sections with better spacing */}
        <div className="container my-5 py-5" id="about">
          <About />
        </div>
        
        <div className="bg-dark text-white py-5">
          <div className="container my-5" id="contacts">
            <Contacts />
          </div>
        </div>
        
        {/* Call to action section */}
        <div className="bg-primary text-white py-5">
          <div className="container text-center py-4">
            <h2 className="display-5 mb-4">Ready to start your fitness journey?</h2>
            <p className="lead mb-4">Join Team Shark today and transform your body and mind.</p>
            <div className="d-flex justify-content-center gap-3">
              <button onClick={handleLoginClick} className="btn btn-outline-light btn-lg px-4">
                Login
              </button>
              <button onClick={handleRegisterClick} className="btn btn-light text-primary btn-lg px-4">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <div className="bg-dark text-white">
        <div className="container">
          <footer className="py-5">
            <div className="row">
              <div className="col-md-4 mb-4">
                <h5 className="fw-bold mb-3">Team Shark</h5>
                <p className="text-muted">Experience world-class martial arts training with our expert coaches and state-of-the-art facilities.</p>
                <div className="d-flex gap-3 mt-3">
                  <a href="#" className="text-white fs-4"><FaFacebook /></a>
                  <a href="#" className="text-white fs-4"><FaInstagram /></a>
                  <a href="#" className="text-white fs-4"><FaTwitter /></a>
                </div>
              </div>
              
              <div className="col-md-2 mb-4">
                <h5 className="fw-bold mb-3">Links</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                  <li className="nav-item mb-2"><a href="#about" className="nav-link p-0 text-muted">About</a></li>
                  <li className="nav-item mb-2"><a href="#contacts" className="nav-link p-0 text-muted">Contacts</a></li>
                </ul>
              </div>
              
              <div className="col-md-2 mb-4">
                <h5 className="fw-bold mb-3">Classes</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Muay Thai</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Boxing</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">MMA</a></li>
                  <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">BJJ</a></li>
                </ul>
              </div>
              
              <div className="col-md-4 mb-4">
                <h5 className="fw-bold mb-3">Contact Us</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2 text-muted">123 Shark Street, London</li>
                  <li className="nav-item mb-2 text-muted">Phone: +44 20 1234 5678</li>
                  <li className="nav-item mb-2 text-muted">Email: info@teamshark.com</li>
                </ul>
              </div>
            </div>
            
            <div className="d-flex flex-column flex-sm-row justify-content-between pt-4 mt-4 border-top">
              <p>© 2024 Team Shark, Inc. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
      
      {/* Back to top button */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="btn btn-danger rounded-circle position-fixed bottom-0 end-0 m-4"
          style={{ width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <i className="bi bi-arrow-up"></i>
          ↑
        </button>
      )}
      
      {/* Custom CSS */}
      <style jsx>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
import React, { useState } from "react";
import { createClass } from "../api/ClassApi";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import "../styles/CreateClassModelCss.css";

const CreateClassModal = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    classNameDto: "",
    classTimeStarDto: "",
    classTimeEndDto: "",
    classCapacityDto: "",
    weekDaysDto: "MONDAY",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear error when user makes changes
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      // Validate time inputs
      if (formData.classTimeStarDto >= formData.classTimeEndDto) {
        throw new Error("End time must be after start time");
      }
      
      // Validate capacity
      if (parseInt(formData.classCapacityDto) <= 0) {
        throw new Error("Capacity must be greater than zero");
      }
      
      // Format data for API
      const formattedData = {
        ...formData,
        weekDaysDto: formData.weekDaysDto.toUpperCase(),
      };
  
      const response = await createClass(formattedData);
      console.log("Class created successfully:", response);
      
      // Close modal programmatically
      const modalElement = document.getElementById('createClassModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      
      // Reload page after short delay
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (error) {
      console.error("❌ Error creating class:", error);
      
      // Set specific error messages based on the error
      if (error.response) {
        // The server responded with an error status
        if (error.response.status === 400) {
          setError(error.response.data.message || "Invalid class information provided");
        } else if (error.response.status === 401) {
          setError("You must be logged in to create a class");
        } else if (error.response.status === 403) {
          setError("You don't have permission to create classes");
        } else {
          setError(error.response.data.message || "Failed to create class. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError("Unable to connect to the server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request
        setError(error.message || "Failed to create class. Please check your input.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="modal fade" id="createClassModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Create Class</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {/* Error Alert */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <FaExclamationTriangle className="flex-shrink-0 me-2" />
                <div>{error}</div>
                <button 
                  type="button" 
                  className="btn-close ms-auto" 
                  onClick={() => setError("")}
                  aria-label="Close"
                ></button>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold">Class Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="classNameDto" 
                    value={formData.classNameDto} 
                    onChange={handleChange} 
                    placeholder="Enter class name" 
                    required 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Start Time</label>
                  <input 
                    type="time" 
                    className="form-control" 
                    name="classTimeStarDto" 
                    value={formData.classTimeStarDto} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">End Time</label>
                  <input 
                    type="time" 
                    className="form-control" 
                    name="classTimeEndDto" 
                    value={formData.classTimeEndDto} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Capacity</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="classCapacityDto" 
                    value={formData.classCapacityDto} 
                    onChange={handleChange} 
                    placeholder="Number of participants"
                    min="1"
                    required 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Day of the Week</label>
                  <select 
                    className="form-select" 
                    name="weekDaysDto" 
                    value={formData.weekDaysDto} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="MONDAY">MONDAY</option>
                    <option value="TUESDAY">TUESDAY</option>
                    <option value="WEDNESDAY">WEDNESDAY</option>
                    <option value="THURSDAY">THURSDAY</option>
                    <option value="FRIDAY">FRIDAY</option>
                    <option value="SATURDAY">SATURDAY</option>
                    <option value="SUNDAY">SUNDAY</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer border-top-0">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Class"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
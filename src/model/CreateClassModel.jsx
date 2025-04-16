import React, { useState } from "react";
import { createClass } from "../api/ClassApi";
import { useNavigate } from "react-router-dom";
import "../styles/CreateClassModelCss.css"


const CreateClassModal = () => {
  
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    classNameDto: "",
    classTimeStarDto: "",
    classTimeEndDto: "",
    classCapacityDto: "",
    weekDaysDto: "MONDAY",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // ✅ Create a new object with the corrected weekDaysDto value
      const formattedData = {
        ...formData,
        weekDaysDto: formData.weekDaysDto.toUpperCase(),
      };
  
      const response = await createClass(formattedData); // ✅ Send corrected data
      console.log("Class created successfully:", response);
      window.location.reload();
    } catch (error) {
      console.error("❌ Error creating class:", error);

      // ✅ Show an error message instead of navigating
      alert("Failed to create class. Please check your input.");  
      }
  };
  
  return (
    <div className="modal fade" id="createClassModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Class</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Class Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="classNameDto" 
                    value={formData.classNameDto} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Start Time</label>
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
                  <label className="form-label">End Time</label>
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
                  <label className="form-label">Capacity</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    name="classCapacityDto" 
                    value={formData.classCapacityDto} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Day of the Week</label>
                  <select 
                    className="form-control" 
                    name="weekDaysDto" 
                    value={formData.weekDaysDto} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="Monday">MONDAY</option>
                    <option value="Tuesday">TUESDAY</option>
                    <option value="Wednesday">WEDNESDAY</option>
                    <option value="Thursday">THURSDAY</option>
                    <option value="Friday">FRIDAY</option>
                    <option value="Saturday">SATURDAY</option>
                    <option value="Sunday">SUNDAY</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary" >
                  Create Class
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

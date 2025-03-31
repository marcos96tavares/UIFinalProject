import React, { useState } from "react";
import { updateClassById  } from "../api/ClassApi";

const UpdateClassModel = ({ classId }) => {
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

  const handleUpdateClass = async (e) => {
    e.preventDefault();
    if (!classId) {
      alert("Error: No class selected for update!");
      return;
    }

    try {
      const formattedData = {
        ...formData,
        weekDaysDto: formData.weekDaysDto.toUpperCase(),
      };

      await updateClassById(classId, formattedData);
      alert("Class updated successfully!");
      window.location.reload(); // Reload page to see updates
    } catch (error) {
      console.error("❌ Error updating class:", error);
      alert("Failed to update class. Please check your input.");
    }
  };

  return (
    <div
      className="modal fade"
      id="updateClassModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Class</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleUpdateClass}>
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
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleUpdateClass}
            >
              Update Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateClassModel;

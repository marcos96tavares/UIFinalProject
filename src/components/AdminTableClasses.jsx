import React, { useState } from "react";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import UpdateClassModel from "../model/UpdateClassModel";
import { deleteClassById } from "../api/ClassApi";

const AdminTableClasses = ({ prop = [] }) => {
  const [selectedClassId, setSelectedClassId] = useState(null);

  const handleDeletet = async (classid) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return; // ✅ Confirmation before deleting

    try {
      await deleteClassById(classid);
      console.log("Class deleted successfully");
      window.location.reload(); // ✅ Reload the page to update list
    } catch (error) {
      console.error("❌ Error deleting class:", error);
      alert("Failed to delete class. Please try again.");
    }
  };

  if (!Array.isArray(prop)) {
    console.error("AdminTableClasses received an invalid prop:", prop);
    return <p className="text-danger">Error: Classes data is invalid.</p>;
  }

  return (
    <div className="card p-4 shadow-lg">
      <h4 className="mb-3">Class Schedule</h4>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Capacity</th>
            <th>Day Of Week</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prop.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No classes available.
              </td>
            </tr>
          ) : (
            prop.map((classItem, index) => (
              <tr key={index}>
                <td>{classItem.classNameDto}</td>
                <td>{classItem.classTimeStarDto} AM</td>
                <td>{classItem.classTimeEndDto} AM</td>
                <td>{classItem.classCapacityDto}</td>
                <td>{classItem.weekDaysDto}</td>
                <td>
                  {/* Edit Button - Set Selected Class ID */}
                  <button
                    className="btn btn-sm btn-primary me-2"
                    title="Edit"
                    data-bs-toggle="modal"
                    data-bs-target="#updateClassModal"
                    onClick={() => setSelectedClassId(classItem.classIdDto)}
                  >
                    <FaPencilAlt />
                  </button>
                  
                  {/* Delete Button - Calls handleDeletet */}
                  <button 
                    className="btn btn-sm btn-danger"
                    title="Delete"
                    onClick={() => handleDeletet(classItem.classIdDto)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pass selected classId to Modal */}
      <UpdateClassModel classId={selectedClassId} />
    </div>
  );
};

export default AdminTableClasses;

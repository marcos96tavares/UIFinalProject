// AdminTableClasses.jsx
import React, { useState } from "react";
import { FaTrashAlt, FaPencilAlt, FaClock, FaUsers, FaCalendarDay } from "react-icons/fa";
import UpdateClassModel from "../model/UpdateClassModel";
import { deleteClassById } from "../api/ClassApi";
import "../styles/AdminTableClassesCss.css"

const AdminTableClasses = ({ prop = [] }) => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleDelete = async (classId) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    try {
      await deleteClassById(classId);
      console.log("Class deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error deleting class:", error);
      alert("Failed to delete class. Please try again.");
    }
  };

  // Sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sort
  const sortedData = [...prop].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // Day color mapping
  const getDayColor = (day) => {
    const colors = {
      MONDAY: 'bg-info',
      TUESDAY: 'bg-success',
      WEDNESDAY: 'bg-warning',
      THURSDAY: 'bg-danger',
      FRIDAY: 'bg-primary',
      SATURDAY: 'bg-secondary',
      SUNDAY: 'bg-dark'
    };
    return colors[day] || 'bg-light';
  };

  if (!Array.isArray(prop)) {
    console.error("AdminTableClasses received an invalid prop:", prop);
    return <p className="text-danger">Error: Classes data is invalid.</p>;
  }

  return (
    <div className="class-table-container">
      <div className="card class-table-card">
        <div className="card-header">
          <h4 className="mb-0">
            <FaCalendarDay className="me-2" />
            Class Schedule
          </h4>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th onClick={() => requestSort('classNameDto')} className="sortable-header">
                  Class Name {getSortIndicator('classNameDto')}
                </th>
                <th onClick={() => requestSort('classTimeStarDto')} className="sortable-header">
                  <FaClock className="me-1" /> Start Time {getSortIndicator('classTimeStarDto')}
                </th>
                <th onClick={() => requestSort('classTimeEndDto')} className="sortable-header">
                  <FaClock className="me-1" /> End Time {getSortIndicator('classTimeEndDto')}
                </th>
                <th onClick={() => requestSort('classCapacityDto')} className="sortable-header">
                  <FaUsers className="me-1" /> Capacity {getSortIndicator('classCapacityDto')}
                </th>
                <th onClick={() => requestSort('weekDaysDto')} className="sortable-header">
                  <FaCalendarDay className="me-1" /> Day {getSortIndicator('weekDaysDto')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="empty-state">
                      <div className="empty-state-icon">
                        <i className="fa fa-calendar"></i>
                      </div>
                      <h5>No classes available</h5>
                      <p>Try creating a new class or adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedData.map((classItem, index) => (
                  <tr key={index} className="table-row-hover">
                    <td>
                      <div className="class-name">{classItem.classNameDto}</div>
                    </td>
                    <td>{classItem.classTimeStarDto}</td>
                    <td>{classItem.classTimeEndDto}</td>
                    <td>
                      <span className="capacity-badge">
                        {classItem.classCapacityDto}
                      </span>
                    </td>
                    <td>
                      <span className={`day-badge ${getDayColor(classItem.weekDaysDto)}`}>
                        {classItem.weekDaysDto}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          title="Edit"
                          data-bs-toggle="modal"
                          data-bs-target="#updateClassModal"
                          onClick={() => setSelectedClassId(classItem.classIdDto)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                          onClick={() => handleDelete(classItem.classIdDto)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-muted">
          Showing {sortedData.length} of {prop.length} classes
        </div>
      </div>

      {/* Pass selected classId to Modal */}
      <UpdateClassModel classId={selectedClassId} />
    </div>
  );
};


export default AdminTableClasses;
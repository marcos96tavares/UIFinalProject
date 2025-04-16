import React, { useEffect, useState } from "react";
import SideNavBarAdmin from "../components/SideNavBarAdmin";
import CreateClassModal from "../model/CreateClassModel";
import AdminTableClasses from "../components/AdminTableClasses";
import { getAllClass } from "../api/ClassApi";
import { FaCalendarPlus, FaSpinner } from "react-icons/fa";

const ClassesAdminPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("All");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClass();
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setClasses(data);
        } else {
          console.error("Data received is not an array:", data);
          setClasses([]);
        }
      } catch (error) {
        console.error("Error fetching classes:", error.message);
        setError("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Filter classes based on search term and day filter
  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch = classItem.classNameDto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = filterDay === "All" || classItem.weekDaysDto === filterDay;
    return matchesSearch && matchesDay;
  });

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <SideNavBarAdmin />

      {/* Main Content */}
      <div className="main-content p-4">
        <div className="content-header">
          <div className="container-fluid">
            <div className="dashboard-header">
              <div>
                <h2 className="dashboard-title">Class Management</h2>
                <p className="text-muted">Manage your scheduled classes</p>
              </div>
              <button 
                className="btn btn-primary add-class-btn" 
                data-bs-toggle="modal" 
                data-bs-target="#createClassModal"
              >
                <FaCalendarPlus className="me-2" />
                Add New Class
              </button>
            </div>

            {/* Filter & Search Section */}
            <div className="filter-section">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="search-container">
                    <input
                      type="text"
                      className="form-control search-input"
                      placeholder="Search classes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select filter-select"
                    value={filterDay}
                    onChange={(e) => setFilterDay(e.target.value)}
                  >
                    <option value="All">All Days</option>
                    <option value="MONDAY">Monday</option>
                    <option value="TUESDAY">Tuesday</option>
                    <option value="WEDNESDAY">Wednesday</option>
                    <option value="THURSDAY">Thursday</option>
                    <option value="FRIDAY">Friday</option>
                    <option value="SATURDAY">Saturday</option>
                    <option value="SUNDAY">Sunday</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="dashboard-stats">
              <div className="stats-card">
                <div className="stats-icon total-icon">
                  <i className="fa fa-calendar"></i>
                </div>
                <div className="stats-info">
                  <h5>Total Classes</h5>
                  <h3>{classes.length}</h3>
                </div>
              </div>
              <div className="stats-card">
                <div className="stats-icon capacity-icon">
                  <i className="fa fa-users"></i>
                </div>
                <div className="stats-info">
                  <h5>Total Capacity</h5>
                  <h3>{classes.reduce((sum, cls) => sum + parseInt(cls.classCapacityDto || 0), 0)}</h3>
                </div>
              </div>
              <div className="stats-card">
                <div className="stats-icon day-icon">
                  <i className="fa fa-clock"></i>
                </div>
                <div className="stats-info">
                  <h5>Most Popular Day</h5>
                  <h3>
                    {classes.length > 0
                      ? Object.entries(
                          classes.reduce((acc, cls) => {
                            acc[cls.weekDaysDto] = (acc[cls.weekDaysDto] || 0) + 1;
                            return acc;
                          }, {})
                        ).sort((a, b) => b[1] - a[1])[0][0]
                      : "N/A"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Show loading or error message */}
        {loading && (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Loading classes...</p>
          </div>
        )}
        {error && (
          <div className="error-container">
            <div className="alert alert-danger">
              <i className="fa fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          </div>
        )}

        {/* Table Card - Pass fetched data */}
        {!loading && !error && <AdminTableClasses prop={filteredClasses} />}

        {/* Include Modal Component */}
        <CreateClassModal />
      </div>
    </div>
  );
};

export default ClassesAdminPage;
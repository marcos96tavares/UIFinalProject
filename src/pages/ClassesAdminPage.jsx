import React, { useEffect, useState } from "react";
import SideNavBarAdmin from "../components/SideNavBarAdmin";
import CreateClassModal from "../model/CreateClassModel";
import AdminTableClasses from "../components/AdminTableClasses";
import { getAllClass } from "../api/ClassApi";

const ClassesAdminPage = () => {
  const [classes, setClasses] = useState([]); // State for class data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClass(); // ✅ Ensure data is assigned directly
        console.log("Fetched data:", data); // Debugging log
        if (Array.isArray(data)) {
          setClasses(data); // ✅ Make sure it's an array before setting state
        } else {
          console.error("Data received is not an array:", data);
          setClasses([]); // Fallback to empty array
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
  
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="col-2 bg-light vh-100 p-3">
        <SideNavBarAdmin />
      </div>

      {/* Main Content */}
      <div className="col-10 d-flex flex-column p-4">
        {/* Header with Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Manage Classes</h2>
          <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createClassModal">
            +Add Class
          </button>
        </div>

        {/* Show loading or error message */}
        {loading && <p>Loading classes...</p>}
        {error && <p className="text-danger">{error}</p>}

        {/* Table Card - Pass fetched data */}
        {console.log(classes)}
        {!loading && !error && <AdminTableClasses prop={classes} />}

        {/* Include Modal Component */}
        <CreateClassModal />
      </div>
    </div>
  );
};

export default ClassesAdminPage;

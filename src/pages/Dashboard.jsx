import React, { useEffect, useState } from "react";
import SideNavBarAdmin from "../components/SideNavBarAdmin";
import CardDashboard from "../components/CardDashboard";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { getNumberOfClass } from "../api/DashboardApi";



const Dashboard = () => {
  const [dashbordData, setDashbordData] = useState([]);
  const [numberOfMembers, setNumberOfMembers] = useState("");



  const handNumberOfMembers = async () =>{

    try{

    } 
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await getNumberOfClass();
       
        setNumberOfMembers(getData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData(); // ✅ Call the function inside useEffect
  }, []); // ✅ Dependency array should be empty if it runs once

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
          <h2 className="fw-bold">Dashboard</h2>
        </div>

{/* Summary Cards */}
<div className="d-flex flex-wrap justify-content-between">
          {/* Total Members */}
          <div className="col-2 m-2">
            <div className="card p-3 shadow-sm text-center border-0 rounded-3">
              <h5 className="fw-semibold">Total Members</h5>
              <CardDashboard />
            </div>
          </div>

          {/* Active Classes */}
          <div className="col-2 m-2">
            <div className="card p-3 shadow-sm text-center border-0 rounded-3">
              <h5 className="fw-semibold">Active Classes</h5>
              <CardDashboard props={numberOfMembers}  />
            </div>
          </div>

          {/* Revenue */}
          <div className="col-2 m-2">
            <div className="card p-4 shadow-sm text-center border-0 rounded-3">
              <h5 className="fw-semibold">Revenue</h5>
              <div className="d-flex justify-content-center align-items-center">
                <span className="fw-bold me-2">£</span>
                <CardDashboard />
              </div>
            </div>
          </div>
          {/* Attendance Rate */}
          <div className="col-2 m-2">
            <div className="card p-3 shadow-sm text-center border-0 rounded-3">
              <h5 className="fw-semibold">Attendance Rate</h5>
              <div className="d-flex justify-content-center align-items-center">
                <CardDashboard />
                <span className="fw-bold ms-1">%</span>
              </div>
            </div>
          </div>
        </div>
        {/*Attendance Rate*/}

        <div className="mt-5">
          <h4 className="fw-bold text-dark mb-3">Attendance Overview</h4>
          <div className="card p-4 shadow-sm border-0 rounded-3 bg-white">
            <div className="chart-container" style={{ height: "400px" }}>
              <Bar
                data={{
                  labels: dashbordData ? Object.keys(dashbordData) : [],
                  datasets: [
                    {
                      label: "Attendance",
                      data: dashbordData ? Object.values(dashbordData) : [],
                      backgroundColor: "rgba(54, 162, 235, 0.6)",
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

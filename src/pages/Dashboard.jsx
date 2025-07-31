import React, { useEffect, useState } from "react";
import SideNavBarAdmin from "../components/SideNavBarAdmin";
import CardDashboard from "../components/CardDashboard";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "../styles/DashboardCss.css"
import { 
  getNumberOfClass, 
  getNumberOfMembers, 
  getRates, 
  getAttendance 
} from "../api/DashboardApi";
import { 
  FaUsers, 
  FaDumbbell, 
  FaPoundSign, 
  FaChartLine,
  FaCalendarCheck,
  FaChartBar
} from "react-icons/fa";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [numberOfClass, setNumberOfClass] = useState("");
  const [numberOfMembers, setNumberOfMember] = useState("");
  const [numberRates, setNumberOfRates] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const revenue = numberOfMembers * 120;
  
  // Mock data for additional charts
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "This Week",
        data: [18, 25, 20, 30, 40, 43, 20],
        borderColor: "rgba(75, 108, 183, 1)",
        backgroundColor: "rgba(75, 108, 183, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Last Week",
        data: [15, 20, 18, 25, 32, 38, 15],
        borderColor: "rgba(200, 200, 200, 1)",
        backgroundColor: "rgba(200, 200, 200, 0.1)",
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
      }
    ]
  };
  
  const classTypeData = {
    labels: ["Yoga", "Pilates", "Cardio", "Strength", "HIIT"],
    datasets: [
      {
        data: [35, 25, 22, 18, 15],
        backgroundColor: [
          'rgba(75, 108, 183, 0.7)',
          'rgba(106, 76, 147, 0.7)',
          'rgba(38, 166, 154, 0.7)',
          'rgba(239, 108, 0, 0.7)',
          'rgba(239, 83, 80, 0.7)'
        ],
        borderWidth: 0,
      }
    ]
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Use Promise.all to fetch all data in parallel
        const [classData, memberData, ratesData, attendanceData] = await Promise.all([
          getNumberOfClass(),
          getNumberOfMembers(),
          getRates(),
          getAttendance()
        ]);
        
        setNumberOfClass(classData);
        setNumberOfMember(memberData);
        setNumberOfRates(ratesData);
        setDashboardData(attendanceData);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="dashboard-wrapper d-flex">
      {/* Sidebar */}
      <SideNavBarAdmin />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Page Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Fitness Studio Dashboard</h1>
            <p className="dashboard-subtitle">Analytics and Performance Overview</p>
          </div>
          <div className="date-selector">
            <select className="form-select">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Quarter</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading dashboard data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Key Metrics */}
            <div className="metrics-container">
              {/* Total Members */}
              <div className="metric-card members-card">
                <div className="metric-icon">
                  <FaUsers />
                </div>
                <div className="metric-content">
                  <h3 className="metric-title">Total Members</h3>
                  <CardDashboard props={numberOfMembers} />
                  <div className="metric-trend positive">
                    <span className="trend-icon">↑</span>
                    <span className="trend-value">12%</span>
                    <span className="trend-period">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Active Classes */}
              <div className="metric-card classes-card">
                <div className="metric-icon">
                  <FaDumbbell />
                </div>
                <div className="metric-content">
                  <h3 className="metric-title">Active Classes</h3>
                  <CardDashboard props={numberOfClass} />
                  <div className="metric-trend positive">
                    <span className="trend-icon">↑</span>
                    <span className="trend-value">5%</span>
                    <span className="trend-period">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Revenue */}
              <div className="metric-card revenue-card">
                <div className="metric-icon">
                  <FaPoundSign />
                </div>
                <div className="metric-content">
                  <h3 className="metric-title">Monthly Revenue</h3>
                  <div className="revenue-value">
                    <span className="currency">£</span>
                    <CardDashboard props={revenue} />
                  </div>
                  <div className="metric-trend positive">
                    <span className="trend-icon">↑</span>
                    <span className="trend-value">8%</span>
                    <span className="trend-period">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Attendance Rate */}
              <div className="metric-card attendance-card">
                <div className="metric-icon">
                  <FaChartLine />
                </div>
                <div className="metric-content">
                  <h3 className="metric-title">Attendance Rate</h3>
                  <div className="attendance-value">
                    <CardDashboard props={numberRates} />
                    <span className="percentage">%</span>
                  </div>
                  <div className="metric-trend negative">
                    <span className="trend-icon">↓</span>
                    <span className="trend-value">2%</span>
                    <span className="trend-period">vs last month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-container">
              {/* Main Attendance Chart */}
              <div className="chart-card large-chart">
                <div className="chart-header">
                  <div>
                    <h4 className="chart-title">
                      <FaChartBar className="chart-icon" />
                      Attendance Overview
                    </h4>
                    <p className="chart-subtitle">Daily attendance count across all classes</p>
                  </div>
                  <div className="chart-controls">
                    <button className="btn btn-sm btn-outline-secondary">Weekly</button>
                    <button className="btn btn-sm btn-primary">Monthly</button>
                    <button className="btn btn-sm btn-outline-secondary">Yearly</button>
                  </div>
                </div>
                <div className="chart-body">
                  <Bar
                    data={{
                      labels: dashboardData ? Object.keys(dashboardData) : [],
                      datasets: [
                        {
                          label: "Attendance",
                          data: dashboardData ? Object.values(dashboardData) : [],
                          backgroundColor: "rgba(75, 108, 183, 0.7)",
                          borderRadius: 8,
                          barThickness: 20,
                          maxBarThickness: 30
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          padding: 12,
                          titleFont: {
                            size: 14,
                            weight: 'bold'
                          },
                          bodyFont: {
                            size: 13
                          },
                          displayColors: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            display: true,
                            drawBorder: false,
                            color: 'rgba(200, 200, 200, 0.15)'
                          },
                          ticks: {
                            padding: 10
                          }
                        },
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false
                          },
                          ticks: {
                            padding: 10
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Weekly Attendance Chart */}
              {/* Class Distribution */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useState, useMemo } from "react";
import SideNavBarAdmin from "../components/SideNavBarAdmin";
import CreateVideoModal from "../model/CreateVideoModal";
import AdminTableVideos from "../components/AdminTableVideos";
import { getAllVideos } from "../api/VideoApi";
import { FaVideo, FaSpinner, FaPlus } from "react-icons/fa";

const VideoAdminPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getAllVideos();
        console.log("Fetched videos:", data);
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error("Data received is not an array:", data);
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error.message);
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Get unique categories from videos
  const categories = useMemo(() => {
    return [...new Set(videos.map(video => video.categoryDto || "Uncategorized"))];
  }, [videos]);

  // Filter videos based on search term and category filter
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch = video.videoTitle?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || (video.categoryDto || "Uncategorized") === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchTerm, filterCategory]);

  // Get the most popular category
  const getMostPopularCategory = () => {
    const countMap = videos.reduce((acc, video) => {
      const category = video.categoryDto || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(countMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  };

  return (
    <div className="d-flex">
      <SideNavBarAdmin />

      <div className="main-content p-4">
        <div className="content-header">
          <div className="container-fluid">
            <div className="dashboard-header">
              <div>
                <h2 className="dashboard-title">Video Management</h2>
                <p className="text-muted">Manage your training videos</p>
              </div>
              <button
                className="btn btn-primary add-video-btn"
                data-bs-toggle="modal"
                data-bs-target="#createVideoModal"
              >
                <FaPlus className="me-2" />
                Add New Video
              </button>
            </div>

            {/* Filter & Search Section */}
            <div className="filter-section">
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="dashboard-stats">
              <div className="stats-card">
                <div className="stats-icon total-icon">
                  <FaVideo />
                </div>
                <div className="stats-info">
                  <h5>Total Videos</h5>
                  <h3>{videos.length}</h3>
                </div>
              </div>
              <div className="stats-card">
                <div className="stats-icon popular-icon">
                  <i className="fa fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Show loading or error message */}
        {loading && (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Loading videos...</p>
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

        {/* No videos match filter */}
        {!loading && !error && filteredVideos.length === 0 && (
          <div className="alert alert-info mt-4">No videos match your criteria.</div>
        )}

        {/* Table */}
        {!loading && !error && filteredVideos.length > 0 && (
          <AdminTableVideos videos={filteredVideos} />
        )}

        {/* Modal */}
        <CreateVideoModal setVideos={setVideos} videos={videos} />
      </div>
    </div>
  );
};

export default VideoAdminPage;

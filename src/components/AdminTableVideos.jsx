import React, { useState } from "react";
import { FaTrash, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { deleteVideo } from "../api/VideoApi";

const AdminTableVideos = ({ videos }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loadingVideoId, setLoadingVideoId] = useState(null);
  const [error, setError] = useState("");

  const handleDelete = async (videoId) => {
    setDeleteLoading(true);
    setLoadingVideoId(videoId);
    setError("");

    try {
      await deleteVideo(videoId);

      const videoElement = document.getElementById(`video-row-${videoId}`);
      if (videoElement) {
        videoElement.classList.add("fade-out");
        setTimeout(() => {
          videoElement.remove();
        }, 500);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      setError(error.response?.data?.message || "Failed to delete video");
    } finally {
      setDeleteLoading(false);
      setLoadingVideoId(null);
    }
  };

  return (
    <div className="video-table-container">
      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-header bg-white">
          <h5 className="mb-0">Video Library</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-muted">
                      <FaExclamationTriangle className="me-2" />
                      No videos found. Add your first video!
                    </td>
                  </tr>
                ) : (
                  videos.map((video) => (
                    <tr key={video.videoId} id={`video-row-${video.videoId}`}>
                      <td className="fw-medium">{video.videoTitle}</td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {video.videoUrl || "Uncategorized"}
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(video.videoId)}
                          disabled={deleteLoading && loadingVideoId === video.videoId}
                          title="Delete Video"
                        >
                          {deleteLoading && loadingVideoId === video.videoId ? (
                            <FaSpinner className="spinner" />
                          ) : (
                            <FaTrash />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTableVideos;

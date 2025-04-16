import React, { useState } from "react";
import { createVideo } from "../api/VideoApi";
import { FaSpinner, FaVideo, FaLink, FaFileAlt } from "react-icons/fa";

const CreateVideoModal = ({ setVideos, videos }) => {
  const [videoData, setVideoData] = useState({
    videoTitle: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!videoData.videoTitle.trim()) {
      setError("Video title is required");
      return false;
    }
    if (!videoData.videoUrl.trim()) {
      setError("Video URL is required");
      return false;
    }

    try {
      new URL(videoData.videoUrl);
    } catch (_) {
      setError("Please enter a valid URL");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await createVideo(videoData);
      setVideos([...videos, response]);

      setSuccess("Video created successfully!");
      setVideoData({ videoTitle: "", videoUrl: "" });

      setTimeout(() => {
        document.getElementById("closeVideoModal").click();
        setSuccess("");
      }, 2000);
    } catch (error) {
      console.error("Error creating video:", error);
      setError(error.response?.data?.message || "Failed to create video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="createVideoModal"
      tabIndex="-1"
      aria-labelledby="createVideoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createVideoModalLabel">
              <FaVideo className="me-2" />
              Add New Video
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeVideoModal"
            ></button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="videoTitle" className="form-label">
                  <FaFileAlt className="me-2" />
                  Video Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="videoTitle"
                  name="videoTitle"
                  value={videoData.videoTitle}
                  onChange={handleChange}
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="videoUrl" className="form-label">
                  <FaLink className="me-2" />
                  Video URL
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="videoUrl"
                  name="videoUrl"
                  value={videoData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  required
                />
                <div className="form-text">Enter YouTube or Vimeo URL</div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <FaSpinner className="spinner me-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Video"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideoModal;

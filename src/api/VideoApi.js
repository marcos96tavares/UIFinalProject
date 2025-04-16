import axios from 'axios';

const API_URL = "http://localhost:8081/api/video";

// Get all videos
export const getAllVideos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

// Create a new video
export const createVideo = async (videoData) => {
  // Map frontend field names to match the backend DTO structure
  const mappedData = {
    videoTitle: videoData.videoTitle,
    videoUrl: videoData.videoUrl
  };

  try {
    const response = await axios.post(API_URL, mappedData);
    return response.data;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};

// Delete a video by id
export const deleteVideo = async (videoId) => {
  try {
    const response = await axios.delete(`${API_URL}/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};

export default {
  getAllVideos,
  createVideo,
  deleteVideo
};
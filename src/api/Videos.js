import axios from 'axios';



const API_URL = 'http://localhost:8081/api/video'; // Replace with your API URL

// Function to get videos
export const getVideos = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
};


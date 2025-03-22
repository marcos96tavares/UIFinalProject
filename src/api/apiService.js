import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiService = {
    // ✅ Delete Booking
    deleteBooking: async (studentId, trackerId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/booking/delete/${studentId}/${trackerId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting booking:", error);
            throw error;
        }
    },

    // ✅ Mark Student as "Did Not Attend"
    markNoAttend: async (trackerId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/class-tracker/no-attend/${trackerId}`);
            return response.data;
        } catch (error) {
            console.error("Error marking as no-attend:", error);
            throw error;
        }
    },

    // ✅ Mark Student as "Attended"
    markAttend: async (trackerId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/class-tracker/add-attend/${trackerId}`);
            return response.data;
        } catch (error) {
            console.error("Error marking as attended:", error);
            throw error;
        }
    }
};

export default apiService;

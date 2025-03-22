import axios from "axios";

const API_URL = "http://localhost:8080/api/class-tracker";

export const listAllClass = async (day) => {
    if (!day) {
        console.error("Invalid day parameter:", day);
        return [];
    }

    try {
        const response = await axios.get(`${API_URL}/${day}`); // ✅ Pass `day` as a path variable
        console.log("API Response:", response.data);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching classes:", error);
        return [];
    }
};

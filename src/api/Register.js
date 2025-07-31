// RegisterApi.js
import axios from 'axios';

const register = async (userData) => {
    try {
        console.log("Starting registration process with data:", userData);
        localStorage.removeItem('userid');

        // 1. Register the user
        const response = await axios.post('http://localhost:8081/api/membership', userData);
        console.log("Registration API response:", response.data);

        // 2. Extract the user ID from the nested UserDto
        if (response.data && response.data.userId && response.data.userId.userDtoId) {
            const userDtoId = response.data.userId.userDtoId;
            localStorage.setItem("userid", JSON.stringify(userDtoId));
            console.log("Successfully stored user ID:", userDtoId);
        } else {
            console.error("User ID not found in response:", response.data);
        }

        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export default register;
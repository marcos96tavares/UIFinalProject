import axios from 'axios';

const API = "http://localhost:8081/api/user";

export const getUser = async (email) => {
    try {
        const response = await axios.get(`${API}/email/${email}`);
        // 🔹 Save user data to localStorage
        localStorage.setItem("userid", JSON.stringify(response.data.userDtoId));
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const updateUser = async (id, userDto) => {
    try {
        const response = await axios.put(`${API}/${id}`, userDto);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export default getUser;
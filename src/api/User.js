import axios from 'axios';

const API = "http://localhost:8081/api/user";

export const getUser = async (email) => {
    try {
        // Check if the email is a JSON string and parse it if needed
        let parsedEmail = email;
        if (email && typeof email === 'string' && email.startsWith('"') && email.endsWith('"')) {
            try {
                parsedEmail = JSON.parse(email);
            } catch (e) {
                console.warn("Failed to parse email as JSON, using as-is");
            }
        }

        console.log("Getting user with email:", parsedEmail);

        const response = await axios.get(`${API}/email/${parsedEmail}`);
        console.log("User data received:", response.data);

        // Save user data to localStorage
        if (response.data && response.data.userDtoId) {
            localStorage.setItem("userid", JSON.stringify(response.data.userDtoId));
            console.log("Saved userid to localStorage:", response.data.userDtoId);
        }

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
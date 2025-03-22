import axios from 'axios';



const register = async (userData) => {
    try {
        const response = await axios.post('http://localhost:8081/api/membership', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export default register;
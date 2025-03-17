


import axios from 'axios';

const API_URL = 'http://localhost:9191/api/login'; // Ensure backend URL is correct

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user`, 
            { email, password }, 
            { headers: { 'Content-Type': 'application/json' } } // Ensure JSON format
        );

        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};


export const getToken = () => {
    return localStorage.getItem('accessToken');
};


export const logout = () => {
    localStorage.removeItem('accessToken');
};
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/login/user';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}`, 
            { email, password }, 
            { headers: { 'Content-Type': 'application/json' } } 
        );

        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            

            // Set default authorization header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Login failed:', error.response.data);
            throw new Error(error.response.data.message || 'Invalid credentials');
        } else if (error.request) {
            console.error('No response from server:', error.request);
            throw new Error('No response from server. Please check your connection.');
        } else {
            console.error('Login error:', error.message);
            throw new Error('Something went wrong. Please try again.');
        }
    }
};

export const getToken = () => localStorage.getItem('accessToken');

export const logout = () => {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
};

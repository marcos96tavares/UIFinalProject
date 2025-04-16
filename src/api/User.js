import axios from 'axios';


const API = "http://localhost:8081/api/user"


export const getUser = async (email) => {
    try {
        const response = await axios.get(`http://localhost:8081/api/user/email/${email}`);
        // 🔹 Save user data to localStorage
        localStorage.setItem("userid", JSON.stringify(response.data.userDtoId));
        return response.data;

    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export default getUser;



export const updateUser = async (Id, userDto) => {

    try{
        const response = await axios.put(`${API}/`+ Id , userDto)
        return response.data

    } catch(error){

        console.log(error)
    }
}
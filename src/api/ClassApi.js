import axios from "axios";

const API_URL = "http://localhost:8080/api/classes";

export const createClass = async (muyaTahiClassDto) => {
    try {
        const response = await axios.post(API_URL, muyaTahiClassDto);
        return response.data;
    } catch (error) {
        console.error("Error creating class:", error.message);
        throw error; // Re-throw the error for further handling if needed
    }
};


export const getAllClass = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data || []; // ✅ Ensure response is an array
    } catch (error) {
        console.error("Error fetching classes:", error.message);
        return []; // ✅ Return an empty array instead of throwing an error
    }
};



export const updateClassById = async (classId, muaythaiClassDto) =>{

    try{
        const response = await axios.put(`${API_URL}/`+ classId, muaythaiClassDto)
        return response.data;

    }catch(error){

        console.log("update the class" + error)
    }
}


export const deleteClassById = async (classId) =>{

    try{
        const response = await axios.delete(`${API_URL}/`+ classId)
        return response.data;

    }catch(error){

        console.log("update the class" + error)
    }
}


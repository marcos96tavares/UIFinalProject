import axios from "axios";

const API_URL = "http://localhost:8080/api/static";





export const getNumberOfClass = async () => {
  try {
    const response = await axios.get(`${API_URL}/` + "classes");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};



export const getNumberOfMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/` + "members");
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  

  export const getRates = async () => {
    try {
      const response = await axios.get(`${API_URL}/` + "rate");
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  
  export const getAttendance = async () => {
    try {
      const response = await axios.get(`${API_URL}/` + "classAttendance");
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };


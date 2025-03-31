
import axios from "axios";


const API_URL = "http://localhost:8080/api/static"


export  const getNumberOfClass = async() =>{

    try{
    const response = await axios.get(`${API_URL}/`+ "classes")
    return response.data;
}catch(error){
    console.error('Error fetching user data:', error);
    throw error;

}
}




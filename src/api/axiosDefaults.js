import axios from "axios";

axios.defaults.baseURL = 'https://pinch-api-f947cf5f7bdc.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create separate axios instances for requests and responses
export const axiosReq = axios.create(); 
export const axiosRes = axios.create();

// Add a function to handle login
export const loginUser = async (signInData) => {
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      return data; // Return the login response data (e.g., user info or tokens)
    } catch (error) {
      throw error.response?.data || error; // Pass the error to the caller
    }
  };
  
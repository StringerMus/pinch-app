import axios from "axios";

// axios.defaults.baseURL = 'https://pinch-api-f947cf5f7bdc.herokuapp.com/';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// axios.defaults.withCredentials = true;

// export const axiosReq = axios.create(); 
// export const axiosRes = axios.create();

// Base configuration for axios
axios.defaults.baseURL = 'https://pinch-api-f947cf5f7bdc.herokuapp.com/';
axios.defaults.withCredentials = true; // Include cookies in all requests

// Create separate axios instances for requests and responses
export const axiosReq = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true, // Ensure cookies are sent
    headers: {
        'Content-Type': 'application/json', // Default for JSON-based requests
    },
});

export const axiosRes = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
});

// For requests needing multipart/form-data
export const axiosMultipart = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
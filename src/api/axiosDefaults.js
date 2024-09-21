import axios from "axios";

axios.defaults.baseURL = 'https://pinch-api-f947cf5f7bdc.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create(); /*intercepts login request*/
export const axiosRes = axios.create(); /*intercepts login response*/
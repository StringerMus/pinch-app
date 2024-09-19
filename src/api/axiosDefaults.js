import axios from "axios";

axios.defaults.baseURL = 'https://pinch-5e6e24dd12fc.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true
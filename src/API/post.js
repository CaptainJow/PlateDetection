import axios from "axios";

export default axios.create({
    baseURL: 'https://plate-number-flask-api.onrender.com/'
    // baseURL: 'http://192.168.137.20:5000/'
})
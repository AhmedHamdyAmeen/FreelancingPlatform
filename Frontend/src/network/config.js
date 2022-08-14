import axios from 'axios';

console.log('ENV FILE VARS', process.env.FP_BASE_URL)

const axiosInstance = axios.create({
    baseURL : process.env.FP_BASE_URL,
})

export default axiosInstance;
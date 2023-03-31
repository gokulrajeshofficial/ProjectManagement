import axios from "axios"; 

const axiosConfig = axios.create({
  baseURL : 'http://127.0.0.1:3000',
  headers: {
//  Authorization: `<Your Auth Token>`,
    'Content-Type': "application/json",
    'timeout' : 1000,
  }, 
  withCredentials: true
  // .. other options
});

export default axiosConfig
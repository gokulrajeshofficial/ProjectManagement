import axios from "axios"; 

const axiosConfig = axios.create({
  baseURL : 'http://localhost:3000',
  headers: {
//  Authorization: `<Your Auth Token>`,
    'Content-Type': "application/json",
  }, 
withCredentials: true , 
});

export default axiosConfig
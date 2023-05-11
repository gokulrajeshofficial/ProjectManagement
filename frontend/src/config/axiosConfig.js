import axios from "axios"; 

const axiosConfig = axios.create({
  baseURL : import.meta.env.VITE_BASEURL ,
  
withCredentials: true , 
});

export default axiosConfig
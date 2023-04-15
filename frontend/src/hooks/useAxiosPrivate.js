
import { useSelector } from "react-redux"
import  {userDetails}  from "../store/Slice/userDetails.slice"
import axios from "axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"

function useAxiosPrivate() {
  const refresh = useRefreshToken()

    const accessToken = useSelector(userDetails)?.accessToken
    const axiosPrivate = axios.create({
        baseURL : "http://localhost:3000",
        withCredentials : true
    })

    useEffect(() => {
      const requestInterceptor = axiosPrivate.interceptors.request.use(
        (config)=>{
          console.log("in config int");
            if(!config?.headers["Authorization"])
            {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config
        },
        (error)=>{
            Promise.reject(error)
        }
      )

      const responseInterceptor = axiosPrivate.interceptors.response.use(
        (response)=>{ 
          console.log("in res int");
          return response},
        async(error)=>{
          console.log("in res error");
            const prevReq = error?.config
            console.log(error);
            if(error.response.status == 403 && !prevReq.sent)
            {
              console.log("expired");
              prevReq.sent = true ; 
              const newAccessToken = await refresh()
              console.log('new access token',newAccessToken);
              prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosPrivate(prevReq)
                
            }
            return Promise.reject(error)
        }
      )
    return ()=>{
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }

    }, [accessToken , refresh])
    return axiosPrivate

  
}

export default useAxiosPrivate
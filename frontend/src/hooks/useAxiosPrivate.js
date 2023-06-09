
import { useSelector } from "react-redux"
import  {userDetails}  from "../store/Slice/userDetails.slice"
import axios from "axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"

function useAxiosPrivate() {
  // console.log("Reached useAxiosPrivate")
  const refresh = useRefreshToken()

    const accessToken = useSelector(userDetails)?.accessToken

    const axiosPrivate = axios.create({
        baseURL : import.meta.env.VITE_BASEURL ,
        withCredentials : true
    })

    useEffect(() => {
 
      const requestInterceptor = axiosPrivate.interceptors.request.use(
        (config)=>{
            if(!config?.headers["Authorization"])
            {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            return config
        },
        (error)=>{

          console.log(error , "error")
          return  Promise.reject(error)
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
      );

    // return ()=>{
    //   // axiosPrivate.interceptors.request.eject(requestInterceptor)
    //   // axiosPrivate.interceptors.response.eject(responseInterceptor)
    // }

    }, [accessToken , refresh])
  
    return axiosPrivate

}

export default useAxiosPrivate
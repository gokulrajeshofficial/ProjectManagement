import { useDispatch } from "react-redux";
import axiosConfig from "../config/axiosConfig";

import React from 'react'
import { setDetails } from "../store/Slice/userDetails.slice";

function useRefreshToken() {
    const dispatch = useDispatch()
    const refresh = async()=>{
        try{
            const response = await axiosConfig.post("/auth/accessToken")
            dispatch(setDetails({ accessToken : response.data}))
            return response.data

        
        }catch(err){
            console.log("Error in useRefreshtoken " , err)
        }
    }
    return refresh
}

export default useRefreshToken
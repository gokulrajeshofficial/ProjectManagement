import { useDispatch } from "react-redux";

import React from 'react'
import { setDetails } from "../store/Slice/userDetails.slice";
import authAPI from "../api/authAPI";

function useRefreshToken() {
    const {requestAccessToken } = authAPI()
    const dispatch = useDispatch()
    const refresh = async()=>{
        try{
            const response = await requestAccessToken()
            dispatch(setDetails({ accessToken : response.data}))
            return response.data

        
        }catch(err){
            console.log("Error in useRefreshtoken " , err)
        }
    }
    return refresh
}

export default useRefreshToken
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from './useAxiosPrivate'

function useAcceptInvitation() {
  
  const axiosPrivate = useAxiosPrivate()
  let {email , workspaceId} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    fetchAPI()
  },[])

  const fetchAPI = async()=>{
    try{
    const response  = await axiosPrivate.patch('api/workspace/acceptInvitation' , {email , workspaceId})
    if(response?.status)
    {
      navigate('/workspace')
    }else{
      navigate('/register')
    }

    }catch(error){
      console.log(error)
    }
  }
 

}

export default useAcceptInvitation
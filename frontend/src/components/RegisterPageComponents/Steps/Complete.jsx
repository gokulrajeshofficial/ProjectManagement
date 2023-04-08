import React, { useEffect, useState } from 'react'
import authAPI from '../../../api/authAPI'
import Loader from '../../Loader/Loader'
import { useNavigate } from 'react-router-dom'

function Complete({userData,  workspaceCreation,  inviteList}) {
    const {registerAPI} = authAPI()
    const [loading , setLoading ] =  useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
     registerAPI({userData,  workspaceCreation,  inviteList   }).then((data)=>{
      console.log(data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
    },[loading])

    const loginHandle = ()=>{
      navigate('/login')
    }



  return (
    <div className=' container w-full text-center flex-col '>
         <h2 className="font-lily font-extrabold text-center text-transparent tracking-wide 
         lg:text-3xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Registeration has been completed </h2>
         <div className='flex justify-center items-center w-full'>
          { loading ? <Loader header={`Account is being Created . Please Wait`}/> :
          <div>
            
            <div className='container mb-5'>
              <img className='h-64 w-full bg-red mx-auto object-cover' src="./EXPLORATION-OUTLINE-002-FILL-2-unscreen.gif" alt="" />
            </div>
            <p className='text-sm2 font-ubuntu'><span className=' text-transparent tracking-wide 
          lg:text-xl text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600'>Your acount has been created .</span>
          <br/>Please login in to your Account using your Credentatials</p>
          <button className='bg-gradient-to-r mx-auto  block to-fuchsia-500 w-full from-indigo-700 hover:from-pink-600  hover:to-black
                         text-white font-bold  py-2 px-4  lg:w-40 rounded font-lily' onClick={loginHandle} >Login</button>

         
         </div>
}
         </div>
    </div>
  )
}

export default Complete
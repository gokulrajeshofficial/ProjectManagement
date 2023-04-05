import React, { useEffect } from 'react'
import authAPI from '../../../api/authAPI'

function Complete({userData,  workspaceCreation,  inviteList}) {
    const {registerAPI} = authAPI()

    useEffect(()=>{
     registerAPI({userData,  workspaceCreation,  inviteList   }).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })
    },[])

  return (
    <div className=' container w-full text-center flex-col '>
         <h2 className="font-lily font-extrabold text-center text-transparent tracking-wide 
         lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Registeration has been completed </h2>
         <div className='flex justify-center'>
         <img src="./EXPLORATION-OUTLINE-002-FILL-2-unscreen.gif" alt="" />
         </div>
    </div>
  )
}

export default Complete
import React, { useEffect } from 'react'
import authAPI from '../../../../api/authAPI'

function Complete({userData,  workspaceCreation,  inviteList}) {
    const {registerAPI} = authAPI
    useEffect(async()=>{
        await registerAPI({userData,  workspaceCreation,  inviteList}).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.error(err)
        })
    },[])

  return (
    <div className=' container flex-col w-full'>
         <h2 className="font-lily font-extrabold text-center text-transparent tracking-wide 
         lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Registeration has been completed </h2>

    </div>
  )
}

export default Complete
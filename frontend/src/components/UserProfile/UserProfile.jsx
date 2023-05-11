import React, { useState } from 'react'

import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setDetails, userDetails } from '../../store/Slice/userDetails.slice'
import LogoLoader from '../Loader/LogoLoader'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function UserProfile() {
  const axiosPrivate = useAxiosPrivate()
  const user = useSelector(userDetails)
  const dispatch = useDispatch();
  const [userProfile , setUserProfile] = useState({
    _id : user.userId,
    fname : user.fname , 
    lname : user.lname , 
    company: user.company ,
    phone : user.phone,
    email : user.email
   })
  const [edit , setEdit ] = useState(false)
  const [loading , setLoading] = useState(false)
  const handleChange = (e)=>{
    const {name , value} = e.target
    setUserProfile({...userProfile , [name] : value})

  }

  const handleSubmit = async()=>{
    console.log(userProfile , "userProfielr si ")
    try{
      setLoading(true)
      const response  = await axiosPrivate.put('/api/user/editProfile' , {userProfile})
      setLoading(false)
      setEdit(false)
      dispatch(setDetails(userProfile))
    }catch(err){
      console.log(err)
    }
   
  }
  return (
    <section className='w-full  overflow-y-scroll h-screen md:p-10 pt-10 pb-44 '>
      <div className='flex justify-center  '>
      <div className=' xl:max-w-3xl w-full pb-28'>

        <div className=' flex  justify-center'>
          <div className={`relative inline-block   items-center bg-fuchsia-200 justify-center w-40 h-auto overflow-hidden rounded-full dark:bg-gray-600`}>
            < FaUserCircle className='w-full h-auto' />
          </div>
        </div>
        <p className='mt-2 font-ubuntu text-2xl text-center'>{user.fname + " " + user.lname}</p>
        <div>
        
        </div>
        <section className='container w-full relative mt-8 rounded-2xl lg:p-14 p-5 pt-14  items-center border-4 border-purple-300 bg-white'>
          <p className='absolute right-5 top-2  font-ubuntu hover:scale-105 cursor-pointer hover:underline text-purple-800' onClick={()=>{setEdit(!edit)}}>Edit Details</p>
          <p className='text-center text-l  font-bruno border-b-2 border-purple-600 ' >User Details</p>
          <div className=' mt-5 justify-center flex ' >

            <table className="w-ful text-sm text-left   text-gray-500 dark:text-gray-400">

              <tbody className='text-sm2  '>

                <tr className="">
                  <th scope="row" className=" sm:px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    First Name
                  </th>
                  <td className=" sm:px-6 py-2">
                   { edit ? <input name='fname' value={userProfile.fname} onChange={handleChange}  className='rounded-md border-2 border-purple-200 px-2' type='text'/> :<p className='px-2 border-2 border-none'>{user.fname }</p>   }
                  </td>

                </tr>
                <tr className="">
                  <th scope="row" className=" sm:px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Last Name
                  </th>
                  <td className=" sm:px-6 py-2">
                   { edit ? <input name='lname' value={userProfile.lname} onChange={handleChange}   className='rounded-md border-2 border-purple-200 px-2' type='text'/> : <p className='px-2 border-2 border-none'>{user.lname}</p>   }
                  </td>

                </tr>

                <tr className="">
                  <th scope="row" className=" sm:px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Company
                  </th>
                  <td className=" sm:px-6 py-2">
                  { edit ? <input name='company' value={userProfile.company} onChange={handleChange}  type='text'className='rounded-md border-2 border-purple-200 px-2'  /> : <p className='px-2 border-2 border-none'>{user.company}</p> }
                  </td>
                </tr>


                <tr className="">
                  <th scope="row" className=" sm:px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Contact
                  </th>
                  <td className=" sm:px-6 py-2">
                  { edit ? <input name='phone' type='text' value={userProfile.phone} onChange={handleChange}  className='rounded-md border-2 border-purple-200 px-2' /> : <p className='px-2 border-2 border-none'>{user.phone}</p>}
                  </td>
                </tr>

                <tr className="">
                  <th scope="row" className=" sm:px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    E-mail
                  </th>
                  <td className=" sm:px-6 py-2">
                  { edit ? <input name='email' type='text' value={userProfile.email} onChange={handleChange}  className='rounded-md border-2 border-purple-200 px-2'/> : <p className='px-2 '>{user.email}</p>}
                  </td>
                </tr>
                
              </tbody>
            </table>


          </div>
          <div className='w-full  flex justify-center mt-5 '>

            {edit ? <button onClick={handleSubmit} className='text-center p-4 rounded-lg bg-gradient-to-l font-ubuntu text-[#ffff] from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500'>Save Changes</button> : "" }
          </div>
        </section>
        <section className='flex justify-center gap-5 mt-5'>
          <button className='p-4 text-white bg-fuchsia-600 hover:bg-fuchsia-500 rounded-xl' >Change Password </button>
          <button className='p-4 text-white bg-purple-700 hover:bg-purple-500 rounded-xl'>Sign Out</button>

        </section>

      </div>





      </div>
      <LogoLoader isVisible={loading}/>
    </section>
  )
}

export default UserProfile
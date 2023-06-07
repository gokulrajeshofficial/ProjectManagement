import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ImUserPlus } from 'react-icons/im'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

function AddPeopleToProj() {
  const axiosPrivate = useAxiosPrivate()
  const [search, setSearch] = useState("")
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const [projectMembers , setProjectMember ] = useState()

  const handSearch = () => {

  }

  const [members, setMembers] = useState([])

  const fetchMembers = async () => {
    try {
      const response = await axiosPrivate.get(`/api/workspace/members/${project.workspace}`)
      setMembers(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])


  const removeFromList = (index) => {
    const arrayList = projectMembers
    arrayList.splice(index, 1)
    setProjectMember(arrayList)
    // setRender(!render)
  }
  const addToList = (email) => {
    const arrayList = projectMembers
    if (!arrayList.includes(email)) {
      arrayList.push(email)
      setProjectMember(arrayList)
      // setRender(!render)

    }
  }




  return (
    <div className='p-5'>
                 <div className="container flex-col justify-center">
                <h2 className='font-ubuntu text-transparent tracking-wide 
 lg:text-xl text-center  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 '><span><ImUserPlus className='text-fuchsia-600 inline-block w-auto h-10 relative right-2 -top-1 ' /></span>Add People </h2>
                <div className="flex justify-center">
                  <div className="max-w-7xl container lg:mt-14">
                    <div className=' justify-center flex-col flex items-center mb-10'>
                      
                        <p className='text-center font'>Select The Project</p>
                        <select id="countries" class="bg-gray-50 border border-gray-300 p-3 md:w-[80%] w-full">
  <option selected>Choose a country</option>
  <option value="US">United States</option>
  <option value="CA">Canada</option>
  <option value="FR">France</option>
  <option value="DE">Germany</option>
</select>
                      </div>
                    
                 
                  
                    <div className='md:grid grid-cols-2 '>

                      <div className=''>

                        <div className='  w-full border-purple-500 border-2 p-2 rounded-2xl'>
                          <h3 className='font-bruno font-extrabold text-purple-700 p-5'>Members of Workspace </h3>
                          <div className="flex items-center border-b  border-purple-500 py-2 lg:w-[80%] lg:ml-auto mb-10 w-full ">
                            <input value={search} onChange={handleChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
                            <button onClick={handSearch} className="flex-shrink-0 relative right-2 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                              Search
                            </button>
                          </div>
                          <div className='w-full max-h-52 overflow-y-scroll '>
                            {
                              members?.filter((val) => {

                                if (search == "") {
                                  return val
                                } else if (val.sharedUser.email.toLowerCase().includes(search.toLowerCase())) {
                                  return val
                                }

                              })?.map((user, index) => {
                                return <div onClick={() => { addToList(user.sharedUser.email) }} className="flex cursor-pointer rounded-md px-5  hover:bg-purple-200 items-center space-x-4 p-3" key={index}  >

                                  <div style={{ backgroundColor: `red` }} className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                                    <span className="font-medium text-base text-dark dark:text-gray-300">{user.sharedUser.fname[0].toUpperCase() + user.sharedUser.lname[0].toUpperCase()}</span>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      {user.sharedUser.fname + " " + user.sharedUser.lname}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      {user.sharedUser.phone}
                                    </p>
                                  </div>
                                  <div className="sm:block hidden items-center text-sm2 font-semibold text-gray-900 dark:text-white">
                                    {user.sharedUser.email}
                                  </div>
                                </div>

                              })
                            }
                          </div>
                        </div>

                      </div>
                      <div className='w-full'>
                        <h3 className='font-ubuntu text-transparent
   text-base bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-block p-5'>Selected Members </h3>
                        <div>
                          <ul className='lg:p-3 list-disc' >
                            {
                              projectMembers?.map((elem, index) => {
                                return (<li key={index} className="inline-block  p-1 px-2 rounded-md bg-purple-500 text-white ml-5 mb-1" >{elem}<span className='inline-block ml-2 relative z-10 top-0.5 cursor-pointer' onClick={() => { removeFromList(index) }}><AiOutlineClose /></span></li>)
                              })

                            }
                          </ul>
                        </div>
                      </div>


                    </div>



                  </div>
                </div>
              </div>
    </div>
  )
}

export default AddPeopleToProj
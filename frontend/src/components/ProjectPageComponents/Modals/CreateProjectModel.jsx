import React from 'react'
import { useState } from 'react'
import { SwatchesPicker } from 'react-color'

import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useEffect } from 'react';
import { ImFolderPlus, ImUserPlus } from 'react-icons/im';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { userDetails } from '../../../store/Slice/userDetails.slice';
import LogoLoader from '../../Loader/LogoLoader'; 

function CreateProjectModel({handleClose}) {
  const selector = useSelector(userDetails)
  const axiosPrivate = useAxiosPrivate()
  const [loading , setLoading] = useState(false)
  const [displayColor, setDisplayColor] = useState(false)
  const [workspaceList, setWorkspaceList] = useState([])
  const [toggleName, setToggleName] = useState("project");
  const [memberFetching, setMemberFetching] = useState(false)
  const [project, setProject] = useState({
    projectName: "",
    projectColor: "#9013FE",
    workspace: "",
    dueDate: new Date,
    description: "",
    projectMembers: [selector.email] , 
 
  })
  // console.log(selector , "Redux store")
  const [projectErrors , setProjectErrors] = useState({
    projectName: "",
    workspace: "",
    description: ""
  })
  //to cause a rerender 
  const [render, setRender] = useState(false)


  useEffect(() => {
    fetchWorkspaces()
  }, [])


  const fetchWorkspaces = async () => {
    setLoading(true)
    const response = await axiosPrivate.get('/api/workspace/getallworkspaces')
    console.log(response.data.sharedWorkspaces)
    setWorkspaceList([...response.data.sharedWorkspaces, ...response.data.userWorkspaces])
    setLoading(false)

  }



  const projectHandleChange = (e) => {
    const { name, value } = e.target
    setProject({ ...project, [name]: value })
    console.log(project)
  }

  const handleColorChange = (newColor) => {
    setProject({ ...project, projectColor: newColor.hex });
    setDisplayColor(!displayColor)
  };


  const handleNext = () => {
    let errors = {}
    let flag = false
    if(!project.projectName.trim())
    {
      errors.projectName = "Project Name is required"
      flag = true
    }
    if(!project.workspace.trim())
    {
      errors.workspace = "Workspace is required"
      flag = true
    }
    if(!project.description.trim())
    {
      errors.description = "Workspace is required"
      flag = true
    }
    if(flag)
    {
      setProjectErrors(errors)
      return false

    }else{
      return true
    }
  }

  const handleFinish = async() => {
    try{
      setLoading(true)
      const response = await axiosPrivate.post('/api/project/createNewProject' , project)
      setLoading(false)
      handleClose()
      
    }catch (error){
      console.log(error)
    }
  }



  //search 
  const [search, setSearch] = useState("")
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

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
  }, [memberFetching])


  const removeFromList = (index) => {
    const arrayList = project.projectMembers
    arrayList.splice(index, 1)
    setProject({ ...project, projectMembers: arrayList })
    setRender(!render)
  }
  const addToList = (email) => {
    const arrayList = project.projectMembers
    if (!arrayList.includes(email)) {
      arrayList.push(email)
      setProject({ ...project, projectMembers: arrayList })
      setRender(!render)

    }
  }


  return (
    <div className="  p-10 w-full overflow-hidden b">
      <h2 className="font-lily font-extrabold  text-transparent tracking-wide 
 lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-block">Project Creation </h2>
      <div className="flex justify-center  w-full">
        <div className="max-w-7xl w-full  lg:mt-8 ">



          <div id="fullWidthTabContent" className="w-full  ">

            <div className={`w-full  ${toggleName == 'project' ? "block" : "hidden"}`}>

              <h2 className='font-ubuntu text-transparent tracking-wide 
 lg:text-xl text-center  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 '><span><ImFolderPlus className='text-fuchsia-600 inline-block w-auto h-10 relative right-2 -top-1 ' /></span>Project Details</h2>
              <div className={`  p-4  w-full
                rounded-lg md:grid gap-5 md:grid-cols-6   `} id="stats" role="tabpanel" aria-labelledby="stats-tab">

                <div className=" col-span-4 w-full mb-8 ">
                  <label className="block text-F-700 text-sm2 font-bold mb-4" htmlFor="projectName">
                    Project Name
                  </label>
                  <input value={project.projectName} name="projectName" onChange={projectHandleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="projectName" type="text" placeholder="Workspace Name" />
                  <p className='text-red-500 '>{projectErrors.projectName}</p>
                </div>

                <div className='col-span-2 w-full mb-8  '>
                  <label className="inline-block text-F-700 text-sm2 font-bold  mb-2" htmlFor="projectName">
                    Project Color
                  </label>
                  <div onClick={() => { setDisplayColor(!displayColor) }} style={{ backgroundColor: `${project.projectColor}` }} className=' w-28  h-10 rounded-lg  mt-2'>


                  </div>
                  {displayColor ? <SwatchesPicker className=' absolute  ' color={project.projectColor} onChange={handleColorChange} />
                    : ""}
                </div>

                <div className="mb-8 w-full col-span-4">
                  <label className="block text-F-700 text-sm2 font-bold mb-4" htmlFor="projectName">
                    Select the Workspace
                  </label>
                  <select name='workspace' onChange={(e) => { projectHandleChange(e); setMemberFetching(!memberFetching) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <option className='' defaultValue hidden>Choose a workspace </option>
                    {

                      workspaceList.map((workspaces, index) => {
                        return (
                          <option key={index} value={workspaces._id}>
                            {workspaces.workspaceName}</option>)
                      })

                    }

                  </select>
                  <p className='text-red-500 '>{projectErrors.workspace}</p>
                </div>

                <div className='w-full  col-span-2 mb-8 '>
                  <label className="block text-F-700 text-sm2 font-bold mb-3 " htmlFor="projectName">
                    Select Due Date
                  </label>
                  <input type="date" name='dueDate' onChange={projectHandleChange} className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-3 " />

                </div>

                <div className=' col-span-6 mb-8'>
                  <label className='block '>Project Detailed Description  </label>
                  <textarea name='description' onChange={projectHandleChange} className='w-full border-2 border-gray-500 rounded-xl h-36'></textarea>
                  <p className='text-red-500 '>{projectErrors.description}</p>
                </div>





              </div>
            </div>




            <div className={`${toggleName === 'invite' ? "block" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="about" role="tabpanel" aria-labelledby="about-tab">
              <div className="container flex-col justify-">
                <h2 className='font-ubuntu text-transparent tracking-wide 
 lg:text-xl text-center  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 '><span><ImUserPlus className='text-fuchsia-600 inline-block w-auto h-10 relative right-2 -top-1 ' /></span>Add People </h2>
                <div className="flex justify-center">
                  <div className="max-w-7xl container lg:mt-14">
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
                              members.filter((val) => {

                                if (search == "") {
                                  return val
                                } else if (val.sharedUser.email.toLowerCase().includes(search.toLowerCase())) {
                                  return val
                                }

                              }).map((user, index) => {
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
                              project.projectMembers.map((elem, index) => {
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

          </div>
          <div className='flex justify-between'>

            <button onClick={() => { setToggleName('project') }} className={`p-3 m-3 rounded-md text-white  hover:bg-purple-400 ${toggleName == "project" ? "bg-purple-400" : "bg-purple-600"} `}>Prev</button>
            <button onClick={() => {
              const response = handleNext();
              response ? setToggleName("invite") : setRender(!render)
            }} className={`p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-purple-400 ${toggleName == "invite" ? "hidden" : "block"}`}>Next</button>
            <button onClick={handleFinish} className={`p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-purple-400 ${toggleName == "invite" ? "block" : "hidden"}`} >Finish</button>
          </div>


        </div>
      </div>
      <LogoLoader isVisible={loading}/>
    </div>
  )
}

export default CreateProjectModel
import React, { useState } from 'react'

import { ImFolderPlus, ImUserPlus } from 'react-icons/im'
import CreateProjectModel from './Modals/CreateProjectModel'
import Modal from '../Modal/Modal'
import AddPeopleToProj from './Modals/AddPeopleToProj'
import { useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import usePrivateAxiosAPI from '../../api/usePrivateAxiosAPI'

function ProjectPageComponents({setSelectedProject}) {
    // const axiosPrivate = useAxiosPrivate()
    const axiosPrivate = usePrivateAxiosAPI()
    const [showAddPoject, setShowAddPoject] = useState(false)
    const [showAddPeople, setShowAddPeople] = useState(false)
    const [render, setRender] = useState(false)
    const [projectList, setProjectList] = useState([])

    const refreshPage = ()=>{
        setRender(!render)
    }

    const handleCreateProject = () => {
        setShowAddPoject(true)
    }
    const handleInviteButton = () => {
        setShowAddPeople(true)
    }

    //search 
    const [searchterm, setSearchterm] = useState("")

    const handleChange = (e) => {
        setSearchterm(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()

    }


    useEffect(() => {
        fetchProjects()
    }, [render])

    const fetchProjects = async () => {

        try {

            const response = await axiosPrivate.getAllProjects()
            setProjectList(response.data)


        } catch (error) {
            console.log("error reached project page ", error)
        }

    }
    return (
        <div className='p-10 w-full overflow-y-scroll pb-44 h-screen '>

            <header>
                <h1 className='font-bruno font-extrabold text-xl text-purple-700' >Project Management Options</h1>
                <hr className='border-purple-400 mt-3 border-2 '></hr>
                <div className='flex flex-wrap'>
                    <button onClick={handleCreateProject} className='p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-0.5 left-1 mr-2'> <ImFolderPlus /></span> New Project</button>
                    <button onClick={handleInviteButton} className='p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-0.5 left-1 mr-2'> <ImUserPlus /></span> Add People to Project </button>
                </div>
            </header>
            <section className='flex flex-col mb-5 w-full'>
                <div>
                    <h1 className='font-bruno font-extrabold mt-10 text-xl text-purple-700' >All Projects</h1>
                    <hr className='border-purple-400 mt-3 border-2 '></hr>
                </div>

                <section className='mt-5 w-full sm:ml-2 '>
                    <form className='mb-5' onSubmit={handleSearch}>
                        <div className="relative md:w-[50%]">
                            <input type="search" onChange={handleChange} id="search" className=" w-full p-3 pltext-sm text-fuchsia-900 border border-purple-300 rounded-lg bg-purple-50 focus:ring-purple-500 focus:border-fuchsia-500" placeholder="Search for Workspace ..." />
                            <button type="submit" className="text-white absolute right-0 top-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-fuchsia-900  hover:to-purple-700   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm2 px-5 py-3 ">Search</button>
                        </div>
                    </form>
                    <div className=' sm:ml-1 md:w-[80%]  rounded-xl'>

                        {
                            projectList.filter((val) => {

                                if (search == "") {
                                  return val
                                } else if (val.projectName.toLowerCase().includes(searchterm.toLowerCase())) {
                                  return val
                                }

                              }).map((project , index)=>{

                                return <div onClick={() => {setSelectedProject(project)  }} className="flex cursor-pointer rounded-md px-5 bg-white  hover:bg-purple-200 border-2 hover:scale-[1.01] items-center space-x-4 p-3" key={index}  >

                                <div style={{ backgroundColor: `${project.projectColor}` }} className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                                  <span className="font-medium text-base text-dark dark:text-gray-300">{project.projectName[0].toUpperCase() }</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {project.projectName}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {project.workspace.workspaceName}
                                  </p>
                                </div>
                                <div className="sm:block hidden items-center text-sm2 font-semibold text-gray-900 dark:text-white">
                                  Created By : {project.createdBy.fname+ " " + project.createdBy.lname }
                                </div>
                              </div>


                            })
                        }


                    </div>
                </section>


            </section>


            <Modal isVisible={showAddPoject} setShowModal={setShowAddPoject}>
                <CreateProjectModel refreshPage={refreshPage}/>
            </Modal>

            <Modal isVisible={showAddPeople} setShowModal={setShowAddPeople}>
                <AddPeopleToProj />
            </Modal>
        </div>
    )
}

export default ProjectPageComponents
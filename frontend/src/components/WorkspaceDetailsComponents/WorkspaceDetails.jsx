import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import CountUp from 'react-countup';
import { ImUserPlus } from 'react-icons/im';
import Modal from '../Modal/Modal';
import InviteListModal from '../WorkspaceComponents/Invitelist/InviteListModal';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../../store/Slice/userDetails.slice';
import { setProject } from '../../store/Slice/projectDetails.slice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function WorkspaceDetails({ selectedWorkspace, setSelectedWorkspace }) {
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const user = useSelector(userDetails)
  const dispatch  = useDispatch()
  const [showInvite, setShowInvite] = useState(false)
  const [members, setMembers] = useState([])
  const [projects, setProjects] = useState([])
  const [ownWorkspace, setOwnWorkspace] = useState(false)
  useEffect(() => {
    fetchMembers()
    if (user?.userId == selectedWorkspace.createdBy._id) {
      setOwnWorkspace(true)
    }
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await axiosPrivate.get(`/api/workspace/members/${selectedWorkspace._id}`)
      const responseProjects = await axiosPrivate.get(`/api/project/workspace/${selectedWorkspace._id}`)

      setMembers(response?.data)
      setProjects(responseProjects?.data)

    } catch (error) {
      console.log(error)
    }

  }

  const handleInviteButton = () => {
    setShowInvite(true)
  }
  const handleDeleteButton = async () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to delete this workspace!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {

        const response = await axiosPrivate.delete(`/api/workspace/delete/${selectedWorkspace._id}`)

        console.log(response)
     
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(()=>{
          setSelectedWorkspace(null)
        })
    
        
      }
    })




  }


  //Search 
  const [searchProjects, setSearchProjects] = useState("")
  const [searchMembers, setSearchMembers] = useState("")

  const handleChangeProjects = (e) => {
    setSearchProjects(e.target.value)
  }

  const handleChangeMembers = (e) => {
    setSearchMembers(e.target.value)

  }
  const handleSearchWorkspace = () => {

  }

  const handleSearchProject = () => {

  }

  const handleProjectSelection = (val)=>{
    console.log("Selected project " , val)

    dispatch(setProject(val))

    navigate('/projects')


  }
  return (
    <section className='w-full relative h-screen overflow-scroll p-10 pt-16 pb-20'>

      <div className='p-2 inline-block absolute top-2 left-6  rounded-full bg-purple-500 hover:bg-purple-700 hover:scale-[1.2] '
        onClick={() => { setSelectedWorkspace(null) }}>
        <BsArrowLeft className=' w-12 text-white text-xl font-extrabold' />
      </div>

      <div className='w-full'>
        <h1 className='font-bruno font-extrabold text-xl  text-purple-700' >Workspace Details</h1>
        <hr className='border-purple-400 mt-3 border-2 '></hr>
      </div>
      <div className=' mt-5 bg-purple-400 rounded-xl p-6  w-full'>
        <div className='border-2 rounded-xl p-7'>
          <h2 className='font-ubuntu sm:text-xl text-white  text-center text-base '>Workspace Name : <span className='text-purple-800 inline-block'>{selectedWorkspace.workspaceName} </span></h2>
          <div className='mt-5'>
            <h2 className='font-ubuntu sm:text-sm2 text-sm text-white  text-center  '>Created by : <span className='text-purple-800 inline-block'>{selectedWorkspace.createdBy.email} </span></h2>
          </div>
        </div>

      </div>

      <div className={ownWorkspace ? `lg:grid lg:grid-cols-2 flex-col-reverse flex my-10 gap-5` : " flex-col-reverse flex my-10 gap-5"}>
        <div className=' px-1 flex justify-between gap-x-2'>
          <div className='w-full shadow-lg shadow-purple-400 border-purple-300 rounded-lg border py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Total Projects</p>
            <p className='text-center text-green-700 font-extrabold text-l'><CountUp end={projects.length} /></p>
          </div>
          {/* <div className='w-full shadow-lg shadow-purple-400 border-purple-300 rounded-lg border py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Ongoing</p>
            <p className='text-center text-red-700 font-extrabold text-l'><CountUp end={10} /></p>
          </div> */}
          <div className='w-full shadow-lg shadow-purple-400 border-purple-300 rounded-lg border py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Total Members</p>
            <p className='text-center text-blue-500 font-extrabold text-l'><CountUp end={members.length} /></p>
          </div>

        </div>
        <div className={ownWorkspace ? 'flex p-2 border-purple-800 justify-center gap-4 items-center h-full w-full mb-2' : 'hidden'}>
          <button onClick={handleInviteButton} className='p-4 px-6 text-sm2 rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-1 left-1 mr-2'> <ImUserPlus className='w-5 h-5' /></span> Invite People </button>
          <button onClick={handleDeleteButton} className='  bg-red-600 text-white p-4  px-6 rounded-md hover:bg-red-700 '>Delete Workspace</button>

        </div>

      </div>
      <div className='lg:grid lg:grid-cols-2 gap-5  lg:space-y-0 space-y-5'>


        <div className='  w-full border-purple-500 border-2 p-2 rounded-2xl'>
          <h3 className='font-bruno font-extrabold text-purple-700 p-5'>Members of Workspace </h3>
          <div className="flex items-center border-b  border-purple-500 py-2 lg:w-[80%] lg:ml-auto mb-10 w-full ">
            <input value={searchMembers} onChange={handleChangeMembers} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
            <button onClick={handleSearchWorkspace} className="flex-shrink-0 relative right-2 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Search
            </button>
          </div>

          {
            members.filter((val) => {

              if (searchMembers == "") {
                return val
              } else if (val.sharedUser.email.toLowerCase().includes(searchMembers.toLowerCase())) {
                return val
              }

            }).map((user, index) => {
              return <div className="flex cursor-pointer rounded-md px-5  hover:bg-purple-200 items-center space-x-4 p-3" key={index}  >

                <div style={{ backgroundColor: `${selectedWorkspace.theme}` }} className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
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



        <div className='  w-full border-purple-500 border-2 p-2 rounded-2xl'>
          <h3 className='font-bruno font-extrabold text-purple-700 p-5'>Projects in workspace</h3>
          <div className="flex items-center border-b  border-purple-500 py-2 lg:w-[80%] lg:ml-auto mb-10 w-full ">
            <input value={searchProjects} onChange={handleChangeProjects} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
            <button onClick={handleSearchProject} className="flex-shrink-0 relative right-2 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Search
            </button>
          </div>

          {
            projects.filter((val) => {

              if (searchProjects == "") {
                return val
              } else if (val.projectName.toLowerCase().includes(searchProjects.toLowerCase())) {
                return val
              }

            }).map((val, index) => {
              return <div onClick={()=>handleProjectSelection(val)} className="flex cursor-pointer rounded-md px-5  hover:bg-purple-200 items-center space-x-4 p-3" key={index}  >

                <div style={{ backgroundColor: `${val.projectColor}` }} className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                  <span className="font-medium text-base text-dark dark:text-gray-300">{val.projectName[0].toUpperCase()}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {val.projectName}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {val.workspace.workspaceName}
                  </p>
                </div>
                <div className="sm:block hidden items-center text-sm2 font-semibold text-gray-900 dark:text-white">
                  {val.createdBy.fname + " " + val.createdBy.lname}
                </div>
              </div>

            })
          }
        </div>

      </div>
      <Modal isVisible={showInvite} setShowModal={setShowInvite}>
        <InviteListModal ownWorkspace={selectedWorkspace} />
      </Modal>

    </section>
  )
}

export default WorkspaceDetails
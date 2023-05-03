import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import CountUp from 'react-countup';
import { ImUserPlus } from 'react-icons/im';
import Modal from '../Modal/Modal';
import InviteListModal from '../WorkspaceComponents/Invitelist/InviteListModal';
import SweetAlert from 'react-bootstrap-sweetalert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


function WorkspaceDetails({ selectedWorkspace, setSelectedWorkspace }) {
  const axiosPrivate = useAxiosPrivate()

  const [showInvite, setShowInvite] = useState(false)
  const [members, setMembers] = useState([])
  useEffect(() => {
    fetchMembers()
    console.log(members, "Updated array list")
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await axiosPrivate.get(`/api/workspace/members/${selectedWorkspace._id}`)
      const responseProjects = await axiosPrivate.get(`/api/project/workspace/${selectedWorkspace._id}`)
      setMembers(response?.data)

    } catch (error) {
      console.log(error)
    }

  }

  const handleInviteButton = () => {
    setShowInvite(true)
  }
  const handleDeleteButton = () => {
    <SweetAlert success title="Good job!" onConfirm={this.onConfirm} onCancel={this.onCancel}>
      You clicked the button!
    </SweetAlert>
  }


  //Search 
  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handSearch = ()=>{

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

      <div className='lg:grid lg:grid-cols-2 flex-col-reverse flex my-10 gap-5'>
        <div className=' px-1 flex justify-between gap-x-2'>
          <div className='w-full shadow-lg shadow-purple-400 border-purple-300 rounded-lg border py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Total Projects</p>
            <p className='text-center text-green-700 font-extrabold text-l'><CountUp end={1} /></p>
          </div>
          <div className='w-full shadow-lg shadow-purple-400 border-purple-300 rounded-lg border py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Ongoing</p>
            <p className='text-center text-red-700 font-extrabold text-l'><CountUp end={10} /></p>
          </div>
          <div className='w-full shadow-lg shadow-purple-400 border-purple-300 rounded-lg border py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Completed</p>
            <p className='text-center text-blue-500 font-extrabold text-l'><CountUp end={5} /></p>
          </div>

        </div>
        <div className='flex p-2 border-purple-800 justify-center gap-4 items-center h-full w-full mb-2'>
          <button onClick={handleInviteButton} className='p-4 px-6 text-sm2 rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-1 left-1 mr-2'> <ImUserPlus className='w-5 h-5' /></span> Invite People </button>
          <button onClick={handleDeleteButton} className='  bg-red-600 text-white p-4  px-6 rounded-md hover:bg-red-700 '>Delete Workspace</button>

        </div>

      </div>
      <div className='lg:grid lg:grid-cols-2  gap-5 space-y-5'>

        
        <div className='  w-full border-purple-500 border-2 p-2 rounded-2xl'>
          <h3 className='font-bruno font-extrabold text-purple-700 p-5'>Members of Workspace </h3>
          <div className="flex items-center border-b  border-purple-500 py-2 lg:w-[80%] lg:ml-auto mb-10 w-full ">
            <input value={search} onChange={handleChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
            <button onClick={handSearch} className="flex-shrink-0 relative right-2 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Search 
            </button>
          </div>

          {   
            members.filter((val)=>{

              if(search == "")
              {
                return val
              }else if (val.sharedUser.email.toLowerCase().includes(search.toLowerCase())){
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
            <input value={search} onChange={handleChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
            <button onClick={handSearch} className="flex-shrink-0 relative right-2 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Search 
            </button>
          </div>

          {   
            members.filter((val)=>{

              if(search == "")
              {
                return val
              }else if (val.sharedUser.email.toLowerCase().includes(search.toLowerCase())){
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

      </div>
      <Modal isVisible={showInvite} setShowModal={setShowInvite}>
        <InviteListModal ownWorkspace={selectedWorkspace} />
      </Modal>

    </section>
  )
}

export default WorkspaceDetails
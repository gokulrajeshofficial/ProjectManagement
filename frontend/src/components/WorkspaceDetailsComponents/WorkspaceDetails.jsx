import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import CountUp from 'react-countup';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import Modal from '../Modal/Modal';
import InviteListModal from '../WorkspaceComponents/Invitelist/InviteListModal';
import SweetAlert from 'react-bootstrap-sweetalert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
function WorkspaceDetails({ selectedWorkspace, setSelectedWorkspace }) {
  const [showInvite, setShowInvite] = useState(false)
  const axiosPrivate =  useAxiosPrivate()
 

  const fetchMembers = async()=>{
    try{
      const members = await axiosPrivate.get(`/api/workspace/members/${selectedWorkspace._id}`)

    }catch(error){
      console.log(error)
    }

  }
  
  const handleInviteButton = () => {
    setShowInvite(true)
  }
  const handleDeleteButton =()=>{
    <SweetAlert success title="Good job!" onConfirm={this.onConfirm} onCancel={this.onCancel}>
  You clicked the button!
</SweetAlert>
}





if (!selectedWorkspace) {
  return null
}else{
  fetchMembers()
}
  return (
    <section className='w-full relative h-screen overflow-y-scroll p-10 pt-16'>

      <div className='p-2 inline-block absolute top-2 left-6  rounded-full bg-purple-500 hover:bg-purple-700 hover:scale-[1.2] '
        onClick={() => { setSelectedWorkspace(null) }}>
        <BsArrowLeft className=' w-12 text-white text-xl font-extrabold' />
      </div>

      <div className='w-full'>
        <h1 className='font-bruno font-extrabold text-xl  text-purple-700' >Workspace Details</h1>
        <hr className='border-purple-400 mt-3 border-2 '></hr>
      </div>
      <div className='container mt-5 bg-purple-400 rounded-xl p-9 '>
        <div className='border'>
          <h2 className='font-ubuntu sm:text-xl text-white  text-center text-base '>Workspace Name : <span className='text-purple-800 inline-block'>{selectedWorkspace.workspaceName} </span></h2>
          <div className='mt-5'>
            <h2 className='font-ubuntu sm:text-sm2 text-sm text-white  text-center  '>Created by : <span className='text-purple-800 inline-block'>{selectedWorkspace.createdBy.email} </span></h2>
          </div>
        </div>

      </div>

      <div className='lg:grid lg:grid-cols-2 flex-col-reverse flex mt-4 gap-5'>
        <div className=' px-1 flex justify-between gap-x-2'>
          <div className='w-full border-fuchsia-700 border-2 py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Total Projects</p>
            <p className='text-center text-green-700 font-extrabold text-l'><CountUp end={1} /></p>
          </div>
          <div className='w-full border-fuchsia-700 border-2 py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Ongoing</p>
            <p className='text-center text-blue-700 font-extrabold text-l'><CountUp end={10} /></p>
          </div>
          <div className='w-full border-fuchsia-700 border-2 py-1'>
            <p className='text-center block font-ubuntu text-fuchsia-800'>Completed</p>
            <p className='text-center text-blue-700 font-extrabold text-l'><CountUp end={10} /></p>
          </div>

        </div>
        <div className='flex p-2 border-purple-800 border-2 justify-center gap-4 items-center h-full w-full mb-2'>
          <button onClick={handleInviteButton} className='p-2  rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-0.5 left-1 mr-2'> <AiOutlinePlusSquare /></span> Invite People </button>
          <button onClick={handleDeleteButton} className='  bg-red-600 text-white p-2  px-5 rounded-md hover:bg-red-700 '>Delete Workspace</button>

        </div>

      </div>
      <div className='lg:grid lg:grid-cols-2 mt-5 gap-5'>
        <div className='  w-full border-purple-800 border-2'>
          <h3 className='font-bruno font-extrabold text-purple-700 p-5'>Members of Workspace </h3>
        </div>

      </div>
      <Modal isVisible={showInvite} setShowModal={setShowInvite}>
                <InviteListModal ownWorkspace={selectedWorkspace} />
            </Modal>

    </section>
  )
}

export default WorkspaceDetails
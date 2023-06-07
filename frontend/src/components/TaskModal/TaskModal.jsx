import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
import { AiFillCloseCircle, AiOutlineClose, AiOutlineUserAdd } from 'react-icons/ai'
import useTaskAPI from '../../api/useTaskAPI'
import LogoLoader from '../Loader/LogoLoader'
import { useSelector } from 'react-redux'
import { userDetails } from '../../store/Slice/userDetails.slice'
import { useDropzone } from 'react-dropzone'
import Swal from 'sweetalert2';

const priorityLevel = [
  { priority: "High", icon: <FcHighPriority className='w-full h-auto' /> },
  { priority: "Medium", icon: <FcMediumPriority className='w-full h-auto' /> },
  { priority: "Low", icon: <FcLowPriority className='w-full h-auto' /> },
]


function TaskModal({ taskId, setShowModal, setRender }) {
  const { getTask, taskUpdate  ,deleteTaskAPI , getFiles} = useTaskAPI()
  const user = useSelector(userDetails)

  const handleClose = () => {
    setRender()
    setShowModal(false)
  }

  const [task, setTask] = useState({})
  const [priorityOptions, setPriorityOptions] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [markCompleted, setMarkCompleted] = useState(false)

  useEffect(() => {
    fetchData()
  }, [markCompleted])

  const onDrop = useCallback((files) => {
    const formData = new FormData()
    formData.append('files', files[0]);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await getTask(taskId)
      console.log("Selected", response.data)
      setTask(response.data)
      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }



  const handlePriorityOptions = (elem) => {
    setTask({ ...task, priority: elem.priority, })
    setPriorityOptions(false)
  }

  const handleAssign = (email) => {

    let tempArray = task.assginees
    if (!tempArray.includes(email)) {
      tempArray.push(email)
      setTask({ ...task, assginees: tempArray, })

    }
    setShowMembers(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setTask({ ...task, [name]: value.trim() })
  }

  const removeFromAssignee = (index) => {
    const arrayList = task.assginees
    arrayList.splice(index, 1)
    setTask({ ...task, assginees: arrayList })
  }


  const checkUser = () => {
    console.log("stored : ", user.userId, "task", task.createdBy._id)
    user.userId == task.createdBy._id ? setEdit(true) : Swal.fire({
      icon: 'error',
      title: 'Unathorized',
      text: 'Sorry , Your dont have Access to this!',

    });
  }

  const handleComplete = async () => {
    try {
      setTask({ ...task, status: !task.status })
      setLoading(true)
      const response = await taskUpdate({ ...task, status: !task.status })
      setLoading(false)
      setRender()
      handleClose()
    } catch {
      setLoading(false)
    }

  }

  const handleSaveChanges = async () => {
    setLoading(true)
    const response = await taskUpdate(task)

    setEdit(false)
    setLoading(false)

  }

  const deleteTask = ()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try{
          const response = await deleteTaskAPI(taskId)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          handleClose()

        }catch(error)
        {
          console.log(error)
        }
      }
    })

  }
  const removeFromFiles = (index)=>{
    console.log(index)
    const arrayList = task.attachments
    arrayList.splice(index, 1)
    setSelectedFiles({...task , attachments : arrayList})
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm   flex justify-center overflow-y-auto  '>
      <div className=' grid-rows-2 lg:w-[80%] sm:my-auto my-2 max-h-screen box-border '>

        <div className='w-full flex space-x-7 justify-between bg-gradient-to-b   from-fuchsia-500 to-purple-800  px-2 p-2 rounded-t-xl'>
          <p className='text-white lg:ml-2'> {task?.projectId?.workspace?.workspaceName} {'>'} {task?.projectId?.projectName}   </p>
          <button onClick={handleClose} className='bg-fuchsia-400 p-1    rounded-md'><IoMdClose className='w-6 h-auto' /></button>
        </div>
        <div className=' w-full flex-wrap   p-2 rounded-xl rounded-t-none bg-white '>
          <header className=' w-full border-2 m-'>
            <div className='lg:grid grid-cols-5 w-full p-4 '>
              <div className='col-span-3  '>
                <div className='flex justify-evenly items-center'>



                  <div className='flex justify-center '>
                    <div className='relative'>
                      <p className='inline'>Assigner :  </p>
                      <div title={task?.createdBy?.email} style={{ backgroundColor: `${task?.projectId?.projectColor}` }} className={`relative -top-1 cursor-pointer inline-flex items-center justify-center w-8 h-8  rounded-full dark:bg-gray-600`}>
                        <div className='overflow-hidden'>
                          <span className="font-medium text-sm2 text-dark dark:text-gray-300">{task?.createdBy?.fname[0].toUpperCase() + task?.createdBy?.lname[0].toUpperCase()}</span>
                        </div>
                      </div>

                    </div>

                  </div>





                  <div className=''>
                    <p className='inline font-ubuntu relative -top-3 mr-2'>Priority  :  </p>
                    <div onClick={() => { edit && setPriorityOptions(!priorityOptions) }} className={`relative inline-flex items-center border-2 justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                      <span className="font-medium text-base text-dark w-10 dark:text-gray-300">{priorityLevel.map((elem) => { if (elem.priority == task.priority) return elem.icon })}</span>
                    </div>



                    <div className={`z-100 shadow-xl absolute ${priorityOptions ? "" : "hidden"}  bg-white  divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                        {priorityLevel.map((elem, index) => {
                          return <li key={index} onClick={() => handlePriorityOptions(elem)} className=''>
                            <p className=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white "><span className='w-10 inline-block'>{elem.icon} </span> <span className='relative -top-3 w-full  left-2 font-ubuntu'>{elem.priority}</span> </p>
                          </li>
                        })

                        }

                      </ul>
                    </div>

                  </div>

                </div>

              </div>
              <div className='col-span-2 lg:border-l-2 border-t-2 lg:border-t-0   w-full'>
                <div className='flex flex-wrap  justify-evenly items-center  '>
                  <div>
                    {edit ? <p className='text-center'> Due Date :{<input onChange={handleChange} value={task?.dueDate?.split("T")?.[0]} name='dueDate' type='date' className='border p-2 ' />} </p>
                      : <p className='text-center'><b>Due Date :</b> {task?.dueDate?.split("T")?.[0]}</p>}
                  </div>
                  <div>
                    <p className='ml-2'><b>Status :</b> {task?.status ? "Completed" : "Ongoing"}</p>
                  </div>
                </div>
              </div>

            </div>

          </header>


          <div className='md:grid grid-cols-5 mt-2'>


            <div className='col-span-3 md:p-5  overflow-y-auto h-[90%]'>
              <div className='w-full'>
                <p className='font-ubuntu'>Title</p>
                {edit ? <input onChange={(e) => { handleChange(e) }} value={task?.title} name='title' type='text' className='border-2 px-2  w-full lg:w-[80%] rounded-md' placeholder='Task Title / Name' d />
                  : <p className=' px-2  w-full lg:w-[80%] rounded-md'>{task?.title}</p>}
              </div>
              <div className='mt-3'>
                <p className='font-ubuntu'>Task Description </p>
                {edit ? <textarea onChange={handleChange} value={task?.description} name='description' type='text' className='border-2 px-2 lg:w-[80%] w-full rounded-md' placeholder='Explain the instruction in this' />
                  : <textarea disabled className=' px-2  w-full lg:w-[80%] rounded-md' value={task?.description}></textarea>
                }

              </div>

              <div className='mt-3 '>
                <p className='font-ubuntu '>Attached  Documents</p>
                <ul className=''>
                  {task?.attachments?.map((file, index) => (
                    <div key={index} className=' rounded-md mb-2 bg-purple-600 text-white relative  px-3 p-2 pr-8'>
                    <a href={file.location} className='inline'>  {file.name} </a><span className='inline-block cursor-pointer absolute right-2  top-3 '> {edit ? <AiOutlineClose onClick={()=>{removeFromFiles(index)}} /> : "" } </span>
                    </div>
                  ))}
                  </ul>
                {/* <div className="flex items-center justify-center w-full  mt-8 lg:w-[80%]">
                  <label for="dropzone-file" {...getRootProps()} className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className=" text-gray-500 text-sm text-center dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input {...getInputProps()} />
                  </label>
                </div> */}

              </div>
            </div>

            <div className='col-span-2 md:p-5 flex flex-col  items-center'>

              <div className="flex  justify-center w-full   lg:w-[80%]">
                <div className='flex justify-center '>
                  <div className='relative'>
                    <p className='inline'>Assigned for :  </p>
                    {edit && <div onClick={() => { setShowMembers(!showMembers) }} className={`relative inline-flex items-center border-2 justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                      <span className="font-medium text-base text-dark dark:text-gray-300"><AiOutlineUserAdd /></span>

                    </div>}
                    {
                      task?.assginees?.map((email, index) => {

                        return <div key={index} style={{ backgroundColor: `${task.projectId.projectColor}` }} className={`relative -top-1 inline-flex items-center justify-center w-8 h-8  rounded-full dark:bg-gray-600`}>
                          <div className='overflow-hidden'>
                            <span className="font-medium text-sm2 text-dark dark:text-gray-300">{email[0].toUpperCase()}</span>
                          </div>
                          {edit && <AiFillCloseCircle onClick={() => removeFromAssignee(index)} className='absolute -top-1 right-0 text-black bg-white rounded-full' />}
                        </div>

                      })
                    }

                    <div className={`z-100 absolute -left-10 bg-white ${showMembers ? "" : "hidden"}  divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700`}>
                      <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                        {task?.projectId?.projectMembers?.map((elem, index) => {
                          return <div onClick={() => { handleAssign(elem) }} className="flex cursor-pointer rounded-md px-5 bg-white  hover:bg-purple-200 border-2 hover:scale-[1.01] items-center space-x-4 p-3" key={index}  >

                            <div style={{ backgroundColor: `${task.projectId.projectColor}` }} className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full dark:bg-gray-600`}>
                              <span className="font-medium text-sm2 text-dark dark:text-gray-300">{elem[0].toUpperCase()}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {elem}
                              </p>

                            </div>

                          </div>

                        })
                        }

                      </ul>
                    </div>
                  </div>

                </div>
              </div>
              <div className='flex mt-2  w '>

                <p>Options : </p>
                <ul className='ml-2'>
                  <li>
                    <p onClick={checkUser} className='text-purple-700 hover:underline cursor-pointer'>Edit </p>
                  </li>
                  <li> <p onClick={deleteTask} className='text-purple-700 hover:underline cursor-pointer' >Delete </p> </li>
                </ul>

              </div>







            </div>



          </div>
          <footer className='w-full border-t-2 p-2 flex justify-between'>
            {edit ? <p onClick={handleSaveChanges} className=' p-2 px-4 cursor-pointer bg-fuchsia-700 text-white rounded-xl' >Save changes </p> : <p onClick={checkUser} className='text-purple-700 hover:underline cursor-pointer'> </p>}

            {task.status ? <button className='bg-purple-700 text-white px-3 p-2 rounded-xl' onClick={handleComplete} > Mark as Pending </button> : <button className='bg-purple-700 text-white px-3 p-2 rounded-xl' onClick={handleComplete} > Mark as Complete </button>}
          </footer>
        </div>
      </div>
      <LogoLoader isVisible={loading} />

    </div>
  )
}

export default TaskModal
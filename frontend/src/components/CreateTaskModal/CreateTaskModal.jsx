import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
import { AiFillCloseCircle, AiOutlineUserAdd , AiOutlineClose} from 'react-icons/ai'
import useTaskAPI from '../../api/useTaskAPI'
import { taskErrorToast } from '../../config/toastifyConfig'
import { ToastContainer } from 'react-toastify'

const priorityLevel = [
  { priority: "High", icon: <FcHighPriority className='w-full h-auto' /> },
  { priority: "Medium", icon: <FcMediumPriority className='w-full h-auto' /> },
  { priority: "Low", icon: <FcLowPriority className='w-full h-auto' /> },
]

function CreateTaskModal({ isVisible, setShowModal, project, setRender }) {
  if (!isVisible) return null

  const { taskCreation , taskFileUpload } = useTaskAPI()

  const handleClose = () => {
    setShowModal(false)
  }

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assginees: [],
    projectId: project._id ,
    attachments : []
  })

  const [error, setError] = useState({
    title: null,
    description: null,
  })

  const validation = () => {
    let flag = 0
    let valError = {}
    if (!task?.title?.trim().length) {
      valError.title = "Task Name is required "
      flag = 1
    }
    if (!task?.description?.trim().length) {
      valError.description = "Task description is required "
      flag = 1
    }
    if (!task?.assginees.length) {
      taskErrorToast("Choose an assignee")
      flag = 1
    }
    if (task.dueDate == null) {
      taskErrorToast("Select a Due date")
      flag = 1
    }
    setError({ ...valError })

    if (flag == 0) {
      return true
    } else {
      return false
    }

  }

  const [priorityOptions, setPriorityOptions] = useState(false)
  const [showMembers, setShowMembers] = useState(false)
  const handlePriorityOptions = (elem) => {
    setTask({ ...task, priority: elem.priority, })
    setPriorityOptions(false)
  }
  const [selectedFiles, setSelectedFiles] = useState([])

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
    setTask({ ...task, [name]: value })
    setError({ ...error, [name]: null })
  }

  const removeFromAssignee = (index) => {
    const arrayList = task.assginees
    arrayList.splice(index, 1)
    setTask({ ...task, assginees: arrayList })
  }


   const handleCreateTask = async () => {
    try {
      if (validation()) {
        const formData = new FormData();
  
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('taskFiles', selectedFiles[i]);
        }

        const fileResponse = await taskFileUpload(formData);
        console.log(fileResponse.data , "Keyss are the following")
        let attachments = fileResponse.data ? fileResponse.data : null
        const response = await taskCreation({...task , attachments : attachments});
        if (response.data) {
          setRender((prev) => !prev);
          handleClose();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleFileUpload = (e) => {
    const formData = new FormData();

    const fileInputs = e.target.files
    console.log(fileInputs)
    setSelectedFiles([...selectedFiles, ...fileInputs]);

  }

  const removeFromFiles = (index)=>{
    console.log(index)
    const arrayList = selectedFiles
    arrayList.splice(index, 1)
    setSelectedFiles([...arrayList])
  }



  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm   flex justify-center overflow-y-auto  '>
      <div className=' grid-rows-2 lg:w-[80%] sm:my-auto my-2 max-h-screen box-border '>

        <div className='w-full flex space-x-7 justify-between bg-gradient-to-b   from-fuchsia-500 to-purple-800  px-2 p-2 rounded-t-xl'>
          <p className='text-white lg:ml-2'>{project.workspace.workspaceName} {'>'} {project.projectName} </p>
          <button onClick={handleClose} className='bg-fuchsia-400 p-1    rounded-md'><IoMdClose className='w-6 h-auto' /></button>
        </div>
        <div className=' w-full flex-wrap   p-2 rounded-xl rounded-t-none bg-white '>
          <header className=' w-full border-2 m-'>
            <div className='grid grid-cols-5 w-full p-4 '>
              <div className='col-span-3  '>
                <div className='flex justify-evenly items-center'>

                  <div className=''>
                    <p className='inline font-ubuntu relative -top-3 mr-2'>Priority  :  </p>
                    <div onClick={() => { setPriorityOptions(!priorityOptions) }} className={`relative inline-flex items-center border-2 justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
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
              <div className='col-span-2 border-l-2   w-full'>
                <div className='flex flex-wrap  justify-evenly items-center  '>
                  <p className='text-center'> Due Date : <input onChange={handleChange} name='dueDate' type='date' className='border p-2' /> </p>
                </div>
              </div>

            </div>

          </header>


          <div className='grid grid-cols-5 mt-2'>


            <div className='col-span-3 md:p-5  overflow-y-auto h-[90%]'>
              <div className='mb-'>
                <p className='font-ubuntu'>Task Name </p>
                <input onChange={handleChange} name='title' type='text' className='border-2 px-2  w-full lg:w-[80%] rounded-md' placeholder='Task Title / Name' />
                <p className='ml-3 h-8 text-sm text-red-600'>{error.title}</p>
              </div>
              <div className=' '>
                <p className='font-ubuntu'>Task Description </p>
                <textarea onChange={handleChange} name='description' type='text' className='border-2 px-2 lg:w-[80%] w-full rounded-md' placeholder='Explain the instruction in this' />
                <p className='ml-3 h-8 text-sm text-red-600'>{error.description}</p>
              </div>

              <div className=''>
                <p className='font-ubuntu'>Selected Documents</p>
                <div className='flex flex-wrap mt-2'>
                  <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index} className=' rounded-md mb-2 bg-purple-600 text-white relative  px-3 p-2 pr-8'>
                    <p className='inline'>  {file.name} </p><span className='inline-block cursor-pointer absolute right-2  top-3 '> <AiOutlineClose onClick={()=>{removeFromFiles(index)}} /> </span>
                    </li>
                  ))}
                  </ul>
                </div>

              </div>




            </div>






            <div className='col-span-2 md:p-5 flex flex-col items-center justify-center'>
              <div className='flex justify-center '>
                <div className='relative'>
                  <p className='inline'>Assign for :  </p>
                  <div onClick={() => { setShowMembers(!showMembers) }} className={`relative inline-flex items-center border-2 justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                    <span className="font-medium text-base text-dark dark:text-gray-300"><AiOutlineUserAdd /></span>

                  </div>
                  {
                    task.assginees.map((email, index) => {

                      return <div key={index} style={{ backgroundColor: `${project.projectColor}` }} className={`relative -top-1 inline-flex items-center justify-center w-8 h-8  rounded-full dark:bg-gray-600`}>
                        <div className='overflow-hidden'>
                          <span className="font-medium text-sm2 text-dark dark:text-gray-300">{email[0].toUpperCase()}</span>
                        </div>
                        <AiFillCloseCircle onClick={() => removeFromAssignee(index)} className='absolute -top-1 right-0 text-black bg-white rounded-full' />
                      </div>

                    })
                  }

                  <div className={`z-100 absolute -left-10 bg-white ${showMembers ? "" : "hidden"}  divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700`}>
                    <ul className="p-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                      {project.projectMembers.map((elem, index) => {
                        return <div onClick={() => { handleAssign(elem) }} className="flex cursor-pointer rounded-md px-5 bg-white  hover:bg-purple-200 border-2 hover:scale-[1.01] items-center space-x-4 p-3" key={index}  >

                          <div style={{ backgroundColor: `${project.projectColor}` }} className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full dark:bg-gray-600`}>
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

              <div className="flex items-center justify-center w-full  mt-14 lg:w-[80%]">
                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input onChange={handleFileUpload} id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>



            </div>



          </div>

          <div className='w-full flex'>
            <button className='ml-auto mr-10 mb-5 p-5 py-3 rounded-lg text-white bg-purple-600' onClick={handleCreateTask} >Create Task</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreateTaskModal
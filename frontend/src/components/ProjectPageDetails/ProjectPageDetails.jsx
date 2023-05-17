import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { unsetProject } from '../../store/Slice/projectDetails.slice'
import { BsArrowLeft } from 'react-icons/bs'
import DoughnutGraph from '../DoughnutGraph/DoughnutGraph'
import CountUp from 'react-countup'
import usePrivateAxiosAPI from '../../api/usePrivateAxiosAPI'
import LogoLoader from '../Loader/LogoLoader'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal'
import useTaskAPI from '../../api/useTaskAPI'
import moment from 'moment/moment'
import { FcHighPriority, FcLowPriority, FcMediumPriority } from 'react-icons/fc'
import TaskModal from '../TaskModal/TaskModal'
function ProjectPageDetails({ project, setProject }) {
  const axiosPrivate = usePrivateAxiosAPI()
  const { getAllTasks } = useTaskAPI()
  const [completedCount, setCompletedCount] = useState(1);
  const [createTask, setCreateTask] = useState(false)
  const [pendingCount, setPendingCount] = useState(1);
  const [members, setMembers] = useState([])
  const [taskList, setTaskList] = useState([])
  const [showTask, setShowTask] = useState(false)
  const [searchMembers, setSearchMembers] = useState("")
  const [toggle, setToggle] = useState("details")
  const [render, setRender] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
    return () => {
      dispatch(unsetProject())
    }
  }, [])
  useEffect(() => {
    fetchTask()
  }, [render])

  const fetchData = async () => {
    let projectId = project._id
    const responseMembers = await axiosPrivate.projectMembers(projectId)
    setMembers(responseMembers.data)
    
  }

  const fetchTask = async () => {
    let projectId = project._id
    const responseTasks = await getAllTasks(projectId)
    console.log(responseTasks)
    setTaskList(responseTasks.data)
    setCompletedCount(responseTasks.data?.filter((val) => val.status === true)?.length)
    setPendingCount(responseTasks.data.filter((val) => val.status === false).length)
  }

  const handleChangeMembers = (e) => {
    setSearchMembers(e.target.value)
  }

  const handleCreateButton = () => {
    setCreateTask(!createTask)
  }

  const priorityLevel = [
    { priority: "High", icon: <FcHighPriority className='w-full h-auto' /> },
    { priority: "Medium", icon: <FcMediumPriority className='w-full h-auto' /> },
    { priority: "Low", icon: <FcLowPriority className='w-full h-auto' /> },
  ]

  const selectFlag = (priority) => {
    const selectedPriority = priorityLevel.find((elem) => elem.priority === priority);
    return selectedPriority ? selectedPriority.icon : null;
  }

  const handleTaskSelection = (id) => {
    setSelectedTaskId(id)
    setShowTask(true)

  }



  return (
    <section className='w-full relative h-screen overflow-scroll sm:p-10 p-1  pt-16  '>

      <div className='p-2 inline-block absolute top-2 left-6  rounded-full bg-purple-500 hover:bg-purple-700 hover:scale-[1.2] '
        onClick={() => { setProject(null) }}>
        <BsArrowLeft className=' w-12 text-white text-xl font-extrabold' />
      </div>
      <div className='w-full bg-[#ffffff] shadow-2xl  rounded-xl p-5 mt-5 mb-44'>
        <div className='flex justify-center items-center   rounded-2xl md:mx-5 '>
          <hr className='border-purple-400 mt-3 border-2 block w-full '></hr>
          <h2 className='text-center mx-5 relative top-1 font-bruno text-2xl inline-block'>{project.projectName}</h2>
          <hr className='border-purple-400 mt-3 border-2 block w-full '></hr>
        </div>

        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <p onClick={() => { setToggle("details") }} className={`inline-block  p-4 border-b-2 ${toggle == "details" ? "text-purple-600  border-purple-600 " : "border-transparent hover:text-gray-600 hover:border-gray-300 "}  cursor-pointer rounded-t-lg  text-sm2`}>Project Details</p>
            </li>
            <li className="mr-2">
              <p onClick={() => { setToggle("tasks") }} className={`inline-block p-4 border-b-2 ${toggle == "tasks" ? "text-purple-600  border-purple-600 " : "border-transparent hover:text-gray-600 hover:border-gray-300 "} rounded-t-lg cursor-pointer active text-sm2 `} >Tasks</p>
            </li>

          </ul>
        </div>
        <div className={`mt-3 md:p-5 ${toggle == "details" ? "block" : "hidden"}`}>

          <h2 className='font-ubuntu text-purple-700 mb-2 md:text-l base'>Project Description</h2>
          <h2>{project.description}</h2>
          <div>
            <div className='md:grid flex flex-col-reverse grid-cols-2 md:space-y-0 space-y-5 md:mt-16' >


              <div className=''>
                <div className='px-1 flex justify-between gap-x-2'>
                  <div className='w-full shadow-lg shadow-gray-400 border-gray-300 rounded-lg border py-1'>
                    <p className='text-center block font-ubuntu t'>Total tasks</p>
                    <p className='text-center text-green-700 font-extrabold text-l'><CountUp end={taskList.length} /></p>
                  </div>
                  <div className='w-full shadow-lg shadow-gray-400 border-gray-300 rounded-lg border py-1'>
                    <p className='text-center block font-ubuntu '>Ongoing</p>
                    <p className='text-center text-red-700 font-extrabold text-l'><CountUp end={pendingCount} /></p>
                  </div>
                  <div className='w-full shadow-lg shadow-gray-400 border-gray-300 rounded-lg border py-1'>
                    <p className='text-center block font-ubuntu '>Completed</p>
                    <p className='text-center text-blue-500 font-extrabold text-l'><CountUp end={completedCount} /></p>
                  </div>
                </div>
                <div className='  w-full mt-10 shadow-2xl p-2 rounded-2xl'>
                  <h3 className='font-bruno border-2 border-purple-400 rounded-lg mb-5 font-extrabold  text-center text-purple-700 p-4'>Project Members </h3>
                  <div className="flex items-center border-b  border-purple-500 py-2 lg:w-[80%] lg:ml-auto mb-10 w-full ">
                    <input value={searchMembers} onChange={handleChangeMembers} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
                    <button className="flex-shrink-0 relative right-2 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                      Search
                    </button>
                  </div>

                  {
                    members.filter((val) => {

                      if (searchMembers == "") {
                        return val
                      } else if (val.projectMembers.email.toLowerCase().includes(searchMembers.toLowerCase())) {
                        return val
                      }

                    }).map((user, index) => {
                      return <div className="flex cursor-pointer rounded-md px-5  hover:bg-purple-200 items-center space-x-4 p-3" key={index}  >

                        <div style={{ backgroundColor: `${project.projectColor}` }} className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                          <span className="font-medium text-base text-dark dark:text-gray-300">{user.projectMembers.fname[0].toUpperCase() + user.projectMembers.lname[0].toUpperCase()}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.projectMembers.fname + " " + user.projectMembers.lname}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.projectMembers.phone}
                          </p>
                        </div>
                        <div className="md:block hidden items-center text-sm2 font-semibold text-gray-900 dark:text-white">
                          {user.projectMembers.email}
                        </div>
                      </div>

                    })
                  }
                </div>
              </div>

              <div className='pb-5'>
                <DoughnutGraph completed={completedCount} pending={pendingCount} />
                {/* <div className='  w-full mt-10 shadow-2xl p-2 rounded-2xl'>
                  <h3 className='font-bruno border-2 border-purple-400 rounded-lg mb-5 font-extrabold  text-center text-purple-700 p-4'>Project Members </h3>
                  <div className="flex items-center border-b  border-purple-500 py-2 lg:w-[80%] lg:ml-auto mb-10 w-full ">
                    <input value={searchMembers} onChange={handleChangeMembers} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
                    <button className="flex-shrink-0 relative right-2 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                      Search
                    </button>
                  </div>

                  {
                    members.filter((val) => {

                      if (searchMembers == "") {
                        return val
                      } else if (val.projectMembers.email.toLowerCase().includes(searchMembers.toLowerCase())) {
                        return val
                      }

                    }).map((user, index) => {
                      return <div className="flex cursor-pointer rounded-md px-5  hover:bg-purple-200 items-center space-x-4 p-3" key={index}  >

                        <div style={{ backgroundColor: `${project.projectColor}` }} className={`relative inline-flex  items-center justify-center w-10 h-10 overflow-hidden rounded-full dark:bg-gray-600`}>
                          <span className="font-medium text-base  text-dark dark:text-gray-300">{user.projectMembers.fname[0].toUpperCase() + user.projectMembers.lname[0].toUpperCase()}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {user.projectMembers.fname + " " + user.projectMembers.lname}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {user.projectMembers.phone}
                          </p>
                        </div>
                        <div className="sm:block hidden items-center text-sm2 font-semibold text-gray-900 dark:text-white">
                          {user.projectMembers.email}
                        </div>
                      </div>

                    })
                  }
                </div> */}
              </div>

            </div>

          </div>
        </div>

        {/* Tasks */}

        <div className={`mt-3 md:p-5 ${toggle == "tasks" ? "block" : "hidden"}`}>
          <header>

            <div className='flex flex-wrap '>
              <button onClick={handleCreateButton} className='p-3 ml-auto rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-0.5 left-1 mr-2'> <AiOutlinePlusSquare /></span> Create New Task </button>

            </div>
          </header>

          <section className='flex flex-col mb-5 w-full'>
            <div className='mb-8'>
              <h1 className='font-bruno font-extrabold  mb-3 text-xl text-purple-700 underline ' >Ongoing Tasks</h1>
              <div className='flex-col flex gap-1 border-2 rounded-xl w-full'>

                {taskList.filter((val) => val.status === false).length == 0 ? <p className='text-center p-3 font-ubuntu'>No Tasks </p> :
                  taskList.filter((val) => {

                    if (val.status == false) return val

                  }).map((elem, index) => {

                    return <div key={index} onClick={() => handleTaskSelection(elem._id)} className=' p-3 cursor-pointer  hover:bg-purple-200 grid grid-cols-5  w-full shadow-md border rounded-lg'>
                      <div className='col-span-2 flex items-center'>
                        <p className='inline-block truncate font-ubuntu mr-2'>{elem.title}</p>

                      </div>
                      <div className='col-span-2 sm:flex hidden  items-center'>
                        <p className='font-ubuntu  inline relative' >Priority : <span className='font-sans'><div className='w-7 inline-block absolute -right-8 -top-1'>{selectFlag(elem.priority)}</div> {elem.priority.toUpperCase()}</span></p>
                      </div>
                      <div className=' sm:col-span-1 col-span-3'>
                        <p className=''>Due on {moment(elem.dueDate).format('MMMM Do YYYY')}</p>
                      </div>


                    </div>

                  })
                }

              </div>

            </div>

            {/* Pending Tasks */}
            <div>
              <h1 className='font-bruno font-extrabold  mb-3 text-xl text-purple-700 underline ' >Completed Tasks</h1>
              <div className='flex-col flex gap-1 border-2 rounded-xl w-full'>

                {taskList.filter((val) => val.status === true).length == 0 ? <p className='text-center p-3 font-ubuntu'>No Tasks </p> :
                  taskList.filter((val) => {

                    if (val.status == true ) return val

                  }).map((elem, index) => {

                    return <div key={index} onClick={() => handleTaskSelection(elem._id)} className=' p-3 cursor-pointer  hover:bg-purple-200 grid grid-cols-5  w-full shadow-md border rounded-lg'>
                      <div className='col-span-2 flex'>
                        <p className=' inline-block truncate font-ubuntu mr-2'>{elem.title}</p>

                      </div>
                      <div className='col-span-2 sm:block hidden'>
                        <p className='font-ubuntu  inline relative' >Priority : <span className='font-sans'><div className='w-7 inline-block absolute -right-8 -top-1'>{selectFlag(elem.priority)}</div> {elem.priority.toUpperCase()}</span></p>
                      </div>
                      <div className=' sm:col-span-1 col-span-3'>
                        <p className=''>Due on {moment(elem.dueDate).format('MMMM Do YYYY')}</p>
                      </div>


                    </div>

                  })
                }

              </div>

            </div>
          </section>
        </div>


      </div>
      <CreateTaskModal isVisible={createTask} setShowModal={setCreateTask} project={project} setRender={setRender} />
      {showTask && <TaskModal taskId={selectedTaskId} setShowModal={setShowTask} setRender={()=>{setRender(prev => !prev)}}  />}
    </section>
  )
}

export default ProjectPageDetails
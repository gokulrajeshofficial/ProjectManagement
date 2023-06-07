import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userDetails } from '../../store/Slice/userDetails.slice'
import useGreetUser from '../../hooks/useGreetUser'
import AccordionHome from './Accordion/AccordionHome'
import useTaskAPI from '../../api/useTaskAPI'
import moment from 'moment'
import Clock from './Others/Clock'
import TaskModal from '../TaskModal/TaskModal'
function HomePageComponents() {
  const { getAllTaskUser } = useTaskAPI()
  const greeting = useGreetUser()
  const user = useSelector(userDetails)
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState({
    "today": [],
    "pending": [],
    "next": []
  })

  const [selectedTask , setSelectedTask ] = useState("")
  const [showTask , setShowTask ] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const today = moment.utc().startOf('day');
    const response = await getAllTaskUser(user.email);
    
    let pastTasks = [];
    let todayTasks = [];
    let futureTasks = [];
    
    response.data.forEach(task => {
      const momentDate = moment.utc(task.dueDate)
      if (momentDate.isBefore(today)) {
        pastTasks.push(task);
      } else if (momentDate.isSame(today, 'day')) {
        todayTasks.push(task);
      } else {
        futureTasks.push(task);
      }       
    });

    setTasks({
      today : todayTasks ,
      next : futureTasks , 
      pending : pastTasks
    })

    
  }


  const accordionData = [
    {
      title: "Tasks Today",
      body: tasks.today
    },
    {
      title: "Tasks Pending",
      body: tasks.pending
    },
    {
      title: "Tasks Next",
      body: tasks.next
    }
  ]

  const toggle = (index) => {
    if (open == index) {
      return setOpen(null)
    }
    setOpen(index)
  }


  return (
    <div className='w-full h-full overflow-y-auto  flex flex-col items-center bg-white  '>
      <header className='mt-10 w-full flex-col flex  items-center'>
        <h2 className='text-cente font-lily md:text-5xl  text-3xl  
        bg-gradient-to-l bg-clip-text text-transparent from-purple-700 to-fuchsia-600'>{greeting}</h2>
        <h2 className='font-logo text-center md:text-2xl  text-l mt-1  '>Welcome {user.fname + " " + user.lname}</h2>
        <div className='bg-purple-300 w-full mt-5 p-5'>
          <p className='text-center text-white'><Clock/></p>
        </div>
      </header>
      <section className='w-full  h-full p-8  mb-28'>
        <p className='font-bruno font-bold text-l '>To Do Task list</p>
        <hr className='border-2 mt-2' />

        <section className='mt-5 w-full ml-3 '>

          <div className=' sm:ml-5 md:w-[80%]'>
            {
              accordionData.map((data, index) => {
                return <AccordionHome key={index} open={open == index} title={data.title} body={data.body}
                setSelectedTask={setSelectedTask} setShowTask={setShowTask}  toggle={() => { toggle(index) }} />
              })
            }

          </div>
        </section>
      </section>
      {showTask && <TaskModal taskId = {selectedTask} setShowModal={setShowTask} />}

    </div>
  )
}

export default HomePageComponents   
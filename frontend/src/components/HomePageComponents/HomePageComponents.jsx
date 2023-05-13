import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userDetails } from '../../store/Slice/userDetails.slice'
import useGreetUser from '../../hooks/useGreetUser'
import AccordionHome from './Accordion/AccordionHome'
import useTaskAPI from '../../api/useTaskAPI'
import moment from 'moment'

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

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const today = moment()
    const response = await getAllTaskUser(user.email) 
    let pastTasks = [];
    let todayTasks = [];
    let futureTasks = [];

    response.data.forEach(task => {
      const momentDate = moment(task);

      if (momentDate.isBefore(today, 'day')) {
        pastTasks.push(task);
      } else if (momentDate.isSame(today, 'day')) {
        todayTasks.push(task);
      } else {
        futureTasks.push(task);
      }
    })

    setTasks({
      today : todayTasks ,
      next : futureTasks , 
      pending : pastTasks
    })

    
  }
  console.log(tasks)


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
      <header className='mt-10'>
        <h2 className='text-center font-lily md:text-5xl  text-3xl 
        bg-gradient-to-l bg-clip-text text-transparent from-purple-700 to-fuchsia-600'>{greeting}</h2>
        <h2 className='font-ubuntu text-center md:text-2xl  text-l mt-1 '>Welcome {user.fname + " " + user.lname}</h2>
      </header>
      <section className='w-full  h-full p-8'>
        <p className='font-bruno font-bold text-l '>To Do Task list</p>
        <hr className='border-2 mt-2' />

        <section className='mt-5 w-full ml-3 '>

          <div className=' sm:ml-5 md:w-[80%]'>
            {
              accordionData.map((data, index) => {
                return <AccordionHome key={index} open={open == index} title={data.title} body={data.body} toggle={() => { toggle(index) }} />
              })
            }

          </div>
        </section>
      </section>

    </div>
  )
}

export default HomePageComponents   
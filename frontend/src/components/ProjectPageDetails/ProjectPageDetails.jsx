import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { unsetProject } from '../../store/Slice/projectDetails.slice'
import { BsArrowLeft } from 'react-icons/bs'
import DoughnutGraph from '../DoughnutGraph/DoughnutGraph'
import CountUp from 'react-countup'
function ProjectPageDetails({ project, setProject }) {
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(unsetProject())
    }
  }, [])
  return (
    <section className='w-full relative h-screen overflow-scroll sm:p-10 p-1 pt-16 pb-20'>

      <div className='p-2 inline-block absolute top-2 left-6  rounded-full bg-purple-500 hover:bg-purple-700 hover:scale-[1.2] '
        onClick={() => { setProject(null) }}>
        <BsArrowLeft className=' w-12 text-white text-xl font-extrabold' />
      </div>
      <div className='w-full bg-gray-200 h-full rounded-xl p-5 mt-5'>
        <div className='flex justify-center items-center   rounded-2xl md:mx-5 '>
          <hr className='border-purple-400 mt-3 border-2 block w-full '></hr>
          <h2 className='text-center mx-5 relative top-1 font-bruno text-2xl inline-block'>{project.projectName}</h2>
          <hr className='border-purple-400 mt-3 border-2 block w-full '></hr>
        </div>

        <div className='mt- p-5'>
          <h2 className='font-ubuntu text-purple-700 mb-2 md:text-l base'>Project Description</h2>
          <h2>{project.description}</h2>
          <div>
            <div className='md:grid grid-cols-2 md:space-y-0 space-y-5 mt-16' >


              <div className=''>
                <div className='px-1 flex justify-between gap-x-2'>
                  <div className='w-full shadow-lg shadow-gray-400 border-gray-300 rounded-lg border py-1'>
                    <p className='text-center block font-ubuntu t'>Total tasks</p>
                    <p className='text-center text-green-700 font-extrabold text-l'><CountUp end={10} /></p>
                  </div>
                  <div className='w-full shadow-lg shadow-gray-400 border-gray-300 rounded-lg border py-1'>
                    <p className='text-center block font-ubuntu '>Ongoing</p>
                    <p className='text-center text-red-700 font-extrabold text-l'><CountUp end={10} /></p>
                  </div>
                  <div className='w-full shadow-lg shadow-gray-400 border-gray-300 rounded-lg border py-1'>
                    <p className='text-center block font-ubuntu '>Completed</p>
                    <p className='text-center text-blue-500 font-extrabold text-l'><CountUp end={10} /></p>
                  </div>
                </div>
          

              </div>

            </div>

            <div>
            <DoughnutGraph completed={completedCount} pending={pendingCount} />
            </div>

          </div>
        </div>


      </div>
    </section>
  )
}

export default ProjectPageDetails
import React, { useEffect, useState } from 'react'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import AccordionItem from './AccordionItem/AccordionItem'
import workspaceAPI from '../../api/workspaceAPI'

function WorkspaceComponents() {
    const [open, setOpen] = useState(false)

    const toggle = (index) => {
        if (open == index) {
            return setOpen(null)
        }
        setOpen(index)

    }

    useEffect(() => {
       const workspaces  =   workspaceAPI().getAllWorkspace()

    })

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }

    const accordionData = [
        {
            title: "Own Workspaces ",
            body: "Body"
        },
        {
            title: "Shared Workspaces ",
            body: "Body 2"
        },

    ]


    return (
        <div className='p-10 w-full '>
            <header>
                <h1 className='font-lily text-l text-purple-700' >Workspace Options</h1>
                <hr className='border-purple-400 mt-3 border-2 '></hr>
                <div className='flex flex-wrap'>
                    <button className='p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-purple-400' ><span className='inline-flex  mr-1'> <AiOutlinePlusSquare /></span> New Workspace </button>
                    <button className='p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-purple-400' ><span className='inline-flex mr-1'> <AiOutlinePlusSquare /></span> Invite People </button>
                </div>
            </header>
            <section className='my-5 w-[50%]'>
                <form className='mb-5' onSubmit={handleSubmit}>
                    <div className="relative">
                        <input type="search" onChange={handleChange} id="search" className="block w-full p-3 pl-10 text-sm text-fuchsia-900 border border-purple-300 rounded-lg bg-purple-50 focus:ring-purple-500 focus:border-fuchsia-500" placeholder="Search for Workspace ..." />
                        <button type="submit" className="text-white absolute right-0 top-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-fuchsia-900  hover:to-purple-700   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm2 px-5 py-3 ">Search</button>
                    </div>
                </form>
            </section>
            <section className='grid  gap-y-4'>
                <div>
                    <h1 className='font-lily mt-10 text-l text-purple-700' >Workspace List</h1>
                    <hr className='border-purple-400 mt-3 border-2 '></hr>
                </div>
                <div className='px-[40px] w-[80%]'>
                    {
                        accordionData.map((data, index) => {
                            return <AccordionItem key={index} open={open == index} title={data.title} desc={data.body} toggle={() => { toggle(index) }} />
                        })
                    }

                </div>

            </section>
            <div className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-l font-bold leading-none text-gray-900 dark:text-white">Workspace Name </h5>
                    <h6 className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Created By
                    </h6>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Neil Sims
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    $320
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceComponents
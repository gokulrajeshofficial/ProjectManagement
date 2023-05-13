import React, { useEffect, useState } from 'react'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { ImUserPlus} from 'react-icons/im'
import AccordionItem from './AccordionItem/AccordionItem'
import workspaceAPI from '../../api/workspaceAPI'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Modal from '../Modal/Modal'
import CreateWorkspaceModal from './WorkspaceModal/CreateWorkspaceModal'
import InviteListModal from './Invitelist/InviteListModal'


function WorkspaceComponents({ setSelectedWorkspace}) {

    const [open, setOpen] = useState(false)
    const [ownWorkspace, setOwnWorkspace] = useState([])
    const [sharedWorkspace, setSharedWorkspace] = useState([])

    const [showWorkspace, setShowWorkspace] = useState(false)
    const [showInvite, setShowInvite] = useState(false)
    const axiosPrivate = useAxiosPrivate()
    const handleCreateButton = () => {
        setShowWorkspace(true)
    }
    const handleInviteButton = () => {
        setShowInvite(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            //  const response =  await workspaceAPI().getAllWorkspace()
            const response = await axiosPrivate.get('/api/workspace/getallworkspaces')
            setOwnWorkspace(response.data.userWorkspaces)
            setSharedWorkspace(response.data.sharedWorkspaces)
        } catch (error) {
            console.log("Reached Error hh")
            console.log(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()

    }
    const handleChange = () => {

    }

    //----------------------Accordion -------------------------------------
    const accordionData = [
        {
            title: "Own Workspaces ",
            body: ownWorkspace
        },
        {
            title: "Shared Workspaces ",
            body: sharedWorkspace
        },

    ]
    const toggle = (index) => {
        if (open == index) {
            return setOpen(null)
        }
        setOpen(index)
    }




    return (
        <div className='p-10 w-full overflow-y-scroll pb-44 h-screen '>
            <header>
                <h1 className='font-bruno font-extrabold text-xl text-purple-700' >Workspace Options</h1>
                <hr className='border-purple-300 mt-3 border-2 '></hr>
                <div className='flex flex-wrap'>
                    <button onClick={handleCreateButton} className='p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-0.5 left-1 mr-2'> <AiOutlinePlusSquare /></span> New Workspace </button>
                    <button onClick={handleInviteButton} className='p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-fuchsia-700' ><span className='inline-block relative top-0.5 left-1 mr-2'> <ImUserPlus /></span> Invite People </button>
                </div>
            </header>

            <section className='flex flex-col mb-5 w-full'>
                <div>
                    <h1 className='font-bruno font-extrabold mt-10 text-xl text-purple-700' >Workspace List</h1>
                    <hr className='border-purple-300 mt-3 border-2 '></hr>
                </div>
            
                <section className='mt-5 w-full ml-3 '>
                    <form className='mb-5' onSubmit={handleSubmit}>
                        <div className="relative sm:w-[40%]">
                            <input type="search" onChange={handleChange} id="search" className=" w-full p-3 pltext-sm text-fuchsia-900 border border-purple-300 rounded-lg bg-purple-50 focus:ring-purple-500 focus:border-fuchsia-500" placeholder="Search for Workspace ..." />
                            <button type="submit" className="text-white absolute right-0 top-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-fuchsia-900  hover:to-purple-700   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm2 px-5 py-3 ">Search</button>
                        </div>
                    </form>
                    <div className=' sm:ml-5 md:w-[80%]'>
                    {
                        accordionData.map((data, index) => {
                            return <AccordionItem key={index} open={open == index} title={data.title} body={data.body} toggle={() => { toggle(index) }} setSelectedWorkspace={setSelectedWorkspace} />
                        })
                    }

                </div>
                </section>
                

            </section>

            <Modal isVisible={showWorkspace} setShowModal={setShowWorkspace}>
                <CreateWorkspaceModal fetchData={fetchData} />
            </Modal>

            <Modal isVisible={showInvite} setShowModal={setShowInvite}>
                <InviteListModal ownWorkspace={ownWorkspace} />
            </Modal>


        </div>
    )
}

export default WorkspaceComponents
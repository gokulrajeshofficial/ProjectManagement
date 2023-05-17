import React, { useEffect, useState } from 'react'
import ValidateEmail from '../../../hooks/emailValidations'
import { AiOutlineClose } from 'react-icons/ai'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import LogoLoader from '../../Loader/LogoLoader';


function InviteListModal({ handleClose, ownWorkspace }) {

    const axiosPrivate = useAxiosPrivate()
    const [workspace, setWorkspace] = useState("")
    const [mail, setMail] = useState("")
    const [error, setError] = useState("")
    const [render, setRender] = useState(true)
    const [inviteList, setInviteList] = useState([])
    const [loading, setLoading] = useState(false)
    function handleOnClick() {
        const { errMessage, status } = ValidateEmail(mail)
        if (status) {
            setInviteList([...inviteList, mail])
            setMail("")
        } else {
            console.log(errMessage)
            setError(errMessage)
        }
    }

    const handleChange = (e) => {
        setMail(e.target.value)
        setError("")
    }

    const removeFromList = (index) => {
        const arrayList = inviteList
        arrayList.splice(index, 1)
        setInviteList(arrayList)
        setRender(!render)
    }
    useEffect(() => {
        !ownWorkspace.length ? setWorkspace(ownWorkspace._id) : ""
    }, [])


    const handleSubmit = async () => {
        try {
            if (workspace.length) {
                setLoading(true)
                const response = await axiosPrivate.post('/api/workspace/inviteUsers', { workspaceId: workspace, inviteList })
                if (response.status) {
                    setLoading(false)
                    handleClose()
                }
            }
        } catch (err) {
            console.log("Error at Invitelist api call : ", err)
        }
    }

    return (
        <div>

            <LogoLoader isVisible={loading} />
            <div className="container  justify-center  p-10">
                <h2 className="font-lily font-extrabold mb-5 text-transparent tracking-wide 
 lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Share Your Workspace</h2>
                <div className="grid lg:grid-cols-2 gap-10 place-content-center">
                    <div className="max-w-3xl container lg:mt-14 ">

                        {!ownWorkspace.length ?
                            <div className=' flex-col w-full h-full '>

                                <label htmlFor="countries" className=" mb-5 text-sm2  font-medium text-gray-900 dark:text-white">Invite new members for :  </label>
                    
                                <h1 className='text-center font-ubuntu text-base text-purple-700'> {ownWorkspace.workspaceName}</h1>
                         
                         
                            </div>



                            :
                            <>
                                <label htmlFor="countries" className="block  mb-5 text-sm2  font-medium text-gray-900 dark:text-white"> Choose the workplace to which you can invite</label>
                                <select onChange={(e) => { setWorkspace(e.target.value) }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                    <option className='my-10' defaultValue hidden>Choose a workspace </option>
                                    {

                                        ownWorkspace.map((workspaces, index) => {
                                            return (<option key={index} value={workspaces._id}>{workspaces.workspaceName}</option>)
                                        })

                                    }

                                </select>
                            </>
                        }
                    </div>
                    <div className="max-w-3xl container lg:mt-14">
                        <form onSubmit={(e) => { e.preventDefault(), handleOnClick() }}>
                            <label className='text-sm2'>Invite Personals into Workspace </label>
                            <div className="flex items-center border-b border-purple-500 py-2">
                                <input value={mail} onChange={handleChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
                                <button onClick={handleOnClick} className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                    Add to Invite list
                                </button>

                            </div>
                            <p className='text-red-600'>{error}</p>
                        </form>


                    </div>
                </div>
                <div className={`w-full mt-8 ${inviteList.length == 0 ? "hidden" : "block"} `}>
                    <label className='font-ubuntu text-sm2 text-fuchsia-600'>Invited list </label>
                    <ul className='lg:p-3 list-disc flex' >
                        {
                            inviteList.map((elem, index) => {
                                return (<li key={index} className="block p-1 px-2 rounded-md bg-purple-500 text-white m-2" >{elem}<span className='inline-block ml-2 relative z-10 top-0.5 cursor-pointer' onClick={() => { removeFromList(index) }}><AiOutlineClose /></span></li>)
                            })

                        }
                    </ul>
                </div>
                <div className='w-full flex  mt-10 '>

                    <button onClick={handleSubmit} className={`p-3 px-5 m-5 rounded-md text-white bg-purple-600 hover:bg-purple-400 mx-auto`}>Invite</button>
                </div>

            </div>

        </div>
    )
}

export default InviteListModal
import React, { useState } from 'react'
import { TwitterPicker } from 'react-color';
import ValidateEmail from '../../../hooks/emailValidations';
function CreateWorkspaceModal() {
    const [workspaceCreation, setWorkspaceCreation] = useState({
        workspaceName: "",
        theme: "#9013FE"
    })

    const [toggleName, setToggleName] = useState("workspace");

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setWorkspaceCreation({ ...workspaceCreation, [name]: value })
    }
    const handleColorChange = (newColor) => {
        setWorkspaceCreation({ ...workspaceCreation, theme: newColor.hex });
    };


    //Invite props

    const [mail, setMail] = useState("")
    const [error, setError] = useState("")
    const [inviteList, setInviteList] = useState([])
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



    return (
        <div className="container flex-col  p-10">
            <h2 className="font-lily font-extrabold  text-transparent tracking-wide 
         lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Workspace Creation </h2>
            <div className="flex justify-center">
                <div className="max-w-3xl container lg:mt-14">
                    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                        <ul className=" text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                            <li className="w-full ">
                                <button id="stats-tab" data-tabs-target="#stats" type="button" role="tab" aria-controls="stats" aria-selected="true" className="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Workspace</button>
                            </li>
                            <li className="w-full">
                                <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false" className="inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Invite People</button>
                            </li>

                        </ul>
                        <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
                            <div className={`${toggleName === 'workspace' ? "block" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="stats" role="tabpanel" aria-labelledby="stats-tab">
                                <form className=''>
                                    <div className="mb-10">
                                        <label className="block text-F-700 text-sm2 font-bold mb-4" htmlFor="workspaceName">
                                            Give a name your Workspace
                                        </label>
                                        <input value={workspaceCreation.workspaceName} name="workspaceName" onChange={handleOnChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workspaceName" type="text" placeholder="Workspace Name" />
                                        <p className='text-center text-sm text-gray-500'>(This is usually your organization's name)</p>
                                    </div>
                                    <div className='p-2'>
                                        <label className="block text-F-700 text-sm2 font-bold mb-4" htmlFor="workspaceName">
                                            Choose a theme for your Workspace
                                        </label>
                                        <TwitterPicker color={workspaceCreation.theme} onChange={handleColorChange} />
                                        <div className='   mt-5'>
                                            <p className=''>Selected Color : </p>
                                            <input name='theme' type="color" placeholder='' className='shadow   rounded w-full' value={workspaceCreation.theme} />
                                        </div>
                                    </div>

                                </form>



                            </div>
                            <div className={`${toggleName === 'invite' ? "block" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="about" role="tabpanel" aria-labelledby="about-tab">
                                <div className="container flex-col justify-">
                                    <h2 className="font-lily font-extrabold  text-transparent tracking-wide 
 lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Workspace Creation </h2>
                                    <div className="flex justify-center">
                                        <div className="max-w-3xl container lg:mt-14">
                                            <form className="">
                                                <label>Invite Personals into Workspace </label>
                                                <div className="flex items-center border-b border-purple-500 py-2">
                                                    <input value={mail} onChange={handleChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Jane Doe" aria-label="Full name" />
                                                    <button onClick={handleOnClick} className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                                        Add to Invite list
                                                    </button>

                                                </div>
                                                <p className='text-red-600'>{error}</p>
                                            </form>
                                            <div className={`w-full mt-8 ${inviteList.length == 0 ? "hidden" : "block"} `}>
                                                <label className='font-ubuntu text-sm2 text-fuchsia-600'>Invited list </label>
                                                <ul className='lg:p-3 list-disc' >
                                                    {
                                                        inviteList.map((elem, index) => {
                                                            return (<l1 key={index} className="block m-2" >{elem}</l1>)
                                                        })

                                                    }
                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-between'>

                            <button onClick={() => { setToggleName("workspace") }} className={`p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-purple-400`}>prev</button>
                            <button onClick={() => { setToggleName("invite") }} className={`p-3 m-3 rounded-md text-white bg-purple-600 hover:bg-purple-400`}>next</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateWorkspaceModal
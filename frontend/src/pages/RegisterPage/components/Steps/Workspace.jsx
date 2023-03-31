import React, { useEffect } from 'react'

function Workspace({workspaceCreation , setWorkspaceCreation , workspaceErrors}) {

    const handleOnChange = (e)=>{
        const {name , value } = e.target
        setWorkspaceCreation({ ...workspaceCreation , [name] : value })
    } 

    
    return (
        <div className="container flex-col justify-">
            <h2 className="font-lily font-extrabold  text-transparent tracking-wide 
         lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Workspace Creation </h2>
            <div className="flex justify-center">
                <div className="max-w-3xl container lg:mt-14">
                    <form className=''>
                        <div className="mb-10">
                            <label className="block text-F-700 text-sm2 font-bold mb-4" htmlFor="workspaceName">
                                Give a name your Workspace
                            </label>
                            <input value={workspaceCreation.workspaceName} name="workspaceName" onChange={handleOnChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workspaceName" type="text" placeholder="Workspace Name"/>
                            <p className='text-center text-sm text-gray-500'>(This is usually your organization's name)</p>
                            {/* <p className='text-sm text-red-600'>{workspaceErrors.workspaceName}</p> */}
                        </div>
                        {/* <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-4" htmlFor="password">
                                
                            </label>
                            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                              
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Workspace
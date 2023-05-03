import React, { useState } from 'react'
import ValidateEmail from '../../../hooks/emailValidations'
import { AiOutlineClose } from 'react-icons/ai'

function Invite({ inviteList, setInviteList }) {

    const [mail, setMail] = useState("")
    const [error , setError] = useState("")
    function handleOnClick() {
        const {errMessage , status} = ValidateEmail(mail)
        if(status)
        {
        setInviteList([...inviteList, mail])
        setMail("")
        }else{
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

    return (

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
                    <ul className='lg:p-3 list-disc flex' >
                        {
                            inviteList.map((elem, index) => {
                                return (<li key={index} className="block p-1 px-2 rounded-md bg-purple-500 text-white m-2" >{elem}<span className='inline-block ml-2 relative z-10 top-0.5 cursor-pointer' onClick={() => { removeFromList(index) }}><AiOutlineClose /></span></li>)
                            })

                        }
                    </ul>
                </div>

                </div>
            </div>
        </div>
    )
}

export default Invite
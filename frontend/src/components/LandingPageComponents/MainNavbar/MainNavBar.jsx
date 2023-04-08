import React, { Fragment, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
function MainNavBar({loginHandle , registerHandle}) {
    const [open, setOpen] = useState(false)
    return (
        <Fragment>
            <header className=' sticky top-0  py-2 bg-gradient-to-l to-black via-gray-900 from-purple-600 z-20'>
                <div className='flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[4%] flex-wrap w-full'>
                    <div className='flex items-center'>
                        <img src="/LOGO.png" width={60} />
                        <div className='mt-4 mx-1'>
                            <h1 className='font-extrabold leading-5 font-logo text-transparent tracking-wide 
                 text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Phoenix  </h1>
                            <h1 className='text-white font-logo'>Trek</h1>
                        </div>
                    </div>
                    <FiMenu className='lg:hidden block h-6 w-6 cursor-pointer border-spacing-10 text-white border-black' onClick={()=>{
                        setOpen(!open)
                    }} />
                    <nav className={`${open == true ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full ms-auto`}>
                        <ul className='lg:flex lg:justify-between '>
                            <li><button className='bg-gradient-to-r  block to-fuchsia-500 w-full from-indigo-700 hover:from-pink-600  hover:to-black
                         text-white font-bold  py-2 px-4 mx-1 lg:w-40 rounded font-lily' onClick={loginHandle} >Login</button></li>
                            <li><button className='bg-white block text-fuchsia-600  hover:bg-gradient-to-r hover:from-pink-500 hover:to-black hover:text-white
                         font-bold py-2 px-4 mx-1 rounded font-lily lg:w-40 w-full' onClick={registerHandle}>Register</button></li>
                        </ul>

                    </nav>
                </div>

            </header>
        </Fragment>
    )
}

export default MainNavBar
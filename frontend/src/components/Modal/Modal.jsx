import React, { Children } from 'react'
import {BiArrowBack} from 'react-icons/bi'
function Modal (props){
    if(!props.isVisible) return null

   const handleClose = ()=>{
    props.setShowModal(false)

   }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center  '>
        <div className=' bg-white rounded-xl grid grid-flow-row lg:w-[60%]'>

           <div className='w-full flex justify-between bg-gradient-to-b from-fuchsia-500 to-purple-800  px-2 p-2 rounded-t-xl'>
            <img className='w-10' src='./LOGO.png'/>
            <button onClick={handleClose} className='bg-fuchsia-400 p-2 px-4 rounded-md'><BiArrowBack /></button>
            </div> 
           <div className='container'>

           {props.children}
            </div> 
        </div>

    </div>
  )
}

export default Modal
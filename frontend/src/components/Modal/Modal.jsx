import React, { Children } from 'react'
import {BiArrowBack} from 'react-icons/bi'
function Modal (props){
    if(!props.isVisible) return null

   const handleClose = ()=>{
    props.setShowModal(false)

   }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm   flex justify-center  overflow-y-scroll '>
        <div className=' grid-rows-2 lg:w-[60%] sm:my-auto my-2'>

           <div className='w-full flex justify-between bg-gradient-to-b  h-16 from-fuchsia-500 to-purple-800  px-2 p-2 rounded-t-xl'>
            <img className='w-10' src='./LOGO.png'/>
            <button onClick={handleClose} className='bg-fuchsia-400 p-2 px-4 rounded-md'><BiArrowBack /></button>
            </div> 
           <div className=' w-full  rounded-xl rounded-t-none bg-white'>
           {React.Children.map(props.children, (child) => {
            // Pass the handleClose function as a prop to each child element
            return React.cloneElement(child, { handleClose });
          })}
            </div> 
        </div>

    </div>
  )
}

export default Modal
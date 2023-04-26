import React from 'react'
import { Collapse } from 'react-collapse'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { userDetails } from '../../../store/Slice/userDetails.slice'
import { useNavigate } from 'react-router-dom'
function AccordionItem({ open, toggle, title, body }) {
  const selector = useSelector(userDetails)
  const navigate = useNavigate()
  return (
    <div className='pt-[10px] '>
      <div className=' bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-md  px-5 py-3 flex justify-between items-center cursor-pointer'
        onClick={toggle}>
        <p className='text-[18px] font-semibold font-ubuntu'>{title}</p>
        <div className='text-[30px]'>
          {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>

      </div>


      <Collapse isOpened={open}>
        <div className='bg-white px-[50] p-5 py-2 max-h-52 overflow-y-scroll'>
          {
            body.map((data, index) => {
              return (
                <div className="flex cursor-pointer rounded-md px-5  hover:bg-purple-200 items-center space-x-4 p-3" key={index} onClick={()=>{navigate('/workspaceDetails')}} >

                  <div class={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[${data.theme}] rounded-full dark:bg-gray-600`}>
                    <span class="font-medium text-gray-600 dark:text-gray-300">{data.workspaceName[0].toUpperCase()}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {data.workspaceName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Created by: {selector.email}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-sm2 font-semibold text-gray-900 dark:text-white">
                    {data.Date.split("T")[0]}
                  </div>
                </div>
              )

            })
          }
        </div>

      </Collapse>
    </div>
  )
}

export default AccordionItem
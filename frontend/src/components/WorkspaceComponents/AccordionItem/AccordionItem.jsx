import React from 'react'
import { Collapse } from 'react-collapse'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { userDetails } from '../../../store/Slice/userDetails.slice'
function AccordionItem({ open, toggle, title, body }) {
  const selector = useSelector(userDetails)
  return (
    <div className='pt-[10px] '>
      <div className=' bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md  px-5 py-3 flex justify-between items-center cursor-pointer'
        onClick={toggle}>
        <p className='text-[18px] font-semibold font-ubuntu'>{title}</p>
        <div className='text-[30px]'>
          {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>

      </div>


      <Collapse isOpened={open}>
        <div className='bg-white px-[50] p-5 py-2'>
        {
          body.map((data, index) => {
            return(
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 relative">
                <div className="w-8 h-8 bg-black rounded-full"  alt="Neil image" />
                <p className='absolute -top-1  left-3 text-white text-l'>s</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {data.workspaceName}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  Created by: { selector.email}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $320
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
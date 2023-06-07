import React from 'react'

function MessageComponents() {
  return (
    <div className='p-10  h-screen flex overflow-y-auto '>
      <div className='grid grid-cols-10 w-full border-2 shadow-lg shadow-purple-600  rounded-xl  '>
        <div className='col-span-3   rounded-l-xl flex-wrap border-r'>
          <header className=' p-5 bg-purple-700  rounded-l-xl  rounded-bl-none'>
          <p className='text-center text-white font-bruno'>  Groups</p>
          </header>
          <section className=''>
            <div>
              <input type="text" />
            </div>
            <div className=''>

            </div>
          </section>
        </div>
        <div className='col-span-7 border-r  rounded-l-xl flex-wrap'>
        <header className=' p-5 bg-purple-700  rounded-r-xl  rounded-br-none'>
          <p className='text-center text-white font-bruno'> Messages</p>
          </header>
          <section>
            
            </section>

        </div>

      </div>
    </div>
  )
}

export default MessageComponents
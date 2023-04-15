import React from 'react'

function ForgotPassword() {
  return (
    <div className=' py-5 '>
      <h3 className='text-center font-bold text-l'>  Change Your Password </h3>
      <div className='md:grid grid-cols-2'>
        <div>
            <img className='md:block hidden' src="./otp.gif" alt=""  />
        </div>
        <div className='p-5'>
            <h5 className=' mt-5 text-center font-ubuntu text-base'> Forgot Your Password ?</h5>
            <form>
            <div className=' mt-10'>
                  <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Registered Phone Number</label>
                  <input type="number" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Phone number" required=""/>
              </div>
              <button className='bg-purple-600 rounded-lg px-5 py-2 text-white mt-5'>Register</button>
            </form>
        </div>
      </div>
        

    </div>
  )
}

export default ForgotPassword
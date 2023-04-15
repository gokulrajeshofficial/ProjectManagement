import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFormSigninValidation from '../../hooks/Signin/useFormSigninValidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authAPI from '../../api/authAPI';
import GoogleButton from '../GoogleLoginButton/GoogleButton';

import { useDispatch } from 'react-redux';
import { setDetails } from '../../store/Slice/userDetails.slice';
import Modal from '../Modal/Modal';
import ForgotPassword from './Modal/ForgotPassword';

function SignInPageComponent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
      })

      const [showModal , setShowModal ] = useState(false)
      const { validation, OnSubmitValidation } = useFormSigninValidation(credentials)
    
      const handleOnChange = (e) => {
        let { name, value } = e.target
        value = value.trim()
        setCredentials((prev) => ({ ...prev, [name]: value }))
        validation(name, value)
      }
      const ToastifyOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
      const handleSubmit = async (e) => {
        e.preventDefault()
        const status = await OnSubmitValidation(toast, ToastifyOptions)
        if (status) {
          try {
            const response = await authAPI().loginApi(credentials);
            console.log("success,", response.data);
            const {_id , fname , lname ,  email , company , phone } = response.data.user
            const accessToken = response.data.token
            dispatch(setDetails({_id , fname , lname ,  email , company , phone  , accessToken}))
            navigate('/home')
          } catch (error) {
    
            toast(error.err.toString(), ToastifyOptions)
          }
        }
      } 

      const googleLogin = async( userInfo )=>{
        try{
          
        console.log(userInfo);
        const response = await authAPI().googleLoginApi({ email: userInfo.email })
        const {_id , fname , lname ,  email , company , phone } = response.data.user
        const accessToken = response.data.token
        dispatch(setDetails({_id , fname , lname ,  email , company , phone  , accessToken}))
            navigate('/home')
        
      }catch(error){
        toast(error.err.toString(), ToastifyOptions)
      }

      }


  return (
<div className='lg:min-h-screen flex justify-center items-center  lg:p-15 sm:p-3 '  >
        <div className='container   lg:p-5'>
          <div className=' text-center mb-5 w-full '>
            <h2 className='font-lily font-extrabold  text-transparent tracking-wide 
                 lg:text-4xl text-2xl bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex
                 '>Welcome back  to &nbsp;<span>
                <div className='flex'>
                  <div>
                    <img src="./LOGO.png" className='-mt-3' width={70} alt="" srcSet="" />
                  </div>
                  <div className='text-left'>
                    <h1 className='font-extrabold font-logo leading-10 text-transparent tracking-wide 
                  text-2xl bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>Phoenix  </h1>
                    <h1 className='text-black font-logo text-l leading-3'>Trek</h1>
                  </div>
                </div>
              </span> </h2>

          </div>
          <div className='lg:grid grid-cols-2  mt-10 bg-white items-center  rounded-3xl shadow-2xl shadow-purple-500'>
            <div className=' lg:block hidden'>

              <img src="./LoginPageGif.gif" className='w-full h-full' />
            </div>
            <div className='w-full lg:h-full flex justify-center items-center p-4'>

              <div className="w-full p-6  bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-md shadow-md lg:max-w-2xl lg:px-16 sm:px-10">
                <h1 className="text-xl lg:text-xl font-semibold text-center text-white font-ubuntu mb-10">
                  Sign in to <br className='lg:hidden' />  your Account
                </h1>




                <div className="grid grid-flow-row mt-4 gap-y-3">
                  <GoogleButton  text = "Sign in with Google" handleUserInfo = {googleLogin} />
                  <button
                    type="button"
                    className="flex items-center  bg-gradient-to-t from-white to-white  hover:from-fuchsia-600 hover:to-purple-900 hover:text-white  justify-center w-full p-3 border border-purple-600 rounded-md focus:ring-1 focus:ring-offset-1 focus:ring-violet-600 "
                  >
                    <svg fill="#000000"
                      className='w-5 h-5 fill-current'
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M458.4741,112H265V62.41A31.3815,31.3815,0,0,0,233.5879,31H62.4077A31.3806,31.3806,0,0,0,31,62.41V449.59A31.4379,31.4379,0,0,0,62.4077,481h171.18A31.4388,31.4388,0,0,0,265,449.59V292H458.4771A22.5231,22.5231,0,0,0,481,269.4771V134.5259A22.5257,22.5257,0,0,0,458.4741,112ZM125.5,50.08h45a11.25,11.25,0,0,1,0,22.5h-45a11.25,11.25,0,0,1,0-22.5Zm44.9956,411.7651h-45a11.25,11.25,0,1,1,0-22.5h45a11.25,11.25,0,0,1,0,22.5ZM245.1982,420.25H50.7974V91.75H245.1982V112H125.3149A22.3149,22.3149,0,0,0,103,134.3149V269.6641A22.3357,22.3357,0,0,0,125.3359,292H166v36.1489a11.1221,11.1221,0,0,0,18.9868,7.8643L229,292h16.1982Zm-24.39-210.06a11.3086,11.3086,0,0,1,4.14,15.39,11.198,11.198,0,0,1-15.39,4.14L195.25,221.44V238a11.25,11.25,0,0,1-22.5,0V221.44L158.437,229.72a11.198,11.198,0,0,1-15.39-4.14,11.3164,11.3164,0,0,1,4.14-15.39L161.5,202l-14.313-8.28a11.2689,11.2689,0,0,1,11.25-19.5293L172.75,182.47V166a11.25,11.25,0,0,1,22.5,0v16.47l14.3086-8.2793a11.2689,11.2689,0,0,1,11.25,19.5293L206.5,202Zm108,0a11.3086,11.3086,0,0,1,4.14,15.39,11.198,11.198,0,0,1-15.39,4.14L303.25,221.44V238a11.25,11.25,0,0,1-22.5,0V221.44L266.437,229.72a11.198,11.198,0,0,1-15.39-4.14,11.3164,11.3164,0,0,1,4.14-15.39L269.5,202l-14.313-8.28a11.2689,11.2689,0,0,1,11.25-19.5293L280.75,182.47V166a11.25,11.25,0,0,1,22.5,0v16.47l14.3086-8.2793a11.2689,11.2689,0,0,1,11.25,19.5293L314.5,202Zm108,0a11.3086,11.3086,0,0,1,4.14,15.39,11.198,11.198,0,0,1-15.39,4.14L411.25,221.44V238a11.25,11.25,0,0,1-22.5,0V221.44L374.437,229.72a11.198,11.198,0,0,1-15.39-4.14,11.3164,11.3164,0,0,1,4.14-15.39L377.5,202l-14.313-8.28a11.2689,11.2689,0,0,1,11.25-19.5293L388.75,182.47V166a11.25,11.25,0,0,1,22.5,0v16.47l14.3086-8.2793a11.2689,11.2689,0,0,1,11.25,19.5293L422.5,202Z" />

                    </svg>
                    <p className='-mt-1 ml-2 font-sans font-semibold'>Sign in with OTP</p>
                  </button>
                </div>

                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                  <div className="absolute px-5 bg-white">Or</div>
                </div>


                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block lg:text-sm2 text-sm font-semibold text-white" >Email</label>
                    <input name='email'
                      type="text"
                      placeholder='E-mail' onChange={handleOnChange}
                      className="block w-full px-4 py-2 mt-2 text-white bg-purple-800
                     border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="block lg:text-sm2 text-sm font-semibold text-white"
                    >
                      Password
                    </label>
                    <input name='password'
                      type="password" onChange={handleOnChange}
                      placeholder='Password'
                      className="block w-full px-4 py-2 mt-2 text-white bg-purple-800 border rounded-md
                     focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />

                  </div>
                  <div className='grid grid-flow-col'>
                    <div className='flex'>
                      <input type='checkbox' required ></input>
                      <div className=' ml-2'>
                        <label className='text-white'>I agree to the terms and conditions of Pheonix trek</label>
                      </div>
                    </div>
                    <p className="text-xs ml-5 text-gray-200 hover:underline hover:text-white" onClick={ ()=>{setShowModal(true)}}>
                      Forget Password?
                    </p>
                  </div>
                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md  hover:to-purple-700 hover:bg-gradient-to-t hover:from-fuchsia-700 focus:outline-none focus:bg-purple-600">
                      Login / Sigin
                    </button>
                  </div>
                </form>





                <p className="mt-8 text-xs font-light text-center text-white">
                  {" "}
                  Don't have an account?{" "}
                  <Link to={'/register'}
                    className="font-medium text-purple-200 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>


            </div>

          </div>
        </div>
        <Modal isVisible={showModal} setShowModal={setShowModal}>
          <ForgotPassword/>
        </Modal>
        <ToastContainer />
      </div>
  )
}

export default SignInPageComponent
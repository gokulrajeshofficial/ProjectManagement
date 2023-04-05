import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import authAPI from '../../api/authAPI'
import ValidateEmail from '../../hooks/emailValidations'
import RegisterPage from '../RegisterPage/RegisterPage'

function RegisterEmailPage() {
    const { verifyEmailId } = authAPI()
    
    const [email , setEmail] = useState("")
    const [error , setError] = useState("")
    const [proceed , setProceed] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {status , errMessage} =  ValidateEmail(email)

        if(status)
        {
            const verification = await verifyEmailId(email);
            console.log(verification.data)
            verification.data == true ?  setProceed(verification.data) : setError("This email has already been registered")
        
        }else{
            setError(errMessage)
        }
        
    }

    const handleOnChange = (e)=>{
        setEmail(e.target.value)
        setError("")

    }
    return (
        <>
        {
        proceed == true ?  <RegisterPage email={email}/>  :
        <div className='lg:min-h-screen flex justify-center items-center  lg:p-15 p-3 '  >
            <div className='container   lg:p-5'>
                <div className=' text-center mb-5 w-full '>
                    <h2 className='font-lily font-extrabold  text-transparent tracking-wide 
               lg:text-4xl text-2xl bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex
               '>Welcome to &nbsp;<span>
                            <div className='flex'>
                                <div>
                                    <img src="./LOGO.png" className='-mt-3' width={70} alt=""  />
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
                                Register <br className='lg:hidden' />  your Account
                            </h1>

                            <div className="grid grid-flow-row mt-4 gap-y-3">
                                <button
                                    type="button"
                                    className="flex items-center  bg-gradient-to-t from-white to-white  hover:from-fuchsia-600 hover:to-purple-900 hover:text-white  justify-center w-full p-3 border border-black rounded-md focus:ring-2
                 focus:ring-offset-1 focus:ring-violet-600">
                                    <img src='https://freesvg.org/img/1534129544.png' width={25} />
                                    <p className='-mt-1 ml-2 font-sans font-semibold'>Sign up with Google</p>
                                </button>

                            </div>

                            <div className="relative flex items-center justify-center w-full my-10 border border-t">
                                <div className="absolute px-5 bg-white">Or</div>
                            </div>

                            <form className="lg:mt-6 mt-2" onSubmit={handleSubmit }>
                                <div className="lg:mb-10 mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block lg:text-sm2 text-sm font-semibold text-white" >Email</label>
                                    <input
                                        type="text"
                                        placeholder='E-mail' onChange={handleOnChange}
                                        className="block w-full px-4 py-2 mt-2 text-white bg-purple-800
                   border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    <p className=' text-red-500  font-bold inline-block'>{error}</p>
                                </div>

                                <div className='grid grid-flow-col'>
                                    <div className='flex'>
                                        <input type='checkbox' required ></input>
                                        <div className=' ml-2'>
                                            <label className='text-white'>I agree to the terms and conditions of Pheonix trek</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:to-purple-700 hover:bg-gradient-to-t hover:from-fuchsia-700 focus:outline-none focus:bg-purple-900 ">
                                        Register / Sigup
                                    </button>
                                </div>
                            </form>

                            <p className="mt-8 text-xs font-light text-center text-white">
                                {" "}
                                Already have an account ?{" "}
                                <Link to={'/login'}
                                    className="font-medium text-purple-200 hover:underline hover:text-purple-900"
                                >
                                    Signin
                                </Link>
                            </p>
                        </div>


                    </div>

                </div>
            </div>
        </div>
         }
      </>
    )
}

export default RegisterEmailPage
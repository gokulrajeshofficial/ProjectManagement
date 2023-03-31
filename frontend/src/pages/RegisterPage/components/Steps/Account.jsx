
import useFormUserValidation from '../../../../hooks/Registration/useFormUserValidation'


export default function Account({userData,setUserData , handleChangeValidation, errors}) {
   

const handleChange = (e)=>{
    let {name , value} = e.target
    value = value.trim()  
    setUserData({...userData , [name] : value }) 
    handleChangeValidation(e)
}


    return (
        <div className="container flex-col justify-">
            <h2 className="font-lily font-extrabold  text-transparent tracking-wide 
                 lg:text-2xl  text-l bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex">Tell us about yourself</h2>
            <div className="flex justify-center">
                <div className="max-w-3xl container lg:mt-14">

                    <form className="gird grid-flow-row gap-y-36">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" value={userData.fname} onChange={handleChange} name="fname" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform lg:-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:lg:-translate-y-6">First name</label>
                                <p className="text-red-600">{errors?.fname}</p>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" value={userData.lname} onChange={handleChange} name="lname" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform lg:-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:lg:-translate-y-6">Last name</label>
                                <p className="text-red-600">{errors?.lname}</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="tel" value={userData.phone} onChange={handleChange} name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform lg:-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:lg:-translate-y-6">Phone number (123-456-7890)</label>
                                <p className="text-red-600">{errors?.phone}</p>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" value={userData.company} onChange={handleChange} name="company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform lg:-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:lg:-translate-y-6">Company (Ex. Google)</label>
                                <p className="text-red-600">{errors?.company}</p>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="email" value={userData.email} onChange={handleChange} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform lg:-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:lg:-translate-y-6">Email address</label>
                            <p className="text-red-600">{errors?.email}</p>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="password" value={userData.password} onChange={handleChange} name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform lg:-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:lg:-translate-y-6">Password</label>
                            <p className="text-red-600">{errors?.password}</p>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="password" value={userData.repeat_password} onChange={handleChange} name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform lg:-translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:lg:-translate-y-6">Confirm password</label>
                            <p className="text-red-600">{errors?.repeat_password}</p>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
}
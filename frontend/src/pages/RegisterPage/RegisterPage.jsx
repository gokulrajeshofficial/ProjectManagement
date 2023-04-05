import React, { useState, useRef, useEffect } from 'react'
import Stepper from '../../components/RegisterPageComponents//Stepper/Stepper'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Account from '../../components/RegisterPageComponents/Steps/Account'
import Workspace from '../../components/RegisterPageComponents/Steps/Workspace'
import Invite from '../../components/RegisterPageComponents/Steps/Invite'
import Complete from '../../components/RegisterPageComponents/Steps/Complete';

//custom hooks validation
import useFormUserValidation from '../../hooks/Registration/useFormUserValidation'
import useWorkspaceValidation from '../../hooks/Registration/useWorkspaceValidation';


function RegisterPage({email}) {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        phone: "",
        company: "",
        password: "",
        repeat_password: "",
        email
    });                                                                                   // userDetails
    const [workspaceCreation, setWorkspaceCreation] = useState({ workspaceName: "" })   // WorkSpace Details
    const [inviteList, setInviteList] = useState([])                                   //Invite Details

    //Multi form validation Custom hooks 
    const { handleChangeValidation, errors, handleNext } = useFormUserValidation(userData);
    const { workspaceErrors, workspaceHandleNext } = useWorkspaceValidation(workspaceCreation)


    const steps = [
        "Personal Details",
        "Workspace creation",
        "Invite Persons",
        "Complete",
    ];

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Account userData={userData} setUserData={setUserData} handleChangeValidation={handleChangeValidation} errors={errors} />;
            case 2:
                return <Workspace workspaceCreation={workspaceCreation} setWorkspaceCreation={setWorkspaceCreation} workspaceErrors={workspaceErrors} />;
            case 3:
                return <Invite inviteList={inviteList} setInviteList={setInviteList} />;
            case 4:
                return <Complete userData={userData}  workspaceCreation={workspaceCreation}  inviteList={inviteList}  />
            default:
        }
    };

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


    const handleClick = (direction) => {
        let newStep = currentStep;
        console.log("New step =", newStep)
        if (newStep == 1) {
            if (handleNext()) {
                direction === "next" ? newStep++ : newStep--;
            } else {
                toast("Please fill out all the from before proceeding to next!", ToastifyOptions);
            }
        } else if (newStep == 2) {
            console.log("Workspace handle ", workspaceHandleNext())
            if (workspaceHandleNext()) {
                direction === "next" ? newStep++ : newStep--;
            } else {
                toast(workspaceErrors.workspaceName, ToastifyOptions);
            }
        } else if (newStep == 3) {
           ( direction === "next" || direction === "skip" )? newStep++ : newStep--;
            if (direction == "skip") {
                setInviteList([])
            }
        }

        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };
    return (
        <div>
            <div className='lg:min-h-screen flex justify-center items-center  lg:p-15 p-3 '  >
                <div className='container   rounded-3xl lg:p-5'>
                    <header className=' text-center mb-5 w-full '>
                        <h2 className='font-lily font-extrabold  text-transparent tracking-wide 
                 lg:text-4xl text-2xl bg-clip-text bg-gradient-to-l from-purple-600 to-pink-600 inline-flex
                 '>Welcome to &nbsp;<span>
                                <div className='text-left'>
                                    <h1 className='font-extrabold font-logo leading-10 text-transparent tracking-wide 
                  text-2xl bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>Phoenix  </h1>
                                    <h1 className='text-black font-logo text-l leading-3'>Trek</h1>
                                </div>
                            </span> </h2>

                    </header>
                    <div className='bg-white  mt-10  items-center  rounded-3xl shadow-2xl shadow-purple-500 p-2 py-'>
                        <div className='text-center'>
                            <h1 className='text-transparent tracking-wide font-ubuntu
                  md:text-2xl text-l bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600' >Registeration Page</h1>
                        </div>
                        <div className="horizontal container mt-5 md:px-32">
                            <Stepper steps={steps} currentStep={currentStep} />

                            <div className="my-10 p-10 ">
                                {displayStep(currentStep)}
                            </div>
                        </div>

                        {currentStep !== steps.length && (


                            <div className="container mt-4 mb-8 flex justify-around">
                                <button
                                    onClick={() => handleClick()}
                                    className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-purple-600 transition duration-200 ease-in-out hover:bg-purple-600 hover:text-white  ${currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
                                        }`}
                                >
                                    Back
                                </button>
                                <div className='flex '>
                                    <button
                                        onClick={() => handleClick("skip")}
                                        className={`cursor-pointer rounded-lg bg-purple-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-fuchsia-700 hover:text-white ${currentStep == 3 ? "block" : "hidden"}`}
                                    >Skip </button>
                                    <button
                                        onClick={() => handleClick("next")}
                                        className="cursor-pointer rounded-lg bg-purple-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-fuchsia-700 hover:text-white"
                                    >
                                        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default RegisterPage
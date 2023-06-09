import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginError = (msg)=>{
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
    toast(msg ,ToastifyOptions )

}

export const taskErrorToast = (msg)=>{
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
    toast.error(msg ,ToastifyOptions )

}


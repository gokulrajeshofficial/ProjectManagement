import React from 'react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import authAPI from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';
import { LoginError } from '../../config/toastifyConfig';

function GoogleButton({text ,    handleUserInfo}) {
    const navigate = useNavigate()

    const googleLoginHandle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { "Authorization": `Bearer ${tokenResponse.access_token}` } },
                ).then(req => req.data);

                handleUserInfo(userInfo)

            } catch (err) {
                console.log(err, "Reached")
                LoginError(err.toString())
            }

        },
        onError: errorResponse => console.log(errorResponse),
    });


    return (
        <>
            <button
                type="button" onClick={googleLoginHandle}
                className="flex items-center  bg-gradient-to-t from-white to-white hover:from-fuchsia-600 hover:to-purple-900 hover:text-white  justify-center w-full p-3 border border-black rounded-md focus:ring-2
   focus:ring-offset-1 focus:ring-violet-600">
                <img src='https://freesvg.org/img/1534129544.png' width={25} />
                <p className='-mt-1 ml-2 font-sans font-semibold'>{text}</p>
            </button>
            {/* <GoogleLogin/> */}
        </>
    )
}

export default GoogleButton
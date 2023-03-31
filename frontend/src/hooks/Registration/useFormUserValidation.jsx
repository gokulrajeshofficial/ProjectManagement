import React, { useEffect, useState } from 'react'

const useFormUserValidation = (userData) => {
    const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        phone: "",
        company: "",
        password: "",
        repeat_password: "",
        email: ""
    });


    const handleChangeValidation = async (e) => {

        let { name, value } = e.target
        value = value.trim()
        validation(name, value)
    }
    const validation = (name, value) => {

        let error = "";
        switch (name) {
            case 'fname': {
                if (!value) {
                    error = "First Name is Required"
                }
                break;
            };
            case 'lname': {
                if (!value) {
                    error = "Last Name is Required"
                }
                break;
            };
            case 'email': {
                if (!value) {
                    error = "E-mail is Required"
                }
                // }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]]+\.[A-Z]{2,}$/i.test(value.email))
                // {
                //     error ="E-mail address is invalid"
                // }
                break;
            };
            case 'phone': {
                if (!value) {
                    error = "Registered Mobile is required"
                } else if (value.length != 10) {
                    error = "Mobile number should be 10 digits"
                }
                break;
            };
            case 'company': {
                if (!value) {
                    error = "Company name is Required"
                }
                break;
            };
            case 'password': {
                if (!value) {
                    error = "Password is Required"
                } else if (value.length < 6) {
                    error = "Password needs to be 6 characters or more"
                }
                break;
            };
            case 'repeat_password': {
                if (!value) {
                    error = "Confirm password is Required"
                } else if (userData.password != value) {
                    error = "Passwords do not match"
                }
                break;
            }
        }
        setErrors((prevErrors) => ({
            ...prevErrors, [name]: error
        }))

    }
    const handleNext = () => {
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                // console.log(`${key}: ${errors[key].length}`);
                if (errors[key].length != 0) {
                    return false
                }
            }
        }
        // console.log("Handle Function 222222222222222222222")

        for (const key in userData) {
            if (userData.hasOwnProperty(key)) {
                // console.log(`${key}: ${userData[key].length}`);
                if (userData[key].length == 0) {
                    return false
                }
            }
        }
        return true

    }

    return { handleChangeValidation, errors, handleNext }
}

export default useFormUserValidation
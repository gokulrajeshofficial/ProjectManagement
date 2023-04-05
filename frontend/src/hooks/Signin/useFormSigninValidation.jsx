import { useState } from "react"
import ValidateEmail from "../emailValidations"

const useFormSigninValidation = (credentials) => {
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const validation = async (name, value) => {
        value = value.trim()
        let error = ""
        switch (name) {
            case 'email': {
                const { status, errMessage } = ValidateEmail(value)
                error = errMessage
                break
            }
            case 'password': {
                if (!value) {
                    error = "Password is Required"
                    break
                }
            }

        }
        await setErrors((prev) => ({ ...prev, [name]: error }))
    }
    const OnSubmitValidation = async (toast, ToastifyOptions) => {

        let flag = 0
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                // console.log(`${key}: ${errors[key].length}`);
                if (errors[key].length != 0) {
                    toast(errors[key], ToastifyOptions);
                    return false
                }
            }
        }

        for (const key in credentials) {
            if (credentials.hasOwnProperty(key)) {
                validation(key, credentials[key])
                if (credentials[key].length == 0) {
                    // console.log(errors[key])
                    toast(`${key} is required`, ToastifyOptions);
                    flag = 1;
                }
            }
        }

        if (flag == 1) {
            return false
        } else {
            return true
        }

    }

    return {
        validation,
        OnSubmitValidation
    }

}

export default useFormSigninValidation
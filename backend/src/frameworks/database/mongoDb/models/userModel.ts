import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fname : {
        type : String,
    },
    lname : {
        type : String,
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,
        lowercase : true 
    },
    company : {
        type : String ,
    },
    password : {
        type : String,
    },
    verified : {
        type : Boolean,
        default : false

    }
})
userSchema.index({ email : 1 }) 

const userModel = mongoose.model('userDetails' , userSchema)

export default userModel ; 

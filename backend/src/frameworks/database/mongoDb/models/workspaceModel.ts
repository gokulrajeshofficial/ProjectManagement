import mongoose from 'mongoose'
const ObjectId  = new mongoose.Types.ObjectId
const userSchema = new mongoose.Schema({
    workspaceName : {
        type : String,
        required : true
    },
    createdBy : {
        type : ObjectId,
        required : true 
    },
    Date : {
        type : Date ,
        default : new Date()
    },
    sharedUsers : {
        type : [ObjectId] 
    },
    invitedUsers : {
        type : [String]
    }

})
// userSchema.index({ email : 1 }) 

const userModel = mongoose.model('userDetails' , userSchema)

export default userModel ; 

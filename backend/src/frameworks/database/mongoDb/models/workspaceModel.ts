import mongoose from 'mongoose'
const ObjectId  =  mongoose.Types.ObjectId
const workspaceSchema = new mongoose.Schema({
    workspaceName : {
        type : String,
        required : true
    },
    theme : {
        type : String ,

    },
    createdBy : {
        type : ObjectId,
        required : true 
    },
    Date : {
        type : Date ,
        default : Date.now
    },
    sharedUsers : {
        type : [String] 
    },
    invitedUsers : {
        type : [String]
    }

})
// userSchema.index({ email : 1 }) 

const workspaceModel = mongoose.model('workspace' , workspaceSchema)

export default workspaceModel ; 

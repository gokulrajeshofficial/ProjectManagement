import mongoose  from "mongoose";

const ObjectId  =  mongoose.Types.ObjectId
const projectSchema = new mongoose.Schema({
    projectName : {
        type : String,
        required : true
    },
    projectColor : {
        type : String ,

    },
    createdBy : {
        type : ObjectId,
        ref : 'userDetails',
        required : true 
    },
    dueDate : {
        type : Date ,
    },
    workspace : {
        type : ObjectId,
        ref : 'workspace',
        required : true 
    },
    projectMembers : {
        type : [String]
    },
    description : {
        type : String,
    }

})


const projectModel = mongoose.model('project' , projectSchema)

export default projectModel ; 

import { triggerAsyncId } from "async_hooks";
import mongoose from "mongoose";
const ObjectId  =  mongoose.Types.ObjectId
const taskSchema = new mongoose.Schema({
    title: {
        type : String , 
        required : true
    },
    projectId : {
        type : ObjectId , 
        required : true , 
        ref : 'project'
    },
    description : {
        type : String , 
    } ,
    priority: {
        type : String , 
        required : true
    },
    dueDate: {
        type : Date ,
        required : true
    },
    createdDate : {
        type : Date ,
        default :  Date.now,
        required : true
    } ,
    createdBy :{
        type : ObjectId,
        ref : 'userDetails',
        required : true 
    },
    assginees : {
        type : [String] , 
    },
    status : {
        type : Boolean,
        default : false,
        required : true
    }
 
    

})

const taskModel = mongoose.model('task' , taskSchema)

export default taskModel
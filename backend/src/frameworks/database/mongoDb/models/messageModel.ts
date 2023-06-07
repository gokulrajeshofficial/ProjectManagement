import mongoose  from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        readBy : {
            type : []
        },
        sender : {
            type : mongoose.Schema.Types.ObjectId , ref : "userDetails"
        },
        content : {
            type : String ,
            trim : true 
        },
        chat : {
            type : mongoose.Schema.Types.ObjectId , ref : "chat"
        }
    },{
        timestamps : true
    }
)

const messageModel = mongoose.model("messages",messageSchema)
export default messageModel
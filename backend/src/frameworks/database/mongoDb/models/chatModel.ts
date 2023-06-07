import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
    {
        chatName : { type : String , trim : true},
        isGroupChat :{type : Boolean , default : false },
        users : [{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'userdetails',

        }] ,
        latestMessage : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "messages"
        },
        groupAdmin : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "userdetails"
        }
    },
    {
        timestamps : true
    }
)

const chatModel = mongoose.model("chat" , chatSchema)
export default chatModel
import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import {  addMessageUsecase, getMessages, getProjectChat } from "../../application/useCases/chat/chatUsecase"
import { chatInterface } from "../../types/chatInterface";


const chatController = ()=>{
     const fetchProjectChat = asyncHandler(async (req: Request, res: Response) => {
        
          const { projectId  } = req.params;
          const response = await getProjectChat(projectId);
          res.status(200).json(response);
      
      })
      
       const addMessage = asyncHandler(async (req:Request,res:Response) => {
           const chatDetails : chatInterface = req.body.chatDetails
          const response = await addMessageUsecase(chatDetails);
          res.status(200).json(response);
     
      })
      
       const getAllMessages = asyncHandler(async (req:Request,res:Response) => {
      
          const chatId = req.params.chatId;
          const response = await getMessages(chatId);    
          res.status(200).json(response);
     
      })


    return { fetchProjectChat , addMessage , getAllMessages}

}

export default chatController
import  { ObjectId } from "mongoose";

export interface chatInterface {
    readBy?: [];
    sender: string;
    content: string;
    chat: ObjectId;
  }
import { typeOfMailService } from "../../frameworks/service/mailService"
import { UserInterface } from "../../types/userInterface"



export const mailServiceRepo  = (repository:ReturnType<typeOfMailService> )=>{

    const sendInviteLink = async (email: string, workspaceOwner : UserInterface , encryptedEmail : string , workspaceId : string ) => {return await repository.sendInviteLink( email , workspaceOwner , encryptedEmail , workspaceId )  }

    return {
        sendInviteLink
    }

}

export type typeofmailServiceRepo = typeof mailServiceRepo
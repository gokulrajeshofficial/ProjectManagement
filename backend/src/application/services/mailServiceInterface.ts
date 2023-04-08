import { typeOfMailService } from "../../frameworks/service/mailService"



export const mailServiceRepo  = (repository:ReturnType<typeOfMailService> )=>{

    const sendInviteLink = async (email: [string], link: string) => {return repository.sendInviteLink( email , link)  }

    return {
        sendInviteLink
    }

}

export type typeofmailServiceRepo = typeof mailServiceRepo
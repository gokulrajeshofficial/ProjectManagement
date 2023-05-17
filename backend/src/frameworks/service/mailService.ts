
import nodemailer from 'nodemailer'
import dotenvConfig from '../../dotenvConfig';
import fs from 'fs'
import ejs from 'ejs'; // import EJS library
import { UserInterface } from '../../types/userInterface';

let transporter = nodemailer.createTransport({
  host: dotenvConfig.nodemailer_host,
  port: 465,
  secure: true, 
  auth: {
    user: dotenvConfig.nodemailer_user, // generated ethereal user
    pass: dotenvConfig.nodemailer_pass, // generated ethereal password
  },
});

const baseUrl = dotenvConfig.client_base_url


export const mailServiceNodeMailer = () => {
  
  const sendInviteLink = async(email: string , workspaceOwner: UserInterface , encryptedEmail : string , workspaceId : string ,   ) => {
    try {
      const template = fs.readFileSync('./src/frameworks/service/mails/inviteLink.ejs', 'utf8');
      const html = ejs.render(template, { workspaceOwner , email , encryptedEmail , workspaceId , baseUrl }); 

      const response  =  await transporter.sendMail({
        from: dotenvConfig.nodemailer_user, // sender address
        to: email, // list of receivers
        subject: "Invite link to join workspace", // Subject line
        html: html
      }); 


      return  "Email has been sent Successfully"
    } catch (err) {
      console.log(err , " Error inside the mail service" , baseUrl)
      throw { err }
    }
  }    


  
  return{
    sendInviteLink
  }

}

export type typeOfMailService = typeof mailServiceNodeMailer  
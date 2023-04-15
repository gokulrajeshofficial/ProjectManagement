
import nodemailer from 'nodemailer'
import dotenvConfig from '../../dotenvConfig';
import fs from 'fs'

let transporter = nodemailer.createTransport({
  host: dotenvConfig.nodemailer_host,
  port: 465,
  secure: true, 
  auth: {
    user: dotenvConfig.nodemailer_user, // generated ethereal user
    pass: dotenvConfig.nodemailer_pass, // generated ethereal password
  },
});


const html = fs.readFileSync('./src/frameworks/service/email.html', 'utf8')


export const mailServiceNodeMailer = () => {

  const sendInviteLink = async(email: [string], link: string) => {
    try {

      const response  =  await transporter.sendMail({
        from: dotenvConfig.nodemailer_user, // sender address
        to: email, // list of receivers
        subject: "Invite link to join workspace", // Subject line
        text: "Hello world?", // plain text body
        html: html
      });


      return "Email has been sent Successfully"
    } catch (err) {
      console.log(err)
      throw { err }
    }
  }    
  return{
    sendInviteLink
  }

}

export type typeOfMailService = typeof mailServiceNodeMailer
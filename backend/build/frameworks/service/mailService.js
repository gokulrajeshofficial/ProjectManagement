"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailServiceNodeMailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenvConfig_1 = __importDefault(require("../../dotenvConfig"));
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs")); // import EJS library
let transporter = nodemailer_1.default.createTransport({
    host: dotenvConfig_1.default.nodemailer_host,
    port: 465,
    secure: true,
    auth: {
        user: dotenvConfig_1.default.nodemailer_user,
        pass: dotenvConfig_1.default.nodemailer_pass, // generated ethereal password
    },
});
const mailServiceNodeMailer = () => {
    const sendInviteLink = (email, workspaceOwner, encryptedEmail, workspaceId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const template = fs_1.default.readFileSync('./src/frameworks/service/mails/inviteLink.ejs', 'utf8');
            const html = ejs_1.default.render(template, { workspaceOwner, email, encryptedEmail, workspaceId });
            const response = yield transporter.sendMail({
                from: dotenvConfig_1.default.nodemailer_user,
                to: email,
                subject: "Invite link to join workspace",
                html: html
            });
            return "Email has been sent Successfully";
        }
        catch (err) {
            console.log(err);
            throw { err };
        }
    });
    return {
        sendInviteLink
    };
};
exports.mailServiceNodeMailer = mailServiceNodeMailer;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dotenvConfig = {
    mongoDbUrlPass: process.env.DATABASE,
    port: process.env.PORT || 5000,
    access_token_key: process.env.JWT_ACCESS_TOKEN_KEY,
    refresh_token_key: process.env.JWT_REFRESH_TOKEN_KEY,
    nodemailer_host: process.env.NODE_MAILER_HOST,
    nodemailer_port: process.env.NODE_MAILER_PORT || 465,
    nodemailer_user: process.env.NODE_MAILER_USERNAME,
    nodemailer_pass: process.env.NODE_MAILER_PASSWORD,
    crypto_secret: process.env.CRYPTO_SECRET_KEY
};
exports.default = dotenvConfig;

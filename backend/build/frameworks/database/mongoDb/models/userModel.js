"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    company: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});
userSchema.index({ email: 1 });
const userModel = mongoose_1.default.model('userDetails', userSchema);
exports.default = userModel;

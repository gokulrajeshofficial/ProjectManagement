"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const workspaceSchema = new mongoose_1.default.Schema({
    workspaceName: {
        type: String,
        required: true
    },
    theme: {
        type: String,
    },
    createdBy: {
        type: ObjectId,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    sharedUsers: {
        type: [String]
    },
    invitedUsers: {
        type: [String]
    }
});
// userSchema.index({ email : 1 }) 
const workspaceModel = mongoose_1.default.model('workspace', workspaceSchema);
exports.default = workspaceModel;

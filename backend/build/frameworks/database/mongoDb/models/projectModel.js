"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const projectSchema = new mongoose_1.default.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectColor: {
        type: String,
    },
    createdBy: {
        type: ObjectId,
        ref: 'userDetails',
        required: true
    },
    dueDate: {
        type: Date,
    },
    workspace: {
        type: ObjectId,
        ref: 'workspace',
        required: true
    },
    projectMembers: {
        type: [String]
    },
    description: {
        type: String,
    }
});
const projectModel = mongoose_1.default.model('project', projectSchema);
exports.default = projectModel;

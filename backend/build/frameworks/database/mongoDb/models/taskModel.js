"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    projectId: {
        type: ObjectId,
        required: true
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    createdBy: {
        type: ObjectId,
        ref: 'userDetails',
        required: true
    },
    assginees: {
        type: [String],
    }
});
const taskModel = mongoose_1.default.model('task', taskSchema);
exports.default = taskModel;

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
const mongoose_1 = __importDefault(require("mongoose"));
const workspaceModel_1 = __importDefault(require("../models/workspaceModel"));
;
function workspaceDbRepository() {
    const createWorkspace = (workspaceDetails) => __awaiter(this, void 0, void 0, function* () {
        return yield workspaceModel_1.default.create(workspaceDetails);
    });
    const getUserWorkspaces = (userId) => __awaiter(this, void 0, void 0, function* () {
        let userObj = new mongoose_1.default.Types.ObjectId(userId);
        const response = yield workspaceModel_1.default.aggregate([
            {
                $match: { createdBy: userObj }
            }, {
                $lookup: {
                    from: 'userdetails',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'createdBy'
                }
            },
            {
                $addFields: {
                    createdBy: { $arrayElemAt: ['$createdBy', 0] }
                }
            }
        ]);
        console.log(response);
        return response;
    });
    const getSharedWorkspaces = (email) => __awaiter(this, void 0, void 0, function* () {
        return yield workspaceModel_1.default.find({ sharedUsers: email });
    });
    const getWorkspaceById = (workspaceId) => __awaiter(this, void 0, void 0, function* () {
        return yield workspaceModel_1.default.findById(workspaceId);
    });
    const updateSharedUser = (decryptedEmail, id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const workspaceId = new mongoose_1.default.Types.ObjectId(id);
            const response = yield workspaceModel_1.default.findByIdAndUpdate(workspaceId, { $addToSet: { sharedUsers: decryptedEmail } });
            console.log(response);
            return response;
        }
        catch (err) {
            console.error("Error : ", err);
        }
    });
    const inviteUser = (id, email) => __awaiter(this, void 0, void 0, function* () {
        try {
            const workspaceId = new mongoose_1.default.Types.ObjectId(id);
            const response = yield workspaceModel_1.default.findByIdAndUpdate(workspaceId, { $addToSet: { invitedUsers: email } });
            return response;
        }
        catch (err) {
            console.error("Error at DB repo", err);
        }
    });
    const getworkspaceMembers = (id) => __awaiter(this, void 0, void 0, function* () {
        const workspaceId = new mongoose_1.default.Types.ObjectId(id);
        console.log(workspaceId);
        let response = yield workspaceModel_1.default.aggregate([
            {
                $match: { _id: workspaceId }
            },
            {
                $unwind: "$sharedUsers"
            },
            {
                $lookup: {
                    from: "userdetails",
                    foreignField: "email",
                    localField: "sharedUsers",
                    as: "sharedUser"
                }
            }, {
                $project: {
                    "sharedUser": { $arrayElemAt: ['$sharedUser', 0] },
                    "_id": 0
                }
            }
        ]);
        console.log(response, " shared Users are : ");
        return response;
    });
    const deleteWorkspace = (id) => __awaiter(this, void 0, void 0, function* () {
        const workspaceId = new mongoose_1.default.Types.ObjectId(id);
        const response = workspaceModel_1.default.findByIdAndDelete(id);
        return response;
    });
    return {
        createWorkspace, getUserWorkspaces, getWorkspaceById, getSharedWorkspaces, inviteUser, updateSharedUser, getworkspaceMembers, deleteWorkspace
    };
}
exports.default = workspaceDbRepository;

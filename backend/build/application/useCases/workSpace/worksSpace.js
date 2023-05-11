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
exports.workspaceDeleteUsecase = exports.workspaceMembers = exports.getUserWorkspaces = exports.InviteUsers = exports.acceptInvitationUseCase = exports.workspaceCreation = void 0;
const cryptoService_1 = __importDefault(require("../../../frameworks/service/cryptoService"));
const mailService_1 = require("../../../frameworks/service/mailService");
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const cryptoServiceInterface_1 = __importDefault(require("../../services/cryptoServiceInterface"));
const mailServiceInterface_1 = require("../../services/mailServiceInterface");
const mailService = (0, mailServiceInterface_1.mailServiceRepo)((0, mailService_1.mailServiceNodeMailer)());
const cryService = (0, cryptoServiceInterface_1.default)((0, cryptoService_1.default)());
//---------------------------------------------------Workspace Creation Use Case -----------------------------------------//
const workspaceCreation = (workspaceDetails, userId, workspaceRepo, userDb) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    workspaceDetails.createdBy = userId;
    console.log(workspaceDetails);
    const workspace = yield workspaceRepo.createWorkspace(workspaceDetails);
    console.log(workspace);
    if ((_a = workspaceDetails.invitedUsers) === null || _a === void 0 ? void 0 : _a.length) {
        const getUser = yield userDb.findById(workspaceDetails.createdBy);
        yield Promise.all(workspaceDetails.invitedUsers.map((email) => __awaiter(void 0, void 0, void 0, function* () {
            const encryptedEmail = yield cryService.encryption(email);
            const status = yield mailService.sendInviteLink(email, getUser, encryptedEmail, workspace._id.toString());
            console.log(status);
        })));
    }
    return workspace;
});
exports.workspaceCreation = workspaceCreation;
//----------------------------------------------- Accept invitation UseCase --------------------------------------------------//
const acceptInvitationUseCase = (workspaceId, encryptedEmail, workspaceRepo, userDb) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Reached accept Invitation");
    const workspace = yield workspaceRepo.getWorkspaceById(workspaceId);
    if (!workspace) {
        throw new appError_1.default("Workspace does not exist ", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const decryptedEmail = yield cryService.decryption(encryptedEmail);
    console.log(decryptedEmail, "Descrypted email : ");
    if (workspace.invitedUsers.includes(decryptedEmail)) {
        const updatedWorkspace = yield workspaceRepo.updateSharedUser(decryptedEmail, workspaceId);
        const user = yield userDb.findByEmail(decryptedEmail);
        if (user) {
            const response = { status: true, msg: "User has been added" };
            return response;
        }
        else {
            const response = { status: false, msg: "User account is not registered" };
            return response;
        }
    }
    else {
        if (workspace.sharedUsers.includes(decryptedEmail)) {
            const response = { status: true, msg: "User has been added" };
            return response;
        }
        throw new appError_1.default("Email is not their in the  invited list ", httpStatus_1.HttpStatus.NOT_FOUND);
    }
});
exports.acceptInvitationUseCase = acceptInvitationUseCase;
//----------------------------------------------- Reject invitation UseCase --------------------------------------------------//
//----------------------------------------------- Invite User UseCase --------------------------------------------------//
const InviteUsers = (workSpaceId, inviteList, workspaceRepo, userDb, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (inviteList === null || inviteList === void 0 ? void 0 : inviteList.length) {
        const getUser = yield userDb.findById(userId);
        yield Promise.all(inviteList.map((email) => __awaiter(void 0, void 0, void 0, function* () {
            const inviteDb = yield workspaceRepo.inviteUser(workSpaceId, email);
            const encryptedEmail = yield cryService.encryption(email);
            const response = yield mailService.sendInviteLink(email, getUser, encryptedEmail, workSpaceId);
        })));
        return { status: true, msg: "Email were sent " };
    }
    return { status: true, msg: "No inivitation was sent" };
});
exports.InviteUsers = InviteUsers;
const getUserWorkspaces = (userId, workspaceRepo, userDb) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDb.findById(userId);
    const userWorkspaces = yield workspaceRepo.getUserWorkspaces(userId);
    const sharedWorkspaces = yield workspaceRepo.getSharedWorkspaces(user === null || user === void 0 ? void 0 : user.email);
    return { userWorkspaces, sharedWorkspaces };
});
exports.getUserWorkspaces = getUserWorkspaces;
const workspaceMembers = (workspaceId, workspaceRepo, userDb) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield workspaceRepo.getworkspaceMembers(workspaceId);
    return members;
});
exports.workspaceMembers = workspaceMembers;
const workspaceDeleteUsecase = (workspaceId, userId, workspaceRepo, userDb, projectRepo) => __awaiter(void 0, void 0, void 0, function* () {
    const projectResponse = yield projectRepo.deleteWorkspaceProject(workspaceId);
    const workspaceResponse = yield workspaceRepo.deleteWorkspace(workspaceId);
    return workspaceResponse;
});
exports.workspaceDeleteUsecase = workspaceDeleteUsecase;

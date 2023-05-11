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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const worksSpace_1 = require("../../application/useCases/workSpace/worksSpace");
const workspaceController = (workspaceRepository, workspaceDbRepository, userRepository, userRepositoryMongoDb, projectRepository, projectDbRepository) => {
    const workSpaceDb = workspaceRepository(workspaceDbRepository());
    const userDb = userRepository(userRepositoryMongoDb());
    const projectRepo = projectRepository(projectDbRepository());
    //---------------------------------Create Workspace Controller ----------------------------------//
    const createWorkspace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        const workspaceDetails = req.body.workspace;
        workspaceDetails.invitedUsers = req.body.inviteList;
        const workspace = yield (0, worksSpace_1.workspaceCreation)(workspaceDetails, userId, workSpaceDb, userDb);
        res.status(200).json({ status: true, msg: "Workspace has been Created" });
    }));
    //---------------------------------Accept workspace Invitation Controller ----------------------------------//
    const acceptInvitation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const workspaceId = req.body.workspaceId;
        const email = req.body.email;
        const response = yield (0, worksSpace_1.acceptInvitationUseCase)(workspaceId, email, workSpaceDb, userDb);
        console.log(response);
        res.status(200).json(response);
    }));
    //---------------------------------Reject workspace Invitation Controller ----------------------------------//
    const rejectInvitation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }));
    //---------------------------------Get ALL Workspace Controller ----------------------------------//
    const getWorkspaces = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        console.log(userId);
        const response = yield (0, worksSpace_1.getUserWorkspaces)(userId, workSpaceDb, userDb);
        res.json(response);
    }));
    //-------------------------------------Invite user to a workspace -------------------------------//
    const inviteUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { workspaceId, inviteList } = req.body;
        console.log(inviteList);
        const response = yield (0, worksSpace_1.InviteUsers)(workspaceId, inviteList, workSpaceDb, userDb, req.body.userId);
        console.log(response);
        res.json(response);
    }));
    //------------------------------Get Specific Workspace Controller ------------------------------//
    const getWorkspaceDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const workspaceId = req.params.id;
        console.log(workspaceId);
    }));
    //------------------------------Get Workspace Members -------------------------------------------//
    const getMembers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const workspaceId = req.params.workspaceId;
        const members = yield (0, worksSpace_1.workspaceMembers)(workspaceId, workSpaceDb, userDb);
        res.json(members);
    }));
    //-----------------------------------Delete Workspace --------------------------------------------//
    const deleteWorkspace = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const workspaceId = req.params.workspaceId;
        const userId = req.body.userId;
        const response = yield (0, worksSpace_1.workspaceDeleteUsecase)(workspaceId, userId, workSpaceDb, userDb, projectRepo);
        res.json(response);
    }));
    return { createWorkspace, getWorkspaces, getWorkspaceDetails, acceptInvitation, rejectInvitation, inviteUsers, getMembers, deleteWorkspace };
};
exports.default = workspaceController;

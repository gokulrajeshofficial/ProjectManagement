"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workspaceDbRepository_1 = __importDefault(require("../../../database/mongoDb/repositories/workspaceDbRepository"));
const workspaceRepository_1 = __importDefault(require("../../../../application/repositories/workspaceRepository"));
const workspaceController_1 = __importDefault(require("../../../../adapters/controller/workspaceController"));
const userDbRepository_1 = __importDefault(require("../../../../application/repositories/userDbRepository"));
const userRepositoryMongoDb_1 = __importDefault(require("../../../database/mongoDb/repositories/userRepositoryMongoDb"));
const projectRepository_1 = __importDefault(require("../../../../application/repositories/projectRepository"));
const projectDbRepository_1 = __importDefault(require("../../../database/mongoDb/repositories/projectDbRepository"));
const router = express_1.default.Router();
const controller = (0, workspaceController_1.default)(workspaceRepository_1.default, workspaceDbRepository_1.default, userDbRepository_1.default, userRepositoryMongoDb_1.default, projectRepository_1.default, projectDbRepository_1.default);
//-------------------------------Workspace Creation -----------------------------------------//
router.post('/createWorkspace', controller.createWorkspace);
//-------------------------------Workspace Creation -----------------------------------------//
router.patch('/acceptInvitation', controller.acceptInvitation);
//-------------------------------Workspace Creation -----------------------------------------//
router.patch('/rejectInvitation', controller.rejectInvitation);
//-------------------------------Get all workspaces  -----------------------------------------//
router.get('/getallworkspaces', controller.getWorkspaces);
//-------------------------------Workspace Members------------------------------------------//
router.get('/members/:workspaceId', controller.getMembers);
//------------------------Get Details of a specific workspace--------------------------------//
router.get('/workspace/:id', controller.getWorkspaceDetails);
//-------------------------------Invite Users ----------------------------------------------//
router.post('/inviteUsers', controller.inviteUsers);
//------------------------------Delete Workspace -------------------------------------------//
router.delete('/delete/:workspaceId', controller.deleteWorkspace);
exports.default = router;

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
exports.getAllMembersOfProject = exports.getWorkspaceProjects = exports.projectGetAll = exports.projectCreation = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const projectCreation = (projectDetails, projectRepo) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = yield projectRepo.createProject(projectDetails);
    return newProject;
});
exports.projectCreation = projectCreation;
const projectGetAll = (userId, projectRepo, userRepo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.findById(userId);
    if (user) {
        const projects = yield projectRepo.getUserProjects(user.email);
        return projects;
    }
    throw new appError_1.default("User Doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
});
exports.projectGetAll = projectGetAll;
const getWorkspaceProjects = (workspaceId, projectRepo) => __awaiter(void 0, void 0, void 0, function* () {
    const workspaceProjects = yield projectRepo.workspaceProjects(workspaceId);
    return workspaceProjects;
});
exports.getWorkspaceProjects = getWorkspaceProjects;
const getAllMembersOfProject = (projectId, projectRepo) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield projectRepo.getProjectMembers(projectId);
    return members;
});
exports.getAllMembersOfProject = getAllMembersOfProject;

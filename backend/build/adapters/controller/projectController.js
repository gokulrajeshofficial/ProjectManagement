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
const projectUsecase_1 = require("../../application/useCases/project/projectUsecase");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const projectController = (workspaceRepository, workspaceDbRepository, userRepository, userRepositoryMongoDb, projectRepository, projectDbRepository) => {
    const userRepo = userRepository(userRepositoryMongoDb());
    const projectRepo = projectRepository(projectDbRepository());
    const workspaceRepo = workspaceRepository(workspaceDbRepository());
    const createNewProject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        const projectDetails = req.body;
        projectDetails.createdBy = userId;
        console.log(userId, projectDetails);
        const response = yield (0, projectUsecase_1.projectCreation)(projectDetails, projectRepo);
        res.json(response);
    }));
    const getAllProjects = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.body.userId;
        const response = yield (0, projectUsecase_1.projectGetAll)(userId, projectRepo, userRepo);
        res.json(response);
    }));
    const workspaceProjects = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const workspaceId = req.params.workspaceId;
        const response = yield (0, projectUsecase_1.getWorkspaceProjects)(workspaceId, projectRepo);
        console.log(response);
        res.json(response);
    }));
    const projectMembers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const projectId = req.params.projectId;
        const response = yield (0, projectUsecase_1.getAllMembersOfProject)(projectId, projectRepo);
        res.json(response);
    }));
    return { createNewProject, getAllProjects, workspaceProjects, projectMembers };
};
exports.default = projectController;

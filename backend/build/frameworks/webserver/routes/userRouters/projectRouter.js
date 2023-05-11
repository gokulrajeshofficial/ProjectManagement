"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = __importDefault(require("../../../../adapters/controller/projectController"));
const userRepositoryMongoDb_1 = __importDefault(require("../../../database/mongoDb/repositories/userRepositoryMongoDb"));
const userDbRepository_1 = __importDefault(require("../../../../application/repositories/userDbRepository"));
const workspaceRepository_1 = __importDefault(require("../../../../application/repositories/workspaceRepository"));
const workspaceDbRepository_1 = __importDefault(require("../../../database/mongoDb/repositories/workspaceDbRepository"));
const projectRepository_1 = __importDefault(require("../../../../application/repositories/projectRepository"));
const projectDbRepository_1 = __importDefault(require("../../../database/mongoDb/repositories/projectDbRepository"));
const router = express_1.default.Router();
const controller = (0, projectController_1.default)(workspaceRepository_1.default, workspaceDbRepository_1.default, userDbRepository_1.default, userRepositoryMongoDb_1.default, projectRepository_1.default, projectDbRepository_1.default);
//-------------------------Create New Project--------------------------//
router.post('/createNewProject', controller.createNewProject);
//-------------------------Get all Projects--------------------------//
router.get('/getAllProjects', controller.getAllProjects);
//------------------------Get all Projects ----------------------------//
router.get('/workspace/:workspaceId', controller.workspaceProjects);
//------------------------Get all Members in Project ----------------------------//
router.get('/getAllMembers/:projectId', controller.projectMembers);
exports.default = router;

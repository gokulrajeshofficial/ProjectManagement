"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersAuth_1 = __importDefault(require("./userRouters/usersAuth"));
const workSpace_1 = __importDefault(require("./userRouters/workSpace"));
const userDetails_1 = __importDefault(require("./userRouters/userDetails"));
const userAuthMiddleware_1 = __importDefault(require("../middlewares/userAuthMiddleware"));
const projectRouter_1 = __importDefault(require("./userRouters/projectRouter"));
const taskRouter_1 = __importDefault(require("./userRouters/taskRouter"));
const routes = (app) => {
    app.use('/api/auth', usersAuth_1.default);
    app.use('/api/workspace', userAuthMiddleware_1.default, workSpace_1.default);
    app.use('/api/user', userAuthMiddleware_1.default, userDetails_1.default);
    app.use('/api/project', userAuthMiddleware_1.default, projectRouter_1.default);
    app.use('/api/task', userAuthMiddleware_1.default, taskRouter_1.default);
};
exports.default = routes;

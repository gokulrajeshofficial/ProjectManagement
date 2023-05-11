"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../../../../adapters/controller/taskController"));
const taskDbRepository_1 = __importDefault(require("../../../database/mongoDb/repositories/taskDbRepository"));
const taskRepository_1 = __importDefault(require("../../../../application/repositories/taskRepository"));
const router = (0, express_1.Router)();
const controller = (0, taskController_1.default)(taskRepository_1.default, taskDbRepository_1.default);
router.post('/createTask', controller.createTask);
router.post('/getAllTasks/:projectId', controller.getAllTasks);
router;
exports.default = router;

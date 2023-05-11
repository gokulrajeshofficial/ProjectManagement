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
const taskUsecase_1 = require("../../application/useCases/task/taskUsecase");
const taskController = (taskRepository, taskDbRepository) => {
    const taskRepo = taskRepository(taskDbRepository());
    const createTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const task = req.body.task;
        task.createdBy = req.body.userId;
        const response = yield (0, taskUsecase_1.taskCreation)(taskRepo, task);
        res.status(200).json(response);
    }));
    const getAllTasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield (0, taskUsecase_1.getAllTaskUsecase)(taskRepo);
    }));
    return { createTask, getAllTasks };
};
exports.default = taskController;

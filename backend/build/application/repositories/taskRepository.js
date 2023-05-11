"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskRepository = (repository) => {
    const createTask = (data) => { return repository.createTask(data); };
    const getAllTask = () => { return repository.getAllTask(); };
    return { createTask, getAllTask };
};
exports.default = taskRepository;

import { Router } from "express";
import taskController from "../../../../adapters/controller/taskController";
import taskDbRepository from "../../../database/mongoDb/repositories/taskDbRepository";
import taskRepository from "../../../../application/repositories/taskRepository";
const router = Router()

const controller = taskController(
    taskRepository  , 
    taskDbRepository

)

router.post('/createTask' , controller.createTask)
router.post('/getAllTasks/:projectId' , controller.getAllTasks)

router









export default router
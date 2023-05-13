import { Router } from "express";
import taskController from "../../../../adapters/controller/taskController";
import taskDbRepository from "../../../database/mongoDb/repositories/taskDbRepository";
import taskRepository from "../../../../application/repositories/taskRepository";
const router = Router()

const controller = taskController(
    taskRepository  , 
    taskDbRepository
)
//--------------------Create  Task-------------------------//
router.post('/createTask' , controller.createTask)

//--------------Get All Task based on project ID--------------------//
router.get('/getAllTasks/:projectId' , controller.getAllTasks)

//------------------Get User Task-------------------------//
router.get('/getUserTasks/:email', controller.getUserTasks)








export default router
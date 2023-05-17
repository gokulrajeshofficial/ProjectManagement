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

//------------------Get User Tasks-------------------------//
router.get('/getUserTasks/:email', controller.getUserTasks)

//------------------Get  Task-------------------------//
router.get('/getTask/:taskId', controller.getTask)

//-------------------Task Update------------------------//
router.patch('/updateTask' , controller.updateTask)

//-------------------Task delete------------------------//
router.delete('/deleteTask/:taskId' , controller.deleteTask)






export default router
import { Router } from "express";
import taskController from "../../../../adapters/controller/taskController";
import taskDbRepository from "../../../database/mongoDb/repositories/taskDbRepository";
import taskRepository from "../../../../application/repositories/taskRepository";
import multer, { memoryStorage } from "multer";
import s3Service from "../../../service/s3bucket";
import awsBucketInterface from "../../../../application/services/awsBucketInterface";
const router = Router()
const storage = memoryStorage();
const upload = multer({storage})
const controller = taskController(
    taskRepository  , 
    taskDbRepository ,
    awsBucketInterface ,
    s3Service
)
//--------------------Create  Task-------------------------//
router.post('/createTask' , controller.createTask)

//--------------------Upload Task--------------------------//
router.post('/uploadFiles', upload.array("taskFiles") , controller.uploadFiles )

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

//-------------------Download file-----------------------//
router.post('/downloadFiles' , controller.getfiles)






export default router
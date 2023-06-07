import express from 'express'
import chatController from '../../../../adapters/controller/chatController'
const router = express.Router()

const controller = chatController()
router.get('/:projectId', controller.fetchProjectChat);

//------------------Add chat message---------------------------
router.post('/addMessage',controller.addMessage)

router.get('/messages/:chatId',controller.getAllMessages)


export default router
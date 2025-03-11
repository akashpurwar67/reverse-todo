import express from 'express';
import {posttask,gettask,getstreak, deleteTask,getReport} from '../controllers/task.controller.js'
import {protectRoute} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/posttask',protectRoute,posttask)

router.get('/gettask',protectRoute,gettask)

router.get('/getstreak',protectRoute,getstreak)

router.delete('/deletetask/:id',protectRoute,deleteTask)

router.get('/report',protectRoute,getReport);

export default router;
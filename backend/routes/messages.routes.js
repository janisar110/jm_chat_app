import express from "express";
import {getMessage, sendMessage} from "../controllers/messages.controllers.js"
import protectRoutes from "../middlewares/protectRoutes.js"
const router = express.Router();


router.post('/send/:id',protectRoutes, sendMessage)
router.get('/:id',protectRoutes, getMessage)


export default router
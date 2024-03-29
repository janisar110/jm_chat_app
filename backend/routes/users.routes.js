import express from "express";
import { getUsersForChat } from "../controllers/user.controllers.js";
import protectRoutes from '../middlewares/protectRoutes.js'

const router = express.Router();


router.get("/", protectRoutes, getUsersForChat)


export default router
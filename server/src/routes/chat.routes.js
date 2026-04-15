import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import projectMiddleware from "../middlewares/project.middleware.js";
import chatController from "../controllers/chat.controller.js";

const router = express.Router();
router.get('/:projectId', authMiddleware, projectMiddleware, chatController.getAllChatsController)

export default router
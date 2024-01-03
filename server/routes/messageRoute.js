import express from "express";
import * as messageController from "../controllers/messageController.js";

const router = express.Router();

router.post("/", messageController.addMessage);
router.delete("/", messageController.deleteMessage);
router.get("/", messageController.getMessages);

export default router;
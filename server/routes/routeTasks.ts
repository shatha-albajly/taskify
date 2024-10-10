import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController";

const router = Router();

router.get("/:id", getTasks);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);

export default router;

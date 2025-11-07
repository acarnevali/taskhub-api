import type { Request, Response } from "express";
import type { UpdateTaskService } from "../services/updateTaskService.js";

export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { id: taskId } = req.params;
      
      if (!taskId) {
        return res.status(400).json({ error: "Task ID is required" });
      }

      const { id: userId } = req.user;

      const data = req.body;

      const task = await this.updateTaskService.execute({
        taskId,
        userId,
        data,
      });

      return res.status(200).json(task);
    } catch (error: any) {
      if (error.message === "Task not found.") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Forbidden.") {
        return res.status(403).json({ error: "Forbidden: You do not own this resource." });
      }

      return res.status(400).json({ error: error.message });
    }
  };
}
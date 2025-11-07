import type { Request, Response } from "express";
import type { DeleteTaskService } from "../services/deleteTaskService.js";

export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { id: taskId } = req.params;

      if (!taskId) {
        return res.status(400).json({ error: "Task ID is required." });
      }

      const { id: userId } = req.user;

      await this.deleteTaskService.execute({
        taskId,
        userId,
      });

      return res.status(204).send();
    } catch (error: any) {
      if (error.message === "Task not found.") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Forbidden.") {
        return res.status(403).json({ error: "Forbidden: You do not own this resource." });
      }

      // Erro genérico
      return res.status(400).json({ error: error.message });
    }
  };
}
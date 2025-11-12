import type { Request, Response } from "express";
import type { UpdateTaskService } from "../services/updateTaskService.js";

import { ZodError } from "zod";
import { updateTaskSchema } from "../schemas/task.schema.js"; // Ajuste o caminho

export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}

  handle = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        return res.status(400).json({ error: "taskId is required in params" });
      }

      const { id: userId } = req.user;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: missing user id" });
      }

      const data = updateTaskSchema.parse(req.body);

      const task = await this.updateTaskService.execute({
        taskId,
        userId,
        data,
      });

      return res.status(200).json(task);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed.",
          issues: error.flatten().fieldErrors,
        });
      }

      if (error.message === "Task not found.") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === "Forbidden.") {
        return res.status(403).json({ error: "Forbidden: You do not own this resource." });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
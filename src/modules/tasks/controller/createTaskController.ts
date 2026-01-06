import type { Request, Response } from "express";
import type { CreateTaskService } from "../services/createTaskService.js";
import { createTaskSchema } from "../schemas/task.schema.js";

export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  handle = async (req: Request, res: Response) => {
    const { title, description } = createTaskSchema.parse(req.body);
    const { id: userId } = req.user;

    const task = await this.createTaskService.execute({
      title,
      description: description || null,
      userId,
    });

    return res.status(201).json(task);
  };
}
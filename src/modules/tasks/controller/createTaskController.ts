import type { Request, Response } from "express";
import type { CreateTaskService } from "../services/createTaskService.js";

export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;


      const { id: userId } = req.user;

      if (!title) {
        return res.status(400).json({ error: "Title is required." });
      }

      const task = await this.createTaskService.execute({
        title,
        description: description || null, 
        userId,
      });

      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
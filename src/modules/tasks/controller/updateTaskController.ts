import type { Request, Response } from "express";
import type { UpdateTaskService } from "../services/updateTaskService.js";
import { updateTaskSchema } from "../schemas/task.schema.js";
import type { IUpdateTaskDTO } from "../dtos/ITaskDTO.js";

export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}

  handle = async (req: Request, res: Response) => {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;
    
    const data = updateTaskSchema.parse(req.body) as IUpdateTaskDTO;

    const task = await this.updateTaskService.execute({
      taskId: taskId as string, 
      userId,
      data,
    });

    return res.status(200).json(task);
  };
}
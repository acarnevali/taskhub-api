import type { Request, Response } from "express";
import type { DeleteTaskService } from "../services/deleteTaskService.js";

export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}

  handle = async (req: Request, res: Response) => {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;
    
    await this.deleteTaskService.execute({ 
      taskId: taskId as string, 
      userId 
    });

    return res.status(204).send();
  };
}
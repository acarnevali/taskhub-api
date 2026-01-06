import type { Request, Response } from "express";
import type { ListUserTasksService } from "../services/listUserTasksService.js";

/**
 * @openapi
 * /list:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Lista tarefas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 */

export class ListUserTasksController {
  constructor(private listUserTasksService: ListUserTasksService) {}

  handle = async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    const tasks = await this.listUserTasksService.execute(userId);

    return res.status(200).json(tasks);
  };
}
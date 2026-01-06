import type { Request, Response } from "express";
import type { CreateTaskService } from "../services/createTaskService.js";
import { createTaskSchema } from "../schemas/task.schema.js";

/**
 * @openapi
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Cria tarefa
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Criada
 */
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
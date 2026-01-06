import type { Request, Response } from "express";
import type { UpdateTaskService } from "../services/updateTaskService.js";
import { updateTaskSchema } from "../schemas/task.schema.js";
import type { IUpdateTaskDTO } from "../dtos/ITaskDTO.js";

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Atualiza tarefa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Atualizada
 *
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Deleta tarefa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Deletada
 */

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
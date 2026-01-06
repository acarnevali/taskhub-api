import type { Request, Response } from "express";
import type { DeleteTaskService } from "../services/deleteTaskService.js";

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
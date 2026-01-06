import type { Request, Response } from "express";
import type { DeleteUserService } from "../service/deleteUserService.js";

/**
 * @openapi
 * /me:
 *   put:
 *     tags:
 *       - Users
 *     summary: Atualiza perfil
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Atualizado
 *
 *   delete:
 *     tags:
 *       - Users
 *     summary: Deleta conta
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Deletado
 */
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  handle = async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    await this.deleteUserService.execute(userId);

    return res.status(204).send();
  };
}
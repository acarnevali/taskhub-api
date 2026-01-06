import type { Request, Response } from "express";
import type { UpdateUserService } from "../service/updateUserService.js";
import { updateUserSchema } from "../schemas/user.schema.js";
import type { IUpdateUserDTO } from "../dtos/IUserDTO.js";

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
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  handle = async (req: Request, res: Response) => {
   

    const { id: userId } = req.user;


    const data = updateUserSchema.parse(req.body) as IUpdateUserDTO;

    const user = await this.updateUserService.execute({
      userId,
      data,
    });

    return res.status(200).json(user);
  };
}
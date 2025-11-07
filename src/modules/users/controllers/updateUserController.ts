import type { Request, Response } from "express";
import type { UpdateUserService } from "../service/updateUserService.js"; // Ajuste o caminho

export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;

      const { id: userId } = req.user;

      const user = await this.updateUserService.execute({
        userId,
        data: { name, email },
      });

      return res.status(200).json(user);
    } catch (error: any) {
      if (error.message.includes("email is already in use")) {
        return res.status(409).json({ error: error.message });
      }

      return res.status(400).json({ error: error.message });
    }
  };
}
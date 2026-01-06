import type { Request, Response } from "express";
import type { DeleteUserService } from "../service/deleteUserService.js";

export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  handle = async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    await this.deleteUserService.execute(userId);

    return res.status(204).send();
  };
}
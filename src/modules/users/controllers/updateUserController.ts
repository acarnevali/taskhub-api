import type { Request, Response } from "express";
import type { UpdateUserService } from "../service/updateUserService.js";
import { updateUserSchema } from "../schemas/user.schema.js";
import type { IUpdateUserDTO } from "../dtos/IUserDTO.js";
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
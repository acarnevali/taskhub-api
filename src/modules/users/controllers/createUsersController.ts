import type { Request, Response } from "express";
import { CreateUserService } from "../service/createUserService.js";
import { createUserSchema } from "../schemas/user.schema.js";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  handle = async (req: Request, res: Response) => {
    const { name, email, password } = createUserSchema.parse(req.body);

    const user = await this.createUserService.execute(name, email, password);

    return res.status(201).json(user);
  };
}
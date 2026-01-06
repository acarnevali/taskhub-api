import type { Request, Response } from "express";
import { AuthService } from "../service/authService.js";
import { loginSchema } from "../schemas/user.schema.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  handle = async (req: Request, res: Response) => {
    const { email, password } = loginSchema.parse(req.body);

    const result = await this.authService.execute(email, password);

    return res.status(200).json(result);
  };
}
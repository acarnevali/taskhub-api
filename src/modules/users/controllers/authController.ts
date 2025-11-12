import type{ Request, Response } from "express";
import { AuthService } from "../service/authService.js";

import { loginSchema } from "../schemas/user.schema.js"; // Ajuste o caminho
import { ZodError } from "zod";

export class AuthController {
  constructor(private authService: AuthService) {}

  handle = async (req: Request, res: Response) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const result = await this.authService.execute(email, password);
      return res.status(200).json(result);

    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed.",
          issues: error.flatten().fieldErrors,
        });
      }


      if (error.message.includes("Invalid credentials")) {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  };
}


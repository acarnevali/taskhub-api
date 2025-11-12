import type { Request, Response } from "express";
import { CreateUserService } from "../service/createUserService.js";
import { ZodError } from "zod";
import { createUserSchema } from "../schemas/user.schema.js";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  handle = async (req: Request, res: Response) => {
    try {
      
      const { name, email, password } = createUserSchema.parse(req.body);

      const user = await this.createUserService.execute(name, email, password);
      return res.status(201).json(user);

    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed.",
          issues: error.flatten().fieldErrors, 
        });
      }

      if (error.message.includes("User already exists")) {
        return res.status(409).json({ error: error.message }); 
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
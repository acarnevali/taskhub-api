import type { Request, Response } from "express";
import { CreateUserService } from "../service/createUserService.js";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  // Mude para uma arrow function (usando '=')
  handle = async (req: Request, res: Response) => { 
    try {
      const { name, email, password } = req.body;
      const user = await this.createUserService.execute(name, email, password); // 'this' agora funciona!
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }; 
}
import type{ Request, Response } from "express";
import { AuthService } from "../service/authService.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  // Mude para uma arrow function também
  handle = async (req: Request, res: Response) => { 
    try {
      const { email, password } = req.body;
      const result = await this.authService.execute(email, password); 
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  };
}
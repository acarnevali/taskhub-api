import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories/usersRespository.js";

export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}

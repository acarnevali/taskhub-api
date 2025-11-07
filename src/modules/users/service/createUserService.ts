//Regras de negócio
import bcrypt from "bcryptjs";
import { UsersRepository } from "../repositories/usersRespository.js";

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(name: string, email: string, password: string) {
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create(name, email, hashedPassword);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}

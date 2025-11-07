//Repositório de usuários (mock inicial)
import type { IUser } from "../dtos/IUserDTO.js";
import { randomUUID } from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UsersRepository {
  async create(name: string, email: string, password: string) {
    const user = await prisma.user.create({
      data: { name, email, password },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }
}
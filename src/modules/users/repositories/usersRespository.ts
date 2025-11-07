//Repositório de usuários (mock inicial)
import type { IUser, IUpdateUserDTO,  } from "../dtos/IUserDTO.js";
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

  async findById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async update(id: string, data: IUpdateUserDTO): Promise<IUser> {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return user;
  }
}
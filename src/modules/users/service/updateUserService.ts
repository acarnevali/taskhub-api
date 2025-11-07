import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/usersRespository.js"; 
import type { IUpdateUserDTO } from "../dtos/IUserDTO.js"; 
interface IRequest {
  userId: string; 
  data: IUpdateUserDTO; 
}

type IResponse = Omit<User, "password">;

export class UpdateUserService {

    constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, data }: IRequest): Promise<IResponse> {

    if (data.email) {
      const emailInUse = await this.usersRepository.findByEmail(data.email);


      if (emailInUse && emailInUse.id !== userId) {
        throw new Error("This email is already in use by another account.");
      }
    }

    const updatedUser = await this.usersRepository.update(userId, data);

    const { password: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }
}
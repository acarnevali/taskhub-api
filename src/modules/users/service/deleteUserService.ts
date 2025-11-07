import type { UsersRepository } from "../repositories/usersRespository.js"; 

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new Error("User not found.");

    await this.usersRepository.delete(userId);
  }
}
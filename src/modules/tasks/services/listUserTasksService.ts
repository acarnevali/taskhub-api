import type { Task } from "@prisma/client";
import type { TasksRepository } from "../repositories/tasksRepository.js";

export class ListUserTasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(userId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findByUserId(userId);

    return tasks;
  }
}
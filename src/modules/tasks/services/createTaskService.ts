import type { Task } from "@prisma/client";
import type { TasksRepository } from "../repositories/tasksRepository.js";
import type { ICreateTaskDTO } from "../dtos/ITaskDTO.js";



export class CreateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    title,
    description,
    userId,
  }: ICreateTaskDTO): Promise<Task> {
    if (!title) {
      throw new Error("Title is required.");
    }

    const task = await this.tasksRepository.create({
      title,
      description,
      userId,
    });

    return task;
  }
}
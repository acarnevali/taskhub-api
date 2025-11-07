import type { Task } from "@prisma/client";
import type { TasksRepository } from "../repositories/tasksRepository.js";
import type { IUpdateTaskDTO } from "../dtos/ITaskDTO.js";

interface IRequest {
  taskId: string;
  userId: string; 
  data: IUpdateTaskDTO; 
}

export class UpdateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId, userId, data }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found."); 
    }

    if (task.userId !== userId) {
      throw new Error("Forbidden.");
    }

    const updatedTask = await this.tasksRepository.update(taskId, data);

    return updatedTask;
  }
}
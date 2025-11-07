import type { TasksRepository } from "../repositories/tasksRepository.js";

// Dados que o serviço precisa
interface IRequest {
  taskId: string;
  userId: string; 
}

export class DeleteTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId, userId }: IRequest): Promise<void> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found."); 
    }

    if (task.userId !== userId) {
      throw new Error("Forbidden."); 
    }

    
    await this.tasksRepository.delete(taskId);
  }
}
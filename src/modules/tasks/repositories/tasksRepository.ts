
import { prisma } from "../../../lib/prisma.js";
import type { Task } from "@prisma/client"; 
import type { ICreateTaskDTO, IUpdateTaskDTO } from "../dtos/ITaskDTO.ts";


export class TasksRepository {
  
  async create({
    title,
    description,
    userId,
  }: ICreateTaskDTO): Promise<Task> {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId, 
      },
    });
    return task;
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId, 
      },
      orderBy: {
        createdAt: "desc", 
      },
    });
    return tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    return task; 
  }

  async update(id: string, data: IUpdateTaskDTO): Promise<Task> {
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return task;
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
}
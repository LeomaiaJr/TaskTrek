import prisma from 'db';
import { ListTaskDTO, TaskCreateDTO, TaskUpdateDTO } from './dto/Task.dto';

export class TaskService {
  static async createTask(data: TaskCreateDTO) {
    const { title, description } = data;

    return await prisma.task.create({
      data: {
        title,
        description,
        isCompleted: false,
        date: new Date(),
      },
    });
  }

  static async getAllTasks(params: ListTaskDTO = {}) {
    const { search } = params;

    return await prisma.task.findMany({
      orderBy: [
        {
          date: 'desc',
        },
      ],
      ...(search
        ? { where: { title: { contains: search, mode: 'insensitive' } } }
        : {}),
    });
  }

  static async getTaskById(id: number) {
    return await prisma.task.findUnique({
      where: { id },
    });
  }

  static async updateTask(id: number, data: TaskUpdateDTO) {
    return await prisma.task.update({
      where: { id },
      data,
    });
  }

  static async deleteTask(id: number) {
    return await prisma.task.delete({
      where: { id },
    });
  }

  static async toggleTaskCompletion(id: number) {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new Error('Task not found');
    }

    return await prisma.task.update({
      where: { id },
      data: { isCompleted: !task.isCompleted },
    });
  }
}

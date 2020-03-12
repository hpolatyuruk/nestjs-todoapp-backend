import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }

  async getTask(taskID): Promise<Task> {
    const task = await this.taskModel.findById(taskID).exec();
    return task;
  }

  async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const newTask = await this.taskModel(createTaskDTO);
    return newTask.save();
  }

  async updateTask(taskID, createTaskDTO: CreateTaskDTO): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      taskID,
      createTaskDTO,
      { new: true },
    );
    return updatedTask;
  }

  async deleteTask(taskID): Promise<any> {
    const deletedTask = await this.taskModel.findByIdAndRemove(taskID);
    return deletedTask;
  }
}

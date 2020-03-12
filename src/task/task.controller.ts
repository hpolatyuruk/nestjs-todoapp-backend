import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/')
  async addTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
    const task = await this.taskService.addTask(createTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task has been created successfully',
      task,
    });
  }

  @Get('/')
  async getAllTasks(@Res() res) {
    const tasks = await this.taskService.getAllTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('/:taskID')
  async getTask(@Res() res, @Param('taskID') taskID) {
    const task = await this.taskService.getTask(taskID);
    if (!task) throw new NotFoundException('Task does not exist!');
    return res.status(HttpStatus.OK).json(task);
  }
}

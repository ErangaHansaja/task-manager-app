import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import { Task } from '../interfaces/task.interface';

export class TaskController {
  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task: Task = req.body;
      const newTask = new TaskModel(task);
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }

  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskModel.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  }

  public async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const task = await TaskModel.findById(req.params.id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await TaskModel.findByIdAndDelete(req.params.id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
}
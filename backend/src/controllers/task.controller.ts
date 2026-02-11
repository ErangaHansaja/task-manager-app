import { Request, Response } from 'express';
import { TaskModel } from '../models/task.model';
import { Task } from '../interfaces/task.interface';

export class TaskController {
  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskData: Partial<Task> = {
        ...req.body,
        userId: req.user?.userId,
        tags: req.body.tags || [],
        subtasks: req.body.subtasks || [],
      };
      const task = new TaskModel(taskData);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }

  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const filter: Record<string, any> = { userId: req.user?.userId };

      if (req.query.category) {
        filter.category = req.query.category;
      }
      if (req.query.priority) {
        filter.priority = req.query.priority;
      }
      if (req.query.status) {
        filter.status = req.query.status;
      }
      if (req.query.tags) {
        filter.tags = { $in: (req.query.tags as string).split(',') };
      }
      if (req.query.dueBefore) {
        filter.dueDate = { ...filter.dueDate, $lte: new Date(req.query.dueBefore as string) };
      }
      if (req.query.dueAfter) {
        filter.dueDate = { ...filter.dueDate, $gte: new Date(req.query.dueAfter as string) };
      }

      const sortField = (req.query.sortBy as string) || 'sortOrder';
      const sortDir = req.query.sortDir === 'desc' ? -1 : 1;

      const tasks = await TaskModel.find(filter).sort({ [sortField]: sortDir });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  }

  public async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const task = await TaskModel.findOne({ _id: req.params.id, userId: req.user?.userId });
      if (!task) {
        res.status(404).json({ message: 'Task not found or not authorized' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const updates = { ...req.body };

      if (updates.status === 'completed' && !updates.completedAt) {
        updates.completedAt = new Date();
      }
      if (updates.status && updates.status !== 'completed') {
        updates.completedAt = null;
      }

      const task = await TaskModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user?.userId },
        updates,
        { new: true }
      );
      if (!task) {
        res.status(404).json({ message: 'Task not found or not authorized' });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await TaskModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user?.userId,
      });
      if (!task) {
        res.status(404).json({ message: 'Task not found or not authorized' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }

  public async reorderTasks(req: Request, res: Response): Promise<void> {
    try {
      const { orderedIds } = req.body as { orderedIds: string[] };

      if (!Array.isArray(orderedIds)) {
        res.status(400).json({ message: 'orderedIds must be an array' });
        return;
      }

      const bulkOps = orderedIds.map((id, index) => ({
        updateOne: {
          filter: { _id: id, userId: req.user?.userId },
          update: { $set: { sortOrder: index } },
        },
      }));

      await TaskModel.bulkWrite(bulkOps);
      res.status(200).json({ message: 'Tasks reordered' });
    } catch (error) {
      res.status(500).json({ message: 'Error reordering tasks', error });
    }
  }
}
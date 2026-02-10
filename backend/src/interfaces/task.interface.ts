import { Types } from 'mongoose';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Recurrence {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: Date;
}

export interface Task {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: 'personal' | 'work' | 'study';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  tags: string[];
  subtasks: Subtask[];
  recurrence?: Recurrence;
  sortOrder: number;
  completedAt?: Date;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
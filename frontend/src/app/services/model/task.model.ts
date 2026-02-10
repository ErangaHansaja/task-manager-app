export type TaskCategory = 'personal' | 'work' | 'study';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Recurrence {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: string;
}

export interface Task {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate?: string;
  tags: string[];
  subtasks: Subtask[];
  recurrence?: Recurrence;
  sortOrder: number;
  completedAt?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFilter {
  category?: TaskCategory;
  priority?: TaskPriority;
  status?: TaskStatus;
  tags?: string[];
  dueBefore?: string;
  dueAfter?: string;
  searchTerm?: string;
}

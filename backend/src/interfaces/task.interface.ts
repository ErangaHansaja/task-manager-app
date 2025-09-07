export interface Task {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}
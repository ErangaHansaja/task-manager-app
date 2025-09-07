import { Types } from 'mongoose';

export interface Task {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
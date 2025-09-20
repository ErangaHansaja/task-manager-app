import { Schema, model, Types } from 'mongoose';
import { Task } from '../interfaces/task.interface';

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

export const TaskModel = model<Task>('Task', TaskSchema);
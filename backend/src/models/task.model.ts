import { Schema, model } from 'mongoose';
import { Task } from '../interfaces/task.interface';

const SubtaskSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { _id: false });

const RecurrenceSchema = new Schema({
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  interval: { type: Number, default: 1 },
  endDate: { type: Date },
}, { _id: false });

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  category: {
    type: String,
    enum: ['personal', 'work', 'study'],
    default: 'personal',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  dueDate: { type: Date },
  tags: { type: [String], default: [] },
  subtasks: { type: [SubtaskSchema], default: [] },
  recurrence: { type: RecurrenceSchema },
  sortOrder: { type: Number, default: 0 },
  completedAt: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

TaskSchema.index({ userId: 1, category: 1 });
TaskSchema.index({ userId: 1, priority: 1 });
TaskSchema.index({ userId: 1, dueDate: 1 });
TaskSchema.index({ userId: 1, status: 1 });

export const TaskModel = model<Task>('Task', TaskSchema);
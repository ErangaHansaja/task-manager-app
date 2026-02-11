import Dexie, { Table } from 'dexie';
import { Task } from '../services/model/task.model';

export class AppDatabase extends Dexie {
  tasks!: Table<Task, string>;

  constructor() {
    super('TaskManagerDB');

    this.version(1).stores({
      tasks: 'id, category, priority, status, dueDate, sortOrder, createdAt, updatedAt, *tags'
    });
  }
}

export const db = new AppDatabase();

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { db } from '../../db/app.db';
import { Task, TaskFilter } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  generateId(): string {
    return crypto.randomUUID();
  }

  create(task: Partial<Task>): Observable<Task> {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: this.generateId(),
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'pending',
      category: task.category || 'personal',
      priority: task.priority || 'medium',
      dueDate: task.dueDate,
      tags: task.tags || [],
      subtasks: task.subtasks || [],
      recurrence: task.recurrence,
      sortOrder: task.sortOrder ?? 0,
      createdAt: now,
      updatedAt: now,
    };
    return from(db.tasks.add(newTask).then(() => newTask));
  }

  getAll(filters?: TaskFilter): Observable<Task[]> {
    return from(this.queryTasks(filters));
  }

  private async queryTasks(filters?: TaskFilter): Promise<Task[]> {
    let collection = db.tasks.orderBy('sortOrder');

    let results = await collection.toArray();

    if (filters) {
      if (filters.category) {
        results = results.filter(t => t.category === filters.category);
      }
      if (filters.priority) {
        results = results.filter(t => t.priority === filters.priority);
      }
      if (filters.status) {
        results = results.filter(t => t.status === filters.status);
      }
      if (filters.tags && filters.tags.length > 0) {
        results = results.filter(t =>
          filters.tags!.some(tag => t.tags.includes(tag))
        );
      }
      if (filters.dueBefore) {
        const before = new Date(filters.dueBefore).getTime();
        results = results.filter(t => t.dueDate && new Date(t.dueDate).getTime() <= before);
      }
      if (filters.dueAfter) {
        const after = new Date(filters.dueAfter).getTime();
        results = results.filter(t => t.dueDate && new Date(t.dueDate).getTime() >= after);
      }
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        results = results.filter(t =>
          t.title.toLowerCase().includes(term) ||
          t.description.toLowerCase().includes(term)
        );
      }
    }

    return results;
  }

  getById(id: string): Observable<Task | undefined> {
    return from(db.tasks.get(id));
  }

  update(id: string, changes: Partial<Task>): Observable<Task> {
    const updates = {
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    if (updates.status === 'completed' && !updates.completedAt) {
      updates.completedAt = new Date().toISOString();
    }
    if (updates.status && updates.status !== 'completed') {
      updates.completedAt = undefined;
    }

    return from(
      db.tasks.update(id, updates).then(() => db.tasks.get(id).then(t => t as Task))
    );
  }

  delete(id: string): Observable<void> {
    return from(db.tasks.delete(id));
  }

  reorder(orderedIds: string[]): Observable<void> {
    return from(
      db.transaction('rw', db.tasks, async () => {
        for (let i = 0; i < orderedIds.length; i++) {
          await db.tasks.update(orderedIds[i], { sortOrder: i });
        }
      })
    );
  }

  async getNextSortOrder(): Promise<number> {
    const last = await db.tasks.orderBy('sortOrder').last();
    return last ? last.sortOrder + 1 : 0;
  }
}

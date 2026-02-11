import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskCategory, TaskPriority, Subtask } from '../../services/model/task.model';

export interface TaskFormData {
  task?: Task;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  title = '';
  description = '';
  category: TaskCategory = 'personal';
  priority: TaskPriority = 'medium';
  status: Task['status'] = 'pending';
  dueDate: Date | null = null;
  tags: string[] = [];
  subtasks: Subtask[] = [];
  tagInput = '';

  categories: { value: TaskCategory; label: string; icon: string }[] = [
    { value: 'personal', label: 'Personal', icon: 'person' },
    { value: 'work', label: 'Work', icon: 'business' },
    { value: 'study', label: 'Study', icon: 'school' },
  ];

  priorities: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormData
  ) {}

  ngOnInit(): void {
    if (this.data.task && this.data.mode === 'edit') {
      this.isEdit = true;
      this.title = this.data.task.title;
      this.description = this.data.task.description || '';
      this.category = this.data.task.category || 'personal';
      this.priority = this.data.task.priority || 'medium';
      this.status = this.data.task.status || 'pending';
      this.dueDate = this.data.task.dueDate ? new Date(this.data.task.dueDate) : null;
      this.tags = [...(this.data.task.tags || [])];
      this.subtasks = (this.data.task.subtasks || []).map(s => ({ ...s }));
    }
  }

  addTag(): void {
    const tag = this.tagInput.trim().toLowerCase();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
    this.tagInput = '';
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }

  onSubtasksChange(subtasks: Subtask[]): void {
    this.subtasks = subtasks;
  }

  onSubmit(): void {
    if (!this.title.trim()) return;

    const result: Partial<Task> = {
      title: this.title.trim(),
      description: this.description.trim(),
      category: this.category,
      priority: this.priority,
      status: this.status,
      dueDate: this.dueDate ? this.dueDate.toISOString() : undefined,
      tags: this.tags,
      subtasks: this.subtasks,
    };

    if (this.isEdit && this.data.task) {
      result.id = this.data.task.id;
    }

    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

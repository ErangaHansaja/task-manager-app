import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, Subtask } from '../../services/model/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  task: Task;

  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    this.task = { ...data.task, subtasks: (data.task.subtasks || []).map(s => ({ ...s })) };
  }

  get priorityIcon(): string {
    const icons: Record<string, string> = {
      low: 'arrow_downward',
      medium: 'remove',
      high: 'arrow_upward',
      urgent: 'priority_high',
    };
    return icons[this.task.priority] || 'remove';
  }

  get formattedDueDate(): string {
    if (!this.task.dueDate) return 'No due date';
    return new Date(this.task.dueDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  onSubtasksChange(subtasks: Subtask[]): void {
    this.task.subtasks = subtasks;
  }

  close(): void {
    this.dialogRef.close(this.task);
  }
}

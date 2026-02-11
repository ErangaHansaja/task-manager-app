import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../services/model/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() toggleComplete = new EventEmitter<Task>();

  get subtaskProgress(): number {
    if (!this.task.subtasks || this.task.subtasks.length === 0) return 0;
    const completed = this.task.subtasks.filter(s => s.completed).length;
    return (completed / this.task.subtasks.length) * 100;
  }

  get subtaskCount(): string {
    if (!this.task.subtasks || this.task.subtasks.length === 0) return '';
    const completed = this.task.subtasks.filter(s => s.completed).length;
    return `${completed}/${this.task.subtasks.length}`;
  }

  get isOverdue(): boolean {
    if (!this.task.dueDate || this.task.status === 'completed') return false;
    return new Date(this.task.dueDate) < new Date();
  }

  get formattedDueDate(): string {
    if (!this.task.dueDate) return '';
    const date = new Date(this.task.dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onToggleComplete(): void {
    this.toggleComplete.emit(this.task);
  }
}

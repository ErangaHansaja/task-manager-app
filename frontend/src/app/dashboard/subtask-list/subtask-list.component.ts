import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../services/model/task.model';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss']
})
export class SubtaskListComponent {
  @Input() subtasks: Task['subtasks'] = [];
  @Input() editable = true;
  @Output() subtasksChange = new EventEmitter<Task['subtasks']>();

  newSubtaskTitle = '';

  get completedCount(): number {
    return this.subtasks.filter(s => s.completed).length;
  }

  get progress(): number {
    if (this.subtasks.length === 0) return 0;
    return (this.completedCount / this.subtasks.length) * 100;
  }

  addSubtask(): void {
    if (!this.newSubtaskTitle.trim()) return;
    const subtask = {
      id: crypto.randomUUID(),
      title: this.newSubtaskTitle.trim(),
      completed: false,
    };
    this.subtasks = [...this.subtasks, subtask];
    this.newSubtaskTitle = '';
    this.subtasksChange.emit(this.subtasks);
  }

  toggleSubtask(id: string): void {
    this.subtasks = this.subtasks.map(s =>
      s.id === id ? { ...s, completed: !s.completed } : s
    );
    this.subtasksChange.emit(this.subtasks);
  }

  removeSubtask(id: string): void {
    this.subtasks = this.subtasks.filter(s => s.id !== id);
    this.subtasksChange.emit(this.subtasks);
  }
}

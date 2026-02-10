import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task, TaskFilter, TaskCategory, TaskPriority, TaskStatus } from '../../services/model/task.model';
import { TaskDataService } from '../../services/data/task-data.service';
import { TaskFormComponent, TaskFormData } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  activeFilter: TaskFilter = {};
  searchTerm = '';

  categories: TaskCategory[] = ['personal', 'work', 'study'];
  priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];
  statuses: TaskStatus[] = ['pending', 'in-progress', 'completed'];

  selectedCategory: TaskCategory | '' = '';
  selectedPriority: TaskPriority | '' = '';
  selectedStatus: TaskStatus | '' = '';

  constructor(
    private taskDataService: TaskDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskDataService.getAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
      },
    });
  }

  applyFilters(): void {
    let result = [...this.tasks];

    if (this.selectedCategory) {
      result = result.filter(t => t.category === this.selectedCategory);
    }
    if (this.selectedPriority) {
      result = result.filter(t => t.priority === this.selectedPriority);
    }
    if (this.selectedStatus) {
      result = result.filter(t => t.status === this.selectedStatus);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    this.filteredTasks = result;
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
    this.searchTerm = '';
    this.applyFilters();
  }

  get hasActiveFilters(): boolean {
    return !!(this.selectedCategory || this.selectedPriority || this.selectedStatus || this.searchTerm);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '560px',
      maxHeight: '90vh',
      data: { mode: 'create' } as TaskFormData,
      panelClass: 'task-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskDataService.getNextSortOrder().then(sortOrder => {
          result.sortOrder = sortOrder;
          this.taskDataService.create(result).subscribe({
            next: () => {
              this.loadTasks();
              this.snackBar.open('Task created', 'OK', { duration: 2000 });
            },
          });
        });
      }
    });
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '560px',
      maxHeight: '90vh',
      data: { task, mode: 'edit' } as TaskFormData,
      panelClass: 'task-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && task.id) {
        this.taskDataService.update(task.id, result).subscribe({
          next: () => {
            this.loadTasks();
            this.snackBar.open('Task updated', 'OK', { duration: 2000 });
          },
        });
      }
    });
  }

  deleteTask(id: string): void {
    this.taskDataService.delete(id).subscribe({
      next: () => {
        this.loadTasks();
        this.snackBar.open('Task deleted', 'Undo', { duration: 3000 });
      },
    });
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id || '';
  }

  toggleComplete(task: Task): void {
    if (!task.id) return;
    const newStatus: TaskStatus = task.status === 'completed' ? 'pending' : 'completed';
    this.taskDataService.update(task.id, { status: newStatus }).subscribe({
      next: () => this.loadTasks(),
    });
  }
}

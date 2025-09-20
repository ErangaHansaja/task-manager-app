import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/common/task.service';
import { Task } from '../../services/model/task.model';
import { gsap } from 'gsap';
import AOS from 'aos';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  currentTask: Task = { title: '', description: '', status: 'pending', userId: '' };
  editingId: string | null = null;
  errorMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        setTimeout(() => AOS.refresh(), 0); // Refresh AOS after initial load
      },
      error: (err) => this.errorMessage = err.error.message || 'Failed to load tasks'
    });
  }

  resetForm() {
    this.currentTask = { title: '', description: '', status: 'pending', userId: '' };
    this.editingId = null;
  }

  onSubmit() {
    if (this.editingId) {
      this.taskService.updateTask(this.editingId, this.currentTask).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t._id === updatedTask._id);
          if (index !== -1) this.tasks[index] = updatedTask;
          this.resetForm();
          setTimeout(() => AOS.refresh(), 0); // Refresh AOS after update
        },
        error: (err) => this.errorMessage = err.error.message || 'Failed to update task'
      });
    } else {
      this.taskService.createTask(this.currentTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.resetForm();
          gsap.from(`#task-${task._id}`, { duration: 0.5, x: 100, opacity: 0 });
          setTimeout(() => AOS.refresh(), 0); // Refresh AOS after create
        },
        error: (err) => this.errorMessage = err.error.message || 'Failed to create task'
      });
    }
  }

  editTask(task: Task) {
    this.currentTask = { ...task };
    this.editingId = task._id || null;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== id);
        setTimeout(() => AOS.refresh(), 0); // Refresh AOS after delete
      },
      error: (err) => this.errorMessage = err.error.message || 'Failed to delete task'
    });
  }
}

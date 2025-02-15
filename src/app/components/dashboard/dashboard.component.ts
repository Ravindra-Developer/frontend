import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: any[] = [];
  newTaskTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: any) => this.tasks = tasks);
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.createTask({ title: this.newTaskTitle }).subscribe(() => {
      this.newTaskTitle = '';
      this.loadTasks();
    });
  }

  completeTask(task: any) {
    this.taskService.updateTask(task._id, { status: 'completed' }).subscribe(() => this.loadTasks());
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task._id).subscribe(() => this.loadTasks());
  }
}

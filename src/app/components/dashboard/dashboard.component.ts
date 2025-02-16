import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: any[] = [];
  taskTitle = '';
  taskDesc = '';
  _id: any = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: any) => this.tasks = tasks);
  }

  addTask() {
    if (!this.taskTitle.trim()) return;
    this.taskService.createTask({ title: this.taskTitle }).subscribe(() => {
      this.resetForm()
      this.loadTasks();
    });
  }

  updateTask() {
    if (!this.taskTitle.trim()) return;

    const updatedTask = {
      title: this.taskTitle,
      description: this.taskDesc
    };

    this.taskService.updateTask(this._id, updatedTask).subscribe(() => {
      this.resetForm()
      this.loadTasks();
    });
  }

  patchData(data: any) {
    this.taskTitle = data.title;
    this.taskDesc = data.description;
    this._id = data._id;
  }

  completeTask(task: any) {
    this.taskService.updateTask(task._id, { status: 'completed' }).subscribe(() => this.loadTasks());
  }

  deleteTask() {
    this.taskService.deleteTask(this._id).subscribe(() => {
      this.resetForm()
      this.loadTasks()
    });
  }

  resetForm() {
    this.taskTitle = this.taskDesc = this._id = '';
  }
}

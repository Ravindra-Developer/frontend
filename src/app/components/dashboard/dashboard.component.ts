import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'


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
  status: string = ''

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  filter(){
    this.loadTasks(this.status)
  }

  loadTasks(status: string = "") {
    this.taskService.getTasks(status).subscribe({
      next: (tasks: any) => {
        this.tasks = tasks
        if (!this.tasks.length && !this.status) {
          document.getElementById('addModalTRiggerBtn')?.click()
        }
      },
      error: (error: any) => {
        Swal.fire({
          title: error.error.message,
          icon: "error",
          timer: 2000,
        });
      }
    });
  }

  addTask() {
    if (!this.taskTitle.trim()) return;
    this.taskService.createTask({ title: this.taskTitle }).subscribe({
      next: (res: any) => {
        this.resetForm()
        this.loadTasks();
        Swal.fire({
          title: "New task added successfully",
          icon: "success",
          timer: 2000,
        });
      },
      error: (error: any) => {
        this.resetForm()
        this.loadTasks();
        Swal.fire({
          title: error.error.message,
          icon: "error",
          timer: 2000,
        });
      }
    });
  }

  updateTask() {
    if (!this.taskTitle.trim()) return;

    const updatedTask = {
      title: this.taskTitle,
      description: this.taskDesc
    };

    this.taskService.updateTask(this._id, updatedTask).subscribe({
      next: (res: any) => {
        this.resetForm()
        this.loadTasks();
        Swal.fire({
          title: "Updated successfully",
          icon: "success",
          timer: 2000,
        });
      },
      error: (error: any) => {
        this.resetForm()
        this.loadTasks();
        Swal.fire({
          title: error.error.message,
          icon: "error",
          timer: 2000,
        });
      }
    });
  }

  patchData(data: any) {
    this.taskTitle = data.title;
    this.taskDesc = data.description;
    this._id = data._id;
  }

  completeTask(task: any) {
    this.taskService.updateTask(task._id, { status: 'completed' }).subscribe({
      next: (res: any) => {
        this.loadTasks()
        Swal.fire({
          title: "Marked as completed",
          icon: "success",
          timer: 2000,
        });
      },
      error: (error: any) => {
        this.loadTasks()
        Swal.fire({
          title: error.error.message,
          icon: "error",
          timer: 2000,
        });
      }
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this._id).subscribe({
      next: (res: any) => {
        this.resetForm()
        Swal.fire({
          title: "Deleted successfully",
          icon: "success",
          timer: 2000,
          willClose: () => {
            this.loadTasks()
          }
        });
      }, error: (error: any) => {
        this.resetForm()
        this.loadTasks()
        Swal.fire({
          title: error.error.message,
          icon: "error",
          timer: 2000,
        });
      }
    });
  }

  resetForm() {
    this.taskTitle = this.taskDesc = this._id = '';
  }
}

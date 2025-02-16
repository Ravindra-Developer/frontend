import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TaskService } from '../../services/task.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasks', 'createTask', 'updateTask', 'deleteTask']);
    taskServiceMock.getTasks.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, FormsModule, CommonModule],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const tasks = [{ title: 'Test Task', description: 'Test Description', _id: '1', status: 'pending' }];
    taskServiceMock.getTasks.and.returnValue(of(tasks));

    component.ngOnInit();

    expect(component.tasks).toEqual(tasks);
  });

  it('should handle error when loading tasks', () => {
    const errorResponse = { error: { message: 'Error loading tasks' } };
    taskServiceMock.getTasks.and.returnValue(throwError(errorResponse));

    spyOn(Swal, 'fire');

    component.loadTasks();

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Error loading tasks',
      icon: 'error',
      timer: 2000,
    }));
  });

  it('should add a new task', () => {
    const newTask = { title: 'New Task' };
    taskServiceMock.createTask.and.returnValue(of(newTask));

    spyOn(Swal, 'fire');
    component.taskTitle = 'New Task';
    component.addTask();

    expect(taskServiceMock.createTask).toHaveBeenCalledWith({ title: 'New Task' });
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'New task added successfully',
      icon: 'success',
      timer: 2000,
    }));
  });

  it('should update a task', () => {
    const updatedTask = { title: 'Updated Task', description: 'Updated Description' };
    taskServiceMock.updateTask.and.returnValue(of(updatedTask));

    spyOn(Swal, 'fire');
    component.taskTitle = 'Updated Task';
    component.taskDesc = 'Updated Description';
    component._id = '1';
    component.updateTask();

    expect(taskServiceMock.updateTask).toHaveBeenCalledWith('1', updatedTask);
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Updated successfully',
      icon: 'success',
      timer: 2000,
    }));
  });

  it('should delete a task', () => {
    taskServiceMock.deleteTask.and.returnValue(of({}));

    spyOn(Swal, 'fire');
    component._id = '1';
    component.deleteTask();

    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith('1');
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Deleted successfully',
      icon: 'success',
      timer: 2000,
      willClose: jasmine.any(Function),
    }));
  });
});
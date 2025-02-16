import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    const dummyTasks = [{ title: 'Test Task', description: 'Test Description', _id: '1', status: 'pending' }];
    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/getMyTask`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should create a task', () => {
    const newTask = { title: 'New Task' };
    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update a task', () => {
    const updatedTask = { title: 'Updated Task', description: 'Updated Description' };
    service.updateTask('1', updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/update/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    service.deleteTask('1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  private headers() {
    return { headers: new HttpHeaders({ Authorization: `JWT ${sessionStorage.getItem('token')}` }) };
  }

  getTasks() {
    return this.http.get(`${this.baseUrl}/getMyTask`, this.headers());
  }

  createTask(task: any) {
    return this.http.post(this.baseUrl, task, this.headers());
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.baseUrl}/${id}`, task, this.headers());
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.headers());
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  private headers() {
    return { headers: new HttpHeaders({ Authorization: `JWT ${sessionStorage.getItem('token')}` }) };
  }

  getTasks(status: string = "") {
    let URL = `${this.baseUrl}/getMyTask`
    if (status) {
      URL = URL + "?status=" + status
    }
    return this.http.get(URL, this.headers());
  }

  createTask(task: any) {
    return this.http.post(`${this.baseUrl}/create`, task, this.headers());
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, task, this.headers());
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, this.headers());
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }
}

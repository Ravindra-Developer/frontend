import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.userService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Invalid credentials')
    });
  }

}

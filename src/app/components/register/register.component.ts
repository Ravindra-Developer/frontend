import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) { }

  register() {
    this.userService.register({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Username already taken')
    });
  }
}

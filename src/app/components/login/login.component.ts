import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLogin: boolean = true

  loginForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    let val = localStorage.getItem('authPage')
    if (val === 'login') {
      this.isLogin = true
    } else if (val === 'register') {
      this.isLogin = false
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    this.loading = true;

    if (this.isLogin) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('token', res.token);
          localStorage.clear()
          Swal.fire({
            title: "Login Successfull",
            icon: "success",
            timer: 2000,
            willClose: () => {
              this.router.navigate(['/dashboard']);
            }
          });
        },
        error: (error: any) => {
          Swal.fire({
            title: "Login failed",
            text: error.error.message,
            icon: "error",
            timer: 2000,
            willClose: () => {
              this.loginForm.reset()
            }
          });
          this.loading = false;
        },
      });
    } else {
      this.userService.register(this.loginForm.value).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('token', res.token);
          localStorage.clear()
          Swal.fire({
            title: "Registered Successfully",
            icon: "success",
            timer: 2000,
            willClose: () => {
              this.router.navigate(['/dashboard']);
            }
          });
        },
        error: (error: any) => {
          Swal.fire({
            title: "Registeration failed",
            text: error.error.message,
            icon: "error",
            timer: 2000,
            willClose: () => {
              this.loginForm.reset()
            }
          });
          this.loading = false;
        }
      })
    }
  }

  switch() {
    if (this.isLogin) {
      this.isLogin = false
      localStorage.setItem('authPage', 'register')
    } else {
      this.isLogin = true
      localStorage.setItem('authPage', 'login')
    }
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['login', 'register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('should invalidate form when fields are empty', () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should validate form when valid inputs are provided', () => {
    component.loginForm.setValue({ username: 'testuser', password: 'password123' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call login API and navigate to dashboard on success', () => {
    const mockResponse = { token: 'mock-token' };
    userService.login.and.returnValue(of(mockResponse));
    spyOn(Swal, 'fire');
    component.isLogin = true;
    component.loginForm.setValue({ username: 'testuser', password: 'password123' });
    component.login();

    expect(userService.login).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    expect(sessionStorage.getItem('token')).toEqual(mockResponse.token);
  });

  it('should show error when login fails', () => {
    const errorResponse = { error: { message: 'Invalid credentials' } };
    userService.login.and.returnValue(throwError(() => errorResponse));
    spyOn(Swal, 'fire');

    component.isLogin = true;
    component.loginForm.setValue({ username: 'testuser', password: 'wrongpass' });
    component.login();

    expect(userService.login).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Login failed' }));
    expect(component.loading).toBeFalse();
  });

  it('should call register API and navigate to dashboard on success', () => {
    const mockResponse = { token: 'mock-token' };
    userService.register.and.returnValue(of(mockResponse));
    spyOn(Swal, 'fire');

    component.isLogin = false;
    component.loginForm.setValue({ username: 'newuser', password: 'password123' });
    component.login();

    expect(userService.register).toHaveBeenCalledWith({ username: 'newuser', password: 'password123' });
    expect(sessionStorage.getItem('token')).toEqual(mockResponse.token);
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Registered Successfully' }));
  });

  it('should show error when registration fails', () => {
    const errorResponse = { error: { message: 'Username already exists' } };
    userService.register.and.returnValue(throwError(() => errorResponse));
    spyOn(Swal, 'fire');

    component.isLogin = false;
    component.loginForm.setValue({ username: 'existinguser', password: 'password123' });
    component.login();

    expect(userService.register).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });

  it('should switch between login and register mode', () => {
    component.isLogin = true;
    component.switch();
    expect(component.isLogin).toBeFalse();
    expect(localStorage.getItem('authPage')).toEqual('register');

    component.switch();
    expect(component.isLogin).toBeTrue();
    expect(localStorage.getItem('authPage')).toEqual('login');
  });
});

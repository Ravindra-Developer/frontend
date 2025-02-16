import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const response = { token: '12345' };

    service.login(credentials).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should register a user', () => {
    const user = { email: 'test@example.com', password: 'password' };
    const response = { message: 'User registered successfully' };

    service.register(user).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should check if user is authenticated', () => {
    sessionStorage.setItem('token', '12345');
    expect(service.isAuthenticated()).toBeTrue();

    sessionStorage.removeItem('token');
    expect(service.isAuthenticated()).toBeFalse();
  });
});

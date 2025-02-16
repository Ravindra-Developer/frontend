import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let userServiceMock: any;
  let routerMock: any;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['isAuthenticated']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access the route', () => {
    userServiceMock.isAuthenticated.and.returnValue(true);

    const result = executeGuard(null as any, null as any);

    expect(result).toBeTrue();
  });

  it('should navigate to /authentication for unauthenticated user', () => {
    userServiceMock.isAuthenticated.and.returnValue(false);

    const result = executeGuard(null as any, null as any);

    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/authentication']);
  });
});

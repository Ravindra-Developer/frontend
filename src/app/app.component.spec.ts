import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return false when the URL is "/authentication"', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/authentication');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.shouldShowNavbar()).toBeFalse();
  });

  it('should return true for other routes', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/dashboard');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.shouldShowNavbar()).toBeTrue();
  });

});

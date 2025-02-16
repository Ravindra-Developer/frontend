import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/authentication', pathMatch: 'full' },
    { path: 'authentication', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
];

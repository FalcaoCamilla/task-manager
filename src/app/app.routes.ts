import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  // {path: '', component: LoginComponent, canActivate: [authGuard]},
  {path: '', component: DashboardComponent},
  {path: '**', redirectTo: ''}
];

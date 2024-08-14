import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  // {path: '', component: LoginComponent, canActivate: [authGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tasks', component: TasksComponent},
];

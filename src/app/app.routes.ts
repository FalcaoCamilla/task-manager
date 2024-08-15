import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { BaseComponent } from './pages/base/base.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        //carregar o componente somente ao acessar a rota
        loadComponent: () => import('../app/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'tasks',
        loadComponent: () => import('../app/pages/tasks/tasks.component').then(m => m.TasksComponent)
      },
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
];

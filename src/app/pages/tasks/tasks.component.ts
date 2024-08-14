import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, inject, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { priority, status, Task } from '../../shared/models';
import { TaksService } from '../../services/tasks.service';
import { userArrayFormatterPipe } from "../../shared/directives/user-array-formatter.pipe";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule, FontAwesomeModule, TableModule, userArrayFormatterPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private _taskService = inject(TaksService);

  protected showModalNewTask: boolean = false;
  protected addIcon = faPlus;

  protected priority: any = priority;
  protected status: any = status;

  protected breadcrumbItems:  MenuItem[] = [
    { 
      label: 'Dashboard', 
      routerLink: '/dashboard' 
    }, 
    { 
      label: 'Tarefas',
      routerLink: '/tasks'
    }, 
  ]
  protected taskData: Task[] = [];

  ngOnInit(): void {
    this._taskService.getTasks().subscribe({
      next: (data) => this.taskData = data
    })
  }
}

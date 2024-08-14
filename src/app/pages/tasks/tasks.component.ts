import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { faEye, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { filterTask, priority, SelectData, status, Task } from '../../shared/models';
import { TaksService } from '../../services/tasks.service';
import { userArrayFormatterPipe } from "../../shared/directives/user-array-formatter.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule, DropdownModule, FontAwesomeModule, FormsModule, TableModule, userArrayFormatterPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private _taskService = inject(TaksService);

  protected showModalNewTask: boolean = false;
  protected addIcon = faPlus;
  protected faTrash = faTrashCan;
  protected faEye = faEye;
  protected faEdit = faPenToSquare;

  protected priority: any = priority;
  protected status: any = status;

  protected deadlineOptions: SelectData[] = [
    {id: 1, text: 'Hoje'},
    {id: 2, text: 'Últimos 7 dias'},
    {id: 3, text: 'Últimos 15 dias'},
    {id: 4, text: 'Últimos 30 dias'},
  ];
  protected projectsOptions: SelectData[] = [];
  protected statusOptions: SelectData[] = [
    {id: 1, text: 'Concluídas'},
    {id: 2, text: 'Em progresso'},
    {id: 3, text: 'Pendentes'},
  ];
  protected priorityOptions: SelectData[] = [
    {id: 1, text: 'Alta'},
    {id: 2, text: 'Média'},
    {id: 3, text: 'Baixa'},
  ];
  protected filterArray: filterTask = {
    project: '',
    priority: '',
    status: '',
    deadline: 4,
  }

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
    this._getTasks();
    this._setProjectsOptions();
  }

  private _getTasks() {
    this._taskService.getTasks().subscribe({
      next: (data) => this.taskData = data
    })
  }

  private _setProjectsOptions() {
    this._taskService.getProjects().subscribe({
      next: (data) => this.projectsOptions = data
    })
  }
}

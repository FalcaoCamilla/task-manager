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
import { ModalNewTaskComponent } from '../../shared/components/modal-task/modal-task.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule, DropdownModule, FontAwesomeModule, FormsModule, ModalNewTaskComponent, TableModule, userArrayFormatterPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private _taskService = inject(TaksService);
  private _toastr = inject(ToastrService);
  
  protected showModalTask: boolean = false;
  protected isViewingMode: boolean = false;
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
  protected statusOptions: Array<SelectData & {value: string}> = [
    {id: 1, text: 'Concluídas', value: 'concluido'},
    {id: 2, text: 'Em progresso', value: 'em_progresso'},
    {id: 3, text: 'Pendentes', value: 'pendente'},
  ];
  protected priorityOptions: Array<SelectData & {value: string}> = [
    {id: 1, text: 'Alta', value: 'alta'},
    {id: 2, text: 'Média', value: 'media'},
    {id: 3, text: 'Baixa', value: 'baixa'},
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
  protected taskDetails: Task | null = null;

  ngOnInit(): void {
    this.getTasks();
    this._setProjectsOptions();
  }
  
  private _setProjectsOptions() {
    this._taskService.getProjects().subscribe({
      next: (data) => this.projectsOptions = data
    })
  }

  protected getTasks() {
    this._taskService.getTasks(this.filterArray).subscribe({
      next: (data) => this.taskData = data
    })
  }

  protected openModalTask(task?: Task, isViewingMode: boolean = false) {
    if(isViewingMode) this.isViewingMode = true;
    if(task) {
      this.taskDetails = task
    } else {
      this.taskDetails = null
    };
    this.showModalTask = true;
  }

  protected deleteTask(taskId: number) {
    this._taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.getTasks()
        this._toastr.success('Tarefa removida com sucesso.')
      },
      error: () => this._toastr.error('Não foi possível remover esta tarefa.')
    })
  }

}

import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectData, Task, User } from '../../models';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-modal-new-task',
  standalone: true,
  imports: [ CommonModule, DialogModule, DropdownModule, CalendarModule, InputTextModule, FloatLabelModule, FontAwesomeModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './modal-new-task.component.html',
  styleUrl: './modal-new-task.component.scss'
})
export class ModalNewTaskComponent implements OnInit {
  private _dashboardservice = inject(DashboardService);

  @Output() hideComponent = new EventEmitter<boolean>();
  protected addIcon = faPlus;
  protected iconFile = faUpload;
  protected visible: boolean = true;

  protected priority: SelectData[] = [
    {id: 1, text: 'Alta'},
    {id: 2, text: 'Média'},
    {id: 3, text: 'Baixa'},
  ];
  protected users: User[] = [];

  protected newTaskForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    deadline: new FormControl(null),
    priority: new FormControl(null),
    responsibility: new FormControl(null, Validators.required),
    file: new FormControl(null),
  })

  ngOnInit(): void {
    this._dashboardservice.getUsers().subscribe({
      next: (data) => this.users = data
    })
  }

  protected onHide() {
    this.hideComponent.emit(true)
  }
}

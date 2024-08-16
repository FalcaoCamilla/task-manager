import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectData, User } from '../../models';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { markAllAsDirty } from '../../utils';
import { TaksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-modal-new-task',
  standalone: true,
  imports: [ CommonModule, DialogModule, DropdownModule, CalendarModule, InputTextModule, FloatLabelModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, ToastrModule ],
  templateUrl: './modal-new-task.component.html',
  styleUrl: './modal-new-task.component.scss'
})
export class ModalNewTaskComponent implements OnInit {
  private _taskService = inject(TaksService);
  private _toastr = inject(ToastrService);

  hideComponent = output<boolean>();
  updateTasks = output<boolean>();
  protected addIcon = faPlus;
  protected iconFile = faUpload;
  protected visible: boolean = true;

  protected priority: Array<SelectData & {value: string}> = [
    {id: 1, text: 'Alta', value: 'alta'},
    {id: 2, text: 'Média', value: 'media'},
    {id: 3, text: 'Baixa', value: 'baixa'},
  ];
  protected users: User[] = [];

  //project
  protected newTaskForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    deadline: new FormControl(null),
    priority: new FormControl(null),
    responsible: new FormControl(null, Validators.required),
    file: new FormControl(null),
  })

  ngOnInit(): void {
    this._taskService.getUsers().subscribe({
      next: (data) => this.users = data
    })
  }

  protected criarTarefa() {
    if(this.newTaskForm.invalid) {
      markAllAsDirty(this.newTaskForm);
      this._toastr.error('Dados inválidos');
      return
    }

    const formValue = this.newTaskForm.getRawValue();
    const form = {
      ...formValue,
      responsible: Array(this.newTaskForm.controls['responsible'].value),
      status: 'pendente'
    }

    this._taskService.createTask(form).subscribe({
      next: () => {
        this.updateTasks.emit(true);
        this.onHide();
        this._toastr.success('Tarefa cadastrada com sucesso');
      },
      error: () => this._toastr.error('Não foi possível cadastrar a tarefa')
    })
  }

  protected onHide() {
    this.hideComponent.emit(true)
  }
}

import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { markAllAsDirty } from '../../utils';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectData, Task, User } from '../../models';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TaksService } from '../../../services/tasks.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-modal-new-task',
  standalone: true,
  imports: [ CommonModule, DialogModule, DropdownModule, CalendarModule, InputTextModule, FloatLabelModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, ToastrModule ],
  templateUrl: './modal-new-task.component.html',
  styleUrl: './modal-new-task.component.scss'
})
export class ModalNewTaskComponent implements OnInit {
  private _taskService = inject(TaksService);
  private _userService = inject(UserService);
  private _toastr = inject(ToastrService);

  taskDetails = input<Task | null>();
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
  protected projectsOptions: SelectData[] = [];

  protected taskForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    deadline: new FormControl(null),
    priority: new FormControl(null),
    project: new FormControl(null),
    status: new FormControl(null),
    finish_date: new FormControl(null),
    responsible: new FormControl(null, Validators.required),
    file: new FormControl(null),
  })
  
  ngOnInit(): void {
    this._setDropdownOptions();
    if(this.taskDetails()) this._patchFormValue();
  }

  private _setDropdownOptions() {
    this._userService.getUsers().subscribe({
      next: (data) => this.users = data
    })
    this._taskService.getProjects().subscribe({
      next: (data) => this.projectsOptions = data
    })
  }

  private _patchFormValue() {
    this.taskForm.patchValue(this.taskDetails() ?? {});
    this.taskForm.controls['responsible'].setValue(this.taskDetails()?.responsible[0]);
    const deadlineFormatada = this.taskDetails()?.deadline;
    if (deadlineFormatada) this.taskForm.controls['deadline'].setValue(new Date(deadlineFormatada))
  }

  protected alterarOuCriarTarefa() {
    if(this.taskForm.invalid) {
      markAllAsDirty(this.taskForm);
      this._toastr.error('Dados inválidos');
      return
    }

    const formValue = this.taskForm.getRawValue();
    const form = {
      ...formValue,
      responsible: Array(this.taskForm.controls['responsible'].value),
      status: this.taskDetails() ? this.taskForm.controls['status'].value : 'pendente'
    }

    this._taskService.createTask(form).subscribe({
      next: () => {
        this.updateTasks.emit(true);
        this.onHide();
        this._toastr.success(`Tarefa ${this.taskDetails() ? 'alterada' : 'cadastrada'} com sucesso`);
      },
      error: () => this._toastr.error(`Não foi possível ${this.taskDetails() ? 'alterar' : 'cadastrar'} a tarefa`)
    })
  }

  protected onHide() {
    this.hideComponent.emit(true)
  }
}

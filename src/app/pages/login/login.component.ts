import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputTextModule, FloatLabelModule, ToastrModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _toastr = inject(ToastrService);
  private _loginService = inject(LoginService);
  private _router = inject(Router);

  protected isRegister: WritableSignal<boolean> = signal(false);

  protected formLogin: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null),
    password: new FormControl(null, Validators.required),
  })

  protected login() {
    this._loginService.login(this.formLogin.getRawValue()).subscribe({
      next: (res) => {
        if(!res) {
          this._toastr.error('Login inválido. Tente novamente')
          return
        }
        this._router.navigateByUrl('/dashboard')
      }
    })      
  }
  
  protected register() {
    this._loginService.signUp(this.formLogin.getRawValue()).subscribe({
      next: (res) => {
        if(!res) {
          this._toastr.error('Não foi possível realizar o cadastro')
          return
        }
        this._toastr.success('Cadastro realizado com sucesso')
        this._router.navigateByUrl('/login')
      }
    })
  }
}

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, map, tap, catchError } from 'rxjs';
import { User } from '../shared/models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private platformId = inject(PLATFORM_ID);
  private _router = inject(Router);
  private _http = inject(HttpClient);
  private _userService = inject(UserService);
  //PLATFORM_ID identifica a plataforma em que o aplicativo está sendo executado (navegador ou servidor). Esse ID é armazenado em platformId para uso posterior.

  public login(formLogin: User): Observable<boolean> {
    return this._userService.getUsers().pipe(
      map(users => users.find(user => user.email === formLogin.email && user.password === formLogin.password) || null), //o uso do || null indica que, caso não encontrado usuário, ao invés de retornar undefined, deve retornar null
      tap(user => { //recebe o valor emitido pelo map como argumento
        if (user && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', 'registered');
          this._userService.setLoggedInUser(user);
        }
      }),
      map(user => !!user) // Converte o usuário encontrado em um booleano (true se encontrado, false caso contrário)
    );
  }

  public signUp(formLogin: User): Observable<boolean> {
    return this._userService.setUser(formLogin).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._userService.setLoggedInUser(null);
    this._router.navigateByUrl('/login')
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") ? true : false
  }
}

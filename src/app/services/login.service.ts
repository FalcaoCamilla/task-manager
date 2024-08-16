import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private platformId = inject(PLATFORM_ID);
  private _router = inject(Router);
  //PLATFORM_ID identifica a plataforma em que o aplicativo está sendo executado (navegador ou servidor). Esse ID é armazenado em platformId para uso posterior.

  public login(formLogin: {username: string, password: string}) {
    const storedLogin = localStorage.getItem("login");
    const login = storedLogin ? JSON.parse(storedLogin) : null;

    if(!login || !(login.username === formLogin.username && login.password === formLogin.password)) {
      return of(false);
    }

    //Verifica se o código está sendo executado no navegador. Se for, armazena um token de autenticação no localStorage.
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', 'registered')
    }
    return of(true);
  }

  public signUp(formLogin: {username: string, email: string, password: string}): Observable<boolean> {
    localStorage.setItem("login", JSON.stringify(formLogin));
    const storedLogin = localStorage.getItem("login");
  
    return storedLogin ? of(true) : of(false);
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._router.navigateByUrl('/login')
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") ? true : false
  }
}

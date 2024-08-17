import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http = inject(HttpClient)
  private _loggedInUser = signal<User | null>(null);

  get loggedInUser(): User | null {
    return this._loggedInUser();
  }

  setLoggedInUser(user: User | null): void {
    this._loggedInUser.set(user);
  }
  
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>('/api/users')
  }

  setUser(user: User): Observable<any> {
    return this._http.post<any>('/api/users', user)
  }
}

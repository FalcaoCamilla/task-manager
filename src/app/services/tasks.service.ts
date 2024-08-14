import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TaksService {
  protected http = inject(HttpClient);


  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks')
  }
}

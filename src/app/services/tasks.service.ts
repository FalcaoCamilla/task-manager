import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SelectData, Task, User } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TaksService {
  protected http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks')
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users')
  }

  getProjects(): Observable<SelectData[]> {
    return this.http.get<Task[]>('/api/tasks')
      .pipe(
        map(tasks => {
          const uniqueProjects = new Set(
            tasks
              .map(task => task.project)
              .filter(projectName => projectName)
          );
          return [...uniqueProjects].map((projectName, index) => ({
            id: index + 1,
            text: projectName
          }));
        })
      );
  }

  createTask(task: Partial<Task>): Observable<any> {
    return this.http.post('/api/tasks', task)
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`/api/tasks/${taskId}`)
  }
}

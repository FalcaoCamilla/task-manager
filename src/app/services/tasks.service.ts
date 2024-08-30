import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { filterTask, SelectData, Task, User } from '../shared/models';
import { filterTasksByDateRange } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class TaksService {
  protected http = inject(HttpClient);

  getTasks(filterArray: filterTask): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks').pipe(
      map(tasks => {
        const validTasks = tasks.filter(task => {
          return (
            (filterArray.project?.length === 0 || !filterArray.project || filterArray.project === task.project) &&
            (filterArray.priority?.length === 0 || !filterArray.priority || filterArray.priority === task.priority) &&
            (filterArray.status?.length === 0 || !filterArray.status || filterArray.status === task.status)
          );
        });

        if (!validTasks.length) {
          return [];
        }

        if(filterArray.status === 'concluido') {
          const filteredTasksByDeadline = this._filterTasksByDeadline(validTasks, filterArray.deadline)
          return filteredTasksByDeadline as Task[];
        }

        return validTasks as Task[]
      })
    );
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

  private _filterTasksByDeadline(validTasks: Task[], deadline: number): Task[] {
    const now = new Date();
    let startDate: Date;

    switch (deadline) {
      case 1:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 2:
        startDate = new Date(now); 
        startDate.setDate(startDate.getDate() - 7); 
        break;
      case 3:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 15);
        break;
      case 4:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        throw new Error('Informe um período válido');
    }

    return filterTasksByDateRange(validTasks, startDate, now);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task, cardData, chartData, DashboardData, User } from '../shared/models';
import { map, Observable } from 'rxjs'
import { FormatDate } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  protected http = inject(HttpClient);

  getDashboardData(): Observable<DashboardData> {
    const currentDate = new Date().toLocaleDateString('pt-BR');

    /* visualização de tarefas atrasadas mediante status "em progresso". 
     * atualizar para considerar task.status !== 'concluida'
     */
    return this.http.get<Task[]>('/api/tasks').pipe(
      map(tasks => {
        const tarefasEmProgresso = tasks.filter(task => task.status === 'em_progresso');
        const tarefasAtrasadas = tarefasEmProgresso.filter(task => {
          const deadlineDate = new Date(task.deadline).toLocaleDateString('pt-BR');
          return deadlineDate < currentDate;
        });

        const cardData: cardData = {
          total_pendentes: tasks.filter(task => task.status === 'pendente').length,
          total_progresso: tarefasEmProgresso.length,
          total_atraso: tarefasAtrasadas.length,
          total_concluidas: tasks.filter(task => task.status === 'concluido').length
        };

        const chartData: chartData[] = tasks
        .filter(task => task.finish_date !== null && task.finish_date !== undefined)
        .map(task => ({
          data_conclusao: FormatDate(new Date(task.finish_date!)),
          nome: task.name
        }));

        return { cardData, chartData } as DashboardData;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users')
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task, cardData, chartData, DashboardData } from '../shared/models';
import { map, Observable } from 'rxjs'
import { FormatDate } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  protected http = inject(HttpClient);

  getCardData(): Observable<cardData> {
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
      return cardData as cardData
      })
    )
  }

  getChartData(filterOption: number): Observable<chartData[]> {
    return this.http.get<Task[]>('/api/tasks').pipe(
      map(tasks => {
        const validTasks = tasks.filter(task => task.finish_date !== null && task.finish_date !== undefined);
        if (!validTasks.length) {
          return [];
        }

        const now = new Date();
        let startDate: Date;

        switch (filterOption) {
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

        const filteredTasks = this._filterTasksByDateRange(validTasks, startDate, now);

        const chartData: chartData[] = filteredTasks.map(task => ({
          data_conclusao: FormatDate(new Date(task.finish_date!)),
          nome: task.name
        }));

        return chartData as chartData[];
      })
    );
  }

  private _filterTasksByDateRange(tasks: Task[], startDate: Date, endDate: Date): Task[] {
    return tasks.filter(task => {
      const finishDate = new Date(task.finish_date!); //non-null assertion
      return finishDate >= startDate && finishDate <= endDate;
    });
  }
}

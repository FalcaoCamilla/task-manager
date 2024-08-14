import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task, User } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {
  constructor() { }

  createDb() {
    const users: User[] = [
      {
        id: 1,
        name: 'Camilla Falcão',
        email: 'camilla.falcao@email.com'
      },
      {
        id: 2,
        name: 'Euclides Neto',
        email: 'euclides.neto@email.com'
      },
      {
        id: 3,
        name: 'Hugo Falcão',
        email: 'hugo.falcao@email.com'
      },
    ]
    const tasks: Task[] = [
      { 
        id: 1, 
        name: 'Documentação', 
        description: 'Documentar o projeto Task Manager', 
        status: 'concluido', 
        priority: 'media', 
        project: 'Task Manager', 
        responsible: Array(users[0]), 
        deadline: new Date(2024, 8, 12, 12, 0, 0),
        finish_date: new Date(2024, 8, 10, 12, 0, 0) 
      },
      { 
        id: 2, 
        name: 'Construção BD', 
        description: 'Criação do Banco de Dados para projeto', 
        status: 'concluido', 
        priority: 'media', 
        project: 'Task Manager', 
        responsible: Array(users[1]), 
        deadline: new Date(2024, 8, 13, 12, 0, 0), 
        finish_date: new Date(2024, 8, 11, 12, 0, 0) 
      },
      { 
        id: 3, 
        name: 'Elaboração de protótipo', 
        description: 'Elaboração de protótipo para etapa criativa do projeto', 
        status: 'concluido', 
        priority: 'alta', 
        project: 'Task Manager', 
        responsible: Array(users[2]), 
        deadline: new Date(2024, 8, 12, 12, 0, 0),
        finish_date: new Date(2024, 8, 11, 12, 0, 0) 
      },
      { 
        id: 4, 
        name: 'Deploy da aplicação', 
        description: 'Fazer deploy do projeto Task Manager', 
        status: 'concluido', 
        priority: 'baixa', 
        project: 'Task Manager', 
        responsible: Array(users[0], users[1]), 
        deadline: new Date(2024, 8, 12, 12, 0, 0),
        finish_date: new Date(2024, 8, 12, 12, 0, 0) 
      }, 
      { 
        id: 5, 
        name: 'Prova Técnica', 
        description: 'Elaboração do gestor de tarefas', 
        status: 'em_progresso', 
        priority: 'alta', 
        project: 'Task Manager', 
        responsible: Array(users[0]), 
        deadline: new Date(2024, 8, 13, 12, 0, 0)
      },
      { 
        id: 6, 
        name: 'Pesquisa Angular', 
        description: 'Estudar novos conceitos da versão LTS do Angular', 
        status: 'pendente', 
        priority: 'baixa', 
        project: '', 
        responsible: Array(users[1]), 
        deadline: new Date(2024, 8, 10, 12, 0, 0)
      },
    ]
    return { users, tasks}
  }
}

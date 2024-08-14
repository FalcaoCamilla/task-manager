import { User } from "./user"

export type Task = {
  id: number, 
  name: string, 
  description: string, 
  status: status, 
  priority: priority, 
  project: string, 
  responsible: User[], 
  deadline: Date, 
  file?: File, 
  finish_date?: Date | null
}

type status = 'concluido' | 'em_progresso' | 'pendente'

type priority = 'alta' | 'media' | 'baixa'
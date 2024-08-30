import { Task } from "../models";

export function filterTasksByDateRange(tasks: Task[], startDate: Date, endDate: Date): Task[] {
  return tasks.filter(task => {
    const finishDate = new Date(task.finish_date!); //non-null assertion
    return finishDate >= startDate && finishDate <= endDate;
  });
}
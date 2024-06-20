import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CONTEXT_PATH, URL_BASE } from '../common/constants';
import { Task } from '../models/tasks_models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  protected readonly httpClient = inject(HttpClient);

  private readonly URL = `${URL_BASE}${CONTEXT_PATH}task/`;

  getTaskOfBoard(idBoard: number) {
    return this.httpClient.get(`${this.URL}all/${idBoard}`);
  }

  getTaskById(idTask: number) {
    return this.httpClient.get(`${this.URL}${idTask}`);
  }

  save(task: Task) {
    return this.httpClient.post(this.URL + 'save', task);
  }

  delete(idTask: number) {
    return this.httpClient.delete(`${this.URL}delete/${idTask}`);
  }
}

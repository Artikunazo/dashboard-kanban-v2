import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CONTEXT_PATH, URL_BASE } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {

  protected readonly httpClient = inject(HttpClient);

  private readonly URL = `${URL_BASE}${CONTEXT_PATH}subtask/`;

  getSubtaskByIdTask(idTask: number) {
    return this.httpClient.get(`${this.URL}all/${idTask}`);
  }

  save(subtask: SubtaskService) {
    return this.httpClient.post(`${this.URL}save`, subtask);
  }

  delete(idSubtask: number) {
    return this.httpClient.delete(`${this.URL}delete/${idSubtask}`);
  }

}

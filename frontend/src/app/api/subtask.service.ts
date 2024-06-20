import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CONTEXT_PATH, URL_BASE } from '../common/constants';
import { Subtask } from '../models/subtask_models';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {

  protected readonly httpClient = inject(HttpClient);

  private readonly URL = `${URL_BASE}${CONTEXT_PATH}subtask/`;

  getSubtaskByIdTask(idTask: number): Observable<Subtask[]> {
    return this.httpClient.get<Subtask[]>(`${this.URL}all/${idTask}`);
  }

  save(subtask: SubtaskService): Observable<Subtask> {
    return this.httpClient.post<Subtask>(`${this.URL}save`, subtask);
  }

  delete(idSubtask: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL}delete/${idSubtask}`);
  }

}

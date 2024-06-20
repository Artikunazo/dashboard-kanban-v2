import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CONTEXT_PATH, URL_BASE } from '../common/constants';
import { Status } from '../models/status_models';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  protected readonly httpClient = inject(HttpClient);

  private readonly URL = `${URL_BASE}${CONTEXT_PATH}status/`;

  getAllStatus(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(this.URL);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CONTEXT_PATH, URL_BASE } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  protected readonly httpClient = inject(HttpClient);

  private readonly URL = `${URL_BASE}${CONTEXT_PATH}status/`;

  getAllStatus() {
    return this.httpClient.get(this.URL);
  }
}

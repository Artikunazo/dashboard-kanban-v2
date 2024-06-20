import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CONTEXT_PATH, URL_BASE } from '../common/constants';
import { Board } from '../models/board_models';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  protected readonly httpClient = inject(HttpClient);

  private readonly URL = `${URL_BASE}${CONTEXT_PATH}board/`;

  healthCheck() {
    return this.httpClient.get(`${this.URL}health-check`);
  }

  root() {
    return this.httpClient.get(this.URL);
  }

  save(board: Board) {
    return this.httpClient.post(this.URL + 'save', board);
  }

  delete(boardId: number) {
    return this.httpClient.delete(`${this.URL}delete/${boardId}`);
  }


}

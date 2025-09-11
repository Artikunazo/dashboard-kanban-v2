import { HttpClient } from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {CONTEXT_PATH, URL_BASE} from '../common/constants';
import {ApiBoard} from '../models/board_models';

@Injectable({
	providedIn: 'root',
})
export class BoardService {
	protected readonly httpClient = inject(HttpClient);

	private readonly URL = `${URL_BASE}${CONTEXT_PATH}board/`;

	// healthCheck() {
	//   return this.httpClient.get(`${this.URL}health-check`);
	// }

	getBoards(): Observable<ApiBoard[]> {
		return this.httpClient.get<ApiBoard[]>(this.URL);
	}

	save(board: {title: string}): Observable<ApiBoard> {
		return this.httpClient.post<ApiBoard>(this.URL + 'save', board);
	}

	update(board: ApiBoard): Observable<number> {
		return this.httpClient.post<number>(this.URL + 'update', board);
	}

	delete(boardId: number | string): Observable<any> {
		return this.httpClient.delete<any>(`${this.URL}delete/${boardId}`);
	}
}

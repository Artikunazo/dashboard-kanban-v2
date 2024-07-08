import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {CONTEXT_PATH, URL_BASE} from '../common/constants';
import {ApiTask, ApiTaskOverwivew} from '../models/tasks_models';

@Injectable({
	providedIn: 'root',
})
export class TaskService {
	protected readonly httpClient = inject(HttpClient);

	private readonly URL = `${URL_BASE}${CONTEXT_PATH}task/`;

	getTasksByBoard(idBoard: number): Observable<ApiTaskOverwivew[]> {
		return this.httpClient.get<ApiTaskOverwivew[]>(`${this.URL}all/${idBoard}`);
	}

	getTaskById(idTask: number): Observable<ApiTask> {
		return this.httpClient.get<ApiTask>(`${this.URL}${idTask}`);
	}

	save(task: ApiTask): Observable<ApiTask> {
		return this.httpClient.post<ApiTask>(this.URL + 'save', task);
	}

	delete(idTask: number): Observable<any> {
		return this.httpClient.delete<any>(`${this.URL}delete/${idTask}`);
	}
}

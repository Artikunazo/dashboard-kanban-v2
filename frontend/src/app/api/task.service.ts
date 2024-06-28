import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {CONTEXT_PATH, URL_BASE} from '../common/constants';
import {ApiTask, Task} from '../models/tasks_models';

@Injectable({
	providedIn: 'root',
})
export class TaskService {
	protected readonly httpClient = inject(HttpClient);

	private readonly URL = `${URL_BASE}${CONTEXT_PATH}task/`;

	getTasksByBoard(idBoard: number): Observable<Task[]> {
		return this.httpClient.get<Task[]>(`${this.URL}all/${idBoard}`);
	}

	getTaskById(idTask: number): Observable<ApiTask> {
		return this.httpClient.get<ApiTask>(`${this.URL}${idTask}`);
	}

	save(task: Task): Observable<Task> {
		return this.httpClient.post<Task>(this.URL + 'save', task);
	}

	delete(idTask: number): Observable<any> {
		return this.httpClient.delete<any>(`${this.URL}delete/${idTask}`);
	}
}

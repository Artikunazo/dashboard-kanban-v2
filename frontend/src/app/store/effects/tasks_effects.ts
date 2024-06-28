import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {TaskService} from '../../api/task.service';
import {ApiTaskToTask} from '../../converters/task_converter';
import {ApiTask, Task} from '../../models/tasks_models';
import * as fromTasksAction from '../actions/tasks_actions';
import * as fromTasksActions from '../actions/tasks_actions';

@Injectable({
	providedIn: 'root',
})
export class TasksEffects {
	constructor(
		private actions$: Actions,
		private readonly taskService: TaskService,
	) {}

	protected readonly tasksActionsTypes = fromTasksAction.TasksActionType;

	loadTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.LOAD_TASK),
			mergeMap((idTask: number) =>
				this.taskService.getTaskById(idTask).pipe(
					map((response: ApiTask) => {
						// @ToDo: parse from base64 to string
						const task: Task = ApiTaskToTask(response);
						return new fromTasksAction.LoadTaskSuccess(task);
					}),
					catchError((error: any) => {
						return of(new fromTasksAction.LoadTaskFail(error));
					}),
				),
			),
		);
	});

	saveTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.ADD_TASK),
			mergeMap((data: Task) => {
				return this.taskService.save(data).pipe(
					map((dataResponse: Task) => {
						return new fromTasksAction.SaveTaskSuccess(dataResponse);
					}),
					catchError((error: any) => {
						return of(new fromTasksAction.SaveTaskFail(error));
					}),
				);
			}),
		);
	});

	// saveTaskUpdated$: Observable<Action> = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(this.tasksActionsTypes.UPDATE_TASK),
	// 		mergeMap((data: fromTasksActions.UpdateTask) => {
	// 			this.taskService.updateAndSave(data.payload);
	// 			return of(
	// 				new fromTasksAction.UpdateTasksSuccess({
	// 					id: data.payload.id,
	// 					changes: {...data.payload},
	// 				}),
	// 			);
	// 		}),
	// 	);
	// });

	deleteTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.DELETE_TASK),
			mergeMap((data: fromTasksActions.DeleteTask) => {
				return this.taskService.delete(data.payload).pipe(
					map((dataResponse: any) => {
						return new fromTasksAction.DeleteTaskSuccess(dataResponse);
					}),
					catchError((error: any) => {
						return of(new fromTasksAction.DeleteTaskFail(error));
					}),
				);
			}),
		);
	});
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {TaskService} from '../../api/task.service';
import {
	ApiTaskToTask,
	ApiTasksOverviewToTasksOverview,
	taskToApiTask,
} from '../../converters/task_converter';
import {
	ApiTask,
	ApiTaskOverwivew,
	Task,
	TaskOverview,
} from '../../models/tasks_models';
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

	// @Todo: loadTasksByBoard$:

	loadTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.LOAD_TASK),
			mergeMap((loadTaskData: fromTasksActions.LoadTask) =>
				this.taskService.getTaskById(loadTaskData.payload).pipe(
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

	loadTasksByBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.LOAD_TASKS_BY_BOARD),
			mergeMap((action: fromTasksActions.LoadTasksByBoard) => {
				return this.taskService.getTasksByBoard(action.payload).pipe(
					map((response: ApiTaskOverwivew[]) => {
						const tasksOverview: TaskOverview[] =
							ApiTasksOverviewToTasksOverview(response);
						return new fromTasksAction.LoadTasksByBoardSuccess(tasksOverview);
					}),
					catchError((error: any) => {
						return of(new fromTasksAction.LoadTasksByBoardFail(error));
					}),
				);
			}),
		);
	});

	saveTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.ADD_TASK),
			mergeMap((data: fromTasksActions.AddTask) => {
				const apiTask: ApiTask = taskToApiTask(data.payload);
				return this.taskService.save(apiTask).pipe(
					map((dataResponse: ApiTask) => {
						const task: Task = ApiTaskToTask(dataResponse);
						return new fromTasksAction.SaveTaskSuccess(task);
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

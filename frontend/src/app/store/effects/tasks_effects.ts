import {Injectable, inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {TaskService} from 'src/app/api/task.service';
import {
	ApiTaskToTask,
	apiTasksToTasks,
	taskToApiTask,
	taskWithNewStatusToApiTask,
} from 'src/app/converters/task_converter';
import {ApiTask, Task} from 'src/app/models/tasks_models';
import * as fromTasksAction from '../actions/tasks_actions';
import * as fromTasksActions from '../actions/tasks_actions';

@Injectable({
	providedIn: 'root',
})
export class TasksEffects {
	private actions$ = inject(Actions);
	private readonly taskService = inject(TaskService);

	protected readonly tasksActionsTypes = fromTasksAction.TasksActionType;

	// loadTask$: Observable<Action> = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(this.tasksActionsTypes.LOAD_TASK),
	// 		mergeMap((loadTaskData: fromTasksActions.LoadTask) =>
	// 			this.taskService.getTaskById(+loadTaskData.payload).pipe(
	// 				map((response: ApiTask) => {
	// 					// @ToDo: parse from base64 to string (apply in V3)
	// 					const task: Task = ApiTaskToTask(response);
	// 					return new fromTasksAction.LoadTaskSuccess(task);
	// 				}),
	// 				catchError((error: any) => {
	// 					return of(new fromTasksAction.LoadTaskFail(error));
	// 				}),
	// 			),
	// 		),
	// 	);
	// });

	loadTasksByBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.LOAD_TASKS_BY_BOARD),
			mergeMap((action: fromTasksActions.LoadTasksByBoard) => {
				return this.taskService.getTasksByBoard(action.payload).pipe(
					map((response: ApiTask[]) => {
						const tasks: Task[] = apiTasksToTasks(response);
						return new fromTasksAction.LoadTasksByBoardSuccess(tasks);
					}),
					catchError((error: any) => {
						return of(new fromTasksAction.LoadTasksByBoardFail(error));
					}),
				);
			}),
		);
	});

	addTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.ADD_TASK),
			mergeMap((data: fromTasksActions.AddTask) => {
				const apiTask: ApiTask = taskToApiTask(data.payload);
				return this.taskService.add(apiTask).pipe(
					map((dataResponse: ApiTask) => {
						const task: Task = ApiTaskToTask({
							...dataResponse,
							statusName: data.payload.status,
						});
						return new fromTasksAction.AddTaskSuccess(task);
					}),
					catchError((error: any) => {
						return of(new fromTasksAction.AddTaskFail(error));
					}),
				);
			}),
		);
	});

	updateTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.UPDATE_TASK),
			mergeMap((data: fromTasksActions.UpdateTask) => {
				const apiTask: ApiTask = taskToApiTask(data.payload);
				return this.taskService.update(apiTask).pipe(
					map((apiTaskUpdated: boolean) => {
						return new fromTasksAction.UpdateTasksSuccess({
							id: +data.payload.id,
							changes: {...data.payload},
						});
					}),
					catchError((error) => {
						return of(new fromTasksAction.UpdateTasksFail(error));
					}),
				);
			}),
		);
	});

	deleteTask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.DELETE_TASK),
			mergeMap((data: fromTasksActions.DeleteTask) => {
				return this.taskService.delete(data.payload).pipe(
					map(() => {
						return new fromTasksAction.DeleteTaskSuccess(data.payload);
					}),
					catchError((error: any) => {
						return of(new fromTasksAction.DeleteTaskFail(error));
					}),
				);
			}),
		);
	});

	updateTaskStatus$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.tasksActionsTypes.UPDATE_TASK_STATUS),
			mergeMap((data: fromTasksActions.UpdateStatusTask) => {
				const apiTask = taskWithNewStatusToApiTask(data.payload);
				return this.taskService.updateStatus(apiTask).pipe(
					map((apiTaskUpdated: boolean) => {
						return new fromTasksAction.UpdateStatusTaskSuccess({
							id: +data.payload.task.id,
							changes: {...data.payload},
						});
					}),
					catchError((error) => {
						return of(new fromTasksAction.UpdateStatusTaskFail(error));
					}),
				);
			}),
		);
	});
}

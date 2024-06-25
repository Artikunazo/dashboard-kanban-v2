import {Update} from '@ngrx/entity';
import {Action} from '@ngrx/store';
import {Task} from '../../models/tasks_models';

export enum TasksActionType {
	LOAD_TASK = '[Task] Load Task',
	LOAD_TASK_SUCCESS = '[Task] Load Task Success',
	LOAD_TASK_FAIL = '[Task] Load Task Fail',

	ADD_TASK = '[Task] Add task',
	ADD_TASK_SUCCESS = '[Task] Add task success',
	ADD_TASK_FAIL = '[Task] Add Task Fail',

	UPDATE_TASK = '[Task] Update task',
	UPDATE_TASK_SUCCESS = '[Task] Update Task Success',
	UPDATE_TASK_FAIL = '[Task] Update Task Fail',

	DELETE_TASK = '[Task] Delete Task',
	DELETE_TASK_SUCCESS = '[Task] Delete Task Success',
	DELETE_TASK_FAIL = '[Task] Delete Task Fail',

	SAVE_TASK = '[Task] Save Task',
	SAVE_TASK_SUCCESS = '[Task] Save Task Success',
	SAVE_TASK_FAIL = '[Task] Save Task Fail',
}

// LOAD
export class LoadTask implements Action {
	readonly type = TasksActionType.LOAD_TASK;
}

export class LoadTaskSuccess implements Action {
	readonly type = TasksActionType.LOAD_TASK_SUCCESS;

	constructor(public payload: Task) {}
}

export class LoadTaskFail implements Action {
	readonly type = TasksActionType.LOAD_TASK_FAIL;

	constructor(public payload: string) {}
}

// ADD
export class AddTask implements Action {
	readonly type = TasksActionType.ADD_TASK;

	constructor(public payload: Task) {}
}

export class AddTaskSuccess implements Action {
	readonly type = TasksActionType.ADD_TASK_SUCCESS;

	constructor(public payload: Task) {}
}

export class AddTaskFail implements Action {
	readonly type = TasksActionType.ADD_TASK_FAIL;

	constructor(public payload: string) {}
}

// UPDATE
export class UpdateTask implements Action {
	readonly type = TasksActionType.UPDATE_TASK;

	constructor(public payload: Task) {}
}

export class UpdateTasksSuccess implements Action {
	readonly type = TasksActionType.UPDATE_TASK_SUCCESS;

	constructor(public payload: Update<Task>) {}
}

export class UpdateTasksFail implements Action {
	readonly type = TasksActionType.UPDATE_TASK_FAIL;

	constructor(public payload: string) {}
}

// DELETE
export class DeleteTask implements Action {
	readonly type = TasksActionType.DELETE_TASK;

	constructor(public payload: number) {}
}

export class DeleteTaskSuccess implements Action {
	readonly type = TasksActionType.DELETE_TASK_SUCCESS;

	constructor(public payload: number) {}
}

export class DeleteTaskFail implements Action {
	readonly type = TasksActionType.DELETE_TASK_FAIL;

	constructor(public payload: any) {}
}

// SAVE
export class SaveTask implements Action {
	readonly type = TasksActionType.SAVE_TASK;

	constructor(public payload: Task) {}
}

export class SaveTaskSuccess implements Action {
	readonly type = TasksActionType.SAVE_TASK_SUCCESS;

	constructor(public payload: Task) {}
}

export class SaveTaskFail implements Action {
	readonly type = TasksActionType.SAVE_TASK_FAIL;

	constructor(public payload: any) {}
}

export type TasksActions =
	| LoadTask
	| LoadTaskSuccess
	| LoadTaskFail
	| AddTask
	| AddTaskSuccess
	| AddTaskFail
	| UpdateTask
	| UpdateTasksSuccess
	| UpdateTasksFail
	| DeleteTask
	| DeleteTaskSuccess
	| DeleteTaskFail
	| SaveTask
	| SaveTaskSuccess
	| SaveTaskFail;

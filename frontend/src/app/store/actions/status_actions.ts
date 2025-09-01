import {Action} from '@ngrx/store';
import {Status} from 'src/app/models/status_models';

export enum StatusActionType {
	LOAD_STATUSES = '[Status] Load Statuses',
	LOAD_STATUSES_SUCCESS = '[Status] Load Statuses Success',
	LOAD_STATUSES_FAIL = '[Status] Load Statuses Fail',
}

export class LoadStatuses implements Action {
	readonly type = StatusActionType.LOAD_STATUSES;
}

export class LoadStatusesSuccess implements Action {
	readonly type = StatusActionType.LOAD_STATUSES_SUCCESS;

	constructor(public payload: Status[]) {}
}

export class LoadStatusesFail implements Action {
	readonly type = StatusActionType.LOAD_STATUSES_FAIL;

	constructor(public payload: any) {}
}

export type StatusActions =
	| LoadStatuses
	| LoadStatusesSuccess
	| LoadStatusesFail;

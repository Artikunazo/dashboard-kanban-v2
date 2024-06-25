import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {SubtaskService} from '../../api/subtask.service';
import {Subtask} from '../../models/subtask_models';
import * as fromSubtaskActions from '../actions/subtask_actions';

@Injectable({
	providedIn: 'root',
})
export class SubtaskEffects {
	protected readonly subtaskActionType = fromSubtaskActions.SubtaskActionType;

	constructor(
		private actions$: Actions,
		private readonly subtaskService: SubtaskService,
	) {}

	loadSubtasks$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.subtaskActionType.LOAD_SUBTASKS),
			mergeMap((idTask: number) => {
				return this.subtaskService.getSubtaskByIdTask(idTask).pipe(
					map((subtasks: Subtask[]) => {
						return new fromSubtaskActions.LoadSubtasksSuccess(subtasks);
					}),
					catchError((error: any) => {
						return of(new fromSubtaskActions.LoadSubtasksFail(error));
					}),
				);
			}),
		);
	});

	saveSubtask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.subtaskActionType.SAVE_SUBTASK),
			mergeMap((subtask: Subtask) => {
				return this.subtaskService.save(subtask).pipe(
					map((subtaskSaved: Subtask) => {
						return new fromSubtaskActions.SaveSubtaskSuccess({
							id: subtaskSaved.subtaskId ?? 0,
							changes: {...subtaskSaved},
						});
					}),
					catchError((error: any) => {
						return of(new fromSubtaskActions.SaveSubtaskFail(error));
					}),
				);
			}),
		);
	});

	deleteSubtask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.subtaskActionType.DELETE_SUBTASK),
			mergeMap((idSubtask: number) => {
				return this.subtaskService.delete(idSubtask).pipe(
					map(() => {
						return new fromSubtaskActions.DeleteSubtaskSuccess(idSubtask);
					}),
					catchError((error: any) => {
						return of(new fromSubtaskActions.DeleteSubtaskFail(error));
					}),
				);
			}),
		);
	});
}

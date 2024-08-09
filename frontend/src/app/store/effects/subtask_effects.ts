import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap, Observable, of} from 'rxjs';
import {SubtaskService} from 'src/app/api/subtask.service';
import {
	apiSubtasksToSubtasks,
	subtaskToApiSubtask,
} from 'src/app/converters/subtask_converters';
import {ApiSubtask, Subtask} from 'src/app/models/subtask_models';
import * as fromStore from 'src/app/store';
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
			mergeMap((data: fromStore.LoadSubtasks) => {
				return this.subtaskService.getSubtaskByIdTask(data.payload).pipe(
					map((apiSubtasks: ApiSubtask[]) => {
						const subtasks: Subtask[] = apiSubtasksToSubtasks(apiSubtasks);
						return new fromSubtaskActions.LoadSubtasksSuccess(subtasks);
					}),
					catchError((error: any) => {
						return of(new fromSubtaskActions.LoadSubtasksFail(error));
					}),
				);
			}),
		);
	});

	addSubtask$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.subtaskActionType.ADD_SUBTASK),
			mergeMap((data: fromStore.AddSubtask) => {
				const apiSubtask: ApiSubtask = subtaskToApiSubtask(data.payload);
				return this.subtaskService.save(apiSubtask).pipe(
					map(() => {
						return new fromSubtaskActions.AddSubtaskSuccess(data.payload);
					}),
					catchError((error) => {
						return of(new fromSubtaskActions.AddSubtaskFail(error));
					}),
				);
			}),
		);
	});

	// saveSubtask$: Observable<Action> = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(this.subtaskActionType.SAVE_SUBTASK),
	// 		mergeMap((data: fromStore.SaveSubtask) => {
	// 			return this.subtaskService.save(data.payload).pipe(
	// 				map((subtaskSaved: Subtask) => {
	// 					return new fromSubtaskActions.SaveSubtaskSuccess({
	// 						id: subtaskSaved.id ?? 0,
	// 						changes: {...subtaskSaved},
	// 					});
	// 				}),
	// 				catchError((error: any) => {
	// 					return of(new fromSubtaskActions.SaveSubtaskFail(error));
	// 				}),
	// 			);
	// 		}),
	// 	);
	// });

	// deleteSubtask$: Observable<Action> = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(this.subtaskActionType.DELETE_SUBTASK),
	// 		mergeMap((idSubtask: number) => {
	// 			return this.subtaskService.delete(idSubtask).pipe(
	// 				map(() => {
	// 					return new fromSubtaskActions.DeleteSubtaskSuccess(idSubtask);
	// 				}),
	// 				catchError((error: any) => {
	// 					return of(new fromSubtaskActions.DeleteSubtaskFail(error));
	// 				}),
	// 			);
	// 		}),
	// 	);
	// });

	// updateSubtask$: Observable<Action> = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(this.subtaskActionType.UPDATE_SUBTASK),
	// 		mergeMap((subtask: fromStore.UpdateSubtask) => {
	// 			const apiSubtask = subtasktoApiSubtask(subtask.payload);
	// 			return this.subtaskService.update(apiSubtask).pipe(
	// 				map((apiSubtask: ApiSubtask) => {
	// 					const subtask = apiSubtaskToSubtask(apiSubtask);
	// 					return new fromStore.UpdateSubtaskSuccess({
	// 						id: subtask.id ?? 0,
	// 						changes: {...subtask},
	// 					});
	// 				}),
	// 				catchError((error) => {
	// 					return of(new fromStore.UpdateSubtaskFail(error));
	// 				}),
	// 			);
	// 		}),
	// 	);
	// });
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {StatusService} from 'src/app/api/status.service';
import {Status} from 'src/app/models/status_models';
import * as fromStatusActions from '../actions/status_actions';

@Injectable({
	providedIn: 'root',
})
export class StatusEffects {
	protected readonly statusActions = fromStatusActions.StatusActionType;

	constructor(
		private actions$: Actions,
		private readonly statusService: StatusService,
	) {}

	LoadStatuses$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.statusActions.LOAD_STATUSES),
			mergeMap(() => {
				return this.statusService.getAllStatus().pipe(
					map((statuses: Status[]) => {
						return new fromStatusActions.LoadStatusesSuccess(statuses);
					}),
					catchError((error: any) => {
						return of(new fromStatusActions.LoadStatusesFail(error));
					}),
				);
			}),
		);
	});
}

import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromThemeActions from '../actions/theme_actions';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ThemeDataService } from 'src/app/services/theme-data.service';

@Injectable({
	providedIn: 'root',
})
export class ThemeEffects {
	constructor(private actions$: Actions) {}

	private readonly dataService = inject(ThemeDataService);

	protected readonly themeActionsTypes = fromThemeActions.ThemeActionTypes;

	loadTheme$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.themeActionsTypes.LOAD_THEME),
			mergeMap(() =>
				this.dataService.getTheme().pipe(
					map((response: string | null) => {
						return new fromThemeActions.LoadThemeSuccess(response ?? 'ligth');
					}),
					catchError((error: any) => {
						return of(new fromThemeActions.LoadThemeFail(error));
					}),
				),
			),
		);
	});

	saveTheme$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.themeActionsTypes.SAVE_THEME),
			mergeMap((data: fromThemeActions.SaveThemeSuccess) => {
				this.dataService.saveTheme(data.payload);
				return of(new fromThemeActions.SaveThemeSuccess(data.payload));
			}),
		);
	});
}

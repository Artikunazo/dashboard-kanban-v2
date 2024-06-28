import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import * as fromThemeActions from '../actions/theme_actions';

@Injectable({
	providedIn: 'root',
})
export class ThemeEffects {
	constructor(
		private actions$: Actions,
	) // private readonly dataService: DataService,
	{}

	protected readonly themeActionsTypes = fromThemeActions.ThemeActionTypes;

	// loadTheme$: Observable<Action> = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(this.themeActionsTypes.LOAD_THEME),
	// 		mergeMap(() =>
	// 			this.dataService.getTheme().pipe(
	// 				map((response: string | null) => {
	// 					return new fromThemeActions.LoadThemeSuccess(response ?? 'ligth');
	// 				}),
	// 				catchError((error: any) => {
	// 					return of(new fromThemeActions.LoadThemeFail(error));
	// 				}),
	// 			),
	// 		),
	// 	);
	// });

	// saveTheme$: Observable<Action> = createEffect(() => {
	// 	return this.actions$.pipe(
	// 		ofType(this.themeActionsTypes.SAVE_THEME),
	// 		mergeMap((data: fromThemeActions.SaveThemeSuccess) => {
	// 			this.dataService.saveTheme(data.payload);
	// 			return of(new fromThemeActions.SaveThemeSuccess(data.payload));
	// 		}),
	// 	);
	// });
}

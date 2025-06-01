import { provideHttpClient } from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState, provideStore} from '@ngrx/store';

import {provideStoreDevtools} from '@ngrx/store-devtools';
import {routes} from './app.routes';
import {effects} from './store';
import * as fromBoardReducer from './store/reducers/board_reducers';
import * as fromStatusReducer from './store/reducers/status_reducers';
import * as fromSubtaskReducer from './store/reducers/subtask_reducers';
import * as fromTasksReducer from './store/reducers/tasks_reducer';
import * as fromThemeReducer from './store/reducers/theme_reducer';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimationsAsync(),
		provideEffects(effects),
		provideStore(),
		provideStoreDevtools(),
		provideState({name: 'tasks', reducer: fromTasksReducer.reducer}),
		provideState({name: 'theme', reducer: fromThemeReducer.reducer}),
		provideState({name: 'board', reducer: fromBoardReducer.reducer}),
		provideState({name: 'status', reducer: fromStatusReducer.reducer}),
		provideState({name: 'subtask', reducer: fromSubtaskReducer.reducer}),
		provideAnimationsAsync(),
		provideHttpClient(),
		provideZoneChangeDetection({
			eventCoalescing: true,
		}),
	],
};

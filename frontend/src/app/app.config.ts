import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';

import {routes} from './app.routes';
import {effects} from './store';
import * as fromTasksReducer from './store/reducers/tasks_reducer';
import * as fromThemeReducer from './store/reducers/theme_reducer';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimationsAsync(),
		provideEffects(effects),
		provideStore(),
		provideState({name: 'tasks', reducer: fromTasksReducer.reducer}),
		provideState({name: 'theme', reducer: fromThemeReducer.reducer}),
		provideStoreDevtools(),
		provideAnimationsAsync(),
		provideHttpClient(),
	],
};

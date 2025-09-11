import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromThemeReducer from '../reducers/theme_reducer';

export const getThemeState =
	createFeatureSelector<fromThemeReducer.ThemeState>('theme');

export const getTheme = createSelector(
	getThemeState,
	fromThemeReducer.getTheme,
);

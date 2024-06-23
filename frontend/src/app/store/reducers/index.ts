import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';
import * as fromBoardReducer from './board_reducers';
import * as fromStatusReducer from './status_reducers';
import * as fromTasksReducer from './tasks_reducer';
import * as fromThemeReducer from './theme_reducer';

export interface AppState {
	tasks: fromTasksReducer.TasksState;
	theme: fromThemeReducer.ThemeState;
	board: fromBoardReducer.BoardState;
	status: fromStatusReducer.StatusState;
}

export const reducers: ActionReducerMap<AppState, any> = {
	tasks: fromTasksReducer.reducer,
	theme: fromThemeReducer.reducer,
	board: fromBoardReducer.reducer,
	status: fromStatusReducer.reducer,
};

/* BOARD */
export const getBoardState =
	createFeatureSelector<fromBoardReducer.BoardState>('board');
export const getEntities = createSelector(
	getBoardState,
	fromBoardReducer.selectEntities,
);
export const getBoardsData = createSelector(
	getBoardState,
	fromBoardReducer.getBoardsData,
);
export const getBoardById = (idBoard: number) =>
	createSelector(getBoardState, (entities: any) => entities[idBoard]);
export const getBoardIsLoading = createSelector(
	getBoardState,
	fromBoardReducer.getBoardIsLoading,
);
export const getBoardError = createSelector(
	getBoardState,
	fromBoardReducer.getBoardError,
);

/* TASKS */
export const getTasksState =
	createFeatureSelector<fromTasksReducer.TasksState>('tasks');

export const getTasksData = createSelector(
	getTasksState,
	fromTasksReducer.getTasksData,
);

export const getTasksSelectors = fromTasksReducer.taskAdapter.getSelectors();

export const getTasks = createSelector(
	getTasksState,
	getTasksSelectors.selectAll,
);

/* THEME */
export const getThemeState =
	createFeatureSelector<fromThemeReducer.ThemeState>('theme');

export const getTheme = createSelector(
	getThemeState,
	fromThemeReducer.getTheme,
);

import {ActionReducerMap} from '@ngrx/store';
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

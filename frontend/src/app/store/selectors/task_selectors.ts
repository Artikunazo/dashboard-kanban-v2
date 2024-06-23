import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTasksReducer from '../reducers/tasks_reducer';

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

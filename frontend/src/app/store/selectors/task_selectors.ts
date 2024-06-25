import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTasksReducer from '../reducers/tasks_reducer';

/* TASKS */

export const getTasksState =
	createFeatureSelector<fromTasksReducer.TasksState>('tasks');

export const getTasksData = createSelector(
	getTasksState,
	fromTasksReducer.getTaskData,
);

export const getTasksSelectors = fromTasksReducer.taskAdapter.getSelectors();

export const getTasks = createSelector(
	getTasksState,
	getTasksSelectors.selectAll,
);

export const selectTaskById = (idTask: number) =>
	createSelector(getTasksState, (entries: any) => entries[idTask]);

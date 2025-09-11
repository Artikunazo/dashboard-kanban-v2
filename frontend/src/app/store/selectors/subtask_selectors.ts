import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromSubtaskReducer from '../reducers/subtask_reducers';

export const selectSubtaskState =
	createFeatureSelector<fromSubtaskReducer.SubtaskState>('subtask');

export const selectSubtasksByIdTask = (idTask: number) =>
	createSelector(selectSubtaskState, (entities: any) => entities[idTask]);

export const selectSubtaskError = createSelector(
	selectSubtaskState,
	fromSubtaskReducer.getSubtaskError,
);

export const selectSubtasks = createSelector(
	selectSubtaskState,
	fromSubtaskReducer.selectAll,
);

import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromStatusReducer from '../reducers/status_reducers';

export const selectStatusState =
	createFeatureSelector<fromStatusReducer.StatusState>('status');

export const selectStatusData = createSelector(
	selectStatusState,
	fromStatusReducer.getStatuses,
);

export const selectStatusError = createSelector(
	selectStatusState,
	fromStatusReducer.getStatusError,
);

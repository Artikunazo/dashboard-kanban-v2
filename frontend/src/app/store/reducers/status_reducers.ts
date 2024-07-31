import {Status} from 'src/app/models/status_models';
import * as fromStatusActions from '../actions/status_actions';

export interface StatusState {
	status: Status[];
	isLoading: boolean;
	error: string;
}

export const initialState: StatusState = {
	status: [],
	isLoading: false,
	error: '',
};

export function reducer(
	state: StatusState = initialState,
	action: fromStatusActions.StatusActions,
) {
	const statusActionType = fromStatusActions.StatusActionType;

	switch (action.type) {
		case statusActionType.LOAD_STATUSES: {
			return {...state, isLoading: true, error: ''};
		}

		case statusActionType.LOAD_STATUSES_SUCCESS: {
			return {
				...state,
				status: action.payload,
				isLoading: false,
				error: '',
			};
		}

		case statusActionType.LOAD_STATUSES_FAIL: {
			return {
				...state,
				status: [],
				isLoading: false,
				error: action.payload,
			};
		}

		default: {
			return {...state};
		}
	}
}

export const getStatuses = (state: StatusState) => state.status;
export const getStatusError = (state: StatusState) => state.error;
export const getStatusIsLoading = (state: StatusState) => state.isLoading;

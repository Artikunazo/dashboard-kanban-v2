import {Status} from 'src/app/models/status_models';
import * as fromStatusActions from '../actions/status_actions';

export interface StatusState {
	status: Status[];
	error: string;
}

export const initialState: StatusState = {
	status: [],
	error: '',
};

export function reducer(
	state: StatusState = initialState,
	action: fromStatusActions.StatusActions,
) {
	const statusActionType = fromStatusActions.StatusActionType;

	switch (action.type) {
		case statusActionType.LOAD_STATUSES_SUCCESS: {
			return {
				...state,
				status: action.payload,
				error: '',
			};
		}

		case statusActionType.LOAD_STATUSES_FAIL: {
			return {
				...state,
				status: [],
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

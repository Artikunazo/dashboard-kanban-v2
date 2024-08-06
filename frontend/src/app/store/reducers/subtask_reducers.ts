import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Subtask} from 'src/app/models/subtask_models';
import * as fromSubtaskActions from '../actions/subtask_actions';

export interface SubtaskState extends EntityState<Subtask> {
	data: Subtask[];
	isLoading: boolean; //@ToDo: Delete this
	error: any;
}

export const subtaskAdapter = createEntityAdapter<Subtask>({
	selectId: (subtask: Subtask) => subtask.id ?? 0,
});

export const initialState: SubtaskState = subtaskAdapter.getInitialState({
	data: [],
	isLoading: false,
	error: null,
});

export function reducer(
	state = initialState,
	action: fromSubtaskActions.SubtaskActions,
): SubtaskState {
	const subtaskActionType = fromSubtaskActions.SubtaskActionType;

	switch (action.type) {
		case subtaskActionType.LOAD_SUBTASKS: {
			return {
				...state,
				isLoading: true,
			};
		}

		case subtaskActionType.LOAD_SUBTASKS_SUCCESS: {
			return subtaskAdapter.setAll(action.payload, {
				...state,
				isLoading: false,
			});
		}

		case subtaskActionType.LOAD_SUBTASKS_FAIL: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}

		case subtaskActionType.SAVE_SUBTASK: {
			return {
				...state,
				isLoading: true,
			};
		}

		case subtaskActionType.SAVE_SUBTASK_SUCCESS: {
			return subtaskAdapter.updateOne(action.payload, {
				...state,
				isLoading: false,
			});
		}

		case subtaskActionType.SAVE_SUBTASK_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}

		case subtaskActionType.DELETE_SUBTASK: {
			return {
				...state,
				isLoading: true,
			};
		}
		case subtaskActionType.DELETE_SUBTASK_SUCCESS: {
			return subtaskAdapter.removeOne(action.payload, {
				...state,
				isLoading: false,
			});
		}

		case subtaskActionType.DELETE_SUBTASK_FAIL: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}

		case subtaskActionType.UPDATE_SUBTASK_SUCCESS: {
			return subtaskAdapter.updateOne(action.payload, {
				...state,
				isLoading: false,
			});
		}

		case subtaskActionType.UPDATE_SUBTASK_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}

		default: {
			return {...state};
		}
	}
}

export const getSubtaskEntities = (state: SubtaskState) => state.entities;
export const getSubtaskIsLoading = (state: SubtaskState) => state.isLoading;
export const getSubtaskError = (state: SubtaskState) => state.error;
export const {selectEntities, selectAll, selectIds, selectTotal} =
	subtaskAdapter.getSelectors();

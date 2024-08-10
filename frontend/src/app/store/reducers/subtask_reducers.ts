import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Subtask} from 'src/app/models/subtask_models';
import * as fromSubtaskActions from '../actions/subtask_actions';

//@ToDo: Lipiar la data cuando se cierre el modal de task details
export interface SubtaskState extends EntityState<Subtask> {
	error: any;
}

export const subtaskAdapter = createEntityAdapter<Subtask>({
	selectId: (subtask: Subtask) => subtask.id ?? 0,
});

export const initialState: SubtaskState = subtaskAdapter.getInitialState({
	error: null,
});

export function reducer(
	state = initialState,
	action: fromSubtaskActions.SubtaskActions,
): SubtaskState {
	const subtaskActionType = fromSubtaskActions.SubtaskActionType;

	switch (action.type) {
		case subtaskActionType.LOAD_SUBTASKS_SUCCESS: {
			return subtaskAdapter.setAll(action.payload, state);
		}

		case subtaskActionType.LOAD_SUBTASKS_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}

		case subtaskActionType.ADD_SUBTASK_SUCCESS: {
			return subtaskAdapter.addOne(action.payload, state);
		}

		case subtaskActionType.ADD_SUBTASK_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}

		case subtaskActionType.SAVE_SUBTASK_SUCCESS: {
			return subtaskAdapter.updateOne(action.payload, state);
		}

		case subtaskActionType.SAVE_SUBTASK_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}

		case subtaskActionType.DELETE_SUBTASK_SUCCESS: {
			return subtaskAdapter.removeOne(action.payload, state);
		}

		case subtaskActionType.DELETE_SUBTASK_FAIL: {
			return {
				...state,
				error: action.payload,
			};
		}

		case subtaskActionType.UPDATE_SUBTASK_SUCCESS: {
			return subtaskAdapter.updateOne(action.payload, {
				...state,
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
export const getSubtaskError = (state: SubtaskState) => state.error;
export const {selectEntities, selectAll, selectIds, selectTotal} =
	subtaskAdapter.getSelectors();

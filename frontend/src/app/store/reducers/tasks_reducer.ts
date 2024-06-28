import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Task} from '../../models/tasks_models';
import * as fromTasksActions from '../actions/tasks_actions';

export interface TasksState extends EntityState<Task> {
	data: Task[];
	isLoading: boolean;
	error: string;
}

export const taskAdapter = createEntityAdapter<Task>({
	selectId: (task) => task.id ?? 0,
});

export const initialState: TasksState = taskAdapter.getInitialState({
	data: [],
	isLoading: false,
	error: '',
});

export function reducer(
	state = initialState,
	action: fromTasksActions.TasksActions,
): TasksState {
	const tasksActionTypes = fromTasksActions.TasksActionType;

	switch (action.type) {
		case tasksActionTypes.LOAD_TASK: {
			return {
				...state,
				isLoading: true,
			};
		}

		case tasksActionTypes.LOAD_TASK_SUCCESS: {
			return taskAdapter.addOne(action.payload, {...state, isLoading: false});
		}

		case tasksActionTypes.LOAD_TASK_FAIL: {
			return {...state, error: action.payload, isLoading: false};
		}

		case tasksActionTypes.ADD_TASK_SUCCESS: {
			return taskAdapter.addOne(action.payload, state);
		}

		case tasksActionTypes.ADD_TASK_FAIL: {
			return {...state, error: action.payload};
		}

		case tasksActionTypes.UPDATE_TASK_SUCCESS: {
			return taskAdapter.updateOne(action.payload, state);
		}

		case tasksActionTypes.UPDATE_TASK_FAIL: {
			return {...state, error: action.payload};
		}

		case tasksActionTypes.DELETE_TASK_SUCCESS: {
			return taskAdapter.removeOne(action.payload, state);
		}

		case tasksActionTypes.DELETE_TASK_FAIL: {
			return {...state, error: action.payload};
		}

		case tasksActionTypes.SAVE_TASK_SUCCESS: {
			return {...state};
		}

		case tasksActionTypes.SAVE_TASK_FAIL: {
			return {...state, error: action.payload};
		}

		default: {
			return state;
		}
	}
}

export const getTaskIsLoading = (state: TasksState) => state.isLoading;
export const getTaskError = (state: TasksState) => state.error;
export const getTaskData = (state: TasksState) => state.data;
export const {selectAll, selectEntities, selectIds, selectTotal} =
	taskAdapter.getSelectors();

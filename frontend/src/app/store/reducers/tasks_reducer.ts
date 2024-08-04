import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Task} from 'src/app/models/tasks_models';
import * as fromTasksActions from '../actions/tasks_actions';

export interface TasksState extends EntityState<Task> {
	boardSelected: number;
	isLoading: boolean; //@ToDo: Delete this
	error: string;
	task: Task | null;
}

export const taskAdapter = createEntityAdapter<Task>({
	selectId: (task: Task) => +task.id,
});

export const initialState: TasksState = taskAdapter.getInitialState({
	boardSelected: 0,
	isLoading: false,
	error: '',
	task: null,
});

export function reducer(
	state = initialState,
	action: fromTasksActions.TasksActions,
): TasksState {
	const tasksActionTypes = fromTasksActions.TasksActionType;

	switch (action.type) {
		case tasksActionTypes.LOAD_TASKS_BY_BOARD: {
			return {
				...state,
				boardSelected: action.payload,
				isLoading: true,
			};
		}

		case tasksActionTypes.LOAD_TASKS_BY_BOARD_SUCCESS: {
			return taskAdapter.setAll(action.payload, {...state, isLoading: false});
		}

		case tasksActionTypes.LOAD_TASKS_BY_BOARD_FAIL: {
			return {...state, error: action.payload, isLoading: false};
		}

		case tasksActionTypes.LOAD_TASK: {
			return {
				...state,
				isLoading: true,
			};
		}

		case tasksActionTypes.LOAD_TASK_SUCCESS: {
			return {
				...state,
				isLoading: false,
				error: '',
				task: action.payload,
			};
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
			return taskAdapter.updateOne(action.payload, {
				...state,
				isLoading: false,
				error: '',
			});
		}

		case tasksActionTypes.UPDATE_TASK_FAIL: {
			return {...state, error: action.payload};
		}

		case tasksActionTypes.DELETE_TASK_SUCCESS: {
			return taskAdapter.removeOne(action.payload, {
				...state,
				isLoading: false,
				error: '',
				task: null,
			});
		}

		case tasksActionTypes.DELETE_TASK_FAIL: {
			return {...state, error: action.payload};
		}

		case tasksActionTypes.SAVE_TASK_SUCCESS: {
			// console.info('reducer', action);
			return taskAdapter.addOne(action.payload, state);
		}

		case tasksActionTypes.SAVE_TASK_FAIL: {
			return {...state, error: action.payload};
		}

		case tasksActionTypes.CLEAN_TASK_SELECTED: {
			return {...state, task: null, isLoading: false, error: ''};
		}

		case tasksActionTypes.UPDATE_TASK_STATUS_SUCCESS: {
			return taskAdapter.updateOne(action.payload, {
				...state,
				isLoading: false,
				error: '',
			});
		}

		case tasksActionTypes.UPDATE_TASK_STATUS_FAIL: {
			return {...state, error: action.payload};
		}

		default: {
			return state;
		}
	}
}

export const getTaskIsLoading = (state: TasksState) => state.isLoading;
export const getTaskError = (state: TasksState) => state.error;
export const {selectAll, selectEntities, selectIds, selectTotal} =
	taskAdapter.getSelectors();
export const getBoardSelected = (state: TasksState) => state.boardSelected;
export const getTaskSelected = (state: TasksState) => state.task;

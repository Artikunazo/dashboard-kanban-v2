import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Board} from 'src/app/models/board_models';
import * as fromBoardActions from '../actions/board_actions';

export interface BoardState extends EntityState<Board> {
	boardTitle: string;
	isLoading: boolean; // @ToDo: Delete this
	error: string;
}

export const boardAdapter = createEntityAdapter<Board>({
	selectId: (board: Board) => board.id || 0,
});

export const initialState: BoardState = boardAdapter.getInitialState({
	boardTitle: 'Dashboard Kanban',
	isLoading: false,
	error: '',
});

export function reducer(
	state = initialState,
	action: fromBoardActions.BoardActions,
): BoardState {
	const boardActionTypes = fromBoardActions.BoardActionsType;

	switch (action.type) {
		case boardActionTypes.LOAD_BOARDS: {
			return {...state, isLoading: true, error: ''};
		}

		case boardActionTypes.LOAD_BOARDS_SUCCESS: {
			return boardAdapter.setAll(action.payload, {...state, isLoading: false});
		}

		case boardActionTypes.LOAD_BOARDS_FAIL: {
			return {...state, isLoading: false, error: action.payload};
		}

		case boardActionTypes.SAVE_BOARD: {
			return {...state, isLoading: true, error: ''};
		}

		case boardActionTypes.SAVE_BOARD_SUCCESS: {
			return boardAdapter.addOne(action.payload, {...state, isLoading: false});
		}

		case boardActionTypes.SAVE_BOARD_FAIL: {
			return {...state, isLoading: false, error: action.payload};
		}

		case boardActionTypes.UPDATE_BOARD: {
			return {...state, isLoading: true, error: ''};
		}

		case boardActionTypes.UPDATE_BOARD_SUCCESS: {
			return boardAdapter.updateOne(action.payload, {
				...state,
				isLoading: false,
			});
		}

		case boardActionTypes.UPDATE_BOARD_FAIL: {
			return {...state, isLoading: false, error: action.payload};
		}

		case boardActionTypes.DELETE_BOARD: {
			return {...state, isLoading: true, error: ''};
		}

		case boardActionTypes.DELETE_BOARD_SUCCESS: {
			return boardAdapter.removeOne(action.payload, {
				...state,
				isLoading: false,
			});
		}

		case boardActionTypes.DELETE_BOARD_FAIL: {
			return {...state, isLoading: false, error: action.payload};
		}

		case boardActionTypes.SAVE_TITLE_BOARD: {
			return {
				...state,
				isLoading: false,
				error: '',
				boardTitle: action.payload,
			};
		}

		default: {
			return state;
		}
	}
}

// export const getBoardsData = (state: BoardState) => state.data;
// export const getBoardById = (state: BoardState, idBoard: number) => state.entities[idBoard];
export const getBoardError = (state: BoardState) => state.error;
export const getBoardIsLoading = (state: BoardState) => state.isLoading;
export const {selectEntities, selectAll, selectIds, selectTotal} =
	boardAdapter.getSelectors();
export const getBoardTitle = (state: BoardState) => state.boardTitle;

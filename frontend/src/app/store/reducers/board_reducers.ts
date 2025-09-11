import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Board} from 'src/app/models/board_models';
import * as fromBoardActions from '../actions/board_actions';

export interface BoardState extends EntityState<Board> {
	boardTitle: string;
	error: string;
}

export const boardAdapter = createEntityAdapter<Board>({
	selectId: (board: Board) => board.id || 0,
});

export const initialState: BoardState = boardAdapter.getInitialState({
	boardTitle: 'Dashboard Kanban',
	error: '',
});

export function reducer(
	state = initialState,
	action: fromBoardActions.BoardActions,
): BoardState {
	const boardActionTypes = fromBoardActions.BoardActionsType;

	switch (action.type) {
		case boardActionTypes.LOAD_BOARDS_SUCCESS: {
			return boardAdapter.setAll(action.payload, state);
		}

		case boardActionTypes.LOAD_BOARDS_FAIL: {
			return {...state, error: action.payload};
		}

		case boardActionTypes.SAVE_BOARD_SUCCESS: {
			return boardAdapter.addOne(action.payload, state);
		}

		case boardActionTypes.SAVE_BOARD_FAIL: {
			return {...state, error: action.payload};
		}

		case boardActionTypes.UPDATE_BOARD_SUCCESS: {
			return boardAdapter.updateOne(action.payload, state);
		}

		case boardActionTypes.UPDATE_BOARD_FAIL: {
			return {...state, error: action.payload};
		}

		case boardActionTypes.DELETE_BOARD_SUCCESS: {
			return boardAdapter.removeOne(action.payload, state);
		}

		case boardActionTypes.DELETE_BOARD_FAIL: {
			return {...state, error: action.payload};
		}

		case boardActionTypes.SAVE_TITLE_BOARD: {
			return {
				...state,
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
export const {selectEntities, selectAll, selectIds, selectTotal} =
	boardAdapter.getSelectors();
export const getBoardTitle = (state: BoardState) => state.boardTitle;

import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {Board} from '../../models/board_models';
import * as fromBoardActions from '../actions/board_actions';

export interface BoardState extends EntityState<Board> {
	data: Board[];
	isLoading: boolean;
	error: string;
}

export const boardAdapter = createEntityAdapter<Board>({
	selectId: (board: Board) => board.id ?? '',
});

export const initialState: BoardState = boardAdapter.getInitialState({
	data: [],
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
			return {...state, isLoading: true};
		}

		case boardActionTypes.LOAD_BOARDS_SUCCESS: {
			return boardAdapter.setAll(action.payload, {...state, isLoading: false});
		}

		case boardActionTypes.LOAD_BOARDS_FAIL: {
			return {...state, isLoading: false, error: action.payload};
		}

		case boardActionTypes.SAVE_BOARD: {
			return {...state, isLoading: true};
		}

		case boardActionTypes.SAVE_BOARD_SUCCESS: {
			return boardAdapter.addOne(action.payload, {...state, isLoading: false});
		}

		case boardActionTypes.SAVE_BOARD_FAIL: {
			return {...state, isLoading: false, error: action.payload};
		}

		case boardActionTypes.DELETE_BOARD: {
			return {...state, isLoading: true};
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

		default: {
			return state;
		}
	}
}

export const getBoardsData = (state: BoardState) => state.data;
// export const getBoardById = (state: BoardState, idBoard: number) => state.entities[idBoard];
export const getBoardError = (state: BoardState) => state.error;
export const getBoardIsLoading = (state: BoardState) => state.isLoading;
export const {selectEntities, selectAll, selectIds, selectTotal} =
	boardAdapter.getSelectors();

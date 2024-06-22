import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Board } from "../../models/board_models";
import * as fromBoardActions from "../actions/board_actions";

export interface BoardState extends EntityState<Board> {
  data: Board[],
  isLoading: boolean;
  error: string;
}

export const boardAdapter = createEntityAdapter<Board>({
  selectId: (board: Board) => board.id ?? ''
});

export const initialState: BoardState = boardAdapter.getInitialState({
  data: [],
  isLoading: false,
  error: ''
});

export function reducer(
  state = initialState,
  action: fromBoardActions.BoardActions
): BoardState {
  const boardActionTypes = fromBoardActions.BoardActionsType;

  switch(action.type) {
    case boardActionTypes.LOAD_BOARDS: {
      return { ...state, isLoading: true };
    }

    // @ToDo: Add data using Entity
    case boardActionTypes.LOAD_BOARDS_SUCCESS: {
      return { ...state, isLoading: false };
    }

    //@ToDo: Add error
    case boardActionTypes.LOAD_BOARDS_FAIL: {
      return { ...state, isLoading: false };
    }

    case boardActionTypes.LOAD_BOARD: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.LOAD_BOARD_SUCCESS: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.LOAD_BOARD_FAIL: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.SAVE_BOARD: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.SAVE_BOARD_SUCCESS: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.SAVE_BOARD_FAIL: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.DELETE_BOARD: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.DELETE_BOARD_SUCCESS: {
      return { ...state, isLoading: true };
    }

    case boardActionTypes.DELETE_BOARD_FAIL: {
      return { ...state, isLoading: true };
    }



    default: {
      return state;
    }
  }
}

export const getBoardsData = (state: BoardState) => state.data;
// @ToDo: research about get specific item using entity
export const getBoardDataById = (state: BoardState, idBoard: number) => state.data;
export const getBoardError = (state: BoardState) => state.error;
export const getBoardIsLoading = (state: BoardState) => state.isLoading;

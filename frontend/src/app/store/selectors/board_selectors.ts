import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBoardReducer from '../reducers/board_reducers';

export const getBoardState =
	createFeatureSelector<fromBoardReducer.BoardState>('board');

export const getBoardEntities = createSelector(
	getBoardState,
	fromBoardReducer.selectEntities,
);

export const getBoardById = (idBoard: number) =>
	createSelector(getBoardState, (entities: any) => entities[idBoard]);

export const getBoardIsLoading = createSelector(
	getBoardState,
	fromBoardReducer.getBoardIsLoading,
);
export const getBoardError = createSelector(
	getBoardState,
	fromBoardReducer.getBoardError,
);

export const selectAllBoards = createSelector(
	getBoardState,
	fromBoardReducer.selectAll,
);

export const selectBoardsEntities = createSelector(
	getBoardState,
	fromBoardReducer.selectEntities,
);

export const selectBoardTitle = createSelector(
	getBoardState,
	fromBoardReducer.getBoardTitle,
);

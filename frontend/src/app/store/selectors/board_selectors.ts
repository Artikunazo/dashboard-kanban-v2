import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBoardReducer from '../reducers/board_reducers';

export const getBoardState =
	createFeatureSelector<fromBoardReducer.BoardState>('board');
export const getEntities = createSelector(
	getBoardState,
	fromBoardReducer.selectEntities,
);
export const getBoardsData = createSelector(
	getBoardState,
	fromBoardReducer.getBoardsData,
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

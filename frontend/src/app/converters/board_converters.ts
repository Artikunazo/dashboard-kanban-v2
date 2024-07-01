import {ApiBoard, Board} from '../models/board_models';

export function apiBoardToBoard(apiBoard: ApiBoard): Board {
	return {
		id: apiBoard.boardId.toString(),
		title: apiBoard.title,
	};
}

export function apiBoardsToBoards(apiBoards: ApiBoard[]): Board[] {
	return apiBoards.map((apiBoard: ApiBoard) => apiBoardToBoard(apiBoard));
}

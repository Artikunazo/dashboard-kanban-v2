import {Update} from '@ngrx/entity';
import {Action} from '@ngrx/store';
import {Board} from 'src/app/models/board_models';
import {Task} from 'src/app/models/tasks_models';

export enum BoardActionsType {
	LOAD_BOARDS = '[Board] Load Boards',
	LOAD_BOARDS_SUCCESS = '[Board] Load Boards Success',
	LOAD_BOARDS_FAIL = '[Board] Load Boards Fail',

	// Single board selected
	LOAD_BOARD = '[Board] Load Boards',
	LOAD_BOARD_SUCCESS = '[Board] Load Board Success',
	LOAD_BOARD_FAIL = '[Board] Load Board Fail',

	UPDATE_BOARD = '[Board] Update Board',
	UPDATE_BOARD_SUCCESS = '[Board] Update Board Success',
	UPDATE_BOARD_FAIL = '[Board] Update Board Fail',

	DELETE_BOARD = '[Board] Delete Board',
	DELETE_BOARD_SUCCESS = '[Board] Delete Board Success',
	DELETE_BOARD_FAIL = '[Board] Delete Board Fail',

	SAVE_BOARD = '[Board] Save Board',
	SAVE_BOARD_SUCCESS = '[Board] Save Board Success',
	SAVE_BOARD_FAIL = '[Board] Save Board Fail',

	SAVE_TITLE_BOARD = '[Board] Save Title Board',
}

export class LoadBoards implements Action {
	readonly type = BoardActionsType.LOAD_BOARDS;
}

export class LoadBoardsSucess implements Action {
	readonly type = BoardActionsType.LOAD_BOARDS_SUCCESS;

	constructor(public payload: Board[]) {}
}

export class LoadBoardsFail implements Action {
	readonly type = BoardActionsType.LOAD_BOARDS_FAIL;

	constructor(public payload: any) {}
}

export class LoadBoard implements Action {
	readonly type = BoardActionsType.LOAD_BOARD;
}

export class LoadBoardSucess implements Action {
	readonly type = BoardActionsType.LOAD_BOARD_SUCCESS;

	constructor(public payload: Task[]) {}
}

export class LoadBoardFail implements Action {
	readonly type = BoardActionsType.LOAD_BOARD_FAIL;

	constructor(public payload: any) {}
}

export class SaveBoard implements Action {
	readonly type = BoardActionsType.SAVE_BOARD;

	constructor(public payload: {title: string}) {}
}

export class SaveBoardSucess implements Action {
	readonly type = BoardActionsType.SAVE_BOARD_SUCCESS;

	constructor(public payload: Board) {}
}

export class SaveBoardFail implements Action {
	readonly type = BoardActionsType.SAVE_BOARD_FAIL;

	constructor(public payload: any) {}
}

export class UpdateBoard implements Action {
	readonly type = BoardActionsType.UPDATE_BOARD;

	constructor(public payload: Board) {}
}

export class UpdateBoardSuccess implements Action {
	readonly type = BoardActionsType.UPDATE_BOARD_SUCCESS;

	constructor(public payload: Update<Board>) {}
}

export class UpdateBoardFail implements Action {
	readonly type = BoardActionsType.UPDATE_BOARD_FAIL;

	constructor(public payload: any) {}
}

export class DeleteBoard implements Action {
	readonly type = BoardActionsType.DELETE_BOARD;

	constructor(public payload: number) {}
}

export class DeleteBoardSucess implements Action {
	readonly type = BoardActionsType.DELETE_BOARD_SUCCESS;

	constructor(public payload: any) {}
}

export class DeleteBoardFail implements Action {
	readonly type = BoardActionsType.DELETE_BOARD_FAIL;

	constructor(public payload: any) {}
}

export class SaveTitleBoard implements Action {
	readonly type = BoardActionsType.SAVE_TITLE_BOARD;

	constructor(public payload: string) {}
}

export type BoardActions =
	| LoadBoards
	| LoadBoardsSucess
	| LoadBoardsFail
	| LoadBoard
	| LoadBoardSucess
	| LoadBoardFail
	| SaveBoard
	| SaveBoardFail
	| SaveBoardSucess
	| UpdateBoard
	| UpdateBoardSuccess
	| UpdateBoardFail
	| DeleteBoard
	| DeleteBoardFail
	| DeleteBoardSucess
	| SaveTitleBoard;

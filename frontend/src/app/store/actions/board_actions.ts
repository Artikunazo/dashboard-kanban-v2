import {Action} from '@ngrx/store';
import {Board} from '../../models/board_models';
import {Task} from '../../models/tasks_models';

export enum BoardActionsType {
	LOAD_BOARDS = '[Board] Load Boards',
	LOAD_BOARDS_SUCCESS = '[Board] Load Boards Success',
	LOAD_BOARDS_FAIL = '[Board] Load Boards Fail',

	// Single board selected
	LOAD_BOARD = '[Board] Load Boards',
	LOAD_BOARD_SUCCESS = '[Board] Load Board Success',
	LOAD_BOARD_FAIL = '[Board] Load Board Fail',

	// UPDATE_TASK = '[Task] Update task',
	// UPDATE_TASK_SUCCESS = '[Task] Update Task Success',
	// UPDATE_TASK_FAIL = '[Task] Update Task Fail',

	DELETE_BOARD = '[Board] Delete Board',
	DELETE_BOARD_SUCCESS = '[Board] Delete Board Success',
	DELETE_BOARD_FAIL = '[Board] Delete Board Fail',

	SAVE_BOARD = '[Board] Save Board',
	SAVE_BOARD_SUCCESS = '[Board] Save Board Success',
	SAVE_BOARD_FAIL = '[Board] Save Board Fail',
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

	constructor(public payload: Board) {}
}

export class SaveBoardSucess implements Action {
	readonly type = BoardActionsType.SAVE_BOARD_SUCCESS;

	constructor(public payload: Board) {}
}

export class SaveBoardFail implements Action {
	readonly type = BoardActionsType.SAVE_BOARD_FAIL;

	constructor(public payload: any) {}
}

export class DeleteBoard implements Action {
	readonly type = BoardActionsType.DELETE_BOARD;
}

export class DeleteBoardSucess implements Action {
	readonly type = BoardActionsType.DELETE_BOARD_SUCCESS;

	constructor(public payload: any) {}
}

export class DeleteBoardFail implements Action {
	readonly type = BoardActionsType.DELETE_BOARD_FAIL;

	constructor(public payload: any) {}
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
	| DeleteBoard
	| DeleteBoardFail
	| DeleteBoardSucess;

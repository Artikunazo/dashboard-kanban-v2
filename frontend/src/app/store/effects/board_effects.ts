import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {BoardService} from 'src/app/api/board.service';
import {TaskService} from 'src/app/api/task.service';
import {
	apiBoardToBoard,
	apiBoardsToBoards,
	boardToApiBoard,
} from 'src/app/converters/board_converters';
import {ApiBoard} from 'src/app/models/board_models';
import * as fromBoardActions from '../actions/board_actions';

@Injectable({
	providedIn: 'root',
})
export class BoardEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly boardService: BoardService,
		private readonly taskService: TaskService,
	) {}

	protected readonly boardActions = fromBoardActions.BoardActionsType;

	loadBoards$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.boardActions.LOAD_BOARDS),
			mergeMap(() => {
				return this.boardService.getBoards().pipe(
					map((apiBoards: ApiBoard[]) => {
						const boards = apiBoardsToBoards(apiBoards);
						return new fromBoardActions.LoadBoardsSucess(boards);
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.LoadBoardsFail(error));
					}),
				);
			}),
		);
	});

	saveBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.boardActions.SAVE_BOARD),
			mergeMap((board: fromBoardActions.SaveBoard) => {
				return this.boardService.save(board.payload).pipe(
					map((apiBoard: ApiBoard) => {
						const board = apiBoardToBoard(apiBoard);
						return new fromBoardActions.SaveBoardSucess(board);
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.SaveBoardFail(error));
					}),
				);
			}),
		);
	});

	updateBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.boardActions.UPDATE_BOARD),
			mergeMap((data: fromBoardActions.UpdateBoard) => {
				const apiBoard: ApiBoard = boardToApiBoard(data.payload);
				return this.boardService.update(apiBoard).pipe(
					map(() => {
						return new fromBoardActions.UpdateBoardSuccess({
							id: data.payload.id?.toString() ?? '',
							changes: {...data.payload},
						});
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.UpdateBoardFail(error));
					}),
				);
			}),
		);
	});

	deleteBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.boardActions.DELETE_BOARD),
			mergeMap((data: fromBoardActions.DeleteBoard) => {
				return this.boardService.delete(data.payload).pipe(
					map(() => {
						return new fromBoardActions.DeleteBoardSucess(data.payload);
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.DeleteBoardFail(error));
					}),
				);
			}),
		);
	});
}

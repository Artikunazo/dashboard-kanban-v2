import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {BoardService} from '../../api/board.service';
import {TaskService} from '../../api/task.service';
import {apiBoardsToBoards} from '../../converters/board_converters';
import {ApiBoard, Board} from '../../models/board_models';
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
					map((board: Board) => {
						return new fromBoardActions.SaveBoardSucess(board);
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.SaveBoardFail(error));
					}),
				);
			}),
		);
	});

	deleteBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.boardActions.DELETE_BOARD),
			mergeMap((idBoard: number) => {
				return this.boardService.delete(idBoard).pipe(
					map((board: any) => {
						return new fromBoardActions.DeleteBoardSucess(board);
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.DeleteBoardFail(error));
					}),
				);
			}),
		);
	});
}

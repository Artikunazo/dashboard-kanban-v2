import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, catchError, map, mergeMap, of} from 'rxjs';
import {BoardService} from '../../api/board.service';
import {TaskService} from '../../api/task.service';
import {Board} from '../../models/board_models';
import {Task} from '../../models/tasks_models';
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
					map((boards: Board[]) => {
						return new fromBoardActions.LoadBoardsSucess(boards);
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.LoadBoardsFail(error));
					}),
				);
			}),
		);
	});

	loadBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.boardActions.LOAD_BOARD),
			mergeMap((idBoard: number) => {
				return this.taskService.getTasksByBoard(idBoard).pipe(
					map((tasks: Task[]) => {
						return new fromBoardActions.LoadBoardSucess(tasks);
					}),
					catchError((error: any) => {
						return of(new fromBoardActions.LoadBoardFail(error));
					}),
				);
			}),
		);
	});

	saveBoard$: Observable<Action> = createEffect(() => {
		return this.actions$.pipe(
			ofType(this.boardActions.SAVE_BOARD),
			mergeMap((board: Board) => {
				return this.boardService.save(board).pipe(
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

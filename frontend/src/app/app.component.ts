import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {BoardFormComponent} from './board-form/board-form.component';
import {boardDialogConfig, taskFormConfig} from './common/modal_configs';
import {KanbanBoardComponent} from './kanban-board/kanban-board.component';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

import {AsyncPipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BehaviorSubject} from 'rxjs';
import {Board} from './models/board_models';
import * as fromStore from './store';
import {TaskFormComponent} from './task-form/task-form.component';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-root',
    imports: [
        ToolbarComponent,
        KanbanBoardComponent,
        ThemeSwitcherComponent,
        AsyncPipe,
        DrawerModule,
        ToolbarModule,
        ProgressSpinnerModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
	// @ViewChild('drawer', {static: false}) public drawer!: MatDrawer;

	// protected readonly matDialog = inject(MatDialog);
	private readonly dialogService = inject(DialogService);
	private readonly store = inject(Store);

  drawerVisible = false;
  drawerClosable = true;
  drawerHeader = 'Boards';
	boards$ = new BehaviorSubject<Board[]>([] as Board[]);
	isLoading$ = new BehaviorSubject<boolean>(true);
	boardSelected$ = new BehaviorSubject<number>(0);
	kanbanBoardComponent = new KanbanBoardComponent();

	constructor() {
		this.store.dispatch(new fromStore.LoadBoards());

		this.store
			.select(fromStore.selectAllBoards)
			.pipe(takeUntilDestroyed())
			.subscribe({
				next: (data: Board[]) => {
					this.boards$.next(data);
					this.isLoading$.next(false);
				},
			});
	}

  toggleDrawer() {
    this.drawerVisible = !this.drawerVisible;
  }


  closeDrawer() {
    this.drawerVisible = false;
  }

	loadTasksByBoard(board: Board) {
		if (!board || !board.id || !board.title) return;

		this.kanbanBoardComponent.isLoading.set(true);
		this.store.dispatch(new fromStore.LoadTasksByBoard(+board.id));
		this.store.dispatch(new fromStore.SaveTitleBoard(board.title));
		this.boardSelected$.next(+board.id);

		// this.drawer.toggle();
	}

	showNewBoardDialog(): void {
		this.dialogService.open(BoardFormComponent, {...boardDialogConfig, data: {
      isEdit: false
    }});
	}

	editBoard(boardData: Board): void {
		if (!boardData || !boardData.id || !boardData.title) return;

		this.dialogService.open(BoardFormComponent, {...boardDialogConfig, data: {
      isEdit: true,
      boardData
    }});
	}

	deleteBoard(idBoard: number | string): void {
		idBoard = +idBoard;
		if (!idBoard || isNaN(idBoard)) {
			return;
		}

		this.store.dispatch(new fromStore.DeleteBoard(+idBoard));
	}

	openCreateTaskModal(event: boolean) {
		if (event) {
			// this.matDialog.open(TaskFormComponent, taskFormConfig);
		}
	}

	ngOnDestroy() {
		this.boardSelected$.complete();
		this.isLoading$.complete();
		this.boards$.complete();
	}
}

import { Component, computed, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardFormComponent } from './board-form/board-form.component';
import { boardDialogConfig, taskFormConfig } from './common/modal_configs';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { Board } from './models/board_models';
import * as fromStore from './store';
import { TaskFormComponent } from './task-form/task-form.component';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';


@Component({
	selector: 'app-root',
	imports: [
		ToolbarComponent,
		KanbanBoardComponent,
		ThemeSwitcherComponent,
		AsyncPipe,
		DrawerModule,
		ToolbarModule,
		ProgressSpinnerModule,
		TooltipModule,
		MenuModule,
		ButtonModule
	],
	providers: [DialogService, DynamicDialogRef],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	private readonly dialogService = inject(DialogService);
	private readonly dialogRef = inject(DynamicDialogRef);
	private readonly store = inject(Store);

	drawerVisible = false;
	drawerClosable = true;
	drawerHeader = 'Boards';
	boards = signal<Board[]>([]);
	isLoading = signal<boolean>(true);
	idBoardSelected = signal<number>(0);
	boardSelected = computed(() => this.boards().find((board) => board.id === this.idBoardSelected()));
	kanbanBoardComponent = new KanbanBoardComponent();
	menuItems: MenuItem[] = [
		{
			label: 'Edit',
			icon: 'pi pi-pencil',
			command: () => this.editBoard()
		},
		{
			label: 'Delete',
			icon: 'pi pi-trash',
			command: () => this.deleteBoard()
		}
	];

	constructor() {
		this.store.dispatch(new fromStore.LoadBoards());

		this.store
			.select(fromStore.selectAllBoards)
			.pipe(takeUntilDestroyed())
			.subscribe({
				next: (data: Board[]) => {
					this.boards.set(data);
					this.isLoading.set(false);
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
		this.idBoardSelected.set(+board.id);

		// this.drawer.toggle();
	}

	showNewBoardDialog(): void {
		this.dialogService.open(BoardFormComponent, {
			...boardDialogConfig,
			data: {
				isEdit: false,
			}
		});
	}

	editBoard(): void {
		if (!this.boardSelected()) return;

		this.dialogService.open(BoardFormComponent, {
			...boardDialogConfig,
			data: {
				isEdit: true,
				boardData: this.boardSelected()
			}
		});

		this.dialogRef.onClose.subscribe({
			next: () => {
				const selectedBoard = this.boardSelected();
				if (selectedBoard) {
					this.loadTasksByBoard(selectedBoard);
				}
			}
		});
	}

	deleteBoard(): void {
		const idBoard = this.idBoardSelected();
		if (!idBoard || isNaN(idBoard)) {
			return;
		}

		this.store.dispatch(new fromStore.DeleteBoard(idBoard));
	}

	openCreateTaskModal(event: boolean) {
		if (event) {
			// this.matDialog.open(TaskFormComponent, taskFormConfig);
		}
	}
}

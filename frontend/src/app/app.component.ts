import {Component, computed, inject, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {taskFormConfig} from './config/modal_configs';
import {KanbanBoardComponent} from './kanban-board/kanban-board.component';
import {ThemeSwitcherComponent} from './components/theme-switcher/theme-switcher.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';

import {AsyncPipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Board} from './models/board_models';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import * as fromStore from './store';
import {TaskFormComponent} from './components/task-form/task-form.component';
import { DrawerSidebarComponent } from './components/drawer-sidebar/drawer-sidebar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		ToolbarComponent,
		KanbanBoardComponent,
		ThemeSwitcherComponent,
		AsyncPipe,
		ToolbarModule,
		DrawerSidebarComponent
	],
	providers: [DialogService, DynamicDialogRef],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	private readonly store = inject(Store);
	private readonly dialogService = inject(DialogService);

	boards = signal<Board[]>([]);
	isLoading = signal<boolean>(true);
	idBoardSelected = signal<number>(0);
	boardSelected = computed(() =>
		this.boards().find((board) => board.id === this.idBoardSelected()),
	);
	kanbanBoardComponent = new KanbanBoardComponent();
	drawerVisible = signal<boolean>(false);

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

	loadTasksByBoard(board: Board) {
		if (!board || !board.id || !board.title) return;

		this.kanbanBoardComponent.isLoading.set(true);
		this.store.dispatch(new fromStore.LoadTasksByBoard(+board.id));
		this.store.dispatch(new fromStore.SaveTitleBoard(board.title));
		this.idBoardSelected.set(+board.id);

		// this.toggleDrawer(); @ToDo: Fix this one with a viewchild
	}

	openCreateTaskModal(event: boolean) {
		if (event) {
			this.dialogService.open(TaskFormComponent, {
				...taskFormConfig,
				header: 'Task information',
			});
		}
	}

	toggleDrawer() {
		this.drawerVisible.set(!this.drawerVisible());
	}
}


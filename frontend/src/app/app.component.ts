import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Store} from '@ngrx/store';
import {BoardFormComponent} from './board-form/board-form.component';
import {boardDialogConfig} from './common/modal_configs';
import {KanbanBoardComponent} from './kanban-board/kanban-board.component';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

import {Board} from './models/board_models';
import * as fromStore from './store';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		ToolbarComponent,
		MatListModule,
		MatSidenavModule,
		MatSlideToggleModule,
		KanbanBoardComponent,
		ThemeSwitcherComponent,
		MatIconModule,
		MatButtonModule,
		BoardFormComponent,
		MatMenuModule,
		MatProgressSpinner,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	protected readonly matDialog = inject(MatDialog);
	protected readonly store = inject(Store);

	boards: Board[] = [];
	isLoading = false;
	title = 'dashboard-kanban';

	ngOnInit() {
		this.store.select(fromStore.getBoardIsLoading).subscribe({
			next: (loading) => {
				this.isLoading = loading;
			},
		});

		this.store.dispatch(new fromStore.LoadBoards());

		this.store.select(fromStore.selectAllBoards).subscribe({
			next: (data: Board[]) => {
				this.boards = data;
			},
		});
	}

	showNewBoardDialog(): void {
		const dialog = this.matDialog.open(BoardFormComponent, boardDialogConfig);

		dialog.afterClosed().subscribe({
			next: () => {
				// this.store.select(fromStore.selectAllBoards).subscribe({
				// 	next: (boards: any) => {
				// 		console.log('select all', boards);
				// 		this.boards = boards;
				// 	},
				// });
				// this.store
				// 	.select(fromStore.selectBoardsEntities)
				// 	.subscribe((entities: any) => console.log({entities}));
			},
		});
	}

	editBoard(boardData: Board) {
		this.matDialog.open(BoardFormComponent, {
			...boardDialogConfig,
			data: boardData,
		});
	}

	deleteBoard(idBoard: number | string) {
		this.store.dispatch(new fromStore.DeleteBoard(idBoard));
	}
}

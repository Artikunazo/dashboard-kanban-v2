import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Store} from '@ngrx/store';
import {BoardFormComponent} from './board-form/board-form.component';
import {boardDialogConfig} from './common/modal_configs';
import {KanbanBoardComponent} from './kanban-board/kanban-board.component';
import {Board} from './models/board_models';
import * as fromStore from './store';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

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
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	protected readonly matDialog = inject(MatDialog);
	protected readonly store = inject(Store);

	boards: Board[] = [];

	title = 'dashboard-kanban';

	showNewBoardDialog(): void {
		const dialog = this.matDialog.open(BoardFormComponent, boardDialogConfig);

		dialog.afterClosed().subscribe({
			next: () => {
				this.store.select(fromStore.getBoardsData).subscribe({
					next: (boards: Board[]) => {
						this.boards = boards;
					},
				});
			},
		});
	}
}

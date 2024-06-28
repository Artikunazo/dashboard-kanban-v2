import {Component, inject} from '@angular/core';
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
})
export class AppComponent {
	protected readonly matDialog = inject(MatDialog);
	protected readonly store = inject(Store);

	title = 'dashboard-kanban';

	showNewBoardDialog(): void {
		this.matDialog.open(BoardFormComponent, boardDialogConfig);
	}
}

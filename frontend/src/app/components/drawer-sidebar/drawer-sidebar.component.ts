import {Component, inject, input, model, output, signal} from '@angular/core';
import {Board} from 'src/app/models/board_models';
import {DrawerModule} from 'primeng/drawer';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {MenuItem} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BoardFormComponent} from '../board-form/board-form.component';
import {boardDialogConfig} from 'src/app/config/modal_configs';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
	selector: 'drawer-sidebar',
	standalone: true,
	imports: [
		DrawerModule,
		MenuModule,
		ButtonModule,
		ProgressSpinnerModule,
		TooltipModule,
		ThemeSwitcherComponent
	],
	templateUrl: './drawer-sidebar.component.html',
	styleUrl: './drawer-sidebar.component.scss',
})
export class DrawerSidebarComponent {
	private readonly dialogService = inject(DialogService);
	private readonly dialogRef = inject(DynamicDialogRef);
	private readonly store = inject(Store);

	public boards = input<Board[]>([]);
	public boardSelected = input<Board | null>(null);
	public loadTasksByBoard = output<Board>();
	public idBoardSelected = signal<number>(0);
	public drawerVisible = model<boolean>(false);

	public drawerClosable = true;
	public drawerHeader = 'Boards';

	menuItems: MenuItem[] = [
		{
			label: 'Edit',
			icon: 'pi pi-pencil',
			command: () => this.editBoard(),
		},
		{
			label: 'Delete',
			icon: 'pi pi-trash',
			command: () => this.deleteBoard(),
		},
	];

	toggleDrawer() {
		this.drawerVisible.set(!this.drawerVisible());
	}

	closeDrawer() {
		this.drawerVisible.set(false);
	}

	editBoard(): void {
		if (!this.boardSelected()) return;

		this.dialogService.open(BoardFormComponent, {
			...boardDialogConfig,
			header: 'Edit Board',
			data: {
				isEdit: true,
				boardData: this.boardSelected(),
			},
		});

		this.dialogRef.onClose.subscribe({
			next: () => {
				const selectedBoard = this.boardSelected();
				if (selectedBoard) {
					this.loadTasksByBoard.emit(selectedBoard);
				}
			},
		});
	}

	deleteBoard(): void {
		const idBoard = this.idBoardSelected();
		if (!idBoard || isNaN(idBoard)) {
			return;
		}

		this.store.dispatch(new fromStore.DeleteBoard(idBoard));
	}

	showNewBoardDialog(): void {
		this.dialogService.open(BoardFormComponent, {
			...boardDialogConfig,
			header: 'New Board',
			data: {
				isEdit: false,
			},
		});
	}

	loadTasks(board: Board) {
		this.loadTasksByBoard.emit(board);

		this.drawerVisible.set(false);
	}
}


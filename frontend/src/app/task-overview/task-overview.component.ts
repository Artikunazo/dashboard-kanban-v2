import {CommonModule} from '@angular/common';
import {Component, inject, input, OnDestroy, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {DeleteConfirmationComponent} from '../common/delete-confirmation/delete-confirmation.component';
import {deleteConfirmationConfig} from '../common/modal_configs';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';

@Component({
	selector: 'kanban-card',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatMenuModule,
		MatIconModule,
		CommonModule,
	],
	templateUrl: './task-overview.component.html',
	styleUrl: './task-overview.component.scss',
})
export class KanbanCardComponent implements OnDestroy {
	protected readonly matDialog = inject(MatDialog);
	protected readonly store = inject(Store);

	public task = input.required<Task>();
	public taskSelected = output<Task>();
	protected boardSelected$ = new BehaviorSubject<number>(0);

	constructor() {
		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) =>
				this.boardSelected$.next(boardSelected),
			);
	}

	showDeleteConfirmationDialog(): void {
		this.matDialog
			.open(DeleteConfirmationComponent, deleteConfirmationConfig)
			.afterClosed()
			.subscribe({
				next: (resultDeleting: boolean) => {
					if (!resultDeleting) return;

					this.store.dispatch(new fromStore.DeleteTask(+this.task().id));
				},
			});
	}

	emitShowTaskDialog() {
		if (!this.task()?.id) return;

		this.store.dispatch(new fromStore.LoadTask(this.task()));
		this.taskSelected.emit(this.task());
	}

	ngOnDestroy() {
		this.boardSelected$.complete();
	}
}

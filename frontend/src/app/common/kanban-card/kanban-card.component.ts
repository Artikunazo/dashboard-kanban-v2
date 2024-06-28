import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../app/store';
import {TaskOverviewComponent} from '../../../app/task-overview/task-overview.component';
import {Task} from '../../models/tasks_models';

@Component({
	selector: 'kanban-card',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './kanban-card.component.html',
	styleUrl: './kanban-card.component.scss',
})
export class KanbanCardComponent {
	constructor(
		private readonly matDialog: MatDialog,
		private readonly store: Store,
	) {}

	public task = input<Task>();

	openTaskOverviewModal(taskData: Task | undefined) {
		if (!taskData) return;

		const dialogRef = this.matDialog.open(TaskOverviewComponent, {
			width: '65%',
			height: 'fit-content',
			maxHeight: '90vh',
			data: {...taskData},
		});

		dialogRef.afterClosed().subscribe(() => {
			this.store.dispatch(new fromStore.LoadTask());
		});
	}
}

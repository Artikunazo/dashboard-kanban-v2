import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Task, TaskOverview} from '../../models/tasks_models';

@Component({
	selector: 'kanban-card',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './task-overview.component.html',
	styleUrl: './task-overview.component.scss',
})
export class KanbanCardComponent {
	constructor(
		private readonly matDialog: MatDialog,
		private readonly store: Store,
	) {}

	public task = input<TaskOverview>();

	openTaskOverviewModal(taskData: Task | undefined) {
		if (!taskData) return;

		// const dialogRef = this.matDialog.open(TaskOverviewComponent, {
		// 	width: '65%',
		// 	height: 'fit-content',
		// 	maxHeight: '90vh',
		// 	data: {...taskData},
		// });

		// dialogRef.afterClosed().subscribe(() => {
		// 	this.store.dispatch(new fromStore.LoadTask());
		// });
	}
}

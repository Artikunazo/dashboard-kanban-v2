import {Component, inject, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {Store} from '@ngrx/store';
import {TaskOverview} from '../../models/tasks_models';
import * as fromStore from '../../store';
import {DeleteConfirmationComponent} from '../delete-confirmation/delete-confirmation.component';
import {deleteConfirmationConfig} from '../modal_configs';

@Component({
	selector: 'kanban-card',
	standalone: true,
	imports: [MatCardModule, MatButtonModule, MatMenuModule, MatIconModule],
	templateUrl: './task-overview.component.html',
	styleUrl: './task-overview.component.scss',
})
export class KanbanCardComponent {
	protected readonly matDialog = inject(MatDialog);
	protected readonly store = inject(Store);

	public task = input.required<TaskOverview>();
	public taskSelected = output<TaskOverview>();

	showDeleteConfirmationDialog(): void {
		this.matDialog
			.open(DeleteConfirmationComponent, deleteConfirmationConfig)
			.afterClosed()
			.subscribe({
				next: (resultDeleting: boolean) => {
					if (!resultDeleting) return;

					this.store.dispatch(new fromStore.DeleteTask(this.task().id));
				},
			});
	}

	showTaskForm(): void {}
}

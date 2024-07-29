import {CdkDrag, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {Component, inject, input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {taskFormConfig} from '../common/modal_configs';
import {StatusCircleComponent} from '../common/status-circle/status-circle.component';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import {TaskFormComponent} from '../task-form/task-form.component';
import {KanbanCardComponent} from '../task-overview/task-overview.component';

@Component({
	selector: 'kanban-column',
	standalone: true,
	imports: [
		KanbanCardComponent,
		StatusCircleComponent,
		CdkDrag,
		CdkDropList,
		DragDropModule,
	],
	templateUrl: './kanban-column.component.html',
	styleUrl: './kanban-column.component.scss',
})
export class KanbanColumnComponent {
	protected readonly store = inject(Store);
	protected readonly matDialog = inject(MatDialog);

	public columnType = input<string>('ToDo');
	public tasks = input<Task[]>([]);

	showTaskSelected(task: Task): void {
		this.store.dispatch(new fromStore.LoadTask(task.id));

		this.matDialog
			.open(TaskFormComponent, taskFormConfig)
			.afterClosed()
			.subscribe(() => this.store.dispatch(new fromStore.CleanTaskSelected()));
	}
}

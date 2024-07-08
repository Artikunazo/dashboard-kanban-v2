import {CdkDrag, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {Component, input} from '@angular/core';
import {Store} from '@ngrx/store';
import {TaskOverview} from '../../models/tasks_models';
import {StatusCircleComponent} from '../status-circle/status-circle.component';
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
	public columnType = input<string>('ToDo');
	public tasks = input<TaskOverview[]>([]);

	constructor(protected readonly store: Store) {}
}

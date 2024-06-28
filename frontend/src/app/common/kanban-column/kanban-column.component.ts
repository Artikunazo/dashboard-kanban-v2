import {CdkDrag, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {Component, input} from '@angular/core';
import {Store} from '@ngrx/store';
import {Task} from '../../models/tasks_models';
import {KanbanCardComponent} from '../kanban-card/kanban-card.component';
import {StatusCircleComponent} from '../status-circle/status-circle.component';

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
	public tasks = input<Task[]>([]);

	constructor(protected readonly store: Store) {}
}

import {Component, OnInit, inject} from '@angular/core';
import {KanbanColumnComponent} from '../common/kanban-column/kanban-column.component';

import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {TaskOverview} from '../models/tasks_models';
import * as fromStore from '../store';

@Component({
	selector: 'kanban-board',
	standalone: true,
	imports: [KanbanColumnComponent, DragDropModule],
	templateUrl: './kanban-board.component.html',
	styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent implements OnInit {
	private readonly store = inject(Store);

	public tasksList: TaskOverview[] = [];
	public tasksListIndexed!: {[key: string]: TaskOverview[]};

	constructor() {}

	ngOnInit(): void {
		this.store.select(fromStore.getAllTasks).subscribe({
			next: (tasks: TaskOverview[]) => {
				this.tasksList = tasks || [];
				this.indexTasks();
			},
		});
	}

	indexTasks() {
		this.tasksListIndexed = this.tasksList.reduce(
			(previous: any, current: any) => ({
				...previous,
				[current['status']]: [...(previous[current['status']] || []), current],
			}),
			{},
		);
	}

	drop(event: CdkDragDrop<TaskOverview[]>) {
		const newStatus = event.container.element.nativeElement.id;
		const task = event.item.dropContainer.data;
		// this.store.dispatch(
		// 	new fromStore.UpdateTask({...task[0], status: newStatus}),
		// );
	}
}

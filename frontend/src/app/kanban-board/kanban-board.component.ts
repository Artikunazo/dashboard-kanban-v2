import {Component, OnInit, inject} from '@angular/core';
import {KanbanColumnComponent} from '../kanban-column/kanban-column.component';

import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {Task} from '../models/tasks_models';
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

	public tasksList: Task[] = [];
	public tasksListIndexed!: {[key: string]: Task[]};

	ngOnInit(): void {
		this.store.select(fromStore.getAllTasks).subscribe({
			next: (tasks: Task[]) => {
				this.tasksList = tasks;
				this.indexTasks();
			},
		});
	}

	indexTasks() {
		this.tasksListIndexed = this.tasksList.reduce(
			(previous: any, task: Task) => ({
				...previous,
				[task.status ?? '']: [...(previous[task.status ?? ''] || []), task],
			}),
			{},
		);
	}

	drop(event: CdkDragDrop<Task[]>) {
		this.store.dispatch(
			new fromStore.UpdateStatusTaskOverview({
				task: event.previousContainer.data[event.previousIndex],
				status: event.container.element.nativeElement.id,
			}),
		);
	}
}

import {Component, inject, OnDestroy} from '@angular/core';
import {KanbanColumnComponent} from '../kanban-column/kanban-column.component';

import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';

@Component({
	selector: 'kanban-board',
	standalone: true,
	imports: [KanbanColumnComponent, DragDropModule],
	templateUrl: './kanban-board.component.html',
	styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent implements OnDestroy {
	private readonly store = inject(Store);

	public tasksList$ = new BehaviorSubject<Task[]>([]);
	public tasksListIndexed!: {[key: string]: Task[]};

	constructor() {
		this.store.select(fromStore.getAllTasks).subscribe({
			next: (tasks: Task[]) => {
				this.tasksList$.next(tasks);
				this.indexTasks();
			},
		});
	}

	indexTasks() {
		this.tasksListIndexed = this.tasksList$.getValue().reduce(
			(previous: any, task: Task) => ({
				...previous,
				[task.status ?? '']: [...(previous[task.status ?? ''] || []), task],
			}),
			{},
		);

		for (let column of Object.entries(this.tasksListIndexed)) {
			this.tasksListIndexed[column[0]] = column[1].sort((a: Task, b: Task) => {
				return +b.id - +a.id;
			});
		}
	}

	drop(event: CdkDragDrop<Task[]>) {
		this.store.dispatch(
			new fromStore.UpdateStatusTask({
				task: event.previousContainer.data[event.previousIndex],
				status: event.container.element.nativeElement.id,
			}),
		);
	}

	ngOnDestroy() {
		this.tasksList$.complete();
	}
}

import {Component, inject, OnDestroy} from '@angular/core';
import {KanbanColumnComponent} from '../kanban-column/kanban-column.component';

import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
		this.store
			.select(fromStore.getAllTasks)
			.pipe(takeUntilDestroyed())
			.subscribe({
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
	}

	drop(event: CdkDragDrop<Task[]>) {
		this.store.dispatch(
			new fromStore.UpdateStatusTaskOverview({
				task: event.previousContainer.data[event.previousIndex],
				status: event.container.element.nativeElement.id,
			}),
		);
	}

	ngOnDestroy() {
		this.tasksList$.complete();
	}
}

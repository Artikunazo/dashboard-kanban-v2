import {Component, computed, effect, inject, signal} from '@angular/core';
import {KanbanColumnComponent} from '../kanban-column/kanban-column.component';

import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
	selector: 'kanban-board',
	standalone: true,
	imports: [KanbanColumnComponent, DragDropModule, ProgressSpinner],
	templateUrl: './kanban-board.component.html',
	styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
	private readonly store = inject(Store);

	public isLoading = signal<boolean>(false);
	public tasksList = toSignal(this.store.select(fromStore.getAllTasks));
	public tasksListIndexed = new Map<string, Task[]>();
	protected boardSelected = toSignal(
		this.store.select(fromStore.selectBoardSelected),
	);

	constructor() {
		// effect(() => {
		// 	this.indexTasks();
		// 	this.isLoading.set(false);
		// });
	}

	indexTasks() {
		this.tasksListIndexed.clear();

		this.tasksList()?.forEach((task: Task) => {
			const status = task.status ?? '';
			if (!this.tasksListIndexed.has(status)) {
				this.tasksListIndexed.set(status, []);
			}

			this.tasksListIndexed.get(status)?.push(task);
		});
	}

  getTasks(status: string) {
    return Array.from(this.tasksListIndexed.get(status) ?? []);
  }

	drop(event: CdkDragDrop<Task[]>) {
		const task: Task = event.previousContainer.data[event.previousIndex],
			status = event.container.element.nativeElement.id;

		if (task.status === status) return;

		this.store.dispatch(
			new fromStore.UpdateStatusTask({
				task,
				status,
			}),
		);
	}
}

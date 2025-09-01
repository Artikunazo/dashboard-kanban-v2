import {Component, inject, OnDestroy, signal} from '@angular/core';
import {KanbanColumnComponent} from '../kanban-column/kanban-column.component';

import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import {AsyncPipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import { ProgressSpinner } from "primeng/progressspinner";

@Component({
    selector: 'kanban-board',
    imports: [
    KanbanColumnComponent,
    DragDropModule,
    AsyncPipe,
    ProgressSpinner
],
    templateUrl: './kanban-board.component.html',
    styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent {
	private readonly store = inject(Store);

	public tasksList = signal<Task[]>([]);
	public tasksListIndexed!: {[key: string]: Task[]};
	public isLoading = signal<boolean>(false);
	protected boardSelected = signal<number>(0);

	constructor() {
		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) =>
				this.boardSelected.set(boardSelected),
			);

		this.store
			.select(fromStore.getAllTasks)
			.pipe(takeUntilDestroyed())
			.subscribe({
				next: (tasks: Task[]) => {
					this.tasksList.set(tasks);
					this.indexTasks();

					this.isLoading.set(false);
				},
			});
	}

	indexTasks() {
		this.tasksListIndexed = this.tasksList().reduce(
			(previous: any, task: Task) => ({
				...previous,
				[task.status ?? '']: [...(previous[task.status ?? ''] || []), task],
			}),
			{},
		);

		for (const column of Object.entries(this.tasksListIndexed)) {
			this.tasksListIndexed[column[0]] = column[1].sort((a: Task, b: Task) => {
				return +b.id - +a.id;
			});
		}
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

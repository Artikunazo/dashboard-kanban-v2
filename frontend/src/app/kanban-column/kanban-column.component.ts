import {CdkDrag, CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import {Component, inject, input, OnDestroy} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {taskFormConfig} from '../common/modal_configs';
import {StatusCircleComponent} from '../common/status-circle/status-circle.component';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import {TaskDetailsComponent} from '../task-details/task-details.component';
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
export class KanbanColumnComponent implements OnDestroy {
	protected readonly store = inject(Store);
	protected readonly matDialog = inject(MatDialog);

	public columnType = input<string>('ToDo');
	public tasks = input<Task[]>([]);

	protected boardSelected$ = new BehaviorSubject<number>(0);

	constructor() {
		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) =>
				this.boardSelected$.next(boardSelected),
			);
	}

	showTaskSelected(): void {
		this.matDialog
			.open(TaskDetailsComponent, {
				...taskFormConfig,
			})
			.afterClosed()
			.subscribe(() => {
				//@ToDo: It needs improve
				// When edit button is clicked, this part is called
				// and it is not required
				// Maybe with a edit event evaluation could be fixed
				this.store.dispatch(new fromStore.CleanTaskSelected());
				this.store.dispatch(new fromStore.ClearSubtasks());
				this.store.dispatch(
					new fromStore.LoadTasksByBoard(this.boardSelected$.getValue()),
				);
			});
	}

	ngOnDestroy() {
		this.boardSelected$.complete();
	}
}

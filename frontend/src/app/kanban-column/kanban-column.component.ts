import {CdkDrag, DragDropModule} from '@angular/cdk/drag-drop';
import {Component, inject, input, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {taskFormConfig} from '../common/modal_configs';
import {StatusCircleComponent} from '../common/status-circle/status-circle.component';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import {TaskDetailsComponent} from '../task-details/task-details.component';
import {TaskOverviewComponent} from '../task-overview/task-overview.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'kanban-column',
    imports: [
        TaskOverviewComponent,
        StatusCircleComponent,
        CdkDrag,
        DragDropModule,
        DynamicDialogModule
    ],
    templateUrl: './kanban-column.component.html',
    styleUrl: './kanban-column.component.scss'
})
export class KanbanColumnComponent {
	protected readonly store = inject(Store);
	protected readonly dialogService = inject(DialogService);

	public columnType = input<string>('ToDo');
	public tasks = input<Task[]>([]);

  public ref: DynamicDialogRef | undefined;
	protected boardSelected = signal<number>(0);

	constructor() {
		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) =>
				this.boardSelected.set(boardSelected),
			);
	}

	showTaskSelected(): void {
    this.ref = this.dialogService.open(TaskDetailsComponent, {
      ...taskFormConfig,
    });

    this.ref.onClose.subscribe(() => {
				//@ToDo: It needs improve
				// When edit button is clicked, this part is called (not should)
				// Maybe with a edit event evaluation could be fixed
				this.store.dispatch(new fromStore.CleanTaskSelected());
				this.store.dispatch(new fromStore.ClearSubtasks());
				this.store.dispatch(
					new fromStore.LoadTasksByBoard(this.boardSelected()),
				);
			});
	}
}

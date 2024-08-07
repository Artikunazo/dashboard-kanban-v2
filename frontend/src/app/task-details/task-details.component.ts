import {AsyncPipe} from '@angular/common';
import {
	Component,
	DestroyRef,
	inject,
	OnDestroy,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogRef,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {Store} from '@ngrx/store';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {DeleteConfirmationComponent} from '../common/delete-confirmation/delete-confirmation.component';

import {
	deleteConfirmationConfig,
	taskFormConfig,
} from '../common/modal_configs';
import {Status} from '../models/status_models';
import {Subtask} from '../models/subtask_models';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import {SubtaskFormComponent} from '../subtask-form/subtask-form.component';
import {SubtasksOverviewComponent} from '../subtasks-overview/subtasks-overview.component';
import {TaskFormComponent} from '../task-form/task-form.component';

@Component({
	selector: 'task-details',
	standalone: true,
	imports: [
		SubtasksOverviewComponent,
		MatSelectModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatMenuModule,
		MatIconModule,
		AsyncPipe,
	],
	templateUrl: './task-details.component.html',
	styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnDestroy {
	protected readonly store = inject(Store);
	protected readonly matDialog = inject(MatDialog);
	protected readonly matDialogRef = inject(
		MatDialogRef,
	) as MatDialogRef<TaskDetailsComponent>;
	protected readonly destroyRef = inject(DestroyRef);
	protected readonly matDialogData = inject(MAT_DIALOG_DATA);

	@ViewChild('newSubtasks', {read: ViewContainerRef})
	public newSubtasksContainer!: ViewContainerRef;

	public task$ = new BehaviorSubject<Task>({} as Task);
	public subtasks$ = new BehaviorSubject<Subtask[]>([]);
	public statusOptions$ = new Observable<Status[]>();
	public statusSelected = new FormControl();
	protected readonly subtaskFormComponentClass = SubtaskFormComponent;

	constructor() {
		this.store.dispatch(new fromStore.LoadStatuses());
		this.statusOptions$ = this.store.select(fromStore.selectStatusData).pipe(
			takeUntilDestroyed(),
			map((status: Status[]) => status),
		);

		this.store
			.select(fromStore.selectTask)
			.pipe(
				map((task: Task | null) => {
					if (!task) {
						this.store.dispatch(
							new fromStore.LoadTask(this.matDialogData.taskId),
						);
						return null;
					}

					return task;
				}),
				takeUntilDestroyed(),
			)
			.subscribe({
				next: (task: Task | null) => {
					if (!task) return;

					this.statusSelected.setValue(task.status);

					this.statusSelected.valueChanges
						.pipe(takeUntilDestroyed())
						.subscribe({
							next: (value: string) => {
								this.store.dispatch(
									new fromStore.UpdateStatusTask({
										task: this.task$.getValue(),
										status: value,
									}),
								);
							},
						});

					this.task$.next(task);
				},
			});

		if (this.task$.getValue().totalSubtasks > 0) {
			this.store.dispatch(
				new fromStore.LoadSubtasks(this.matDialogData.taskId),
			);

			this.store
				.select(fromStore.selectSubtasks)
				.pipe(takeUntilDestroyed())
				.subscribe({
					next: (subtasks: Subtask[]) => {
						this.subtasks$.next(subtasks);
					},
				});
		}
	}

	subtaskUpdated(event: Subtask) {
		this.store.dispatch(new fromStore.UpdateSubtask(event));
	}

	deleteConfirmation(isDeleting: boolean): void {
		const task = this.task$.getValue();

		if (isDeleting) {
			this.matDialog
				.open(DeleteConfirmationComponent, deleteConfirmationConfig)
				.afterClosed()
				.subscribe({
					next: (resultDeleting: boolean) => {
						if (!resultDeleting) return;

						if (!task.id) {
							return;
						}

						this.store.dispatch(new fromStore.DeleteTask(+task.id));
						this.matDialogRef.close();
					},
				});
		}
	}

	editTask(): void {
		if (!this.task$.getValue()) {
			return;
		}

		this.matDialog
			.open(TaskFormComponent, {
				...taskFormConfig,
				data: {
					taskId: this.task$.getValue().id,
				},
			})
			.afterClosed()
			.subscribe(() => {
				this.store.dispatch(new fromStore.CleanTaskSelected());
			});

		this.matDialogRef.close();
	}

	addSubtask() {
		const newComponent = this.newSubtasksContainer.createComponent(
			this.subtaskFormComponentClass,
		);

		newComponent.instance.subtaskSaved.subscribe((response: string) => {
			if (response.length < 1) return;

			this.store.dispatch(
				new fromStore.SaveSubtask({
					title: response.toString(),
					isDone: false,
					taskId: +this.task$.getValue().id,
				} as Subtask),
			);

			newComponent.destroy(); // Remove current component from template
		});
	}

	ngOnDestroy() {
		this.task$.complete();
	}
}

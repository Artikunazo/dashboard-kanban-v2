import {AsyncPipe} from '@angular/common';
import {
	Component,
	inject,
	signal,
	viewChild,
	ViewContainerRef,
} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'task-details',
    imports: [
        SubtasksOverviewComponent,
        ReactiveFormsModule,
        ButtonModule,
        AsyncPipe,
        ProgressSpinnerModule,
        ButtonModule
    ],
    templateUrl: './task-details.component.html',
    styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
	private readonly store = inject(Store);
  private readonly dialogService = inject(DialogService);

	private readonly subtaskFormComponentClass = SubtaskFormComponent;
  private dialogRef: DynamicDialogRef | undefined;
	public newSubtasksContainer = viewChild('newSubtasks', {read: ViewContainerRef});
	public task = signal<Task>({} as Task);
	public subtasks = signal<Subtask[]>([]);
	public statusOptions = toSignal(this.store.select(fromStore.selectStatusData));
	public isLoadingSubtasks = signal<boolean>(true);
	public statusSelected = new FormControl();

	constructor() {
		this.store.dispatch(new fromStore.LoadStatuses());

		this.store
			.select(fromStore.selectTask)
			.pipe(takeUntilDestroyed())
			.subscribe({
				next: (task: Task | null) => {
					if (task) {
						this.task.set(task);

						this.statusSelected.setValue(this.task().status);
						this.statusSelected.valueChanges
							.pipe(takeUntilDestroyed())
							.subscribe({
								next: (value: string) => {
									this.store.dispatch(
										new fromStore.UpdateStatusTask({
											task: this.task(),
											status: value,
										}),
									);
								},
							});

						if (this.task().totalSubtasks > 0) {
							this.store.dispatch(
								new fromStore.LoadSubtasks(+this.task().id),
							);

							this.store
								.select(fromStore.selectSubtasks)
								.pipe(takeUntilDestroyed())
								.subscribe({
									next: (subtasks: Subtask[]) => {
										this.subtasks.set(subtasks);
									},
								});
						}

						this.isLoadingSubtasks.set(false);
					}
				},
			});
	}

	subtaskUpdated(event: Subtask) {
		this.store.dispatch(new fromStore.UpdateSubtask(event));
	}

	deleteConfirmation(isDeleting: boolean): void {
		const task = this.task();

		if (isDeleting) {
      this.dialogRef = this.dialogService.open(DeleteConfirmationComponent, deleteConfirmationConfig);

			this.dialogRef.onClose.subscribe({
				next: (resultDeleting: boolean) => {
						if (!resultDeleting) return;

						if (!task.id) {
							return;
						}

						this.store.dispatch(new fromStore.DeleteTask(+task.id));
						// this.dialogRef.close();
					},
				});
		}
	}

	editTask(): void {
		if (!this.task()) {
			return;
		}

		 this.dialogRef = this.dialogService.open(TaskFormComponent, {
				...taskFormConfig,
				data: {
					taskId: this.task().id,
				},
			});

			this.dialogRef.onClose.subscribe(() => {
				this.store.dispatch(new fromStore.CleanTaskSelected());
			});

	}

	addSubtask() {
		const newComponent = this.newSubtasksContainer()?.createComponent(
			this.subtaskFormComponentClass,
		);

		newComponent?.instance.subtaskSaved.subscribe((response: string) => {
			if (response.length < 1) return;

			const progressSpinnerComponent = this.newSubtasksContainer()?.createComponent(ProgressSpinner);

			this.store.dispatch(
				new fromStore.AddSubtask({
					title: response.toString(),
					isDone: false,
					taskId: +this.task().id,
				} as Subtask),
			);

			progressSpinnerComponent?.destroy();
			newComponent?.destroy(); // Remove current component from template
		});
	}
}

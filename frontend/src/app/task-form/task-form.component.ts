import {AsyncPipe} from '@angular/common';
import {Component, effect, inject, signal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import {Task} from '../models/tasks_models';
import {InputTextModule} from 'primeng/inputtext';
import {Select, SelectModule} from 'primeng/select';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {FloatLabel} from 'primeng/floatlabel';
import * as fromStore from '../store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'task-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		CustomButtonComponent,
		AsyncPipe,
		InputTextModule,
		Select,
		ProgressSpinnerModule,
		FloatLabel,
	],
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
	private readonly formBuilder = inject(FormBuilder);
	private readonly store = inject(Store) as Store<fromStore.AppState>;
	private readonly dialogRef = inject(DynamicDialogRef);

	protected boardSelected = signal<number>(0);
	public taskForm!: FormGroup;
	public statusOptions = toSignal(
		this.store.select(fromStore.selectStatusData),
	);
	public taskSelected = signal<Task>({} as Task);
	public isLoading = signal<boolean>(false);
	public virtualScroll = signal<boolean>(true);

	constructor() {
		this.initTaskForm();

		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) => {
				this.boardSelected.set(boardSelected);
			});

		this.store.dispatch(new fromStore.LoadStatuses());

		this.store
			.select(fromStore.selectTask)
			.pipe(takeUntilDestroyed())
			.subscribe({
				next: (task: Task | null) => {
					if (task) {
						this.taskSelected.set(task);

						this.taskForm.get('title')?.setValue(this.taskSelected().title);
						this.taskForm
							.get('description')
							?.setValue(this.taskSelected().description);
						this.taskForm.get('status')?.setValue({
							id: this.taskSelected().statusId,
							name: this.taskSelected().status,
						});
					}
				},
			});

		effect(() => {
			console.log('Status', this.statusOptions());
		})
	}

	initTaskForm() {
		this.taskForm = this.formBuilder.group({
			title: this.formBuilder.control('', [Validators.required]),
			description: this.formBuilder.control('', [Validators.required]),
			status: this.formBuilder.control('', [Validators.required]),
		});
	}

	closeDialog(): void {
		this.taskSelected.set({} as Task);
		this.dialogRef.close();
	}

	createTask() {
		this.isLoading.set(true);
		if (this.taskForm.invalid) return;

		const newTaskData: Task = {
			id: '',
			title: this.taskForm.value.title,
			description: this.taskForm.value.description,
			statusId: this.taskForm.value.status.id,
			boardId: this.boardSelected(),
			countDoneSubtasks: 0,
			totalSubtasks: 0,
			status: this.taskForm.value.status.name,
		};

		if (this.taskSelected().id) {
			newTaskData['id'] = this.taskSelected().id;
			this.store.dispatch(new fromStore.UpdateTask({...newTaskData}));
		} else {
			this.store.dispatch(new fromStore.AddTask({...newTaskData}));
		}

		this.closeDialog();
	}
}

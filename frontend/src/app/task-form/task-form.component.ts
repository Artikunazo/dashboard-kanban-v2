import {Component, inject} from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Store} from '@ngrx/store';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import {Status} from '../models/status_models';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';

@Component({
	selector: 'task-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		CustomButtonComponent,
	],
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
	private readonly formBuilder = inject(FormBuilder);
	private readonly store = inject(Store) as Store<fromStore.AppState>;
	private matDialogRef = inject(
		MatDialogRef,
	) as MatDialogRef<TaskFormComponent>;

	protected boardSelected!: number;

	public taskForm!: FormGroup;
	public statusOptions: Status[] = [];
	public taskSelected: Task | null = null;

	constructor() {
		let subtasks = [
			this.formBuilder.group({
				title: this.formBuilder.control('', [Validators.required]),
				status: this.formBuilder.control('ToDo'),
			}),
		];

		this.store
			.select(fromStore.selectBoardSelected)
			.subscribe((boardSelected: number) => {
				this.boardSelected = boardSelected;
			});

		this.store.dispatch(new fromStore.LoadStatuses());
		this.store.select(fromStore.selectStatusData).subscribe({
			next: (status: Status[]) => {
				this.statusOptions = status;
			},
		});

		this.store.select(fromStore.selectTask).subscribe({
			next: (task: Task | null) => {
				this.taskSelected = task;

				if (this.taskSelected) {
					subtasks = this.taskSelected.subtasks.map((subtask) => {
						return this.formBuilder.group({
							title: this.formBuilder.control(subtask.title ?? '', [
								Validators.required,
							]),
							status: this.formBuilder.control(
								!subtask.isDone ? 'ToDo' : 'Done',
							),
						});
					});
				}

				this.taskForm = this.formBuilder.group({
					title: this.formBuilder.control(this.taskSelected?.title || '', [
						Validators.required,
					]),
					description: this.formBuilder.control(
						this.taskSelected?.description || '',
						[Validators.required],
					),
					subtasks: this.formBuilder.array(subtasks),
					status: this.formBuilder.control(this.taskSelected?.statusId || '', [
						Validators.required,
					]),
				});
			},
		});
	}

	get subtasks() {
		return this.taskForm.get('subtasks') as FormArray;
	}

	ngOnInit() {
		this.matDialogRef.afterClosed().subscribe(() => {
			this.taskSelected = null;
			this.taskForm.reset();
		});
	}

	closeDialog(): void {
		this.taskSelected = null;
		this.matDialogRef.close();
	}

	addSubtask() {
		return this.subtasks.push(
			this.formBuilder.group({
				title: this.formBuilder.control('', [Validators.required]),
				status: this.formBuilder.control('ToDo'),
			}),
		);
	}

	createTask() {
		if (this.taskForm.invalid) return;

		const newTaskData: Task = {
			id: '',
			title: this.taskForm.value.title,
			description: this.taskForm.value.description,
			statusId: this.taskForm.value.status,
			boardId: this.boardSelected,
			subtasks: <[]>this.taskForm.value.subtasks,
		};

		if (this.taskSelected) {
			newTaskData['id'] = this.taskSelected.id;
			console.log(newTaskData);
			this.store.dispatch(new fromStore.UpdateTask({...newTaskData}));
		} else {
			this.store.dispatch(new fromStore.AddTask({...newTaskData}));
		}

		this.closeDialog();
	}

	updateTask() {
		if (this.taskForm.invalid) return;
	}
}

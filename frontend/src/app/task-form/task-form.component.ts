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

	constructor() {
		this.taskForm = this.formBuilder.group({
			title: this.formBuilder.control('', [Validators.required]),
			description: this.formBuilder.control('', [Validators.required]),
			subtasks: this.formBuilder.array([
				this.formBuilder.group({
					title: this.formBuilder.control('', [Validators.required]),
					status: this.formBuilder.control('ToDo'),
				}),
			]),
			status: this.formBuilder.control('', [Validators.required]),
		});
	}

	get subtasks() {
		return this.taskForm.get('subtasks') as FormArray;
	}

	ngOnInit() {
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

		// @ToDo: validate if the task is in edit mode
		// If editMode is on, dispatch get subtasks by idTask
		// this.store.select(fromStore.getTasks).subscribe({
		//   next: (tasks: Task[]) => {
		//     if(tasks.length === 0) {
		//       this.store.dispatch(new fromStore.LoadTasks());
		//     } else {

		//     }
		//   }
		// })
	}

	closeDialog(): void {
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

		this.store.dispatch(
			new fromStore.AddTask({
				title: this.taskForm.value.title,
				description: this.taskForm.value.description,
				statusId: this.taskForm.value.status,
				boardId: this.boardSelected,
				subtasks: <[]>this.taskForm.value.subtasks,
			}),
		);

		this.closeDialog();
	}
}

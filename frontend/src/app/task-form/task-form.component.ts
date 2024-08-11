import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Store} from '@ngrx/store';
import {BehaviorSubject, map, Observable} from 'rxjs';
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
		MatCheckboxModule,
		MatIconModule,
		AsyncPipe,
	],
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnDestroy {
	private readonly formBuilder = inject(FormBuilder);
	private readonly store = inject(Store) as Store<fromStore.AppState>;
	private matDialogRef = inject(
		MatDialogRef,
	) as MatDialogRef<TaskFormComponent>;
	protected readonly matDialogData = inject(MAT_DIALOG_DATA);

	public taskForm!: FormGroup;
	public statusOptions$ = new Observable<Status[]>();
	protected boardSelected$ = new BehaviorSubject<number>(0);
	public taskSelected$ = new BehaviorSubject<Task>({} as Task);

	constructor() {
		this.initTaskForm();

		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) => {
				this.boardSelected$.next(boardSelected);
			});

		this.store.dispatch(new fromStore.LoadStatuses());
		this.statusOptions$ = this.store.select(fromStore.selectStatusData).pipe(
			map((status: Status[]) => status),
			takeUntilDestroyed(),
		);

		this.store
			.select(fromStore.selectTask)
			.pipe(takeUntilDestroyed())
			.subscribe({
				next: (task: Task | null) => {
					if (task) {
						console.log(task);
						this.taskSelected$.next(task);

						this.taskForm
							.get('title')
							?.setValue(this.taskSelected$.getValue().title);
						this.taskForm
							.get('description')
							?.setValue(this.taskSelected$.getValue().description);
						this.taskForm
							.get('status')
							?.setValue({
								id: this.taskSelected$.getValue().statusId,
								name: this.taskSelected$.getValue().status,
							});

						console.log(this.taskForm.value);
					}
				},
			});
	}

	initTaskForm() {
		this.taskForm = this.formBuilder.group({
			title: this.formBuilder.control('', [Validators.required]),
			description: this.formBuilder.control('', [Validators.required]),
			status: this.formBuilder.control('', [Validators.required]),
		});
	}

	ngOnInit() {
		this.matDialogRef.afterClosed().subscribe(() => {
			this.taskSelected$.complete();
			this.taskForm.reset();
		});
	}

	closeDialog(): void {
		this.taskSelected$.complete();
		this.matDialogRef.close();
	}

	createTask() {
		if (this.taskForm.invalid) return;

		const newTaskData: Task = {
			id: '',
			title: this.taskForm.value.title,
			description: this.taskForm.value.description,
			statusId: this.taskForm.value.status.id,
			boardId: this.boardSelected$.getValue(),
			countDoneSubtasks: 0,
			totalSubtasks: 0,
			status: this.taskForm.value.status.name,
		};

		if (this.taskSelected$.getValue().id) {
			newTaskData['id'] = this.taskSelected$.getValue().id;
			this.store.dispatch(new fromStore.UpdateTask({...newTaskData}));
		} else {
			this.store.dispatch(new fromStore.AddTask({...newTaskData}));
		}

		this.closeDialog();
	}

	ngOnDestroy() {
		this.boardSelected$.complete();
		this.taskSelected$.complete();
	}
}

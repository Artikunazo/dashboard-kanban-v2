import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
	FormArray,
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
	protected boardSelected$ = new BehaviorSubject<number>(0);
	public statusOptions$ = new Observable<Status[]>();
	public taskSelected$ = new BehaviorSubject<Task>({} as Task);

	constructor() {
		let subtasks = [
			this.formBuilder.group({
				title: this.formBuilder.control('', [Validators.required]),
				status: this.formBuilder.control('ToDo'),
			}),
		];

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
					console.info('Before', task);

					if (task) {
						console.info('after !task condition', task);
						subtasks = task.subtasks.map((subtask) => {
							return this.formBuilder.group({
								title: this.formBuilder.control(subtask.title ?? '', [
									Validators.required,
								]),
								status: this.formBuilder.control(
									!subtask.isDone ? 'ToDo' : 'Done',
								),
							});
						});

						this.taskForm = this.formBuilder.group({
							title: this.formBuilder.control(task?.title ?? '', [
								Validators.required,
							]),
							description: this.formBuilder.control(task?.description ?? '', [
								Validators.required,
							]),
							subtasks: this.formBuilder.array(subtasks),
							status: this.formBuilder.control(task?.statusId ?? '', [
								Validators.required,
							]),
						});

						this.taskSelected$.next(task);
					}
				},
			});
	}

	get subtasks() {
		return this.taskForm.get('subtasks') as FormArray;
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
			boardId: this.boardSelected$.getValue(),
			subtasks: <[]>this.taskForm.value.subtasks,
			countDoneSubtasks: this.taskForm.value.subtasks.length,
		};

		if (this.taskSelected$.getValue()) {
			newTaskData['id'] = this.taskSelected$.getValue().id;
			this.store.dispatch(new fromStore.UpdateTask({...newTaskData}));
		} else {
			this.store.dispatch(new fromStore.AddTask({...newTaskData}));
		}

		this.closeDialog();
	}

	removeSubtask(index: number) {
		this.subtasks.removeAt(index);
	}

	ngOnDestroy() {
		this.boardSelected$.complete();
		this.taskSelected$.complete();
	}
}

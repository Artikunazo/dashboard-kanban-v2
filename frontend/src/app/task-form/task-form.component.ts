import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import {Status} from '../models/status_models';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'task-form',
    imports: [
        ReactiveFormsModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatSelectModule,
        CustomButtonComponent,
        // MatCheckboxModule,
        // MatIconModule,
        AsyncPipe,
				InputTextModule,
        SelectModule
        // MatProgressSpinnerModule,
    ],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnDestroy, OnInit {
	private readonly formBuilder = inject(FormBuilder);
	private readonly store = inject(Store) as Store<fromStore.AppState>;
	// private matDialogRef = inject(
	// 	MatDialogRef,
	// ) as MatDialogRef<TaskFormComponent>;
	// protected readonly matDialogData = inject(MAT_DIALOG_DATA);

	public taskForm!: FormGroup;
	public statusOptions = toSignal(this.store.select(fromStore.selectStatusData));
	protected boardSelected$ = new BehaviorSubject<number>(0);
	public taskSelected = signal<Task>({} as Task);
	public isLoading$ = new BehaviorSubject<boolean>(false);

	constructor() {
		this.initTaskForm();

		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) => {
				this.boardSelected$.next(boardSelected);
			});

		this.store.dispatch(new fromStore.LoadStatuses());

		this.store
			.select(fromStore.selectTask)
			.pipe(takeUntilDestroyed())
			.subscribe({
				next: (task: Task | null) => {
					if (task) {
						this.taskSelected.set(task);

						this.taskForm
							.get('title')
							?.setValue(this.taskSelected().title);
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
	}

	initTaskForm() {
		this.taskForm = this.formBuilder.group({
			title: this.formBuilder.control('', [Validators.required]),
			description: this.formBuilder.control('', [Validators.required]),
			status: this.formBuilder.control('', [Validators.required]),
		});
	}

	ngOnInit() {
		// this.matDialogRef.afterClosed().subscribe(() => {
		// 	this.taskSelected$.complete();
		// 	this.taskForm.reset();
		// });
	}

	closeDialog(): void {
		this.taskSelected.set({} as Task);
		// this.matDialogRef.close();
	}

	createTask() {
		this.isLoading$.next(true);
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

		if (this.taskSelected().id) {
			newTaskData['id'] = this.taskSelected().id;
			this.store.dispatch(new fromStore.UpdateTask({...newTaskData}));
		} else {
			this.store.dispatch(new fromStore.AddTask({...newTaskData}));
		}

		this.closeDialog();
	}

	ngOnDestroy() {
		this.boardSelected$.complete();
		this.isLoading$.complete();
	}
}

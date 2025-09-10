// import {importProvidersFrom} from '@angular/core';
// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {Store, StoreModule} from '@ngrx/store';
// import {of} from 'rxjs';
// import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
// import {taskFake} from '../mocks/task_mocks';
// import {Task} from '../models/tasks_models';
// import {reducers} from '../store/reducers';
// import {TaskFormComponent} from './task-form.component';

// describe('TaskFormComponent', () => {
// 	let component: TaskFormComponent;
// 	let fixture: ComponentFixture<TaskFormComponent>;
// 	let store: Store;
// 	let formBuilder: FormBuilder;
// 	let matDialogRef: MatDialogRef<TaskFormComponent>;
// 	let matDialogData;

// 	beforeEach(async () => {
// 		await TestBed.configureTestingModule({
// 			imports: [
// 				ReactiveFormsModule,
// 				MatFormFieldModule,
// 				MatInputModule,
// 				MatSelectModule,
// 				StoreModule.forRoot(reducers),
// 				TaskFormComponent,
// 				CustomButtonComponent,
// 				BrowserAnimationsModule,
// 			],
// 			providers: [
// 				importProvidersFrom(Store),
// 				{
// 					provide: MatDialogRef,
// 					useValue: {
// 						afterClosed: () => of(true),
// 					},
// 				},
// 				{
// 					provide: MAT_DIALOG_DATA,
// 					useValue: {
// 						data: taskFake,
// 					},
// 				},
// 			],
// 		}).compileComponents();
// 	});

// 	beforeEach(() => {
// 		fixture = TestBed.createComponent(TaskFormComponent);
// 		component = fixture.componentInstance;
// 		store = TestBed.inject(Store);
// 		formBuilder = TestBed.inject(FormBuilder);
// 		matDialogRef = TestBed.inject(MatDialogRef);
// 		matDialogData = TestBed.inject(MAT_DIALOG_DATA);
// 		fixture.detectChanges();
// 	});

// 	it('should create', () => {
// 		expect(component).toBeTruthy();
// 	});

// 	describe('Life cycle', () => {
// 		// describe('OnInit', () => {});

// 		describe('OnDestroy', () => {
// 			it('should complete behavior subjects ', () => {
// 				component.ngOnDestroy();

// 				expect(component.isLoading$.value).toBe(false);
// 				expect(component.taskSelected$.value).toEqual({} as Task);
// 			});
// 		});
// 	});

// 	describe('Task form', () => {
// 		it('should initialize Task form', () => {
// 			component.initTaskForm();

// 			expect(component.taskForm.value).toEqual({
// 				title: '',
// 				description: '',
// 				status: '',
// 			});
// 		});
// 	});

// 	// it('should set taskForm input properties', () => {
// 	// 	const title = 'Test Title';
// 	// 	const description = 'Test Description';
// 	// 	const subtasks = [
// 	// 		{title: 'Test Subtask 1', status: 'ToDo'},
// 	// 		{title: 'Test Subtask 2', status: 'Doing'},
// 	// 	];
// 	// 	const status = 'Done';
// 	// 	component.taskForm = new FormGroup({
// 	// 		title: new FormControl(title),
// 	// 		description: new FormControl(description),
// 	// 		subtasks: new FormArray(
// 	// 			subtasks.map(
// 	// 				(subtask) =>
// 	// 					new FormGroup({
// 	// 						title: new FormControl(subtask.title),
// 	// 						status: new FormControl(subtask.status),
// 	// 					}),
// 	// 			),
// 	// 		),
// 	// 		status: new FormControl(status),
// 	// 	});
// 	// 	component.taskForm.setValue({title, description, subtasks, status});
// 	// 	expect(component.taskForm.value).toEqual({
// 	// 		title,
// 	// 		description,
// 	// 		subtasks,
// 	// 		status,
// 	// 	});
// 	// });

// 	// it('should add subtask when addSubtask is called', () => {
// 	// 	const subtasksLength = component.subtasks.length;
// 	// 	component.addSubtask();
// 	// 	expect(component.subtasks.length).toEqual(subtasksLength + 1);
// 	// });

// 	// it('should dispatch AddTask action when createTask is called', () => {
// 	// 	const title = 'Test Title';
// 	// 	const description = 'Test Description';
// 	// 	const subtasks = [
// 	// 		{title: 'Test Subtask 1', status: 'ToDo'},
// 	// 		{title: 'Test Subtask 2', status: 'Doing'},
// 	// 	];
// 	// 	const status = 'Done';
// 	// 	const id = 'test-id';
// 	// 	component.taskForm = new FormGroup({
// 	// 		title: new FormControl(title),
// 	// 		description: new FormControl(description),
// 	// 		subtasks: new FormArray(
// 	// 			subtasks.map(
// 	// 				(subtask) =>
// 	// 					new FormGroup({
// 	// 						title: new FormControl(subtask.title),
// 	// 						status: new FormControl(subtask.status),
// 	// 					}),
// 	// 			),
// 	// 		),
// 	// 		status: new FormControl(status),
// 	// 	});
// 	// 	component.taskForm.setValue({title, description, subtasks, status});
// 	// 	const dispatchSpy = jest.spyOn(store, 'dispatch');
// 	// 	component.createTask();
// 	// 	expect(dispatchSpy).toHaveBeenCalledWith(
// 	// 		new fromStore.AddTask({
// 	// 			title,
// 	// 			description,
// 	// 			subtasks,
// 	// 			status,
// 	// 			id: expect.any(String),
// 	// 		}),
// 	// 	);
// 	// });
// });

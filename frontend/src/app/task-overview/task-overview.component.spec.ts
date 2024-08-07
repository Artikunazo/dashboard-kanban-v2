// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {
// 	MatDialog,
// 	MatDialogModule,
// 	MatDialogRef,
// } from '@angular/material/dialog';
// import {Store, StoreModule} from '@ngrx/store';
// import {Task} from 'src/app/models/tasks_models';
// import * as fromStore from 'src/app/store';
// import * as fromTaskReducer from 'src/app/store/reducers/tasks_reducer';
// import {TaskOverviewComponent} from 'src/app/task-overview/task-overview.component';
// import {KanbanCardComponent} from './task-overview.component';

// describe('KanbanCardComponent', () => {
// 	let component: KanbanCardComponent;
// 	let fixture: ComponentFixture<KanbanCardComponent>;
// 	let store: Store;
// 	let matDialog: MatDialog;
// 	let matDialogRef: MatDialogRef<TaskOverviewComponent>;

// 	beforeEach(async () => {
// 		await TestBed.configureTestingModule({
// 			imports: [
// 				MatDialogModule,
// 				StoreModule.forRoot({}),
// 				StoreModule.forFeature('tasks', fromTaskReducer.reducer),
// 				KanbanCardComponent,
// 				TaskOverviewComponent,
// 			],
// 			providers: [{provide: MatDialogRef, useValue: {}}],
// 		}).compileComponents();
// 	});

// 	beforeEach(() => {
// 		fixture = TestBed.createComponent(KanbanCardComponent);
// 		component = fixture.componentInstance;
// 		store = TestBed.inject(Store);
// 		matDialog = TestBed.inject(MatDialog);
// 		matDialogRef = TestBed.inject(MatDialogRef);
// 		jest.spyOn(matDialog, 'open');
// 		fixture.detectChanges();
// 	});

// 	it('should create', () => {
// 		expect(component).toBeTruthy();
// 	});

// 	it('should dispatch LoadTasks action when TaskOverviewComponent is closed', () => {
// 		const subtasks = [
// 			{
// 				title: 'subtast 1',
// 				status: 'ToDo',
// 			},
// 		];
// 		const taskData: Task = {
// 			id: '1',
// 			title: 'Test Task',
// 			description: 'test',
// 			subtasks,
// 			status: 'ToDo',
// 		};
// 		component.openTaskOverviewModal(taskData);
// 		matDialogRef.close();
// 		expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTasks());
// 	});

// 	it('should not dispatch LoadTasks action when TaskOverviewComponent is closed with no task data', () => {
// 		component.openTaskOverviewModal(undefined);
// 		matDialogRef.close();
// 		expect(store.dispatch).not.toHaveBeenCalled();
// 	});
// });

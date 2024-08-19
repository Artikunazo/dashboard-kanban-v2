import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {Store, StoreModule} from '@ngrx/store';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, of} from 'rxjs';
import {taskFake} from '../mocks/task_mocks';
import * as fromStore from '../store';
import * as fromBoardReducer from '../store/reducers/board_reducers';
import * as fromStatusReducer from '../store/reducers/status_reducers';
import * as fromSubtaskReducer from '../store/reducers/subtask_reducers';
import * as fromThemeReducer from '../store/reducers/theme_reducer';

import {AsyncPipe} from '@angular/common';
import {DeleteConfirmationComponent} from '../common/delete-confirmation/delete-confirmation.component';
import {TaskOverviewComponent} from './task-overview.component';

describe('Task Overview Component', () => {
	let component: TaskOverviewComponent;
	let fixture: ComponentFixture<TaskOverviewComponent>;
	let store: Store;
	let matDialog: MatDialog;
	let matDialogRef: MatDialogRef<DeleteConfirmationComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [
				MatCardModule,
				MatButtonModule,
				MatMenuModule,
				MatIconModule,
				AsyncPipe,
				StoreModule.forRoot({}),
				StoreModule.forFeature('board', fromBoardReducer.reducer),
				StoreModule.forFeature('tasks', fromBoardReducer.reducer),
				StoreModule.forFeature({
					name: 'theme',
					reducer: fromThemeReducer.reducer,
				}),
				StoreModule.forFeature({
					name: 'status',
					reducer: fromStatusReducer.reducer,
				}),
				StoreModule.forFeature({
					name: 'subtask',
					reducer: fromSubtaskReducer.reducer,
				}),
			],
			providers: [
				{
					provide: Store,
					useValue: {
						select: () => of(1),
						dispatch: () => undefined,
					},
				},
				{
					provide: MatDialogRef,
					useValue: {
						afterClosed: () => of(true),
					},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskOverviewComponent);
		component = fixture.componentInstance;
		store = TestBed.inject(Store);
		matDialog = TestBed.inject(MatDialog);
		matDialogRef = TestBed.inject(MatDialogRef);
		fixture.componentRef.setInput('task', taskFake);
		fixture.detectChanges();
	});

	it('should create component ', () => {
		expect(component).toBeTruthy();
	});

	it('should board selected to be greater than or equal to 1', () => {
		component['boardSelected$'] = new BehaviorSubject(1);
		expect(component['boardSelected$'].value).toBeGreaterThanOrEqual(1);
	});

	describe('Life Cycle', () => {
		it('should call ngOnDestroy', () => {
			component['boardSelected$'] = new BehaviorSubject(0);

			component.ngOnDestroy();

			expect(component['boardSelected$'].value).toBeFalsy();
		});
	});

	describe('emitShowTaskDialog method', () => {
		beforeEach(() => {
			spyOn(store, 'dispatch').calls.reset;
			spyOn(component.taskSelected, 'emit').calls.reset;
		});

		it('should call open dialog', () => {
			component.emitShowTaskDialog();
			const action = new fromStore.LoadTask(component.task());

			expect(store.dispatch).toHaveBeenCalledWith(action);
			expect(component.taskSelected.emit).toHaveBeenCalledWith(true);
		});

		it('should do not call open dialog when task id is undefined', () => {
			const task = {...taskFake, id: undefined};
			fixture.componentRef.setInput('task', task);

			component.emitShowTaskDialog();

			expect(store.dispatch).not.toHaveBeenCalled();
			expect(component.taskSelected.emit).not.toHaveBeenCalled();
		});

		it('should do not call open dialog when task id is null', () => {
			const task = {...taskFake, id: null};
			fixture.componentRef.setInput('task', task);

			component.emitShowTaskDialog();

			expect(store.dispatch).not.toHaveBeenCalled();
			expect(component.taskSelected.emit).not.toHaveBeenCalled();
		});

		it('should do not call open dialog when task id is zero', () => {
			const task = {...taskFake, id: 0};
			fixture.componentRef.setInput('task', task);

			component.emitShowTaskDialog();

			expect(store.dispatch).not.toHaveBeenCalled();
			expect(component.taskSelected.emit).not.toHaveBeenCalled();
		});
	});

	// describe('showDeleteConfirmationDialog method', () => {
	// 	beforeEach(() => {
	// 		spyOn(matDialog, 'open').calls.reset;
	// 		spyOn(matDialogRef, 'afterClosed').calls.reset;
	// 	});

	// 	it('should open delete confirmation modal', () => {
	// 		component.showDeleteConfirmationDialog();

	// 		matDialogRef.afterClosed().subscribe(() => {
	// 			expect(store.dispatch).toHaveBeenCalled();
	// 		});

	// 		expect(matDialog.open).toHaveBeenCalledWith(
	// 			DeleteConfirmationComponent,
	// 			deleteConfirmationConfig,
	// 		);
	// 	});
	// });
});

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

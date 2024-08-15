// import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
// import {importProvidersFrom, signal} from '@angular/core';
// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {Store, StoreModule} from '@ngrx/store';
// import {StatusCircleComponent} from '../common/status-circle/status-circle.component';
// import {Task} from '../models/tasks_models';
// import {reducers} from '../store/reducers';
// import {KanbanCardComponent} from '../task-overview/task-overview.component';
// import {KanbanColumnComponent} from './kanban-column.component';

// describe('KanbanColumnComponent', () => {
// 	const subtasks = [
// 		{
// 			title: 'subtast 1',
// 			status: 'ToDo',
// 		},
// 	];
// 	const tasks: Task[] = [
// 		{
// 			id: '1',
// 			title: 'Task 1',
// 			description: 'Description 1',
// 			status: 'ToDo',
// 			subtasks,
// 		},
// 		{
// 			id: '2',
// 			title: 'Task 2',
// 			description: 'Description 2',
// 			status: 'ToDo',
// 			subtasks,
// 		},
// 	];

// 	let component: KanbanColumnComponent;
// 	let fixture: ComponentFixture<KanbanColumnComponent>;

// 	beforeEach(async () => {
// 		await TestBed.configureTestingModule({
// 			imports: [
// 				KanbanColumnComponent,
// 				KanbanCardComponent,
// 				StatusCircleComponent,
// 				CdkDrag,
// 				CdkDropList,
// 				StoreModule.forRoot(reducers),
// 			],
// 			providers: [importProvidersFrom(Store)],
// 		}).compileComponents();
// 	});

// 	beforeEach(() => {
// 		fixture = TestBed.createComponent(KanbanColumnComponent);
// 		component = fixture.componentInstance;
// 		fixture.detectChanges();
// 	});

// 	it('should create', () => {
// 		expect(component).toBeTruthy();
// 	});

// 	it('should set columnType and tasks input properties', () => {
// 		const columnType = 'test-column';

// 		component.columnType = signal(columnType) as any;
// 		component.tasks = signal(tasks) as any;
// 		fixture.detectChanges();
// 		expect(component.columnType).toEqual(columnType);
// 		expect(component.tasks).toEqual(tasks);
// 	});

// 	it('should render the columnType and tasks in the template', () => {
// 		const columnType = 'test-column';
// 		component.columnType = signal(columnType) as any;
// 		component.tasks = signal(tasks) as any;
// 		fixture.detectChanges();
// 		const compiled = fixture.nativeElement;
// 		expect(
// 			compiled.querySelector('[data-testid="column-type"]').textContent,
// 		).toContain(columnType);
// 		expect(compiled.querySelectorAll('kanban-card').length).toEqual(
// 			tasks.length,
// 		);
// 	});
// });

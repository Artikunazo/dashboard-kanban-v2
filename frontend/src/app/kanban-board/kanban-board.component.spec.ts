// import {CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {Store, StoreModule} from '@ngrx/store';
// import {KanbanColumnComponent} from '../kanban-column/kanban-column.component';
// import {Task} from '../models/tasks_models';
// import * as fromStore from '../store';
// import * as fromTaskReducer from '../store/reducers/tasks_reducer';
// import {KanbanBoardComponent} from './kanban-board.component';

// describe('KanbanBoardComponent', () => {
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
// 			status: 'Doing',
// 			subtasks,
// 		},
// 	];

// 	let component: KanbanBoardComponent;
// 	let fixture: ComponentFixture<KanbanBoardComponent>;
// 	let store: Store;

// 	beforeEach(async () => {
// 		await TestBed.configureTestingModule({
// 			imports: [
// 				StoreModule.forRoot({}),
// 				StoreModule.forFeature('tasks', fromTaskReducer.reducer),
// 				DragDropModule,
// 				KanbanBoardComponent,
// 				KanbanColumnComponent,
// 			],
// 		}).compileComponents();
// 	});

// 	beforeEach(() => {
// 		fixture = TestBed.createComponent(KanbanBoardComponent);
// 		component = fixture.componentInstance;
// 		store = TestBed.inject(Store);
// 		fixture.detectChanges();
// 	});

// 	it('should create', () => {
// 		expect(component).toBeTruthy();
// 	});

// 	it('should dispatch LoadTasks action when ngOnInit is called', () => {
// 		const dispatchSpy = jest.spyOn(store, 'dispatch');
// 		component.ngOnInit();
// 		expect(dispatchSpy).toHaveBeenCalledWith(new fromStore.LoadTasks());
// 	});

// 	it('should index tasks when getTasks is emitted', () => {
// 		component.tasksList = tasks;
// 		component.indexTasks();
// 		expect(component.taskListIndexed).toEqual({
// 			ToDo: [tasks[0]],
// 			Doing: [tasks[1]],
// 		});
// 	});

// 	it('should dispatch UpdateTask action when drop is called', () => {
// 		const newStatus = 'Doing';
// 		const dispatchSpy = jest.spyOn(store, 'dispatch');
// 		component.drop({
// 			item: {dropContainer: {data: [tasks[0]]}},
// 			container: {element: {nativeElement: {id: newStatus}}},
// 		} as CdkDragDrop<Task[]>);
// 		expect(dispatchSpy).toHaveBeenCalledWith(
// 			new fromStore.UpdateTask({...tasks[0], status: newStatus}),
// 		);
// 	});
// });

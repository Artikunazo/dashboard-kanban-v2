import {AsyncPipe} from '@angular/common';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store, StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {BoardFormComponent} from './board-form/board-form.component';
import {boardDialogConfig, taskFormConfig} from './common/modal_configs';
import {KanbanBoardComponent} from './kanban-board/kanban-board.component';
import {Board} from './models/board_models';
import * as fromStore from './store';
import * as fromBoardReducer from './store/reducers/board_reducers';
import * as fromStatusReducer from './store/reducers/status_reducers';
import * as fromSubtaskReducer from './store/reducers/subtask_reducers';
import * as fromThemeReducer from './store/reducers/theme_reducer';
import {TaskFormComponent} from './task-form/task-form.component';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let store: Store;
	let matDialog: MatDialog;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ToolbarComponent,
				MatListModule,
				MatSidenavModule,
				MatSlideToggleModule,
				KanbanBoardComponent,
				ThemeSwitcherComponent,
				MatIconModule,
				MatButtonModule,
				BoardFormComponent,
				MatMenuModule,
				MatProgressSpinner,
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
				BrowserAnimationsModule,
				AppComponent,
			],
			providers: [
				// {
				// 	provide: Store,
				// 	useValue: {
				// 		dispatch: jasmine.createSpy('dispatch').and.returnValue(undefined),
				// 		select: jasmine.createSpy('select').and.returnValue(of([])),
				// 	},
				// },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		store = TestBed.inject(Store);
		matDialog = TestBed.inject(MatDialog);
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});

	//@ToDo
	// describe('Constructor', () => {
	// 	beforeEach(waitForAsync(() => {
	// 		component = TestBed.createComponent(AppComponent).componentInstance;
	// 		spyOn(store, 'dispatch').calls.reset;
	// 		spyOn(store, 'select').and.returnValue(of([boardMock]));
	// 	}));

	// 	it('should initialize the component', waitForAsync(() => {
	// 		const action = new fromStore.LoadBoards();
	// 		expect(store.dispatch).toHaveBeenCalledWith(action);
	// 		expect(store.select).toHaveBeenCalledTimes(1);
	// 		expect(component.boards$.value).toEqual([boardMock]);
	// 		expect(component.isLoading$.value).toBeFalse();
	// 	}));
	// });

	describe('Life cycle', () => {
		it('should destroy component', () => {
			component.ngOnDestroy();

			expect(component.boardSelected$.value).toBeFalsy();
			expect(component.isLoading$.value).toBeFalsy();
			expect(component.boards$.value).toEqual([]);
		});
	});

	describe('Boards', () => {
		describe('Create Board', () => {
			beforeEach(() => {
				spyOn(matDialog, 'open').calls.reset;
			});

			it('should open the edit board dialog', () => {
				component.showNewBoardDialog();
				expect(matDialog.open).toHaveBeenCalledTimes(1);
				expect(matDialog.open).toHaveBeenCalledWith(
					BoardFormComponent,
					boardDialogConfig,
				);
			});
		});

		describe('Edit Board', () => {
			beforeEach(() => {
				spyOn(matDialog, 'open').calls.reset;
			});

			it('should do not open the edit board dialog when id is 0', () => {
				const board = {id: 0, title: 'Board 1'};
				component.editBoard(board);
				expect(matDialog.open).not.toHaveBeenCalled();
			});

			it('should do not open the edit board dialog when title is empty', () => {
				const board = {id: 1, title: ''};
				component.editBoard(board);
				expect(matDialog.open).not.toHaveBeenCalled();
			});

			it('should do not open the edit board dialog when title and id are bad', () => {
				const board = {id: 0, title: ''};
				component.editBoard(board);
				expect(matDialog.open).not.toHaveBeenCalled();
			});

			it('should do not open the edit board dialog when board data is empty', () => {
				const board = {} as Board;
				component.editBoard(board);
				expect(matDialog.open).not.toHaveBeenCalled();
			});

			it('should open the edit board dialog', () => {
				const board = {id: 1, title: 'Board 1'};
				component.editBoard(board);
				expect(matDialog.open).toHaveBeenCalledTimes(1);
				expect(matDialog.open).toHaveBeenCalledWith(BoardFormComponent, {
					...boardDialogConfig,
					data: board,
				});
			});
		});

		describe('Delete Board', () => {
			beforeEach(() => {
				spyOn(store, 'dispatch').calls.reset;
			});

			it('should not delete a board if id board is empty or zero', () => {
				component.deleteBoard('');
				expect(store.dispatch).not.toHaveBeenCalled();

				component.deleteBoard(0);
				expect(store.dispatch).not.toHaveBeenCalled();
				fixture.detectChanges();
			});

			it('should not delete a board if id board is 0 as string', () => {
				component.deleteBoard('0');
				expect(store.dispatch).not.toHaveBeenCalled();
				fixture.detectChanges();
			});

			it('should not delete a board if id board is NaN', () => {
				component.deleteBoard('invalid');
				expect(store.dispatch).not.toHaveBeenCalled();
				fixture.detectChanges();
			});

			it('should dispatch the DeleteBoard action with the correct id', () => {
				const idBoard = 1;
				const action = new fromStore.DeleteBoard(idBoard);
				component.deleteBoard(idBoard);
				expect(store.dispatch).toHaveBeenCalledTimes(1);
				expect(store.dispatch).toHaveBeenCalledWith(action);
			});
		});
	});

	describe('Tasks', () => {
		describe('Create Task Modal', () => {
			beforeEach(() => {
				spyOn(matDialog, 'open').calls.reset;
			});

			it('should open create task modal', () => {
				component.openCreateTaskModal(true);

				expect(matDialog.open).toHaveBeenCalledWith(
					TaskFormComponent,
					taskFormConfig,
				);
			});

			it('should do not open create task modal', () => {
				component.openCreateTaskModal(false);

				expect(matDialog.open).not.toHaveBeenCalled();
			});
		});

		describe('Load Task By Board', () => {
			beforeEach(() => {
				spyOn(store, 'dispatch').calls.reset;
			});

			it('should do not execute dispatchers when id is 0', () => {
				const board = {id: 0, title: 'Board 1'};
				component.loadTasksByBoard(board);
				expect(store.dispatch).not.toHaveBeenCalled();
			});

			it('should do not execute dispatchers when title is empty', () => {
				const board = {id: 1, title: ''};
				component.loadTasksByBoard(board);
				expect(store.dispatch).not.toHaveBeenCalled();
			});

			it('should do not execute dispatchers when title and id are bad', () => {
				const board = {id: 0, title: ''};
				component.loadTasksByBoard(board);
				expect(store.dispatch).not.toHaveBeenCalled();
			});

			it('should do not execute dispatchers when board data is empty', () => {
				const board = {} as Board;
				component.loadTasksByBoard(board);
				expect(store.dispatch).not.toHaveBeenCalled();
			});

			it('should do not execute dispatchers when board data is correct', () => {
				const drawer = fixture.debugElement.query(By.directive(MatDrawer))
					.componentInstance as MatDrawer;
				spyOn(drawer, 'toggle');

				const board = {id: 1, title: 'Board 1'};
				const loadTasksByBoardAction = new fromStore.LoadTasksByBoard(board.id);
				const saveBoardTitleAction = new fromStore.SaveTitleBoard(board.title);
				expect(component.boardSelected$.value).toEqual(0);

				component.loadTasksByBoard(board);

				expect(store.dispatch).toHaveBeenCalledWith(loadTasksByBoardAction);
				expect(store.dispatch).toHaveBeenCalledWith(saveBoardTitleAction);
				expect(component.boardSelected$.value).toBeGreaterThanOrEqual(1);
				expect(drawer.toggle).toHaveBeenCalled();
			});
		});
	});
});

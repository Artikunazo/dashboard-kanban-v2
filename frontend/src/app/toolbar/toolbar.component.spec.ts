import {AsyncPipe} from '@angular/common';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import * as fromBoardReducer from '../store/reducers/board_reducers';
import * as fromStatusReducer from '../store/reducers/status_reducers';
import * as fromSubtaskReducer from '../store/reducers/subtask_reducers';
import * as fromThemeReducer from '../store/reducers/theme_reducer';
import {ToolbarComponent} from './toolbar.component';

describe('ToolbarComponent', () => {
	let component: ToolbarComponent;
	let fixture: ComponentFixture<ToolbarComponent>;
	let store: Store;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [
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
				ToolbarComponent,
				CustomButtonComponent,
				BrowserAnimationsModule,
				MatToolbarModule,
				AsyncPipe,
			],
			providers: [
				{
					provide: Store,
					useValue: {
						select: () => of('Subtitle test'),
					},
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarComponent);
		component = fixture.componentInstance;
		store = TestBed.inject(Store);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should subscribe to selectBoardTitle to set it to variable', () => {
		component.subtitle$.subscribe((subtitle) => {
			expect(subtitle).toBe('Subtitle test');
		});
	});

	it('should emit output', () => {
		spyOn(component.createTaskClicked, 'emit');
		component.openTaskFormModal();

		expect(component.createTaskClicked.emit).toHaveBeenCalledWith(true);
	});
});

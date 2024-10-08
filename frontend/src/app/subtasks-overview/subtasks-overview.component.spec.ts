// import {signal} from '@angular/core';
// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {SubtaskDoneDirective} from '../common/subtask-done.directive';
// import {Subtask} from '../models/tasks_models';
// import {SubtasksOverviewComponent} from './subtasks-overview.component';

// describe('SubtasksOverviewComponent', () => {
// 	let component: SubtasksOverviewComponent;
// 	let fixture: ComponentFixture<SubtasksOverviewComponent>;

// 	beforeEach(async () => {
// 		await TestBed.configureTestingModule({
// 			imports: [
// 				MatCheckboxModule,
// 				SubtasksOverviewComponent,
// 				SubtaskDoneDirective,
// 			],
// 		}).compileComponents();
// 	});

// 	beforeEach(() => {
// 		fixture = TestBed.createComponent(SubtasksOverviewComponent);
// 		component = fixture.componentInstance;
// 		fixture.detectChanges();
// 	});

// 	it('should create', () => {
// 		expect(component).toBeTruthy();
// 	});

// 	it('should set subtask and index signal properties', () => {
// 		const subtask: Subtask = {title: 'Test Subtask', status: 'ToDo', index: 0};
// 		const index = 1;
// 		component.subtask = signal(subtask) as any;
// 		component.index = signal(index) as any;
// 		fixture.detectChanges();
// 		expect(component.subtask()).toEqual(subtask);
// 		expect(component.index()).toEqual(index);
// 	});

// 	it('should emit subtaskUpdated output event when changed method is called', () => {
// 		const subtask: Subtask = {title: 'Test Subtask', status: 'ToDo', index: 0};
// 		const index = 1;
// 		component.subtask = signal(subtask) as any;
// 		component.index = signal(index) as any;
// 		const subtaskUpdatedSpy = jest.spyOn(component.subtaskUpdated, 'emit');
// 		component.changed(true);
// 		expect(subtaskUpdatedSpy).toHaveBeenCalledWith({
// 			title: subtask.title,
// 			status: 'Done',
// 			index: index,
// 		});
// 	});
// });

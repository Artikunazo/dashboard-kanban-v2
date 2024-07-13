import {Component, Inject, OnInit, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {Store} from '@ngrx/store';
import {SubtasksOverviewComponent} from '../common/subtasks-overview/subtasks-overview.component';
import {Status} from '../models/status_models';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';

@Component({
	selector: 'task-details',
	standalone: true,
	imports: [
		SubtasksOverviewComponent,
		MatSelectModule,
		MatFormFieldModule,
		ReactiveFormsModule,
	],
	templateUrl: './task-details.component.html',
	styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
	protected readonly store = inject(Store);

	public task!: Task;
	public statusSelected = new FormControl();
	public statusOptions: Status[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA)
		private readonly matDialogData: Task,
	) {
		this.store.dispatch(new fromStore.LoadStatuses());
		this.store.select(fromStore.selectStatusData).subscribe({
			next: (status: Status[]) => {
				this.statusOptions = status;
			},
		});

		this.store.select(fromStore.selectTask).subscribe({
			next: (task: Task | null) => {
				if (!task) return;

				this.task = task;
				this.statusSelected.setValue(task.statusId);
			},
		});
	}

	ngOnInit(): void {
		// this.statusSelected.valueChanges.subscribe({
		// 	next: (newValue) => {
		// 		this.store.dispatch(
		// 			new fromStore.UpdateTask({
		// 				...this.task,
		// 				//@ToDo: change to correctly. It'd receive id instead of string (name)
		// 				statusId: newValue ?? 'ToDo',
		// 			}),
		// 		);
		// 	},
		// });
	}

	subtaskUpdated(event: any) {
		console.log(this.task);
		// const {title, status, index} = event;
		// const newSubtasks = [...this.task.subtasks];
		// newSubtasks[index] = {title, status};
		// this.task = {...this.task, subtasks: newSubtasks};
		// console.log('after', this.task());
		// this.store.dispatch(new fromStore.UpdateTask(this.task()));
		// const {title, status, index} = event;
		// this.matDialogData.subTasks[index] = {...title, ...status};
		// const newSubtask = {
		// 	...this.task.subtasks[index],
		// 	...{status: status},
		// };
		// this.task.subtasks[index] = [...newSubtask.title, ...newSubtask.status];
		// console.log(this.task);
		// this.task.subtasks[index] = {
		// 	...title,
		// 	...status,
		// };
		// this.task.subtasks[event.index] = {...event};
		// this.task.subtasks[event.index] = {
		// 	...this.task.subtasks[event.index],
		// 	status: event.checked,
		// };
		// console.log('task after', this.task);
		// this.store.dispatch(
		//   new fromStore.UpdateTask({...this.task}),
		// );
	}
}

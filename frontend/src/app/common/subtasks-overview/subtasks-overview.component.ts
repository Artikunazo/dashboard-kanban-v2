import {Component, input, output} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Subtask} from '../../models/subtask_models';
import {SubtaskDoneDirective} from '../subtask-done.directive';

@Component({
	selector: 'subtasks-overview',
	standalone: true,
	imports: [MatCheckboxModule, SubtaskDoneDirective],
	templateUrl: './subtasks-overview.component.html',
	styleUrl: './subtasks-overview.component.scss',
})
export class SubtasksOverviewComponent {
	public subtask = input<Subtask>({title: '', isDone: false, taskId: null});
	public index = input<number>(0);
	public subtaskUpdated = output<{}>();

	public newSubtask!: Subtask;

	changed(checked: boolean) {
		this.newSubtask = {
			title: this.subtask()?.title,
			isDone: checked,
			taskId: null,
			// index: this.index(),
		};
		this.subtaskUpdated.emit(this.newSubtask);
	}
}

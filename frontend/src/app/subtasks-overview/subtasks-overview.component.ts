import {Component, input, output} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SubtaskDoneDirective} from '../common/subtask-done.directive';
import {Subtask} from '../models/subtask_models';

@Component({
	selector: 'subtasks-overview',
	standalone: true,
	imports: [MatCheckboxModule, SubtaskDoneDirective],
	templateUrl: './subtasks-overview.component.html',
	styleUrl: './subtasks-overview.component.scss',
})
export class SubtasksOverviewComponent {
	public subtask = input<Subtask>({} as Subtask);
	public index = input<number>(0);
	public subtaskUpdated = output<{}>();

	public newSubtask = {} as Subtask;

	changed(checked: boolean) {
		this.newSubtask = {
			...this.subtask(),
			isDone: checked,
		};

		this.subtaskUpdated.emit(this.newSubtask);
	}
}

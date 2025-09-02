import {Component, input, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SubtaskDoneDirective} from '../common/subtask-done.directive';
import {Subtask} from '../models/subtask_models';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
	selector: 'subtasks-overview',
	standalone: true,
	imports: [SubtaskDoneDirective, FormsModule, CheckboxModule],
	templateUrl: './subtasks-overview.component.html',
	styleUrl: './subtasks-overview.component.scss',
})
export class SubtasksOverviewComponent {
	public subtask = input<Subtask>({} as Subtask);
	public index = input<number>(0);
	public subtaskUpdated = output<Subtask>();

	changed(checked: boolean) {
		this.subtask().isDone = checked;

		this.subtaskUpdated.emit(this.subtask());
	}
}

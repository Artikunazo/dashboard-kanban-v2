import {Component, input, output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TaskOverview} from '../../models/tasks_models';

@Component({
	selector: 'kanban-card',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './task-overview.component.html',
	styleUrl: './task-overview.component.scss',
})
export class KanbanCardComponent {
	public taskSelected = output<TaskOverview>();
	public task = input.required<TaskOverview>();
}

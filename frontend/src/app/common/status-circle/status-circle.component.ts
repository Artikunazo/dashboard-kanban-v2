import {Component, input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TaskStatus} from 'src/app/models/tasks_models';
import {CustomIconDirective} from '../custom-icon.directive';

@Component({
    selector: 'status-circle',
    imports: [MatIconModule, CustomIconDirective],
    templateUrl: './status-circle.component.html',
    styleUrl: './status-circle.component.scss'
})
export class StatusCircleComponent {
	public columnTypes = TaskStatus;
	public columnStatus = input<TaskStatus | string>(TaskStatus.ToDo);
}

import {Component, output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Store} from '@ngrx/store';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import {TaskFormComponent} from '../task-form/task-form.component';

@Component({
	selector: 'toolbar',
	standalone: true,
	imports: [CustomButtonComponent, MatToolbarModule],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
	public openNav = output();

	public title = 'Kanban';
	public subtitle = 'Platform Launch';

	constructor(
		private readonly dialog: MatDialog,
		private readonly store: Store,
	) {}

	openTaskFormModal() {
		const dialogRef = this.dialog.open(TaskFormComponent, {
			width: '65%',
			maxHeight: '90vh',
		});

		dialogRef.afterClosed().subscribe(() => {
			// this.store.dispatch(new fromStore.LoadTask());
		});
	}
}

import {Component, inject, output} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import * as fromStore from '../store';
import {ToolbarModule} from 'primeng/toolbar';

@Component({
	selector: 'toolbar',
	imports: [CustomButtonComponent, ToolbarModule],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
	private readonly store = inject(Store);

	public openNav = output();
	public createTaskClicked = output<boolean>();

	public subtitle = toSignal(this.store.select(fromStore.selectBoardTitle));

	openTaskFormModal() {
		this.createTaskClicked.emit(true);
	}
}

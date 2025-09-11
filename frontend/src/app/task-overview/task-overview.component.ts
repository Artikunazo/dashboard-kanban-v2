import {Component, inject, input, output, signal, viewChild} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import { MenuCustomComponent } from '../components/menu-custom/menu-custom.component';

@Component({
	selector: 'task-overview',
	standalone: true,
	imports: [CardModule, ButtonModule, MenuModule, ConfirmDialog, MenuCustomComponent],
	providers: [ConfirmationService, MessageService],
	templateUrl: './task-overview.component.html',
	styleUrl: './task-overview.component.scss',
})
export class TaskOverviewComponent {
	private readonly store = inject(Store);
	private readonly messageService = inject(MessageService);

	protected boardSelected = signal<number>(0);
	public task = input.required<Task>();
	public taskSelected = output<boolean>();

	constructor() {
		this.store
			.select(fromStore.selectBoardSelected)
			.pipe(takeUntilDestroyed())
			.subscribe((boardSelected: number) =>
				this.boardSelected.set(boardSelected),
			);
	}

	emitShowTaskDialog() {
		if (!this.task()?.id) return;

		this.store.dispatch(new fromStore.LoadTask(this.task()));
		this.taskSelected.emit(true);
	}

	acceptConfirmation(event: boolean) {
		console.log(event);
		if (!event) return;

		this.store.dispatch(new fromStore.DeleteTask(+this.task().id));

		this.messageService.add({
			severity: 'info',
			summary: 'Confirmed',
			detail: 'You have accepted',
		});
	}

	rejectConfirmation(event: boolean) {
		console.log(event);
		if (!event) return;

		this.messageService.add({
			severity: 'error',
			summary: 'Rejected',
			detail: 'You have rejected',
			life: 3000,
		});
	}
}

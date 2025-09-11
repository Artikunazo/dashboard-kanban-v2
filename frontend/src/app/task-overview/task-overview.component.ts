import {
	Component,
	inject,
	input,
	output,
	signal,
	viewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {Task} from '../models/tasks_models';
import * as fromStore from '../store';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Menu, MenuModule} from 'primeng/menu';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';

@Component({
	selector: 'task-overview',
	standalone: true,
	imports: [
		CardModule,
		ButtonModule,
		MenuModule,
		ConfirmDialog,
		Menu,
		ConfirmDialog,
		ToastModule,
	],
	providers: [ConfirmationService, MessageService],
	templateUrl: './task-overview.component.html',
	styleUrl: './task-overview.component.scss',
})
export class TaskOverviewComponent {
	private readonly store = inject(Store);
	private readonly messageService = inject(MessageService);
	private readonly confirmationService = inject(ConfirmationService);

	protected boardSelected = signal<number>(0);
	public task = input.required<Task>();
	public taskSelected = output<boolean>();

	public menuItems: MenuItem[] = [
		{
			label: 'View/Edit',
			icon: 'pi pi-pencil',
			styleClass: 'font-normal text-sm',
		},
		{
			label: 'Delete',
			icon: 'pi pi-trash',
			styleClass: 'font-normal text-sm',
			command: () => this.deletTask(),
		},
	];

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

	deletTask() {
		this.confirmationService.confirm({
			target: event?.target as EventTarget,
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			closable: true,
			closeOnEscape: true,
			icon: 'pi pi-exclamation-triangle',
			rejectButtonProps: {
				label: 'No',
				severity: 'secondary',
				outlined: true,
			},
			acceptButtonProps: {
				label: 'Yes',
				severity: 'danger',
			},

			accept: () => {
				this.store.dispatch(new fromStore.DeleteTask(+this.task().id));

				this.messageService.add({
					severity: 'info',
					summary: 'Confirmed',
					detail: 'The task has been deleted',
				});

			},
		});
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

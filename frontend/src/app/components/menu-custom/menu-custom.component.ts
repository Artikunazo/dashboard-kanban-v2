import {Component, inject, output, viewChild} from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {MenuModule} from 'primeng/menu';
import {ToastModule} from 'primeng/toast';

@Component({
	selector: 'menu-custom',
	standalone: true,
	imports: [MenuModule, ConfirmDialog, ToastModule],
	providers: [ConfirmationService],
	templateUrl: './menu-custom.component.html',
	styleUrl: './menu-custom.component.scss',
})
export class MenuCustomComponent {
	private readonly confirmationService = inject(ConfirmationService);

	public contextMenu = viewChild('contextMenu');

	public acceptConfirmation = output<boolean>();
	public rejectConfirmation = output<boolean>();

	public menuItems: MenuItem[] = [
		{
			label: 'View/Eit',
			icon: 'pi pi-pencil',
			styleClass: 'font-normal text-sm',
			command: () => {},
		},
		{
			label: 'Delete',
			icon: 'pi pi-trash',
			styleClass: 'font-normal text-sm',
			command: () => this.deletTask(),
		},
	];

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
			accept: () => this.acceptConfirmation.emit(true),
			reject: () => this.rejectConfirmation.emit(true),
		});
	}
}


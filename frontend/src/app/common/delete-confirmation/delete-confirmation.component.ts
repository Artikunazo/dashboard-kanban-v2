import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {CustomButtonComponent} from '../custom-button/custom-button.component';

@Component({
	selector: 'delete-confirmation',
	standalone: true,
	imports: [ButtonModule, CustomButtonComponent],
	template: `
		<section class="container delete-confirmation-dialog">
			<h3 class="text-lg font-semibold">
				Are you sure you want to delete this task?
			</h3>
			<div class="flex">
				<custom-button
					[severity]="'secondary'"
					(clickEvent)="deleteConfirmationAction(true)"
				>
					Delete
				</custom-button>
				<custom-button
					[severity]="'success'"
					(clickEvent)="deleteConfirmationAction(false)"
				>
					Cancel
				</custom-button>
			</div>
		</section>
	`,
	styles: [
		`
			.delete-confirmation-dialog {
				padding: 20px 0;
				overflow: hidden;
			}
		`,
	],
})
export class DeleteConfirmationComponent {
	private readonly dialogRef: DynamicDialogRef | undefined;

	deleteConfirmationAction(isDeleting: boolean): void {
		this.dialogRef?.close(isDeleting);
	}
}

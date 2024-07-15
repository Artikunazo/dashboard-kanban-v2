import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
	selector: 'delete-confirmation',
	standalone: true,
	imports: [MatButtonModule],
	templateUrl: './delete-confirmation.component.html',
	styleUrl: './delete-confirmation.component.scss',
})
export class DeleteConfirmationComponent {
	protected readonly matDialogRef: MatDialogRef<DeleteConfirmationComponent> =
		inject(MatDialogRef);

	deleteConfirmationAction(isDeleting: boolean): void {
		this.matDialogRef.close(isDeleting);
	}
}

import {Component, inject} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'delete-confirmation',
    imports: [ButtonModule],
    templateUrl: './delete-confirmation.component.html',
    styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {
	// protected readonly matDialogRef: MatDialogRef<DeleteConfirmationComponent> =
	// 	inject(MatDialogRef);

  private dialogRef: DynamicDialogRef | undefined;

	deleteConfirmationAction(isDeleting: boolean): void {
		// this.matDialogRef.close(isDeleting);
    this.dialogRef?.close(isDeleting);
	}
}

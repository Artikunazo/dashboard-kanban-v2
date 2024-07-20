import {MatDialogConfig} from '@angular/material/dialog';

export const boardDialogConfig: MatDialogConfig = {
	width: '90%',
	height: 'fit-content',
	delayFocusTrap: true,
	closeOnNavigation: true,
};

export const deleteConfirmationConfig: MatDialogConfig = {
	width: '30%',
	height: 'fit-content',
	delayFocusTrap: true,
	closeOnNavigation: true,
};

export const taskFormConfig: MatDialogConfig = {
	width: '65%',
	maxHeight: '90vh',
};

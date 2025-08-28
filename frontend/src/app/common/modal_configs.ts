import {MatDialogConfig} from '@angular/material/dialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

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

export const taskFormConfig: DynamicDialogConfig = {
	width: '65%',

};

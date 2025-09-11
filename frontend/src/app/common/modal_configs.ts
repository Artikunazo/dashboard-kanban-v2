import { DynamicDialogConfig } from 'primeng/dynamicdialog';

export const boardDialogConfig: Partial<DynamicDialogConfig> = {
	width: '40dvw',
	height: 'fit-content',
	modal: true,
	closable: true,
	// delayFocusTrap: true,
	// closeOnNavigation: true,
};

export const deleteConfirmationConfig: Partial<DynamicDialogConfig> = {
	width: '30dvw',
	height: 'fit-content',
	// delayFocusTrap: true,
	// closeOnNavigation: true,
};

export const taskFormConfig: Partial<DynamicDialogConfig> = {
	width: '35dvw',
	height: 'fit-content',
	modal: true,
	closable: true,
	showHeader: false
};

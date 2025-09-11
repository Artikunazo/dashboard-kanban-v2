import {AsyncPipe} from '@angular/common';
import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';
import {CustomButtonComponent} from '../custom-button/custom-button.component';
import * as fromStore from '../../store';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
	selector: 'board-form',
	imports: [
		ReactiveFormsModule,
		CustomButtonComponent,
		FieldsetModule,
		InputTextModule,
		ProgressSpinnerModule,
		CustomButtonComponent,
	],
	templateUrl: './board-form.component.html',
	styleUrl: './board-form.component.scss',
})
export class BoardFormComponent {
	private readonly formBuilder = inject(FormBuilder);
	private readonly dialogRef = inject(DynamicDialogRef);
	private readonly dialogConfig = inject(DynamicDialogConfig);
	private readonly store = inject(Store<fromStore.AppState>);

	public boardForm = this.formBuilder.group({
		title: this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(5),
		]),
	});

	public isLoading = signal<boolean>(false);
	public isEdit = signal<boolean>(false);
	public dialogData = signal(this.dialogConfig.data);

	constructor() {
		effect(() => {
			this.isEdit.set(this.dialogData().isEdit);

			if (this.isEdit()) {
				this.boardForm.patchValue({
					title: this.dialogData().boardData.title,
				});
			}
		});
	}

	saveBoard() {
		this.store.dispatch(
			new fromStore.SaveBoard({title: this.boardForm.value.title ?? ''}),
		);
		this.isLoading.set(false);
		this.dialogRef.close();
	}

	updateBoard() {
		this.store.dispatch(
			new fromStore.UpdateBoard({
				title: this.boardForm.value.title ?? '',
				id: this.dialogData().boardData.id,
			}),
		);

		this.dialogRef.close();
	}
}

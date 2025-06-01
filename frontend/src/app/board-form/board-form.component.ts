import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import {Board} from '../models/board_models';
import * as fromStore from '../store';

@Component({
    selector: 'board-form',
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormField,
        CustomButtonComponent,
        MatProgressSpinnerModule,
        AsyncPipe,
    ],
    templateUrl: './board-form.component.html',
    styleUrl: './board-form.component.scss'
})
export class BoardFormComponent implements OnDestroy {
	protected readonly formBuilder = inject(FormBuilder);
	protected readonly store = inject(Store<fromStore.AppState>);
	protected readonly matDialogRef: MatDialogRef<BoardFormComponent> =
		inject(MatDialogRef);
	protected readonly matDialogData: Board = inject(MAT_DIALOG_DATA);

	public boardForm: FormGroup = this.formBuilder.group({
		title: this.formBuilder.control('', [Validators.required]),
	});

	public isLoading$ = new BehaviorSubject<boolean>(true);
	public isEdit = !!this.matDialogData;

	constructor() {
		if (
			this.matDialogData !== null &&
			Object.hasOwn(this.matDialogData || {}, 'id')
		) {
			this.boardForm.patchValue({
				title: this.matDialogData.title,
			});
		}
	}

	saveBoard() {
		this.store.dispatch(new fromStore.SaveBoard(this.boardForm.value));
		this.isLoading$.next(false);
		this.matDialogRef.close();
	}

	updateBoard() {
		this.store.dispatch(
			new fromStore.UpdateBoard({
				...this.boardForm.value,
				id: this.matDialogData.id,
			}),
		);
		this.matDialogRef.close();
	}
	ngOnDestroy(): void {
		this.isLoading$.complete();
	}
}

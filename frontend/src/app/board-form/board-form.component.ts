import {Component, inject} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Store} from '@ngrx/store';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import * as fromStore from '../store';

@Component({
	selector: 'board-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatFormField,
		CustomButtonComponent,
		MatProgressSpinnerModule,
	],
	templateUrl: './board-form.component.html',
	styleUrl: './board-form.component.scss',
})
export class BoardFormComponent {
	protected readonly formBuilder = inject(FormBuilder);
	protected readonly store = inject(Store<fromStore.AppState>);
	protected matDialogRef: MatDialogRef<BoardFormComponent> =
		inject(MatDialogRef);

	public boardForm: FormGroup = this.formBuilder.group({
		title: this.formBuilder.control('', [Validators.required]),
	});

	public isLoading = false;

	ngOnInit() {
		this.store.select(fromStore.getBoardIsLoading).subscribe({
			next: (isLoading) => {
				this.isLoading = isLoading;
			},
		});
	}

	saveBoard() {
		this.store.dispatch(new fromStore.SaveBoard(this.boardForm.value));
		this.matDialogRef.close();
	}
}

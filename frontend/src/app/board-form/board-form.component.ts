import {Component, inject} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
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
	],
	templateUrl: './board-form.component.html',
	styleUrl: './board-form.component.scss',
})
export class BoardFormComponent {
	protected readonly formBuilder = inject(FormBuilder);
	protected readonly store = inject(Store<fromStore.AppState>);

	boardForm: FormGroup = this.formBuilder.group({
		title: this.formBuilder.control('', [Validators.required]),
	});

	isLoading = false;

	saveBoard() {
		this.store.select(fromStore.getBoardIsLoading).subscribe({
			next: (isLoading) => {
				this.isLoading = isLoading;
			},
		});
		this.store.dispatch(new fromStore.SaveBoard(this.boardForm.value));
	}
}

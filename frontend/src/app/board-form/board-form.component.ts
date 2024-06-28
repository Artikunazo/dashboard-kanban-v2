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
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';

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

	boardForm: FormGroup = this.formBuilder.group({
		title: this.formBuilder.control('', [Validators.required]),
	});

	createBoard() {
		console.log(this.boardForm.value);
	}
}

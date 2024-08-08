import {Component, inject, output} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
	selector: 'subtask-form',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
	templateUrl: './subtask-form.component.html',
	styleUrl: './subtask-form.component.scss',
})
export class SubtaskFormComponent {
	protected readonly formBuilder = inject(FormBuilder);

	public subtaskSaved = output<string>();

	public subtaskForm!: FormGroup;

	constructor() {
		this.subtaskForm = this.formBuilder.group({
			title: this.formBuilder.control('', [Validators.required]),
		});
	}

	addSubtask(event: KeyboardEvent) {
		if (this.subtaskForm.invalid) return;

		if (event.code === 'Enter') {
			this.subtaskSaved.emit(this.subtaskForm.get('title')?.value);
		}
	}
}

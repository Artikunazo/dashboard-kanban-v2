import {Component, inject, output} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

@Component({
    selector: 'subtask-form',
    imports: [ReactiveFormsModule],
    templateUrl: './subtask-form.component.html',
    styleUrl: './subtask-form.component.scss'
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

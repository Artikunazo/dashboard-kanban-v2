import {Component, inject, output} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';
import * as fromStore from '../../store';

@Component({
	selector: 'subtask-form',
	standalone: true,
	imports: [ReactiveFormsModule, FieldsetModule, InputTextModule],
	templateUrl: './subtask-form.component.html',
	styleUrl: './subtask-form.component.scss',
})
export class SubtaskFormComponent {
	private readonly formBuilder = inject(FormBuilder);
	private readonly store = inject(Store);

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
			this.store.dispatch(new fromStore.AddSubtask(this.subtaskForm.get('title')?.value));
		}
	}
}

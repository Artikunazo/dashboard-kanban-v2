import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, signal} from '@angular/core';
import {
	FormBuilder,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import {Board} from '../models/board_models';
import * as fromStore from '../store';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinner } from "primeng/progressspinner";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
    selector: 'board-form',
    imports: [
        ReactiveFormsModule,
        // MatButtonModule,
        // MatInputModule,
        // MatFormField,
        CustomButtonComponent,
        // MatProgressSpinnerModule,
        AsyncPipe,
        FieldsetModule,
        InputTextModule,
        ProgressSpinner
    ],
    templateUrl: './board-form.component.html',
    styleUrl: './board-form.component.scss'
})
export class BoardFormComponent {
	private readonly formBuilder = inject(FormBuilder);
  private readonly dialogService = inject(DialogService);
	private readonly store = inject(Store<fromStore.AppState>);

	public boardForm = this.formBuilder.group({
		title: this.formBuilder.control('', [Validators.required]),
	});

	public isLoading = signal<boolean>(true);
  public dialogRef: DynamicDialogRef | undefined;
	public isEdit = signal<boolean>(false);

	constructor() {
    this.dialogRef?.onMaximize.subscribe((data) => {
      console.log("Child component loaded:", data);
      this.isEdit.set(data.isEdit);

      this.boardForm.patchValue({
        title: data.title,
      });
    });
	}

	saveBoard() {
		this.store.dispatch(new fromStore.SaveBoard({ title: this.boardForm.value.title ?? '' }));
		this.isLoading.set(false);
		this.dialogRef?.close();
	}

	updateBoard() {
		this.store.dispatch(
			new fromStore.UpdateBoard({
				title: this.boardForm.value.title ?? '',
				id: 0,
			}),
		);

		this.dialogRef?.close();
	}
}

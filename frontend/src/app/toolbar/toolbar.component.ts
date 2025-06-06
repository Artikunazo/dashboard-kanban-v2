import {AsyncPipe} from '@angular/common';
import {Component, inject, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import * as fromStore from '../store';

@Component({
    selector: 'toolbar',
    imports: [CustomButtonComponent, MatToolbarModule, AsyncPipe],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
	protected readonly dialog = inject(MatDialog);
	protected readonly store = inject(Store);

	public openNav = output();
	public createTaskClicked = output<boolean>();

	public subtitle$ = new Observable<string>();

	constructor() {
		this.subtitle$ = this.store.select(fromStore.selectBoardTitle).pipe(
			map((title: string) => title),
			takeUntilDestroyed(),
		);
	}

	openTaskFormModal() {
		this.createTaskClicked.emit(true);
	}
}

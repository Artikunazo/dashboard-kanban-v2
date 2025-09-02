import {AsyncPipe} from '@angular/common';
import {Component, inject, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {CustomButtonComponent} from '../common/custom-button/custom-button.component';
import * as fromStore from '../store';
import {ToolbarModule} from 'primeng/toolbar';

@Component({
	selector: 'toolbar',
	imports: [CustomButtonComponent, AsyncPipe, ToolbarModule],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
	private readonly store = inject(Store);

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

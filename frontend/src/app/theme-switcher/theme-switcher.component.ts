import { Component, effect, inject, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomIconDirective } from '../common/custom-icon.directive';
import * as fromStore from '../store';
import { ToggleSwitchModule } from 'primeng/toggleswitch';


@Component({
	selector: 'theme-switcher',
	standalone: true,
	imports: [
		CustomIconDirective,
		ReactiveFormsModule,
		ToggleSwitchModule,
		FormsModule
	],
	templateUrl: './theme-switcher.component.html',
	styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit {
	private readonly store = inject(Store);

	public switcherToggled = output();

	themeToggled = signal<boolean>(false);

	constructor() {
		effect(() => {
			const darkThemeName = 'dark-theme';
			const lightThemeName = 'light-theme';
			const body = document.querySelector('body');
			// Enable light theme
			if (!this.themeToggled()) {
				body?.classList.remove(darkThemeName);
				body?.classList.add(lightThemeName);
				this.store.dispatch(new fromStore.SaveTheme('ligth'));
			} else {
				body?.classList.remove(lightThemeName);
				body?.classList.add(darkThemeName);
				this.store.dispatch(new fromStore.SaveTheme('dark'));
			}
		})
		// this.themeToggled.valueChanges.pipe(takeUntilDestroyed()).subscribe({
		// 	next: (checked) => {
		// 		const darkThemeName = 'dark-theme';
		// 		const lightThemeName = 'light-theme';
		// 		const body = document.querySelector('body');
		// 		// Enable light theme
		// 		if (!checked) {
		// 			body?.classList.remove(darkThemeName);
		// 			body?.classList.add(lightThemeName);
		// 			this.store.dispatch(new fromStore.SaveTheme('ligth'));
		// 		} else {
		// 			body?.classList.remove(lightThemeName);
		// 			body?.classList.add(darkThemeName);
		// 			this.store.dispatch(new fromStore.SaveTheme('dark'));
		// 		}
		// 	},
		// });
	}

	ngOnInit(): void {
		this.store.dispatch(new fromStore.LoadTheme());

		this.store.select(fromStore.getTheme).subscribe({
			next: (ThemeState: string) => {
				this.themeToggled.set(ThemeState === 'dark');
			},
		});
	}
}

import {importProvidersFrom} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {CustomIconDirective} from '../../common/custom-icon.directive';
import * as fromStore from '../../store';
import {reducers} from '../../store/reducers';
import {ThemeSwitcherComponent} from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
	let component: ThemeSwitcherComponent;
	let fixture: ComponentFixture<ThemeSwitcherComponent>;
	let store: Store;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				CustomIconDirective,
				ReactiveFormsModule,
				// MatIconModule,
				// MatSlideToggleModule,
				StoreModule.forRoot(reducers),
				ThemeSwitcherComponent,
			],
			providers: [importProvidersFrom(Store)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ThemeSwitcherComponent);
		component = fixture.componentInstance;
		store = TestBed.inject(Store);
		fixture.detectChanges();

		spyOn(store, 'dispatch').calls.reset;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should dispatch LoadTheme action on ngOnInit', () => {
		component.ngOnInit();

		expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTheme());
	});

	it('should set themeToggled value to true if theme is dark', () => {
		store.select = () => of('light');
		component.ngOnInit();

		expect(component.themeToggled.value).toBe(false);
	});

	it('should set themeToggled value to false if theme is light', () => {
		component.ngOnInit();
		store.dispatch(new fromStore.SaveTheme('light'));
		expect(component.themeToggled.value).toBe(false);
	});

	it('should add dark-theme class to body if theme is not dark', () => {
		component.ngOnInit();
		store.dispatch(new fromStore.SaveTheme('dark'));
		const body = document.querySelector('body');

		expect(body?.classList.contains('dark-theme')).toBe(false);
	});

	it('should remove dark-theme class from body if theme is light', () => {
		component.ngOnInit();
		store.dispatch(new fromStore.SaveTheme('light'));
		const body = document.querySelector('body');
		expect(body?.classList.contains('dark-theme')).toBe(false);
	});
});

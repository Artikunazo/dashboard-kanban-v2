import {Component, input, output} from '@angular/core';
import {ButtonModule, ButtonSeverity} from 'primeng/button';
import {CustomIconDirective} from '../../common/custom-icon.directive';

@Component({
	selector: 'custom-button',
  standalone: true,
	imports: [CustomIconDirective, ButtonModule],
	template: `
		<p-button
			[severity]="severity()"
			(click)="clickEvent.emit()"
			[disabled]="disabled()"
			[loading]="loading()"
		>
			{{ text() }}
			@if (iconName()) {
				<i class="pi pi-{{ iconName() }}"></i>
			}
		</p-button>
	`,
})
export class CustomButtonComponent {
	public text = input<string>('');
	public severity = input<ButtonSeverity>();
	public iconName = input<string>('');
	public disabled = input<boolean>(false);
	public loading = input<boolean>(false);

	public clickEvent = output();
}

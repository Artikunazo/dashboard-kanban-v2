import {Component, input, output} from '@angular/core';
import {ButtonModule, ButtonSeverity} from 'primeng/button';
import {CustomIconDirective} from '../custom-icon.directive';

@Component({
    selector: 'custom-button',
    imports: [CustomIconDirective, ButtonModule],
    templateUrl: './custom-button.component.html',
    styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {
	public text = input<string>('');
	public severity = input<ButtonSeverity>();
	public iconName = input<string>('');
	public disabled = input<boolean>(false);

	public clickEvent = output();
}

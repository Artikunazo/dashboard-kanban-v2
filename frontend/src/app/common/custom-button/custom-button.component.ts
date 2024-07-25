import {Component, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CustomIconDirective} from '../custom-icon.directive';

@Component({
	selector: 'custom-button',
	standalone: true,
	imports: [CustomIconDirective, MatButtonModule, MatIconModule],
	templateUrl: './custom-button.component.html',
	styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
	public text = input<string>('');
	public colorButton = input('');
	public iconName = input<string>('');
	public disabled = input<boolean>(false);

	public clickEvent = output();
}

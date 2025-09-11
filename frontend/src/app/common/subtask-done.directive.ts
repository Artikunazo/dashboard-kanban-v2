import {
	Directive,
	ElementRef,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

@Directive({
	selector: '[subtaskDone]',
	standalone: true,
})
export class SubtaskDoneDirective implements OnChanges {
	@Input() public subtaskDone: boolean = false;

	constructor(private el: ElementRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			if (changes['subtaskDone']?.currentValue) {
				this.el.nativeElement.classList.add('markedDone');
			} else {
				this.el.nativeElement.classList.remove('markedDone');
			}
		}
	}
}

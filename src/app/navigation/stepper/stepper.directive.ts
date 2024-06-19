import {Directive, Input} from '@angular/core';
import {StepperItem} from '../types-and-interfaces/stepper-item';

@Directive({
    selector: '[polityStepper]',
    standalone: true
})
export class StepperDirective {
    @Input() activeIndex: number = 0;
    @Input() activeItem: string = 'Name';
    @Input() steps: StepperItem[] = [];

    onActiveItemChange(index: number): void {
        this.activeIndex = index;
    }
}

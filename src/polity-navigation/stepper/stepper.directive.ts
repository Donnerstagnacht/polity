import {Directive, input, InputSignal, model, ModelSignal} from '@angular/core';
import {StepperItem} from '../types-and-interfaces/stepper-item';

@Directive({
    selector: '[polityStepper]',
    standalone: true
})
export class StepperDirective {
    activeIndex: ModelSignal<number> = model(0);
    activeItem: InputSignal<string> = input('Name');
    steps: InputSignal<StepperItem[]> = input<StepperItem[]>([]);

    onActiveItemChange(index: number): void {
        this.activeIndex.set(index);
    }
}

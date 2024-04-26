import {Component, Input} from '@angular/core';
import {TuiStepperModule} from "@taiga-ui/kit";
import {NgxPageScrollModule} from "ngx-page-scroll";
import {StepperItem} from "../types-and-interfaces/stepper-item";
import {AutoscrollDirective} from "../autoscroll.directive";

@Component({
    selector: 'polity-stepper-right',
    standalone: true,
    imports: [
        TuiStepperModule,
        NgxPageScrollModule,
        AutoscrollDirective
    ],
    templateUrl: './stepper-right.component.html',
    styleUrl: './stepper-right.component.less'
})
export class StepperRightComponent {
    @Input() activeIndex: number = 0;
    @Input() activeItem: string = 'Name'
    @Input() steps: StepperItem[] = []

    constructor() {
    }

    onActiveItemChange(index: number): void {
        this.activeIndex = index;
    }
}

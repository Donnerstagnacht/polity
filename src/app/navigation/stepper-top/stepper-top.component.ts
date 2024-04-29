import {Component, Input} from '@angular/core';
import {TuiStepperModule} from "@taiga-ui/kit";
import {StepperItem} from "../types-and-interfaces/stepper-item";
import {AutoscrollDirective} from "../autoscroll.directive";
import {NgxPageScrollModule} from "ngx-page-scroll";

@Component({
    selector: 'polity-stepper-top',
    standalone: true,
    imports: [
        TuiStepperModule,
        AutoscrollDirective,
        NgxPageScrollModule
    ],
    templateUrl: './stepper-top.component.html',
    styleUrl: './stepper-top.component.less'
})
export class StepperTopComponent {
    @Input() activeIndex: number = 0;
    @Input() activeItem: string = 'Name'
    @Input() steps: StepperItem[] = []

    constructor() {
    }

    onActiveItemChange(index: number): void {
        this.activeIndex = index;
    }
}

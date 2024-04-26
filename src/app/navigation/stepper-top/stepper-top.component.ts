import {Component} from '@angular/core';
import {TuiStepperModule} from "@taiga-ui/kit";

@Component({
    selector: 'polity-stepper-top',
    standalone: true,
    imports: [
        TuiStepperModule
    ],
    templateUrl: './stepper-top.component.html',
    styleUrl: './stepper-top.component.less'
})
export class StepperTopComponent {

}

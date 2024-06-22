import {Component} from '@angular/core';
import {TuiStepperModule} from '@taiga-ui/kit';
import {AutoscrollDirective} from '../../autoscroll.directive';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {StepperDirective} from '../stepper.directive';

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
export class StepperTopComponent extends StepperDirective {

}

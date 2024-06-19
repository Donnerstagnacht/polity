import {Component} from '@angular/core';
import {TuiStepperModule} from '@taiga-ui/kit';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {AutoscrollDirective} from '../../autoscroll.directive';
import {StepperDirective} from '../stepper.directive';

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
export class StepperRightComponent extends StepperDirective {

}

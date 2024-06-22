import {Component} from '@angular/core';
import {TuiTabBarModule} from '@taiga-ui/addon-mobile';
import {RouterModule} from '@angular/router';
import {TuiHintModule} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';
import {SecondBarDirective} from '../second-bar.directive';

@Component({
    selector: 'polity-second-bar-side',
    templateUrl: './second-bar-right.component.html',
    styleUrls: ['./second-bar-right.component.less'],
    standalone: true,
    imports: [
        TuiTabBarModule,
        RouterModule,
        TuiHintModule,
        CommonModule
    ]
})
export class SecondBarRightComponent extends SecondBarDirective {

}

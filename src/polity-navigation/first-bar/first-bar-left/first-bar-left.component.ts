import {Component} from '@angular/core';
import {TuiTabBarModule} from '@taiga-ui/addon-mobile';
import {RouterModule} from '@angular/router';
import {TuiHintModule} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';
import {FirstBarDirective} from '../first-bar.directive';

@Component({
    selector: 'polity-main-bar-side',
    templateUrl: './first-bar-left.component.html',
    styleUrls: ['./first-bar-left.component.less'],
    standalone: true,
    imports: [
        TuiTabBarModule,
        RouterModule,
        TuiHintModule,
        CommonModule,
        FirstBarDirective
    ]
})
export class FirstBarLeftComponent extends FirstBarDirective {

}

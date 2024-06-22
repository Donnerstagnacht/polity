import {Component, effect} from '@angular/core';
import {TuiTabBarModule} from '@taiga-ui/addon-mobile';
import {RouterModule} from '@angular/router';
import {TuiHintModule} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';
import {FirstBarDirective} from '../first-bar.directive';

@Component({
    selector: 'polity-main-bar-bottom',
    templateUrl: './first-bar-bottom.component.html',
    styleUrls: ['./first-bar-bottom.component.less'],
    standalone: true,
    imports: [
        TuiTabBarModule,
        RouterModule,
        TuiHintModule,
        CommonModule
    ]
})
export class FirstBarBottomComponent extends FirstBarDirective {

    constructor() {
        super();
        effect((): void => {
            this.items()[2].badge = this.notificationBadge()?.unread_notifications_counter_;
        });
    }
}

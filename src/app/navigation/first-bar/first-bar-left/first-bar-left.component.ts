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
    // /**
    //  * Takes an array of menuItems as input
    //  *
    //  * @Input items: Item[]. Default is signed out items.
    //  */
    // @Input({required: true}) public items: NavigationItem[] = NAVIGATION_ITEMS_SIGNED_OUT;
    // @Input() public notificationBadge: Signal<SupabaseObjectReturn<'read_unread_notifications_counter'> | null> = signal({
    //     profile_id_: '',
    //     unread_notifications_counter_: 0
    // });
    // protected activeItemIndex: number = 1;

}

import {Component, Input, signal, WritableSignal} from '@angular/core';
import {NAVIGATION_ITEMS_SIGNED_OUT} from "../navigation-item";
import {NavigationItem} from "../types-and-interfaces/navigationItem";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {RouterModule} from "@angular/router";
import {TuiHintModule} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";
import {SupabaseObjectReturn} from "../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-main-bar-side',
    templateUrl: './first-bar-left.component.html',
    styleUrls: ['./first-bar-left.component.less'],
    standalone: true,
    imports: [
        TuiTabBarModule,
        RouterModule,
        TuiHintModule,
        CommonModule
    ]
})
export class FirstBarLeftComponent {
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    @Input({required: true}) public items: NavigationItem[] = NAVIGATION_ITEMS_SIGNED_OUT;
    @Input() public notificationBadge: WritableSignal<SupabaseObjectReturn<'read_unread_notifications_counter'> | null> = signal({
        profile_id_: '',
        unread_notifications_counter_: 0
    });
    protected activeItemIndex: number = 1;
}

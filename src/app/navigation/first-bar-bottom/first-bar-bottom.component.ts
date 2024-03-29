import {Component, effect, Input, signal, WritableSignal} from '@angular/core';
import {NAVIGATION_ITEMS_SIGNED_OUT} from "../navigation-item";
import {NavigationItem} from "../types-and-interfaces/navigationItem";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {RouterModule} from "@angular/router";
import {TuiHintModule} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";
import {FunctionSingleReturn} from "../../../../supabase/types/supabase.shorthand-types";

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
export class FirstBarBottomComponent {
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    @Input({required: true}) public items: NavigationItem[] = NAVIGATION_ITEMS_SIGNED_OUT;
    @Input() public notificationBadge: WritableSignal<FunctionSingleReturn<'select_unread_notifications_counter'> | null> = signal({
        profile_id: '',
        unread_notifications_counter: 0
    });
    protected activeItemIndex: number = 1;

    constructor() {
        effect((): void => {
            this.items[2].badge = this.notificationBadge()?.unread_notifications_counter
        })
    }
}

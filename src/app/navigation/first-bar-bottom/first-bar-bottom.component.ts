import {Component, Input} from '@angular/core';
import {NAVIGATION_ITEMS_SIGNED_OUT} from "../navigation-item";
import {NavigationItem} from "../types-and-interfaces/navigationItem";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {RouterModule} from "@angular/router";
import {TuiHintModule} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";

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
    protected activeItemIndex: number = 1;

    protected onClick(item: NavigationItem): void {
        item.badge = 0;
    }
}

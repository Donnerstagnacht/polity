import {Component, Input} from '@angular/core';
import {NAVIGATION_ITEMS} from "../navigation-item";
import {NavigationItem} from "../types-and-interfaces/navigationItem";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {RouterModule} from "@angular/router";
import {TuiHintModule} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'polity-second-bar-top',
    templateUrl: './second-bar-top.component.html',
    styleUrls: ['./second-bar-top.component.less'],
    standalone: true,
    imports: [
        TuiTabBarModule,
        RouterModule,
        TuiHintModule,
        CommonModule
    ]
})
export class SecondBarTopComponent {
    @Input({required: true}) public items: NavigationItem[] = NAVIGATION_ITEMS;
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    protected activeItemIndex: number = 1;

    protected onClick(item: NavigationItem): void {
        item.badge = 0;
    }

}

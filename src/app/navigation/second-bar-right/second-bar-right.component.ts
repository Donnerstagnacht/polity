import {Component, Input} from '@angular/core';
import {NavigationItem} from "../types-and-interfaces/navigationItem";
import {navigationItemsSignedOut} from "../navigation-item";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {RouterModule} from "@angular/router";
import {TuiHintModule} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";

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
export class SecondBarRightComponent {
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    @Input({required: true}) public items: NavigationItem[] = navigationItemsSignedOut;
    protected activeItemIndex: number = 1;

    protected onClick(item: NavigationItem): void {
        item.badge = 0;
    }
}

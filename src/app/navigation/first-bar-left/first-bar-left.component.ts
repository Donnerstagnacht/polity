import {Component, Input} from '@angular/core';
import {navigationItemsSignedOut} from "../navigation-item";
import {NavigationItem} from "../types-and-interfaces/navigationItem";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {RouterModule} from "@angular/router";
import {TuiHintModule} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";

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
    @Input({required: true}) public items: NavigationItem[] = navigationItemsSignedOut;
    protected activeItemIndex: number = 1;

    protected onClick(item: NavigationItem): void {
        item.badge = 0;
    }
}

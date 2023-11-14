import {Component, Input} from '@angular/core';
import {menuItemsSignedOut} from "../menu-items";
import {Item} from "../types-and-interfaces/item";

@Component({
    selector: 'polity-main-bar-side',
    templateUrl: './main-bar-side.component.html',
    styleUrls: ['./main-bar-side.component.less']
})
export class MainBarSideComponent {
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    @Input() public items: Item[] = menuItemsSignedOut;
    protected activeItemIndex: number = 1;

    protected onClick(item: Item): void {
        item.badge = 0;
    }
}

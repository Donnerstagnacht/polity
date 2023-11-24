import {Component, Input} from '@angular/core';
import {Item} from "../types-and-interfaces/item";
import {menuItemsSignedOut} from "../menu-items";

@Component({
    selector: 'polity-second-bar-side',
    templateUrl: './second-bar-side.component.html',
    styleUrls: ['./second-bar-side.component.less']
})
export class SecondBarSideComponent {
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

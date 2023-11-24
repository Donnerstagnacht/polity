import {Component, Input} from '@angular/core';
import {menuItems} from "../menu-items";
import {Item} from "../types-and-interfaces/item";

@Component({
    selector: 'polity-second-bar-top',
    templateUrl: './second-bar-top.component.html',
    styleUrls: ['./second-bar-top.component.less']
})
export class SecondBarTopComponent {
    @Input() public items: Item[] = menuItems;
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    protected activeItemIndex: number = 1;

    protected onClick(item: Item): void {
        item.badge = 0;
    }

}

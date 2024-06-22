import {Directive, input, InputSignal} from '@angular/core';
import {NavigationItem} from '../types-and-interfaces/navigationItem';
import {NAVIGATION_ITEMS_SIGNED_OUT} from '../navigation-item';

@Directive({
    selector: '[politySecondBar]',
    standalone: true
})
export class SecondBarDirective {
    /**
     * Takes an array of menuItems as input
     *
     * @Input items: Item[]. Default is signed out items.
     */
    public items: InputSignal<NavigationItem[]> = input<NavigationItem[]>(NAVIGATION_ITEMS_SIGNED_OUT);
    protected activeItemIndex: number = 1;

    protected onClick(item: NavigationItem): void {
        item.badge = 0;
    }
}


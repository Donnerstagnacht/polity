import {Component} from '@angular/core';
import {menuItemsSignedOut} from "../../layout/menu-items";
import {Item} from "../../layout/types-and-interfaces/item";

@Component({
    selector: 'polity-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.less']
})
export class LandingComponent {
    signedOutItems: Item[] = menuItemsSignedOut;
}

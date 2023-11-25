import {Component} from '@angular/core';
import {NavigationItem} from "../../navigation/types-and-interfaces/navigationItem";
import {navigationItemsSignedOut} from "../../navigation/navigation-item";

@Component({
    selector: 'polity-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.less']
})
export class LandingComponent {
    signedOutItems: NavigationItem[] = navigationItemsSignedOut;
}

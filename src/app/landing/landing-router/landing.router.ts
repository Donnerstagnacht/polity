import {Component} from '@angular/core';
import {NavigationItem} from '../../../polity-navigation/types-and-interfaces/navigationItem';
import {NAVIGATION_ITEMS_SIGNED_OUT} from '../../../polity-navigation/navigation-item';
import {RouterOutlet} from '@angular/router';
import {FirstBarLeftComponent} from '../../../polity-navigation/first-bar/first-bar-left/first-bar-left.component';
import {FirstBarBottomComponent} from '@polity-navigation/first-bar/first-bar-bottom/first-bar-bottom.component';

@Component({
    selector: 'polity-landing',
    templateUrl: './landing.router.html',
    styleUrls: ['./landing.router.less'],
    standalone: true,
    imports: [
        RouterOutlet,
        FirstBarLeftComponent,
        FirstBarBottomComponent
    ]
})
export class LandingRouter {
    signedOutItems: NavigationItem[] = NAVIGATION_ITEMS_SIGNED_OUT;
}

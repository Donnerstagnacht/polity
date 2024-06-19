import {Component} from '@angular/core';
import {NavigationItem} from '../../navigation/types-and-interfaces/navigationItem';
import {NAVIGATION_ITEMS_SIGNED_OUT} from '../../navigation/navigation-item';
import {RouterOutlet} from '@angular/router';
import {FirstBarLeftComponent} from '../../navigation/first-bar/first-bar-left/first-bar-left.component';
import {FirstBarBottomComponent} from '../../navigation/first-bar/first-bar-bottom/first-bar-bottom.component';

@Component({
    selector: 'polity-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.less'],
    standalone: true,
    imports: [
        RouterOutlet,
        FirstBarLeftComponent,
        FirstBarBottomComponent

    ]
})
export class LandingComponent {
    signedOutItems: NavigationItem[] = NAVIGATION_ITEMS_SIGNED_OUT;
}

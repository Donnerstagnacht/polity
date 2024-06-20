import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NAVIGATION_ITEMS_OFFICE} from '../office-navigation-signed-in';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '@polity-navigation/second-bar/second-bar-right/second-bar-right.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';

@Component({
    selector: 'polity-office',
    templateUrl: './office.router.html',
    styleUrls: ['./office.router.less'],
    standalone: true,
    imports: [
        SecondBarTopComponent,
        RouterOutlet,
        SecondBarRightComponent

    ]
})
export class OfficeRouter {
    protected menuItemsProfile: NavigationItem[] = NAVIGATION_ITEMS_OFFICE;
}

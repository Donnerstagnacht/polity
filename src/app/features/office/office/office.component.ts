import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NAVIGATION_ITEMS_OFFICE} from '../office-navigation-signed-in';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {SecondBarRightComponent} from '@polity-navigation/second-bar/second-bar-right/second-bar-right.component';
import {NavigationItem} from '@polity-navigation/types-and-interfaces/navigationItem';

@Component({
    selector: 'polity-office',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.less'],
    standalone: true,
    imports: [
        SecondBarTopComponent,
        RouterOutlet,
        SecondBarRightComponent

    ]
})
export class OfficeComponent {
    protected menuItemsProfile: NavigationItem[] = NAVIGATION_ITEMS_OFFICE;
}

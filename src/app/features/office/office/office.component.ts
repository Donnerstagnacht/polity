import {Component} from '@angular/core';
import {NavigationItem} from '../../../navigation/types-and-interfaces/navigationItem';
import {SecondBarTopComponent} from '../../../navigation/second-bar/second-bar-top/second-bar-top.component';
import {RouterOutlet} from '@angular/router';
import {SecondBarRightComponent} from '../../../navigation/second-bar/second-bar-right/second-bar-right.component';
import {NAVIGATION_ITEMS_OFFICE} from '../office-navigation-signed-in';

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

import {Component} from '@angular/core';
import {navigationItemsOffice} from "../../../navigation/navigation-item";
import {NavigationItem} from "../../../navigation/types-and-interfaces/navigationItem";
import {SecondBarTopComponent} from "../../../navigation/second-bar-top/second-bar-top.component";
import {RouterOutlet} from "@angular/router";
import {SecondBarRightComponent} from "../../../navigation/second-bar-right/second-bar-right.component";

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
    protected menuItemsProfile: NavigationItem[] = navigationItemsOffice;
}

import {Component} from '@angular/core';
import {navigationItemsOffice} from "../../../navigation/navigation-item";
import {NavigationItem} from "../../../navigation/types-and-interfaces/navigationItem";

@Component({
    selector: 'polity-office',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.less']
})
export class OfficeComponent {
    protected menuItemsProfile: NavigationItem[] = navigationItemsOffice;
}

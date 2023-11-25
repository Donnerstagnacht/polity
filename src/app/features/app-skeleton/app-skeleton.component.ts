import {Component} from '@angular/core';
import {NavigationItem} from "../../navigation/types-and-interfaces/navigationItem";
import {navigationItem} from "../../navigation/navigation-item";

@Component({
    selector: 'polity-app-skeleton',
    templateUrl: './app-skeleton.component.html',
    styleUrls: ['./app-skeleton.component.less'],
})
export class AppSkeletonComponent {
    protected items: NavigationItem[] = navigationItem;
}

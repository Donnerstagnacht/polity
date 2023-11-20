import {ChangeDetectionStrategy, Component} from '@angular/core';
import {menuItems} from "../../layout/menu-items";
import {Item} from "../../layout/types-and-interfaces/item";

@Component({
    selector: 'polity-app-skeleton',
    templateUrl: './app-skeleton.component.html',
    styleUrls: ['./app-skeleton.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSkeletonComponent {
    protected items: Item[] = menuItems;

    constructor() {
    }
}

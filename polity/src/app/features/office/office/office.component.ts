import {Component} from '@angular/core';
import {UiStoreService} from "../../../core/services/ui-store.service";
import {Item} from "../../../layout/types-and-interfaces/item";
import {menuItemsOffice} from "../../../layout/menu-items";

@Component({
    selector: 'polity-office',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.less']
})
export class OfficeComponent {
    protected menuItemsProfile: Item[] = menuItemsOffice;


    constructor(private readonly UIStoreService: UiStoreService) {
        this.UIStoreService.setLoading(true);
        this.UIStoreService.setLoading(false);
    }

}

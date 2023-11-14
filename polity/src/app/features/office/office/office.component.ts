import {Component} from '@angular/core';
import {UiStoreService} from "../../../core/services/ui-store.service";

@Component({
    selector: 'polity-office',
    templateUrl: './office.component.html',
    styleUrls: ['./office.component.less']
})
export class OfficeComponent {

    constructor(private readonly UIStoreService: UiStoreService) {
        this.UIStoreService.setLoading(true);
        this.UIStoreService.setLoading(false);
    }

}

import {Component, signal, WritableSignal} from '@angular/core';
import {UiStoreService} from "../../core/services/ui-store.service";

@Component({
    selector: 'polity-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.less']
})
export class LoadingComponent {
    protected isLoading: WritableSignal<boolean> = signal(false);

    constructor(private readonly UIStoreService: UiStoreService) {
        this.isLoading = this.UIStoreService.selectLoading();
    }

}

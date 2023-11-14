import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {menuItems} from "../../layout/menu-items";
import {Item} from "../../layout/types-and-interfaces/item";
import {UiStoreService} from "../../core/services/ui-store.service";

@Component({
    selector: 'polity-app-skeleton',
    templateUrl: './app-skeleton.component.html',
    styleUrls: ['./app-skeleton.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppSkeletonComponent {
    protected items: Item[] = menuItems;
    protected isLoading: WritableSignal<boolean>;

    constructor(
        private readonly globalUiStateService: UiStoreService,
    ) {
        this.isLoading = this.globalUiStateService.selectLoading();
    }

}

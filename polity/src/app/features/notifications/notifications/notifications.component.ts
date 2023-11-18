import {Component} from '@angular/core';
import {NotificationsService} from "../services/notifications.service";
import {UiStoreService} from "../../../core/services/ui-store.service";

@Component({
    selector: 'polity-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent {

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly globalUiStateService: UiStoreService
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.globalUiStateService.setLoading(true)
        await this.notificationsService.selectNotifications()
        // this.globalUiStateService.setLoading(false)
    }

}

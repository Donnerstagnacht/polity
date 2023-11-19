import {Component} from '@angular/core';
import {NotificationsService} from "../services/notifications.service";
import {UiStoreService} from "../../../core/services/ui-store.service";
import {NotificationsStoreService} from "../services/notifications-store.service";

@Component({
    selector: 'polity-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent {

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly globalUiStateService: UiStoreService,
        private readonly notificationsStoreService: NotificationsStoreService
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.notificationsStoreService.loading.startLoading()
        console.log('started')
        await this.notificationsService.selectNotifications()
        this.notificationsStoreService.loading.stopLoading()
        console.log('finished')
    }

}

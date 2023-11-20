import {Component} from '@angular/core';
import {NotificationsService} from "../services/notifications.service";
import {NotificationsStoreService} from "../services/notifications-store.service";

@Component({
    selector: 'polity-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent {

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly notificationsStoreService: NotificationsStoreService
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.notificationsStoreService.notifications.loading.startLoading()
        await this.notificationsService.selectNotifications()
        this.notificationsStoreService.notifications.loading.stopLoading()
    }

}

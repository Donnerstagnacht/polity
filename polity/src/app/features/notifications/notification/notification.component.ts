import {Component, signal, WritableSignal} from '@angular/core';
import {NotificationsStoreService} from "../services/notifications-store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less']
})
export class NotificationComponent {
    protected readonly columns: string[] = ['profile_image', 'first_name', 'last_name', 'info'];
    protected activeItemIndex: number = 0;
    protected notifications: WritableSignal<Tables<'notifications_by_user'>[] | null> = signal([]);

    constructor(
        private readonly notificationStoreService: NotificationsStoreService
    ) {
        this.notifications = this.notificationStoreService.selectNotifications();
        console.log(this.notifications())
    }
}

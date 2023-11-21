import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {NotificationsStoreService} from "../services/notifications-store.service";
import {Functions} from "../../../../../supabase/types/supabase.shorthand-types";
import {NotificationsService} from "../services/notifications.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'polity-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
    protected readonly filterForm = new FormGroup({
        notifications: new FormControl(''),
    });
    protected readonly columns: string[] = ['profile_image', 'name', 'type', 'time'];
    protected isNotificationsLoading: WritableSignal<boolean> = signal(false);
    protected notificationsStatic: WritableSignal<Functions<'select_notifications_of_users'>> = signal([]);

    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly notificationStoreService: NotificationsStoreService
    ) {
    }

    readonly filter = (item: string, value: string): boolean => {
        console.log('called')
        return item == value
    };


    async ngOnInit(): Promise<void> {
        this.isNotificationsLoading = this.notificationStoreService.notifications.loading.getLoading();
        await this.notificationsService.selectNotifications()

        this.notificationsStatic = this.notificationStoreService.notifications.getEntities();
        console.log('static', this.notificationsStatic())
    }
}

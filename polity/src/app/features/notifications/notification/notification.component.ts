import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {NotificationsStoreService} from "../services/notifications-store.service";
import {Tables} from "../../../../../supabase/types/supabase.shorthand-types";

@Component({
    selector: 'polity-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
    protected readonly columns: string[] = ['profile_image', 'name', 'time'];
    // protected activeItemIndex: number = 0;
    protected loading: WritableSignal<boolean> = signal(false);
    protected notificationsSignal: WritableSignal<Tables<'notifications_by_user'>[]> = signal([]);// = signal(
    // [
    // {
    //     created_at: 'string',
    //     id: 'string',
    //     read_by_receiver: true,
    //     receiver: 'string',
    //     sender: 'string',
    //     type_of_notification: 'follow_from_user'
    // },
    // {
    //     created_at: 'string',
    //     id: 'string',
    //     read_by_receiver: true,
    //     receiver: 'string',
    //     sender: 'string',
    //     type_of_notification: 'follow_from_user'
    // }
    // ]
    // );
    protected notifications: Tables<'notifications_by_user'>[] =
        [
            {
                created_at: 'string',
                id: 'string',
                read_by_receiver: true,
                receiver: 'string',
                sender: 'string',
                type_of_notification: 'follow_from_user'
            },
            {
                created_at: 'string',
                id: 'string',
                read_by_receiver: true,
                receiver: 'string',
                sender: 'string',
                type_of_notification: 'follow_from_user'
            }
        ]

    // ;

    constructor(
        private readonly notificationStoreService: NotificationsStoreService
    ) {
        this.loading = this.notificationStoreService.notifications.loading.selectLoading()
        // const notifications = this.notificationStoreService.selectNotifications()
        // // WritableSignal<Tables<'notifications_by_user'>[]>;
        // console.log(notifications())

        // effect(() => {
        //     console.log(notifications())
        //     console.log('before', this.notificationsSignal())
        //     // this.notificationsSignal = notifications as WritableSignal<Tables<'notifications_by_user'>[]>
        //     this.loading = this.notificationStoreService.selectLoading();
        //
        //     // if (notifications()) {
        //     //     // this.notifications = this.notificationsSignal()
        //     //     console.log('before', this.notificationsSignal())
        //     //     console.log('before', notifications())
        //     //
        //     //     this.notifications = notifications() as Tables<'notifications_by_user'>[]
        //     //     this.notificationsSignal = notifications as WritableSignal<Tables<'notifications_by_user'>[]>
        //     //     console.log('after', this.notificationsSignal())
        //     //     console.log('after', this.notifications)
        //     //
        //     // }
        //
        // })
    }

    nGOnInit(): void {

    }

    toggleBoolean(): void {
        // this.notificationsSignal = this.notificationStoreService.selectNotifications();
        this.notificationsSignal = this.notificationStoreService.notifications.selectEntities();

        this.notifications = this.notificationsSignal()
        console.log('after update', this.notifications)
        this.notifications = this.notificationsSignal()
        console.log(this.loading())
        const update = !this.loading()
        console.log('before', update)
        console.log('notifications', this.notificationsSignal()[0]),
            console.log('notifications2', this.notifications[0])

        console.log('signal', Array.isArray(this.notificationsSignal()), this.notificationsSignal())
        console.log('flat', Array.isArray(this.notifications), this.notifications)

        const test = [1, 2, 3, 5]
        console.log('test', typeof test, Array.isArray(test))
    }
}

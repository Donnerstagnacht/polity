import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationComponent} from './notification/notification.component';


@NgModule({
    declarations: [
        NotificationsComponent,
        NotificationComponent
    ],
    imports: [
        CommonModule
    ]
})
export class NotificationsModule {
}

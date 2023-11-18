import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationComponent} from './notification/notification.component';
import {TuiButtonModule} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiTableModule} from "@taiga-ui/addon-table";


@NgModule({
    declarations: [
        NotificationsComponent,
        NotificationComponent
    ],
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiLetModule,
        TuiTableModule
    ],
    exports: []
})
export class NotificationsModule {
}

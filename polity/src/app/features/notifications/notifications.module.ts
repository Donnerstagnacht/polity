import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationComponent} from './notification/notification.component';
import {TuiButtonModule} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiTableFiltersModule, TuiTableModule} from "@taiga-ui/addon-table";
import {TuiAvatarModule, TuiInputModule, TuiTagModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        NotificationsComponent,
        NotificationComponent
    ],
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiLetModule,
        TuiTableModule,
        TuiAvatarModule,
        TuiTagModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTableFiltersModule
    ],
    exports: []
})
export class NotificationsModule {
}

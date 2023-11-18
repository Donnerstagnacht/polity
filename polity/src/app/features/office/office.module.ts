import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficeRoutingModule} from './office-routing.module';
import {OfficeComponent} from './office/office.component';
import {LayoutModule} from "../../layout/layout.module";
import {NotificationsModule} from "../notifications/notifications.module";


@NgModule({
    declarations: [
        OfficeComponent
    ],
    imports: [
        CommonModule,
        OfficeRoutingModule,
        LayoutModule,
        NotificationsModule
    ]
})
export class OfficeModule {
}

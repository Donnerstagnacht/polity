import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficeRoutingModule} from './office-routing.module';
import {OfficeComponent} from './office/office.component';
import {NotificationsModule} from "../notifications/notifications.module";
import {SecondBarRightComponent} from "../../navigation/second-bar-right/second-bar-right.component";
import {SecondBarTopComponent} from "../../navigation/second-bar-top/second-bar-top.component";


@NgModule({
    declarations: [
        OfficeComponent
    ],
    imports: [
        CommonModule,
        OfficeRoutingModule,
        NotificationsModule,
        SecondBarRightComponent,
        SecondBarTopComponent
    ]
})
export class OfficeModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfficeRoutingModule} from './office-routing.module';
import {OfficeComponent} from './office/office.component';
import {SecondBarRightComponent} from "../../navigation/second-bar-right/second-bar-right.component";
import {SecondBarTopComponent} from "../../navigation/second-bar-top/second-bar-top.component";
import {NotificationComponent} from "../notifications/notification/notification.component";


@NgModule({
    declarations: [
        OfficeComponent
    ],
    imports: [
        CommonModule,
        OfficeRoutingModule,
        NotificationComponent,
        SecondBarRightComponent,
        SecondBarTopComponent
    ]
})
export class OfficeModule {
}

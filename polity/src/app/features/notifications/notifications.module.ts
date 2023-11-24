import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from './notification/notification.component';
import {TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiTableFiltersModule, TuiTableModule} from "@taiga-ui/addon-table";
import {
    TuiAccordionModule,
    TuiAvatarModule,
    TuiFilterModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiTagModule,
    TuiTextareaModule,
    TuiToggleModule
} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PolityFilterModule} from "../../shared/polity-filter/polity-filter.module";
import {PolityTableModule} from "../../shared/polity-table/polity-table.module";


@NgModule({
    declarations: [
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
        TuiTableFiltersModule,
        TuiInputNumberModule,
        TuiToggleModule,
        FormsModule,
        TuiTextareaModule,
        TuiFilterModule,
        TuiInputDateModule,
        TuiTextfieldControllerModule,
        TuiAccordionModule,
        TuiSvgModule,
        PolityFilterModule,
        PolityTableModule
    ],
    exports: []
})
export class NotificationsModule {
}

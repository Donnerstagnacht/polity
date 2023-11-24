import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from "@taiga-ui/core";
import {ProfileFollowEditComponent} from './profile-follow-edit/profile-follow-edit.component';
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiTabsModule} from "@taiga-ui/kit";
import {PolityTableModule} from "../../shared/polity-table/polity-table.module";
import {PolityFilterModule} from "../../shared/polity-filter/polity-filter.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ProfileFollowEditComponent
    ],
    exports: [],
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiTableModule,
        TuiLetModule,
        TuiTabsModule,
        PolityTableModule,
        PolityFilterModule,
        ReactiveFormsModule
    ]
})
export class ProfileFollowModule {
}

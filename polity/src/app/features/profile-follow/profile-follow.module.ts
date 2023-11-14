import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileFollowComponent} from "./profile-follow/profile-follow.component";
import {TuiButtonModule} from "@taiga-ui/core";
import {ProfileFollowEditComponent} from './profile-follow-edit/profile-follow-edit.component';
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiTabsModule} from "@taiga-ui/kit";


@NgModule({
    declarations: [
        ProfileFollowComponent,
        ProfileFollowEditComponent
    ],
    exports: [
        ProfileFollowComponent
    ],
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiTableModule,
        TuiLetModule,
        TuiTabsModule
    ]
})
export class ProfileFollowModule {
}

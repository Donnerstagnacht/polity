import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule} from "@taiga-ui/core";
import {ProfileFollowEditComponent} from './profile-follow-edit/profile-follow-edit.component';
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiTabsModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {FilterHeadlineComponent} from "../../ui/polity-filter/filter-headline/filter-headline.component";
import {FilterStringComponent} from "../../ui/polity-filter/filter-string/filter-string.component";
import {FilterClearComponent} from "../../ui/polity-filter/filter-clear/filter-clear.component";
import {
    TableThreeIconTextDeleteComponent
} from "../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";


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
        ReactiveFormsModule,
        FilterHeadlineComponent,
        FilterStringComponent,
        FilterClearComponent,
        TableThreeIconTextDeleteComponent
    ]
})
export class ProfileFollowModule {
}

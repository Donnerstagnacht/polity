import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from './notification/notification.component';
import {TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiTableFiltersModule, TuiTableModule} from "@taiga-ui/addon-table";
import {
    TuiAvatarModule,
    TuiFilterModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiTagModule,
    TuiToggleModule
} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {
    TableFourIconTextTagDateComponent
} from "../../ui/polity-table/table-four-icon-text-tag-date/table-four-icon-text-tag-date.component";
import {FilterClearComponent} from "../../ui/polity-filter/filter-clear/filter-clear.component";
import {FilterTagsComponent} from "../../ui/polity-filter/filter-tags/filter-tags.component";
import {FilterDateRangeComponent} from "../../ui/polity-filter/filter-date-range/filter-date-range.component";
import {FilterStringComponent} from "../../ui/polity-filter/filter-string/filter-string.component";
import {FilterHeadlineComponent} from "../../ui/polity-filter/filter-headline/filter-headline.component";


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
        TuiToggleModule,
        FormsModule,
        TuiFilterModule,
        TuiInputDateModule,
        TuiTextfieldControllerModule,
        TuiSvgModule,
        InfiniteScrollModule,
        TableFourIconTextTagDateComponent,
        FilterClearComponent,
        FilterTagsComponent,
        FilterDateRangeComponent,
        FilterStringComponent,
        FilterHeadlineComponent
    ],
    exports: []
})
export class NotificationsModule {
}

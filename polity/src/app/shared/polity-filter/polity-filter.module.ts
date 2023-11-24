import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterHeadlineComponent} from './filter-headline/filter-headline.component';
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";
import {FilterStringComponent} from './filter-string/filter-string.component';
import {TuiFilterModule, TuiInputDateModule, TuiInputModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {FilterTagsComponent} from './filter-tags/filter-tags.component';
import {FilterDateRangeComponent} from './filter-date-range/filter-date-range.component';
import {FilterClearComponent} from './filter-clear/filter-clear.component';


@NgModule({
    declarations: [
        FilterHeadlineComponent,
        FilterStringComponent,
        FilterTagsComponent,
        FilterDateRangeComponent,
        FilterClearComponent
    ],
    exports: [
        FilterHeadlineComponent,
        FilterStringComponent,
        FilterDateRangeComponent,
        FilterTagsComponent,
        FilterClearComponent
    ],
    imports: [
        CommonModule,
        TuiSvgModule,
        TuiInputDateModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiFilterModule,
        TuiButtonModule
    ]
})
export class PolityFilterModule {
}

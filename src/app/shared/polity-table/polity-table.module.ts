import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    TableFourIconTextTagDateComponent
} from './table-four-icon-text-tag-date/table-four-icon-text-tag-date.component';
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiAvatarModule, TuiTagModule} from "@taiga-ui/kit";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TableThreeIconTextDeleteComponent} from './table-three-icon-text-delete/table-three-icon-text-delete.component';
import {TableGenericComponent} from './table-generic/table-generic.component';
import {TuiButtonModule} from "@taiga-ui/core";


@NgModule({
    declarations: [
        TableFourIconTextTagDateComponent,
        TableThreeIconTextDeleteComponent,
        TableGenericComponent
    ],
    exports: [
        TableFourIconTextTagDateComponent,
        TableThreeIconTextDeleteComponent
    ],
    imports: [
        CommonModule,
        TuiTableModule,
        TuiAvatarModule,
        TuiTagModule,
        TuiLetModule,
        TuiButtonModule
    ]
})
export class PolityTableModule {
}

import {Component} from '@angular/core';
import {TableGenericComponent} from "../table-generic/table-generic.component";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiAvatarModule, TuiTagModule} from "@taiga-ui/kit";
import {CommonModule, DatePipe} from "@angular/common";
import {TuiLetModule} from "@taiga-ui/cdk";

@Component({
    selector: 'polity-table-four-icon-text-tag-date',
    templateUrl: './table-four-icon-text-tag-date.component.html',
    styleUrls: ['./table-four-icon-text-tag-date.component.less'],
    standalone: true,
    imports: [
        TuiTableModule,
        TuiAvatarModule,
        TuiTagModule,
        DatePipe,
        TuiLetModule,
        CommonModule
    ]
})
export class TableFourIconTextTagDateComponent<ObjectType> extends TableGenericComponent<ObjectType> {

    constructor() {
        super();
    }
}

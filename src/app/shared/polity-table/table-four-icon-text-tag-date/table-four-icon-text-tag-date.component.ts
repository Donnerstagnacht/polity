import {Component} from '@angular/core';
import {TableGenericComponent} from "../table-generic/table-generic.component";

@Component({
    selector: 'polity-table-four-icon-text-tag-date',
    templateUrl: './table-four-icon-text-tag-date.component.html',
    styleUrls: ['./table-four-icon-text-tag-date.component.less']
})
export class TableFourIconTextTagDateComponent<ObjectType> extends TableGenericComponent<ObjectType> {

    constructor() {
        super();
    }
}

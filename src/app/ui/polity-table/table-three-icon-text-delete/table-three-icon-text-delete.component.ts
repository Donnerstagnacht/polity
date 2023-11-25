import {Component, EventEmitter, Output} from '@angular/core';
import {TableGenericComponent} from "../table-generic/table-generic.component";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiAvatarModule} from "@taiga-ui/kit";
import {CommonModule} from "@angular/common";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-table-three-icon-text-delete',
    templateUrl: './table-three-icon-text-delete.component.html',
    styleUrls: ['./table-three-icon-text-delete.component.less'],
    standalone: true,
    imports: [
        TuiTableModule,
        TuiAvatarModule,
        CommonModule,
        TuiLetModule,
        TuiButtonModule
    ]
})
export class TableThreeIconTextDeleteComponent<ObjectType> extends TableGenericComponent<ObjectType> {
    @Output() public remove: EventEmitter<string> = new EventEmitter<string>();

    onRemove(id: string): void {
        this.remove.emit(id);
    }
}

import {Component, EventEmitter, Output} from '@angular/core';
import {TableGenericComponent} from "../table-generic/table-generic.component";

@Component({
    selector: 'polity-table-three-icon-text-delete',
    templateUrl: './table-three-icon-text-delete.component.html',
    styleUrls: ['./table-three-icon-text-delete.component.less']
})
export class TableThreeIconTextDeleteComponent<ObjectType> extends TableGenericComponent<ObjectType> {
    @Output() remove: EventEmitter<string> = new EventEmitter<string>();

    onRemove(id: string): void {
        this.remove.emit(id);
    }
}

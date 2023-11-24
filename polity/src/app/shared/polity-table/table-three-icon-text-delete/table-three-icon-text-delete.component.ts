import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TableGenericComponent} from "../table-generic/table-generic.component";

@Component({
    selector: 'polity-table-three-icon-text-delete',
    templateUrl: './table-three-icon-text-delete.component.html',
    styleUrls: ['./table-three-icon-text-delete.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableThreeIconTextDeleteComponent<ObjectType> extends TableGenericComponent<ObjectType> {
    @Output() remove: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        super();
        // console.log('bonusKeys', this.bonusKeys);
        // console.log('dataKeysForColumns', this.dataKeysForColumns);
        // console.log('data', this.data());
        // console.log('isLoading', this.isLoading());
        // console.log('headings', this.headings);
    }

    onRemove(id: string) {
        this.remove.emit(id);
    }
}

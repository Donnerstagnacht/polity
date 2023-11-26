import {Component, Input, signal, WritableSignal} from '@angular/core';

@Component({
    selector: 'polity-table-generic',
    templateUrl: './table-generic.component.html',
    styleUrls: ['./table-generic.component.less'],
    standalone: true,
    imports: [],
})
export class TableGenericComponent<ObjectType> {
    @Input({required: true}) public dataKeysForColumns: (keyof ObjectType)[] = [];
    @Input() public bonusKeys: (keyof ObjectType)[] = [];
    @Input({required: true}) public data: WritableSignal<ObjectType[]> = signal([]);
    @Input({required: true}) public isLoading: WritableSignal<boolean> = signal(true);
    @Input({required: true}) public headings: string[] = [];
    @Input() dataCyTags: string[] = [];
    @Input() dataCyTagsHeadline: string[] = [];

    protected getTableValueKey(item: any, key: string | number | symbol): any {
        return item[key];
    }

    protected transformDataForTui(): readonly Partial<Record<any, any>>[] {
        return this.data() as readonly Partial<Record<any, any>>[];
    }

    protected transformColumnForTui(index: number): string {
        return this.dataKeysForColumns[index] as string;
    }

    protected transformColumnsForTui(): readonly string[] {
        return this.dataKeysForColumns as readonly string[];
    }
}

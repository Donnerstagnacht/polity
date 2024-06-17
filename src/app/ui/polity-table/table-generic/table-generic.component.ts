import {Component, Input, Signal, signal, WritableSignal} from '@angular/core';

/**
 * A generic table componen that offers generic functionality for tui tables
 * variable access.
 * @param dataKeysForColumns: (keyof ObjectType)[] = [] - Required keys of the data to be displayed.
 * @param bonusKeys: (keyof ObjectType)[] = [] - Optional bonus keys of the data to be displayed.
 * @param data: WritableSignal<ObjectType[]> = signal([]) - The data to be displayed;
 * @param isLoading: WritableSignal<boolean> = signal(true) - Displays a loading spinner if data is loading
 * @param headings: string[] = [] - Headings of the columns.
 * @param dataCyTags: string[] = [] - Tags used for automated testing
 * @param dataCyTagsHeadline: string[] = [] - Headline tags used for automated testing
 **/
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
    @Input({required: true}) public data: WritableSignal<ObjectType[]> | Signal<ObjectType[]> = signal([]);
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

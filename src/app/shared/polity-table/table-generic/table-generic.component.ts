import {Component, Input, signal, WritableSignal} from '@angular/core';

@Component({
    selector: 'polity-table-generic',
    templateUrl: './table-generic.component.html',
    styleUrls: ['./table-generic.component.less']
})
export class TableGenericComponent<ObjectType> {
    @Input() public dataKeysForColumns: (keyof ObjectType)[] = [];
    @Input() public bonusKeys: (keyof ObjectType)[] = [];

    @Input() public data: WritableSignal<ObjectType[]> = signal([]);
    @Input() public isLoading: WritableSignal<boolean> = signal(true);
    @Input() public headings: string[] = [];
    @Input() dataCyTags: string[] = [];
    @Input() dataCyTagsHeadline: string[] = [];

    constructor() {
        // console.log('bonusKeys', this.bonusKeys);
        // console.log('dataKeysForColumns', this.dataKeysForColumns);
        // console.log('data', this.data);
        // console.log('isLoading', this.isLoading);
        // console.log('headings', this.headings);
    }

    ngOnInit(): void {
        console.log('bonusKeys', this.bonusKeys);
        console.log('dataKeysForColumns', this.dataKeysForColumns);
        console.log('data', this.data());
        console.log('isLoading', this.isLoading());
        console.log('headings', this.headings);
    }

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

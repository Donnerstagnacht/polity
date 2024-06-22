import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';

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
    imports: []
})
export class TableGenericComponent<ObjectType> {
    public dataKeysForColumns: InputSignal<(keyof ObjectType)[]> = input<(keyof ObjectType)[]>([]);
    public bonusKeys: InputSignal<(keyof ObjectType)[]> = input<(keyof ObjectType)[]>([]);
    public data: InputSignal<ObjectType[]> = input<ObjectType[]>([]);
    public isLoading: InputSignal<boolean> = input(true);
    public headings: InputSignal<string[]> = input<string[]>([]);
    public dataCyTags: InputSignal<string[]> = input<string[]>([]);
    public dataCyTagsHeadline: InputSignal<string[]> = input<string[]>([]);
    public url: InputSignal<string> = input<string>('');
    public openLink: OutputEmitterRef<string> = output<string>();
    public linkKey: InputSignal<keyof ObjectType> = input.required<keyof ObjectType>();

    protected getTableValueKey(item: any, key: string | number | symbol): any {
        // if (key === 'profile_image_') {
        //     console.log('item[key]', item[key]);
        //
        // }
        return item[key];
    }

    protected transformDataForTui(): readonly Partial<Record<any, any>>[] {
        return this.data() as readonly Partial<Record<any, any>>[];
    }

    protected transformColumnForTui(index: number): string {
        return this.dataKeysForColumns()[index] as string;
    }

    protected transformColumnsForTui(): readonly string[] {
        return this.dataKeysForColumns() as readonly string[];
    }

    protected onOpenLink(id: string): void {
        this.openLink.emit(id);
    }
}

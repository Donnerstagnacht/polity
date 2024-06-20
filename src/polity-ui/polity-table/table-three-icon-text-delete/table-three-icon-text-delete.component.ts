import {Component, output, OutputEmitterRef} from '@angular/core';
import {TableGenericComponent} from '../table-generic/table-generic.component';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TuiAvatarModule} from '@taiga-ui/kit';
import {CommonModule} from '@angular/common';
import {TuiLetModule} from '@taiga-ui/cdk';
import {TuiButtonModule} from '@taiga-ui/core';

/**
 * A component to display a table with the following columns
 * - icon
 * - text
 * - delete button
 *
 * @param dataKeysForColumns: (keyof ObjectType)[] = [] - Required keys of the data to be displayed.
 * @param bonusKeys: (keyof ObjectType)[] = [] - Optional bonus keys of the data to be displayed.
 * @param data: WritableSignal<ObjectType[]> = signal([]) - The data to be displayed;
 * @param isLoading: WritableSignal<boolean> = signal(true) - Displays a loading spinner if data is loading
 * @param headings: string[] = [] - Headings of the columns.
 * @param dataCyTags: string[] = [] - Tags used for automated testing
 * @param dataCyTagsHeadline: string[] = [] - Headline tags used for automated testing **/
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
    public remove: OutputEmitterRef<string> = output<string>();

    onRemove(id: string): void {
        this.remove.emit(id);
    }
}

import {Component, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {TuiAvatarModule} from '@taiga-ui/kit';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiLetModule} from '@taiga-ui/cdk';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {TableGenericComponent} from '../table-generic/table-generic.component';

/**
 * A component to display a table with the following columns
 * - icon
 * - text
 * - first action button and a second action button
 *
 * @param dataKeysForColumns: (keyof ObjectType)[] = [] - Required keys of the data to be displayed.
 * @param bonusKeys: (keyof ObjectType)[] = [] - Optional bonus keys of the data to be displayed.
 * @param data: WritableSignal<ObjectType[]> = signal([]) - The data to be displayed;
 * @param isLoading: WritableSignal<boolean> = signal(true) - Displays a loading spinner if data is loading
 * @param headings: string[] = [] - Headings of the columns.
 * @param dataCyTags: string[] = [] - Tags used for automated testing
 * @param dataCyTagsHeadline: string[] = [] - Headline tags used for automated testing **/
@Component({
    selector: 'polity-table-three-icon-text-two-actions',
    standalone: true,
    imports: [
        TuiAvatarModule,
        TuiButtonModule,
        TuiLetModule,
        TuiTableModule
    ],
    templateUrl: './table-three-icon-text-two-actions.component.html',
    styleUrl: './table-three-icon-text-two-actions.component.less'
})
export class TableThreeIconTextTwoActionsComponent<ObjectType> extends TableGenericComponent<ObjectType> {
    public firstAction: OutputEmitterRef<string> = output<string>();
    public secondAction: OutputEmitterRef<string> = output<string>();
    public secondActionDataCyTag: InputSignal<string> = input.required<string>();
    public firstActionIcon: InputSignal<string> = input.required<string>();
    public secondActionIcon: InputSignal<string> = input.required<string>();
    public firstActionText: InputSignal<string> = input.required<string>();
    public secondActionText: InputSignal<string> = input.required<string>();

    onFirstAction(id: string): void {
        console.log('onFirstAction', id);
        this.firstAction.emit(id);
    }

    onSecondAction(id: string): void {
        console.log('onSecondAction', id);
        this.secondAction.emit(id);
    }
}

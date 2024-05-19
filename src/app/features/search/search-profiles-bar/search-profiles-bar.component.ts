import {Component, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    TableThreeIconTextDeleteComponent
} from "../../../ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component";
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFilterByInputPipeModule,
    TuiStringifyContentPipeModule
} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
    selector: 'polity-search-profiles-bar',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TableThreeIconTextDeleteComponent,
        TuiComboBoxModule,
        TuiDataListWrapperModule,
        TuiFilterByInputPipeModule,
        TuiStringifyContentPipeModule,
        TuiTextfieldControllerModule
    ],
    templateUrl: './search-profiles-bar.component.html',
    styleUrl: './search-profiles-bar.component.less'
})
export class SearchProfilesBarComponent {

    protected readonly signal = signal;
}

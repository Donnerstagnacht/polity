import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiFilterByInputPipeModule,
    TuiInputModule,
    TuiInputTagModule,
    TuiRadioBlockModule,
    TuiSelectModule,
    TuiStringifyContentPipeModule
} from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {AsyncPipe} from '@angular/common';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import {
    TableThreeIconTextDeleteComponent
} from '@polity-ui/polity-table/table-three-icon-text-delete/table-three-icon-text-delete.component';
import {SearchProfilesBarComponent} from '@polity-search/search-ui/search-profiles-bar/search-profiles-bar.component';
import {CreateGroupStore} from '../state/create-group.store';
import {StepperRightComponent} from '@polity-navigation/stepper/stepper-right/stepper-right.component';
import {StepperTopComponent} from '@polity-navigation/stepper/stepper-top/stepper-top.component';
import {SecondBarTopComponent} from '@polity-navigation/second-bar/second-bar-top/second-bar-top.component';
import {StepperItem} from '@polity-navigation/types-and-interfaces/stepper-item';
import {CREATE_GROUP_STEPPER_ITEMS} from '@polity-navigation/create-group-stepper';
import {NewGroupForm} from '../new-ui/new-group/new-group.form';
import {GroupNew} from '../types/group-new';

@Component({
    selector: 'polity-new-group',
    standalone: true,
    imports: [
        StepperRightComponent,
        StepperTopComponent,
        SecondBarTopComponent,
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiHintModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiSvgModule,
        AsyncPipe,
        TuiButtonModule,
        NgxPageScrollModule,
        TuiSvgModule,
        TuiRadioBlockModule,
        TuiGroupModule,
        TuiInputTagModule,
        TuiDataListWrapperModule,
        TuiDataListModule,
        TuiStringifyContentPipeModule,
        TuiFilterByInputPipeModule,
        TuiComboBoxModule,
        TableThreeIconTextDeleteComponent,
        TuiSelectModule,
        SearchProfilesBarComponent,
        NewGroupForm
    ],
    templateUrl: './new-group.page.html',
    styleUrl: './new-group.page.less'
})
export class NewGroupPage {
    protected createGroupStore: CreateGroupStore = inject(CreateGroupStore);
    protected menuItems: StepperItem[] = CREATE_GROUP_STEPPER_ITEMS;

    protected async onCreateGroup(newGroup: GroupNew): Promise<void> {
        await this.createGroupStore.create(newGroup);
    }
}
